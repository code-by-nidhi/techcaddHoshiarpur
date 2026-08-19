import { query, queryOne, type Row } from '../../db/pool.js'
import * as coursesRepo from '../courses/courses.repo.js'
import * as enquiriesRepo from '../enquiries/enquiries.repo.js'

/** One scalar count. */
async function count(sql: string, params: unknown[] = []): Promise<number> {
  const row = await queryOne<{ n: number }>(sql, params)
  return Number(row?.n ?? 0)
}

export interface TrendPoint {
  /** ISO date, oldest first. */
  date: string
  value: number
}

/**
 * Enquiries per day for the last seven days, including days with none.
 *
 * Grouped in SQL rather than in the browser. The page previously fetched two
 * thousand enquiries to bucket them client-side, which grows without bound and
 * ships the entire table over the wire to render seven numbers.
 */
async function enquiryTrend(): Promise<TrendPoint[]> {
  const rows = await query<Row>(
    `SELECT DATE(created_at) AS day, COUNT(*) AS n
       FROM enquiries
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(created_at)`,
  )

  const counts = new Map<string, number>()
  for (const row of rows) counts.set(String(row.day), Number(row.n))

  // The query only returns days that have rows; the chart needs all seven.
  const today = new Date()
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - offset))
    const key = date.toISOString().slice(0, 10)
    return { date: key, value: counts.get(key) ?? 0 }
  })
}

interface Recent {
  id: string
  title: string
  kind: 'course' | 'blog'
  updatedAt: string
}

/**
 * The most recently touched content across both tables that have a title.
 *
 * UNION ALL, so the database does the interleaving and returns six rows rather
 * than two separate pages the client has to merge and trim.
 */
async function recentActivity(): Promise<Recent[]> {
  const rows = await query<Row>(
    `(SELECT id, title, 'course' AS kind, updated_at FROM courses ORDER BY updated_at DESC LIMIT 6)
     UNION ALL
     (SELECT id, title, 'blog'   AS kind, updated_at FROM blogs   ORDER BY updated_at DESC LIMIT 6)
     ORDER BY updated_at DESC
     LIMIT 6`,
  )

  return rows.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    kind: row.kind as Recent['kind'],
    updatedAt: row.updated_at as string,
  }))
}

/** Counts by status across the four content tables that have one. */
async function contentOverview(): Promise<Record<string, number>> {
  const rows = await query<Row>(
    `SELECT status, SUM(n) AS n FROM (
       SELECT status, COUNT(*) AS n FROM courses GROUP BY status
       UNION ALL SELECT status, COUNT(*) FROM blogs   GROUP BY status
       UNION ALL SELECT status, COUNT(*) FROM faqs    GROUP BY status
       UNION ALL SELECT status, COUNT(*) FROM reviews GROUP BY status
     ) AS combined
     GROUP BY status`,
  )

  const overview = { published: 0, draft: 0, review: 0, total: 0 }
  for (const row of rows) {
    const status = String(row.status) as keyof typeof overview
    if (status in overview) overview[status] = Number(row.n)
  }
  overview.total = overview.published + overview.draft + overview.review

  return overview
}

/**
 * Everything the dashboard needs, in one request.
 *
 * The page used to issue around twenty, most of them count-only list calls.
 * Bundling them costs one round trip and lets the counts be consistent with
 * each other rather than sampled at twenty different moments.
 */
export async function summary(): Promise<unknown> {
  const [
    blogs, enquiries, reviews, faqs, subscribers, courses,
    newEnquiriesToday, pendingReview, livePosts,
    trend, overview, activity, recentEnquiries, recentCourses,
  ] = await Promise.all([
    count('SELECT COUNT(*) AS n FROM blogs'),
    count('SELECT COUNT(*) AS n FROM enquiries'),
    count('SELECT COUNT(*) AS n FROM reviews'),
    count('SELECT COUNT(*) AS n FROM faqs'),
    count("SELECT COUNT(*) AS n FROM newsletter_subscribers WHERE status = 'active'"),
    count('SELECT COUNT(*) AS n FROM courses'),

    count('SELECT COUNT(*) AS n FROM enquiries WHERE DATE(created_at) = CURDATE()'),
    // Awaiting an editor across everything that has a review state, not just
    // courses — a blog post sitting in review is the more common case here.
    count(`SELECT (SELECT COUNT(*) FROM blogs   WHERE status = 'review')
                + (SELECT COUNT(*) FROM courses WHERE status = 'review')
                + (SELECT COUNT(*) FROM faqs    WHERE status = 'review')
                + (SELECT COUNT(*) FROM reviews WHERE status = 'review') AS n`),
    count("SELECT COUNT(*) AS n FROM blogs WHERE status = 'published'"),

    enquiryTrend(),
    contentOverview(),
    recentActivity(),

    // Through the modules' own list functions rather than a bespoke query, so
    // these rows are byte-for-byte what /api/enquiries and /api/courses return
    // and the dashboard components need no separate shape.
    enquiriesRepo.list({
      page: 1, pageSize: 8, sort: { field: 'createdAt', dir: 'desc' }, filters: {},
    }),
    coursesRepo.list({
      page: 1, pageSize: 6, sort: { field: 'updatedAt', dir: 'desc' }, filters: {},
    }),
  ])

  return {
    totals: { blogs, enquiries, reviews, faqs, subscribers, courses },
    today: { newEnquiries: newEnquiriesToday, pendingReview, livePosts },
    enquiryTrend: trend,
    contentOverview: overview,
    recentActivity: activity,
    recentEnquiries: recentEnquiries.items,
    recentCourses: recentCourses.items,
  }
}
