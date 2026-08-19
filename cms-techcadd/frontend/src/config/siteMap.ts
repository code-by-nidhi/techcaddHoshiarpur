/**
 * Where each kind of content ends up on the public website.
 *
 * An editor filling in a form cannot tell, from the form alone, whether they
 * are writing something that appears on the homepage, on a page of its own, or
 * nowhere at all until a developer wires it up. That gap is where "I saved it
 * and nothing happened" comes from, so it is answered here in one place and
 * shown on every form.
 *
 * Keeping it as data rather than prose in each form means a module that is not
 * yet connected has to say so explicitly, instead of quietly omitting the note.
 */

/** The public site. Set VITE_SITE_URL when it is not on the usual dev port. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'http://localhost:3000'
).replace(/\/$/, '')

export interface Placement {
  /** Where this content shows up, in a sentence an editor can act on. */
  where: string
  /**
   * The public URL of one record, when it has a page of its own.
   *
   * Undefined means the content appears inside other pages rather than at its
   * own address — a review has no URL, a blog post does.
   */
  url?: (record: Record<string, unknown>) => string | undefined
  /**
   * Set when nothing on the website reads this yet.
   *
   * The honest alternative to leaving the module out of this map, which would
   * read as "no note needed" rather than "this goes nowhere".
   */
  notLive?: string
}

const slugUrl = (prefix: string) => (record: Record<string, unknown>) => {
  const slug = record.slug
  return typeof slug === 'string' && slug ? `${SITE_URL}${prefix}${slug}` : undefined
}

export const SITE_MAP: Record<string, Placement> = {
  blogs: {
    where:
      'The blog index at /blog and a page of its own, plus the Knowledge Hub band on the homepage. Marking it the lead story gives it the large panel at the top of /blog; marking it trending puts it in the sidebar and the picks row.',
    url: slugUrl('/blog/'),
  },
  courses: {
    where: '',
    notLive:
      'The website builds its course pages from its own catalogue, so nothing here reaches them yet. These records are for internal reference until that catalogue moves across.',
  },
  categories: {
    where:
      'The filter row on the blog index, and the heading a post is filed under. Only categories with a published post in them are shown.',
  },
  faqs: {
    where:
      'The Help Center on the homepage, grouped under the category you enter and searchable there. Questions marked for the contact page also appear in its shorter FAQ list.',
  },
  reviews: {
    where:
      'The student success wall on the homepage. Featured reviews are shown first, and the outcome line is what each card leads with.',
  },
  settings: {
    where:
      'Site-wide. Contact details and the headline figures are used wherever the site prints them.',
  },
  enquiries: {
    where:
      'Received from the website — the Book Demo modal and the course enquiry form. Nothing here is published back to it.',
  },
  newsletter: {
    where:
      'Collected by the subscribe form at the foot of the blog. Nothing here is published back to the site.',
  },
  media: {
    where: 'Used by whatever content references it — an article cover, an author photo.',
  },
}
