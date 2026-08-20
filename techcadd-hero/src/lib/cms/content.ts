import { buildQuery, cmsFetch } from "./client";

/**
 * The site-wide content the CMS owns: student reviews and help-centre
 * questions.
 *
 * Both were TypeScript constants until the CMS took them over. The types below
 * describe the HTTP contract rather than the CMS's tables, which is what lets
 * the CMS change how it stores a review without this site knowing.
 */

/** The CMS wraps every listing in a count, so a caller can tell empty from failed. */
interface ListResponse<T> {
  items: T[];
  total: number;
}

export interface CmsReview {
  id: string;
  authorName: string;
  rating: number;
  quote: string;
  reviewedOn?: string;
  courseName?: string;
  /** The outcome the card leads with — "Placed as MERN Developer". */
  badge?: string;
  featured: boolean;
  source: "google" | "website" | "walk-in";
}

export interface CmsFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  /** Marked for the shorter list on the contact page. */
  featured: boolean;
}

/**
 * Published reviews, in the order an editor arranged them.
 *
 * Featured ones are pulled to the front here rather than by the API: the API
 * returns them in editorial order, and which section leads with which is a
 * decision about this page, not about the data.
 */
export async function getReviews(limit = 24): Promise<CmsReview[]> {
  const { items } = await cmsFetch<ListResponse<CmsReview>>(
    `/reviews${buildQuery({ limit })}`,
    ["reviews"],
  );

  return [...items].sort((a, b) => Number(b.featured) - Number(a.featured));
}

/** Published questions, ordered by the CMS within each category. */
export async function getFaqs(options: { featured?: boolean; limit?: number } = {}) {
  const { items } = await cmsFetch<ListResponse<CmsFaq>>(
    `/faqs${buildQuery({ featured: options.featured, limit: options.limit ?? 100 })}`,
    ["faqs"],
  );

  return items;
}

/**
 * The category tabs on the help centre.
 *
 * Derived from the questions themselves rather than from a fixed list: an
 * editor filing a question under "Hostel" should get a Hostel tab, without
 * anyone deploying. Order follows first appearance, which is the CMS's own
 * ordering, so the tabs match the list beneath them.
 */
export function faqCategories(faqs: CmsFaq[]): string[] {
  return [...new Set(faqs.map((faq) => faq.category))];
}

/* ------------------------------------------------------------------ */
/* Site-wide settings                                                   */
/* ------------------------------------------------------------------ */

/**
 * The facts the CMS owns about the institute itself.
 *
 * Every field is optional because a settings row can legitimately be blank —
 * the site is expected to fall back to its own copy rather than print an empty
 * phone number. `SiteProvider` is what applies those fallbacks, so no component
 * has to decide what to do with a missing value.
 */
export interface CmsSite {
  siteName: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  /** Headline figures — "18k+" / "Students Trained". Editorial, so the count varies. */
  stats: { value: string; label: string }[];
  /**
   * Network → handle or URL, as the editor typed it.
   *
   * Deliberately loose: the CMS lets an admin paste either, and normalising a
   * handle into a URL is this site's job (see `socialUrl`), not the API's.
   */
  social: Partial<
    Record<"linkedin" | "x" | "github" | "website" | "facebook" | "instagram" | "youtube", string>
  >;
}

/**
 * Contact details, social links and headline figures.
 *
 * A hand-picked subset of the settings row — the CMS deliberately does not
 * publish the rest of it here, because this endpoint has no session behind it.
 */
export function getSite(): Promise<CmsSite> {
  return cmsFetch<CmsSite>("/site", ["site"]);
}

/** Where each network lives, for turning a bare handle into a link. */
const SOCIAL_BASE: Record<string, string> = {
  linkedin: "https://www.linkedin.com/company/",
  x: "https://x.com/",
  github: "https://github.com/",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/@",
};

/**
 * A usable href for a social value, or undefined when there is nothing to link.
 *
 * An admin types "techcadd" in the LinkedIn box as readily as the full URL, and
 * both have to work — a raw handle in an `href` resolves against this site and
 * 404s. Anything already absolute is left exactly as entered.
 */
export function socialUrl(network: string, value: string | undefined): string | undefined {
  const handle = value?.trim();
  if (!handle) return undefined;
  if (/^https?:\/\//i.test(handle)) return handle;

  const base = network === "website" ? undefined : SOCIAL_BASE[network];
  // A bare "website" value is a domain, not a handle on someone else's site.
  if (!base) return network === "website" ? `https://${handle.replace(/^\/+/, "")}` : undefined;

  return `${base}${handle.replace(/^[@/]+/, "")}`;
}
