/**
 * Public URLs for the three catalogue sections.
 *
 * Every detail page carries its location in the address:
 *
 *   /courses/python-programming-course-in-hoshiarpur
 *   /internship-training/45-days-training-in-hoshiarpur
 *   /after-12th/web-development-course-in-hoshiarpur
 *
 * The data still keys each entry by its bare slug — `python-programming`. The
 * two are deliberately separate. A slug is an identifier: it is what
 * `relatedCourses` arrays point at, what the mega menus resolve against, what
 * the After-12th and AI pages look entries up by, and what the CMS sends.
 * The URL is presentation, and it is the part that wanted the location in it.
 * Renaming the identifiers instead would have meant rewriting every
 * cross-reference in the project, and would have broken any CMS record still
 * publishing the old key.
 *
 * So the address is derived, in one place, and every link is built through it.
 *
 * This module imports nothing on purpose — the data imports it, so it must not
 * import the data back.
 */

export type SeoRoute = {
  /** The trailing text every URL in this section carries. */
  suffix: string;
  /** The public path for a slug: `/courses/python-programming-course-in-...`. */
  path: (slug: string) => string;
  /** The URL segment alone, for `generateStaticParams`. */
  param: (slug: string) => string;
  /**
   * The slug behind a URL segment, or `null` when the segment is not in the
   * public form — which means an address from before this format, and the
   * route answers those with a 301 rather than a 404.
   */
  slugFromParam: (param: string) => string | null;
};

function seoRoute(base: string, suffix: string): SeoRoute {
  return {
    suffix,
    path: (slug) => `${base}/${slug}${suffix}`,
    param: (slug) => `${slug}${suffix}`,
    slugFromParam: (param) => {
      if (!param.endsWith(suffix)) return null;
      const slug = param.slice(0, -suffix.length);
      /* the suffix on its own is not an entry */
      return slug.length > 0 ? slug : null;
    },
  };
}

export const COURSE_URL = seoRoute("/courses", "-course-in-hoshiarpur");

/*
 * Training programmes are already named "45 Days Training", so the course
 * sections' "-course-" would read as "45-days-training-course-in-hoshiarpur".
 * They take the location only.
 */
export const TRAINING_URL = seoRoute("/internship-training", "-in-hoshiarpur");

export const AFTER12_URL = seoRoute("/after-12th", "-course-in-hoshiarpur");

/** Shorthands, since these are the ones written most often. */
export const coursePath = COURSE_URL.path;
export const trainingPath = TRAINING_URL.path;
export const after12Path = AFTER12_URL.path;
