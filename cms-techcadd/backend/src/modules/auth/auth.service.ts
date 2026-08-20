import { createHash, randomBytes, randomUUID } from 'node:crypto'
import argon2 from 'argon2'

import { config, isProduction } from '../../config.js'
import { execute, query, queryOne } from '../../db/pool.js'
import { forbidden, unauthorised, unprocessable } from '../../http/errors.js'

/** The CMS has a single role: an admin can do everything. */
export type UserRole = 'admin'

export interface SessionUser {
  userId: string
  name: string
  email: string
  role: UserRole
}

interface UserRow {
  id: string
  name: string
  email: string
  password_hash: string
  role: UserRole
  active: 0 | 1
}

/** argon2id with sensible cost. Never store or log a plaintext password. */
export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2 })
}

async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain)
  } catch {
    // A malformed stored hash must read as "wrong password", never as a crash.
    return false
  }
}

export async function login(
  identifier: string,
  password: string,
  userAgent?: string,
): Promise<{ sessionId: string; user: SessionUser }> {
  const user = await queryOne<UserRow>(
    'SELECT id, name, email, password_hash, role, active FROM users WHERE email = ? LIMIT 1',
    [identifier.trim().toLowerCase()],
  )

  // Hash a dummy password when the user is missing so the response takes about
  // the same time either way — otherwise timing alone reveals which addresses
  // are registered.
  const ok = user
    ? await verifyPassword(user.password_hash, password)
    : await verifyPassword('$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHQ$0000000000000000000000000000000000000000000', password)

  // One message for both cases, for the same reason.
  if (!user || !ok) throw unauthorised('That email and password combination is not recognised.')

  if (!user.active) {
    throw forbidden('This account has been deactivated. Ask another administrator to restore it.')
  }

  const sessionId = randomUUID()
  await execute(
    `INSERT INTO sessions (id, user_id, expires_at, user_agent, created_at)
     VALUES (?, ?, DATE_ADD(NOW(3), INTERVAL ? DAY), ?, NOW(3))`,
    [sessionId, user.id, config.SESSION_DAYS, userAgent?.slice(0, 255) ?? null],
  )

  return {
    sessionId,
    user: { userId: user.id, name: user.name, email: user.email, role: user.role },
  }
}

export async function resolveSession(sessionId: string): Promise<SessionUser | undefined> {
  return queryOne<SessionUser>(
    `SELECT u.id AS userId, u.name, u.email, u.role
       FROM sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.id = ? AND s.expires_at > NOW(3) AND u.active = 1
      LIMIT 1`,
    [sessionId],
  )
}

export async function logout(sessionId: string): Promise<void> {
  await execute('DELETE FROM sessions WHERE id = ?', [sessionId])
}

/** Removes every session for a user — used after a password change. */
async function revokeAllSessions(userId: string): Promise<void> {
  await execute('DELETE FROM sessions WHERE user_id = ?', [userId])
}

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

/**
 * Always resolves, whether or not the address exists. Returning an error for
 * unknown emails would turn this endpoint into an account-enumeration oracle.
 * The returned token is only for the caller to email — never store it raw.
 */
export async function requestPasswordReset(email: string): Promise<string | undefined> {
  const user = await queryOne<{ id: string }>(
    'SELECT id FROM users WHERE email = ? AND active = 1 LIMIT 1',
    [email.trim().toLowerCase()],
  )
  if (!user) return undefined

  const token = randomBytes(32).toString('hex')
  await execute(
    `INSERT INTO password_resets (token_hash, user_id, expires_at, created_at)
     VALUES (?, ?, DATE_ADD(NOW(3), INTERVAL 1 HOUR), NOW(3))`,
    [hashToken(token), user.id],
  )

  return token
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const row = await queryOne<{ user_id: string }>(
    `SELECT user_id FROM password_resets
      WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW(3)
      LIMIT 1`,
    [hashToken(token)],
  )
  if (!row) throw unauthorised('This reset link is invalid or has expired.')

  await execute('UPDATE users SET password_hash = ?, updated_at = NOW(3) WHERE id = ?', [
    await hashPassword(newPassword),
    row.user_id,
  ])
  await execute('UPDATE password_resets SET used_at = NOW(3) WHERE token_hash = ?', [
    hashToken(token),
  ])

  // Anyone already signed in with the old password is signed out.
  await revokeAllSessions(row.user_id)
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
  keepSessionId: string,
): Promise<void> {
  const user = await queryOne<UserRow>('SELECT * FROM users WHERE id = ? LIMIT 1', [userId])
  if (!user) throw unauthorised()

  if (!(await verifyPassword(user.password_hash, currentPassword))) {
    throw unprocessable({ currentPassword: 'Your current password is not correct.' })
  }

  await execute('UPDATE users SET password_hash = ?, updated_at = NOW(3) WHERE id = ?', [
    await hashPassword(newPassword),
    userId,
  ])

  // Drop other devices but keep the caller signed in.
  await execute('DELETE FROM sessions WHERE user_id = ? AND id <> ?', [userId, keepSessionId])
}

