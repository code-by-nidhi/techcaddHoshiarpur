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
