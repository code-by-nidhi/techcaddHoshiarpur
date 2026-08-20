import { COURSES as CORE_COURSES } from "./catalogue";
import { DATA_AI_COURSES } from "./dataAi";
import { ENGINEERING_COURSES } from "./engineering";
import { AI_TOPIC_COURSES } from "./aiTopics";
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
  ...AI_TOPIC_COURSES,
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

/* ------------------------------------------------------------------ */
/* CMS courses                                                          */
/* ------------------------------------------------------------------ */

/**
 * The catalogue with anything an administrator has published merged in.
 *
 * Additive on purpose. The static catalogue above is the baseline — it carries
 * projects, an instructor block and reviews the CMS has no columns for — and a
 * CMS record with a matching slug overrides it, which is what lets someone fix
 * a fee or a duration on a live page without a deploy. A slug the catalogue has
 * never heard of is a new course and simply appears.
 *
 * Every route that renders a course page reads through here. The synchronous
 * exports above are still used by the mega menus and the after-12th and
 * training pages, which describe fixed navigation rather than the catalogue,
 * and must resolve at build time without a network call.
 */
export async function getAllCourses(): Promise<Course[]> {
  const { getCmsCourses } = await import("@/lib/cms/courses");
  const { safely } = await import("@/lib/cms/client");

  // A CMS that is down costs the site its newest courses, never its catalogue.
  const published = await safely(getCmsCourses("courses"), [] as Course[]);
  if (published.length === 0) return COURSES;

  const overrides = new Map(published.map((course) => [course.slug, course]));

  return [
    ...COURSES.map((course) => overrides.get(course.slug) ?? course),
    ...published.filter((course) => !COURSES.some((c) => c.slug === course.slug)),
  ];
}

/** Every slug the site can render a course page for. */
export async function allCourseSlugs(): Promise<string[]> {
  return (await getAllCourses()).map((course) => course.slug);
}

/** One course, or undefined so the route can call `notFound()`. */
export async function findCourse(slug: string): Promise<Course | undefined> {
  return (await getAllCourses()).find((course) => course.slug === slug);
}

/**
 * Related courses, over the merged catalogue.
 *
 * A CMS course declares no relations — there is no field for it — so it is
 * always topped up from the rest of the catalogue, which is what the static
 * version does for a course that declares too few.
 */
export async function findRelated(slug: string, limit = 4): Promise<CourseSummary[]> {
  const all = await getAllCourses();
  const course = all.find((c) => c.slug === slug);
  if (!course) return [];

  const bySlug = new Map(all.map((c) => [c.slug, c]));

  const picked = course.relatedCourses
    .filter((s) => s !== slug)
    .map((s) => bySlug.get(s))
    .filter((c): c is Course => Boolean(c));

  const filler = all.filter(
    (c) => c.slug !== slug && !picked.some((p) => p.slug === c.slug),
  );

  return [...picked, ...filler].slice(0, limit).map(toSummary);
}

/** Merged courses grouped by category, for the catalogue index. */
export async function allCoursesByCategory(): Promise<{ category: string; courses: Course[] }[]> {
  const map = new Map<string, Course[]>();
  for (const course of await getAllCourses()) {
    const list = map.get(course.category) ?? [];
    list.push(course);
    map.set(course.category, list);
  }
  return [...map.entries()].map(([category, courses]) => ({ category, courses }));
}