/**
 * Deletes expired sessions and spent reset tokens.
 *
 * This existed for a long time and was never called, which is exactly the kind
 * of thing that leaves no symptom until it does: the sessions table had grown
 * to four hundred rows, every one of them a dead login, and `password_resets`
 * held every link ever issued. Neither is a hole an attacker can climb through
 * — an expired session does not resolve and a used token is rejected — but a
 * table of stale credential material that only ever grows is not something to
 * leave running.
 *
 * Reset rows are removed once they are expired *or* used: a token that has done
 * its job has nothing left to prove.
 */
export async function purgeExpired(): Promise<{ sessions: number; resets: number }> {
  const sessions = await execute('DELETE FROM sessions WHERE expires_at <= NOW(3)')
  const resets = await execute(
    'DELETE FROM password_resets WHERE expires_at <= NOW(3) OR used_at IS NOT NULL',
  )

  return { sessions: sessions.affectedRows, resets: resets.affectedRows }
}

/**
 * Runs the purge now and then daily.
 *
 * In-process rather than a cron entry, because a deployment that forgets the
 * cron entry is the situation this is fixing. `unref` so it never holds the
 * process open, and every failure is swallowed: housekeeping must not be able
 * to take the API down.
 */
export function startSessionHousekeeping(): void {
  const run = () => {
    void purgeExpired()
      .then(({ sessions, resets }) => {
        if (sessions || resets) {
          console.log(`[auth] purged ${sessions} expired session(s), ${resets} reset token(s)`)
        }
      })
      .catch((error: unknown) => {
        console.warn('[auth] could not purge expired sessions:', error)
      })
  }

  run()
  setInterval(run, 24 * 60 * 60 * 1000).unref()
}

/**
 * The password `db:seed` uses when nothing else is given.
 *
 * Named here as well as in the seed script because this is the side that has to
 * detect it: a first administrator whose password was never changed is the most
 * likely way into this CMS, and it leaves no trace to find by reading the
 * database — the hash of a default password looks like any other hash.
 */
export const SEED_PASSWORD = 'ChangeMe123'

/**
 * Refuses to run in production with a seeded password still in place.
 *
 * A warning would be the polite thing to do and would be ignored, which is how
 * an install ends up on the internet with a published password on its only
 * administrator account. In development it is a loud warning instead — the
 * default exists so a fresh clone can sign in, and blocking that would just
 * mean nobody runs the seed.
 */
export async function assertSeedPasswordChanged(): Promise<void> {
  const admins = await query<{ id: string; email: string; password_hash: string }>(
    'SELECT id, email, password_hash FROM users WHERE active = 1',
  )

  const offenders: string[] = []
  for (const admin of admins) {
    if (await verifyPassword(admin.password_hash, SEED_PASSWORD)) offenders.push(admin.email)
  }

  if (offenders.length === 0) return

  const list = offenders.join(', ')

  if (isProduction) {
    console.error('\nRefusing to start: an account still uses the seeded password.')
    console.error(`  ${list}`)
    console.error('\nSign in and change it under Settings → Security, or set a new one with:')
    console.error('  SEED_EMAIL=<address> SEED_PASSWORD=<new password> npm run db:seed\n')
    process.exit(1)
  }

  console.warn('\n  ⚠  Seeded password still in use — change it before deploying.')
  console.warn(`     ${list}\n`)
}
