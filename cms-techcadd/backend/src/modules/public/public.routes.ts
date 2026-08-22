import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

import { assetUrl, withAssetUrls } from '../../http/assetUrl.js'
import { asyncHandler, notFound } from '../../http/errors.js'
import type { ListParams } from '../../http/listParams.js'
import { queryOne, type Row } from '../../db/pool.js'
import * as blogsRepo from '../blogs/blogs.repo.js'
import * as categoriesRepo from '../categories/categories.repo.js'
import * as enquiriesRepo from '../enquiries/enquiries.repo.js'
import * as faqsRepo from '../faqs/faqs.repo.js'
import * as newsletterRepo from '../newsletter/newsletter.repo.js'
import { subscribeSchema } from '../newsletter/newsletter.schema.js'
import * as reviewsRepo from '../reviews/reviews.repo.js'
import { publicBlogRouter } from './blog.routes.js'
import { assertHuman } from './recaptcha.js'

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
  '/blogs',
  asyncHandler(async (req, res) => {
    const result = await blogsRepo.list(listParams(limitFrom(req.query.limit, 50)))
    res.json(withAssetUrls(req, { items: result.items, total: result.total }))
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
    res.json(withAssetUrls(req, await blogsRepo.get(row.id as string)))
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
 * Still a hand-picked list rather than the settings row itself. What is left
 * out is the point: `recaptcha_secret` lives in the same JSON column as the
 * analytics id below, and this endpoint has no session behind it. A field is
 * added here only once it is established that a visitor may read it — which is
 * true of everything a page prints, a logo, and robots.txt by definition.
 */
publicRouter.get(
  '/site',
  asyncHandler(async (req, res) => {
    const row = await queryOne<Row>(
      `SELECT s.site_name, s.tagline, s.contact_email, s.contact_phone, s.address,
              s.stats, s.social, s.robots_txt, s.integrations,
              l.url AS logo_url, l.alt AS logo_alt, l.width AS logo_width, l.height AS logo_height,
              f.url AS favicon_url, f.mime_type AS favicon_mime
         FROM settings s
         LEFT JOIN media l ON l.id = s.logo_id
         LEFT JOIN media f ON f.id = s.favicon_id
        WHERE s.id = 1
        LIMIT 1`,
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

    /**
     * Only the two integration fields a browser is allowed to see.
     *
     * Destructured by name rather than spread: the group is one JSON column, so
     * a spread would publish the reCAPTCHA secret stored beside them, and would
     * publish anything added to the group later without anyone noticing.
     */
    const { analyticsId, whatsappNumber, recaptchaSiteKey } = json<Record<string, string>>(
      row?.integrations,
      {},
    )

    res.json({
      siteName: row?.site_name ?? '',
      tagline: row?.tagline ?? undefined,
      contactEmail: row?.contact_email ?? undefined,
      contactPhone: row?.contact_phone ?? undefined,
      address: row?.address ?? undefined,
      stats: json<{ value: string; label: string }[]>(row?.stats, []),
      social: json<Record<string, string>>(row?.social, {}),
      // Dimensions travel with the logo so the site can reserve its space and
      // not shift the header while it loads.
      logo: row?.logo_url
        ? {
            url: assetUrl(req, row.logo_url),
            alt: (row.logo_alt as string) || '',
            width: row.logo_width ? Number(row.logo_width) : undefined,
            height: row.logo_height ? Number(row.logo_height) : undefined,
          }
        : undefined,
      favicon: row?.favicon_url
        ? { url: assetUrl(req, row.favicon_url), mimeType: (row.favicon_mime as string) || undefined }
        : undefined,
      analyticsId: analyticsId || undefined,
      whatsappNumber: whatsappNumber || undefined,
      // The public half of the pair. The secret beside it is never published.
      recaptchaSiteKey: recaptchaSiteKey || undefined,
      robotsTxt: (row?.robots_txt as string) || undefined,
    })
  }),
)

/* ------------------------------------------------------------------ */
/* Enquiries                                                            */
/* ------------------------------------------------------------------ */

/**
 * Anyone on the internet can reach this, so it carries its own limit.
 *
 * The website in front of it already rate-limits, but this endpoint must stand
 * on its own — it is reachable directly.
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
  message: z.string().max(2000).optional(),
  source: z.enum(['website', 'walk-in', 'phone', 'referral', 'social']).default('website'),
  // Recorded by the site: which form, which page, and who submitted it.
  formType: z.string().max(32).optional(),
  sourceUrl: z.string().max(500).optional(),
  ip: z.string().max(45).optional(),
  userAgent: z.string().max(255).optional(),
  /** reCAPTCHA v3. Only required once a key pair is configured in Settings. */
  captchaToken: z.string().max(4000).optional(),
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

    // Before anything is written, and before the duplicate lookup: a rejected
    // submission should cost one Google round trip, not a database query.
    await assertHuman(input.captchaToken, input.ip ?? req.ip)

    if (await isDuplicate(input.phone, input.ip)) {
      // 429 rather than an error: the enquiry did reach us, we are simply not
      // recording it again. The site shows a reassuring message.
      res.status(429).json({
        message: 'We already have your enquiry. A counsellor will call you shortly.',
      })
      return
    }

    const { captchaToken: _captchaToken, ...enquiry } = input

    await enquiriesRepo.create({
      ...enquiry,
      // Every public submission starts at the beginning of the pipeline.
      status: 'new',
      notes: [],
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
    await assertHuman(req.body?.captchaToken, req.ip)

    const outcome = await newsletterRepo.subscribe(input)

    res.status(outcome === 'subscribed' ? 201 : 200).json({
      status: outcome,
      message: "You're on the list. Look out for the next issue.",
    })
  }),
)
