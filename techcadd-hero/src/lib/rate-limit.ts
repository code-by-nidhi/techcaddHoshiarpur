/**
 * A small fixed-window rate limiter held in process memory.
 *
 * Deliberately not Redis. The public write surface here is one enquiry form,
 * and the job is to blunt a script hammering it — not to enforce a quota
 * exactly. An in-process counter does that with no service to provision.
 *
 * Know the limit before you rely on it: the window is per server instance. On
 * a single Node process (`next start`, a container, a VPS) that is the whole
 * application and the limit holds. Spread across serverless instances or
 * replicas, each keeps its own count and the effective limit multiplies by the
 * instance count. If this is ever deployed behind an autoscaler and the limit
 * has to be exact, swap this module for a shared store — the call site does
 * not change.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

/** Stops the map growing without bound on a long-lived server. */
function sweep(now: number): void {
  if (windows.size < 5000) return;
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets. For the Retry-After header. */
  retryAfter: number;
};

/**
 * Records a hit against `key` and reports whether it is allowed.
 *
 * @param limit  hits permitted per window
 * @param windowMs  window length in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client address.
 *
 * `x-forwarded-for` is client-controlled and trivially spoofed, so this is a
 * speed bump rather than an identity. It is only ever used as a rate-limit
 * bucket — never for authorisation, and never stored.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();

  return headers.get("x-real-ip")?.trim() || "unknown";
}
