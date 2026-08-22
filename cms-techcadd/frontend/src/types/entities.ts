import type { ContentStatus } from './index'

/* ------------------------------------------------------------------ */
/* Shared                                                               */
/* ------------------------------------------------------------------ */

export interface BaseEntity {
  id: string
  /** ISO timestamp. */
  createdAt: string
  updatedAt: string
}

/**
 * A reference to an item in the media library.
 *
 * Image slots are typed `MediaRef | null` rather than just optional: absent
 * means "leave it alone" on a patch, and null means "remove it". `undefined`
 * cannot say the second, because JSON.stringify drops the key entirely.
 */
export interface MediaRef {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

/** Embedded in every module that surfaces on the public site. */
export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: MediaRef | null
  canonicalUrl?: string
}

export type EnquirySource = 'website' | 'walk-in' | 'phone' | 'referral' | 'social'
/** The CMS has a single role: an admin can do everything. */
export type UserRole = 'admin'

/* ------------------------------------------------------------------ */
/* Categories                                                           */
/* ------------------------------------------------------------------ */

export interface Category extends BaseEntity {
  name: string
  slug: string
  /** Null at the root. Nesting is capped at two levels. */
  parentId?: string
  icon?: string
  accentColor?: string
  description?: string
  order: number
  status: ContentStatus
}

/* ------------------------------------------------------------------ */
/* Blogs                                                                */
/* ------------------------------------------------------------------ */

export interface Blog extends BaseEntity {
  title: string
  slug: string
  authorId?: string
  categoryId?: string
  tags: string[]
  coverImage?: MediaRef | null
  excerpt: string
  body: string
  publishDate?: string
  seo: SeoFields
  status: ContentStatus
  /** The one story the blog index leads with. At most one post holds it. */
  featured: boolean
  /** Feeds the "Trending" rail and the editor's picks row. */
  trending: boolean
  /** Derived from the body on save — read-only here. */
  readingTime: number
  /** Counted by the website when an article is opened. Read-only here. */
  views: number
}

/* ------------------------------------------------------------------ */
/* Faculty                                                              */
/* ------------------------------------------------------------------ */

export interface SocialLinks {
  linkedin?: string
  x?: string
  github?: string
  website?: string
}

/* ------------------------------------------------------------------ */
/* Enquiries                                                            */
/* ------------------------------------------------------------------ */

/** The counselling team's pipeline, in the order a lead moves through it. */
export type EnquiryStatus = 'new' | 'contacted' | 'follow-up' | 'converted' | 'closed'

export interface EnquiryNote {
  id: string
  author: string
  body: string
  createdAt: string
}

export interface EnquiryRecord extends BaseEntity {
  studentName: string
  phone: string
  email?: string
  courseName: string
  source: EnquirySource
  message?: string
  status: EnquiryStatus
  assigneeId?: string
  followUpDate?: string
  notes: EnquiryNote[]
}

/* ------------------------------------------------------------------ */
/* Media                                                                */
/* ------------------------------------------------------------------ */

export interface MediaItem extends BaseEntity {
  filename: string
  url: string
  mimeType: string
  /** Bytes. */
  size: number
  width?: number
  height?: number
  alt: string
  folder?: string
}

/* ------------------------------------------------------------------ */
/* Users                                                                */
/* ------------------------------------------------------------------ */

/**
 * The public half of an account — the byline printed under the articles this
 * person writes, and on their author page. Separate from the credential the
 * account also is, and entirely optional.
 */
export interface AuthorProfile {
  /** The address of the author page: /blog/author/<slug>. */
  slug?: string
  /** "Placement Lead", "AI Track Mentor" — printed beneath the name. */
  title?: string
  bio?: string
  social?: Record<string, string>
}

export interface User extends BaseEntity {
  name: string
  /** What this person signs in with. Lowercase; the email also still works. */
  username?: string
  email: string
  role: UserRole
  avatar?: MediaRef | null
  active: boolean
  author?: AuthorProfile
  /**
   * Mock-only credential digest. Real authentication hashes and verifies on
   * the server — never trust a password check that runs in the browser.
   */
  passwordHash?: string
}

/* ------------------------------------------------------------------ */
/* Site settings — a singleton, not a collection                        */
/* ------------------------------------------------------------------ */

export interface Integrations {
  whatsappNumber?: string
  analyticsId?: string
  /** Public by design — printed into the page for Google's script to read. */
  recaptchaSiteKey?: string
  /** Masked in the UI; revealed on demand. Never leaves the server. */
  recaptchaSecret?: string
}

/**
 * One headline figure, e.g. "15k+" / "Students Trained".
 *
 * The value is a string because the site prints "15k+" and "98%" — the suffix
 * carries as much meaning as the digits, and a number field would lose it.
 */
export interface SiteStat {
  value: string
  label: string
}

export interface SiteSettings {
  siteName: string
  tagline?: string
  logo?: MediaRef | null
  favicon?: MediaRef | null
  contactEmail?: string
  contactPhone?: string
  address?: string
  /** The headline figures the homepage and about page print. */
  stats: SiteStat[]
  social: SocialLinks
  /** Edited from the SEO module. */
  robotsTxt: string
  integrations: Integrations
  /** The signed-in user, filled in from the session rather than stored. */
  profile: { name: string; email: string }
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                 */
/* ------------------------------------------------------------------ */

export interface Faq extends BaseEntity {
  question: string
  answer: string
  /** Free text: the site groups by whatever categories exist. */
  category: string
  order: number
  /** The homepage shows a short selection rather than every question. */
  featured: boolean
  status: ContentStatus
}

/* ------------------------------------------------------------------ */
/* Reviews                                                              */
/* ------------------------------------------------------------------ */

/** Only reviews genuinely left on Google may carry 'google' — the card shows the Google mark. */
export type ReviewSource = 'google' | 'website' | 'walk-in'

export interface Review extends BaseEntity {
  authorName: string
  /** Whole stars, 1–5. */
  rating: number
  quote: string
  /** Month precision, as displayed — "March 2026". */
  reviewedOn?: string
  courseName?: string
  /** The outcome the card leads with — "Placed as MERN Developer". */
  badge?: string
  /** Shown first on the student wall. */
  featured: boolean
  source: ReviewSource
  order: number
  status: ContentStatus
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                           */
/* ------------------------------------------------------------------ */

export type SubscriberStatus = 'active' | 'unsubscribed'

/**
 * Someone who asked to be mailed.
 *
 * There is no create form for these: a subscriber is a person who chose to
 * subscribe, and an address typed in by an administrator would be one nobody
 * consented to. The list is read, filtered and exported — not authored.
 */
export interface Subscriber extends BaseEntity {
  email: string
  status: SubscriberStatus
  /** Which form on the site it came from. Attribution, and nothing more. */
  source: string
  subscribedAt: string
}
