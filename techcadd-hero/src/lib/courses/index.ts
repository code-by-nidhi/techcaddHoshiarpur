import { COURSES } from "./catalogue";
import type { Course } from "./types";

export { COURSES };
export type * from "./types";

/** Every slug in the catalogue — feeds generateStaticParams and the sitemap. */
export const courseSlugs = () => COURSES.map((c) => c.slug);

/** The course for a slug, or undefined so the route can call notFound(). */
export const getCourse = (slug: string): Course | undefined =>
  COURSES.find((c) => c.slug === slug);

/**
 * Related courses for a slug. The current course is always excluded, and the
 * list is topped up from the rest of the catalogue if a course declares fewer
 * than `limit` relations — so a new course never renders an empty rail.
 */
export function getRelated(slug: string, limit = 4): Course[] {
  const course = getCourse(slug);
  if (!course) return [];

  const picked = course.relatedCourses
    .filter((s) => s !== slug)
    .map(getCourse)
    .filter((c): c is Course => Boolean(c));

  if (picked.length >= limit) return picked.slice(0, limit);

  const filler = COURSES.filter(
    (c) => c.slug !== slug && !picked.some((p) => p.slug === c.slug),
  );
  return [...picked, ...filler].slice(0, limit);
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
