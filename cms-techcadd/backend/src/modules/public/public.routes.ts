import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

import { asyncHandler, notFound } from '../../http/errors.js'
import type { ListParams } from '../../http/listParams.js'
import { queryOne, type Row } from '../../db/pool.js'
import * as blogsRepo from '../blogs/blogs.repo.js'
import * as categoriesRepo from '../categories/categories.repo.js'
import * as coursesRepo from '../courses/courses.repo.js'
import * as enquiriesRepo from '../enquiries/enquiries.repo.js'
import * as faqsRepo from '../faqs/faqs.repo.js'
import * as newsletterRepo from '../newsletter/newsletter.repo.js'
import { subscribeSchema } from '../newsletter/newsletter.schema.js'
import * as reviewsRepo from '../reviews/reviews.repo.js'
import { publicBlogRouter } from './blog.routes.js'

/**
 * What the public website may read and write.
 *
 * Deliberately a separate router with no `requireAuth`: every other module is
 * behind a session, and mounting public access on those would be one forgotten
 * middleware away from exposing drafts and enquiry records.
 *
 * Two rules hold everywhere below:
 *   - `status: 'published'` is forced, never taken from the query string, so a
 *     crafted request cannot read a draft.
 *   - Nothing here accepts an id from the caller for anything but a lookup.
 */
export const publicRouter = Router()

/**
 * The blog answers on the paths the website already calls, so it lives in a
 * file of its own rather than being flattened in here — it is a contract with
 * an existing frontend, not another listing endpoint.
 */
publicRouter.use('/blog', publicBlogRouter)

/** Only what a marketing page renders — no internal notes or audit fields. */
const PUBLISHED = { status: 'published' } as const
const MAX_PAGE_SIZE = 100

/**
 * `filters` is typed wide so a caller can narrow the result further — by FAQ
 * category, or to featured rows only. `status` is set here rather than being
 * passed in, so no caller can widen it back to include drafts.
 */
function listParams(limit: number): ListParams {
  return {
    page: 1,
    pageSize: Math.min(limit, MAX_PAGE_SIZE),
    filters: { ...PUBLISHED },
    sort: undefined,
    search: undefined,
  }
}

const limitFrom = (value: unknown, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, MAX_PAGE_SIZE) : fallback
}

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

