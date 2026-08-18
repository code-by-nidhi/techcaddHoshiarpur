import { COURSES as CORE_COURSES } from "./catalogue";
import { DATA_AI_COURSES } from "./dataAi";
import { ENGINEERING_COURSES } from "./engineering";
import { MORE_COURSES } from "./more";
import type { Course } from "./types";

/**
 * The whole catalogue, assembled from its families. A new family is one import
 * and one spread — every route, sitemap entry and related-course link follows
 * automatically.
 */
export const COURSES: Course[] = [
  ...CORE_COURSES,
  ...DATA_AI_COURSES,
  ...ENGINEERING_COURSES,
  ...MORE_COURSES,
];

/** Duplicate slugs would make one course unreachable, so fail loudly in dev. */
if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const c of COURSES) {
    if (seen.has(c.slug)) {
      throw new Error(`Duplicate course slug: ${c.slug}`);
    }
    seen.add(c.slug);
  }
}
export type * from "./types";

/** Every slug in the catalogue — feeds generateStaticParams and the sitemap. */
export const courseSlugs = () => COURSES.map((c) => c.slug);

/** The course for a slug, or undefined so the route can call notFound(). */
export const getCourse = (slug: string): Course | undefined =>
  COURSES.find((c) => c.slug === slug);

/**
 * What a related-course card actually renders. Returning whole Course objects
 * serialised every module, FAQ and project of four other courses into each
 * page's payload for no reason.
 */
export type CourseSummary = Pick<
  Course,
  "slug" | "title" | "shortTitle" | "shortDescription" | "category" | "duration" | "heroImage"
>;

const toSummary = (c: Course): CourseSummary => ({
  slug: c.slug,
  title: c.title,
  shortTitle: c.shortTitle,
  shortDescription: c.shortDescription,
  category: c.category,
  duration: c.duration,
  heroImage: c.heroImage,
});

/**
 * Related courses for a slug. The current course is always excluded, and the
 * list is topped up from the rest of the catalogue if a course declares fewer
 * than `limit` relations — so a new course never renders an empty rail.
 */
export function getRelated(slug: string, limit = 4): CourseSummary[] {
  const course = getCourse(slug);
  if (!course) return [];

  const picked = course.relatedCourses
    .filter((s) => s !== slug)
    .map(getCourse)
    .filter((c): c is Course => Boolean(c));

  if (picked.length >= limit) return picked.slice(0, limit).map(toSummary);

  const filler = COURSES.filter(
    (c) => c.slug !== slug && !picked.some((p) => p.slug === c.slug),
  );
  return [...picked, ...filler].slice(0, limit).map(toSummary);
}

/** Courses grouped by category, for the catalogue index page. */
export function coursesByCategory(): { category: string; courses: Course[] }[] {
  const map = new Map<string, Course[]>();
  for (const c of COURSES) {
    const list = map.get(c.category) ?? [];
    list.push(c);
    map.set(c.category, list);
  }
  return [...map.entries()].map(([category, courses]) => ({ category, courses }));
}