publicRouter.get(
  '/courses',
  asyncHandler(async (req, res) => {
    const result = await coursesRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/courses/:slug',
  asyncHandler(async (req, res) => {
    const row = await queryOne<Row>(
      "SELECT id FROM courses WHERE slug = ? AND status = 'published' LIMIT 1",
      [req.params.slug],
    )
    if (!row) throw notFound('Course')
    res.json(await coursesRepo.get(row.id as string))
  }),
)

publicRouter.get(
  '/blogs',
  asyncHandler(async (req, res) => {
    const result = await blogsRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/blogs/:slug',
  asyncHandler(async (req, res) => {
    const row = await queryOne<Row>(
      "SELECT id FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
      [req.params.slug],
    )
    if (!row) throw notFound('Post')
    res.json(await blogsRepo.get(row.id as string))
  }),
)

/**
 * FAQs, optionally narrowed.
 *
 * The website shows every question on the homepage help centre and a short
 * selection on the contact page, so both filters are worth having here: the
 * alternative is the contact page downloading all of them to render five.
 */
publicRouter.get(
  '/faqs',
  asyncHandler(async (req, res) => {
    const params = listParams(limitFrom(req.query.limit, 100))
    if (typeof req.query.category === 'string' && req.query.category) {
      params.filters.category = req.query.category
    }
    if (req.query.featured === 'true' || req.query.featured === '1') {
      params.filters.featured = '1'
    }

    const result = await faqsRepo.list(params)
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/reviews',
  asyncHandler(async (req, res) => {
    const params = listParams(limitFrom(req.query.limit, 50))
    if (req.query.featured === 'true' || req.query.featured === '1') {
      params.filters.featured = '1'
    }

    const result = await reviewsRepo.list(params)
    res.json({ items: result.items, total: result.total })
  }),
)

publicRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const result = await categoriesRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json({ items: result.items, total: result.total })
  }),
)

/**
 * Site-wide facts the marketing pages print.
 *
 * A hand-picked subset of the settings row, not the row itself: it also holds
 * the reCAPTCHA secret and the notification preferences, and this endpoint has
 * no session behind it.
 */
publicRouter.get(
  '/site',
  asyncHandler(async (_req, res) => {
    const row = await queryOne<Row>(
      'SELECT site_name, tagline, contact_email, contact_phone, address, stats, social FROM settings WHERE id = 1 LIMIT 1',
    )

    const json = <T,>(value: unknown, fallback: T): T => {
      if (value === null || value === undefined) return fallback
      if (typeof value !== 'string') return value as T
      try {
        return JSON.parse(value) as T
      } catch {
        return fallback
      }
    }

    res.json({
      siteName: row?.site_name ?? '',
      tagline: row?.tagline ?? undefined,
      contactEmail: row?.contact_email ?? undefined,
      contactPhone: row?.contact_phone ?? undefined,
      address: row?.address ?? undefined,
      stats: json<{ value: string; label: string }[]>(row?.stats, []),
      social: json<Record<string, string>>(row?.social, {}),
    })
  }),
)

/* ------------------------------------------------------------------ */
/* Enquiries                                                            */
/* ------------------------------------------------------------------ */

/**
 * Anyone on the internet can reach this, so it carries its own limit.
 *
 * The website in front of it already rate-limits and verifies a captcha, but
 * this endpoint must stand on its own — it is reachable directly.
 */
const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many enquiries from this address. Try again shortly.' },
})

/**
 * What a public form may set.
 *
 * A narrow schema on purpose: `status`, `assigneeId` and `notes` belong to the
 * staff workflow, and letting a form set them would let anyone file an enquiry
 * as already-converted or assign work to a colleague.
 */
const publicEnquirySchema = z.object({
  studentName: z.string().min(1, 'Name is required.').max(120),
  phone: z.string().min(6, 'A contact number is required.').max(30),
  email: z.union([z.email('Enter a valid email address.'), z.literal('')]).optional(),
  courseName: z.string().max(200).default(''),
  branchName: z.string().max(120).default(''),
  message: z.string().max(2000).optional(),
  source: z.enum(['website', 'walk-in', 'phone', 'referral', 'social']).default('website'),
  // Recorded by the site: which form, which page, and who submitted it.
  formType: z.string().max(32).optional(),
  sourceUrl: z.string().max(500).optional(),
  ip: z.string().max(45).optional(),
  userAgent: z.string().max(255).optional(),
})

const MAX_PER_PHONE_PER_DAY = 3
const MAX_PER_IP_PER_HOUR = 8

/**
 * Refuses a repeat submission.
 *
 * This check used to live on the website, against its own table. It has to run
 * wherever the enquiries actually are — otherwise the same number could be
 * submitted all day and every one would be recorded.
 */
async function isDuplicate(phone: string, ip?: string): Promise<boolean> {
  const byPhone = await queryOne<{ n: number }>(
    `SELECT COUNT(*) AS n FROM enquiries
      WHERE phone = ? AND created_at > NOW() - INTERVAL 1 DAY`,
    [phone],
  )
  if (Number(byPhone?.n ?? 0) >= MAX_PER_PHONE_PER_DAY) return true

  if (!ip) return false

  const byIp = await queryOne<{ n: number }>(
    `SELECT COUNT(*) AS n FROM enquiries
      WHERE ip = ? AND created_at > NOW() - INTERVAL 1 HOUR`,
    [ip],
  )
  return Number(byIp?.n ?? 0) >= MAX_PER_IP_PER_HOUR
}

publicRouter.post(
  '/enquiries',
  enquiryLimiter,
  asyncHandler(async (req, res) => {
    const input = publicEnquirySchema.parse(req.body)

    if (await isDuplicate(input.phone, input.ip)) {
      // 429 rather than an error: the enquiry did reach us, we are simply not
      // recording it again. The site shows a reassuring message.
      res.status(429).json({
        message: 'We already have your enquiry. A counsellor will call you shortly.',
      })
      return
    }

    await enquiriesRepo.create({
      ...input,
      // Every public submission starts at the beginning of the pipeline.
      status: 'new',
      notes: [],
      courseId: undefined,
      assigneeId: undefined,
      followUpDate: undefined,
    })

    // Deliberately not the created record: an enquiry is not the submitter's to
    // read back, and the id is of no use to them.
    res.status(201).json({ ok: true })
  }),
)

/* ------------------------------------------------------------------ */
/* Newsletter                                                           */
/* ------------------------------------------------------------------ */

/** Reachable by anyone, so it carries its own limit — see the note above. */
const newsletterLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many attempts. Try again shortly.' },
})

/**
 * Subscribing is idempotent, and says so in the same words either way.
 *
 * A distinct "you are already subscribed" would confirm to a stranger that an
 * address is on the list, which is not ours to disclose. The outcome is still
 * returned so the website can word its confirmation naturally; it is not a
 * membership check, because every outcome ends with the address subscribed.
 */
publicRouter.post(
  '/newsletter/subscribe',
  newsletterLimiter,
  asyncHandler(async (req, res) => {
    const input = subscribeSchema.parse(req.body)
    const outcome = await newsletterRepo.subscribe(input)

    res.status(outcome === 'subscribed' ? 201 : 200).json({
      status: outcome,
      message: "You're on the list. Look out for the next issue.",
    })
  }),
)
