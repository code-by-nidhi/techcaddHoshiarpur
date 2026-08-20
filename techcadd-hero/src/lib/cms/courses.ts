import {
  COMMON_AUDIENCE,
  COMMON_FAQS,
  COMMON_WHY,
  DEFAULT_HERO,
  DEFAULT_INSTRUCTOR,
} from "@/lib/courses/shared";
import type { Course, CourseMode, Faq, Module } from "@/lib/courses/types";

import { buildQuery, cmsFetch } from "./client";

/**
 * Courses an administrator has published in the CMS.
 *
 * The site's own catalogue in `@/lib/courses` stays the baseline: it carries
 * modules, projects, an instructor block and reviews that the CMS has no
 * columns for, and rewriting forty course pages against a thinner model would
 * lose all of it. So this is additive — a CMS course is merged in on top, and
 * fills in from the same template defaults the catalogue's own factory uses.
 *
 * A CMS record with the slug of an existing course wins. That is what makes
 * this useful rather than decorative: an administrator can correct a duration,
 * a fee or a description on a live page without a deploy.
 */

/** The API's course shape. Only the fields this site renders are described. */
interface CmsCourse {
  id: string;
  title: string;
  slug: string;
  segment: string;
  categoryName?: string;
  shortDescription: string;
  description: string;
  tagline?: string;
  careers: string[];
  tools: string[];
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  mode: "online" | "offline" | "hybrid";
  thumbnail?: { id: string; url?: string; alt?: string };
  syllabus: { id?: string; title: string; topics: string[]; hours?: number }[];
  highlights: string[];
  eligibility?: string;
  certification?: string;
  featured: boolean;
  seo: { metaTitle?: string; metaDescription?: string; keywords: string[] };
}

interface ListResponse {
  items: CmsCourse[];
  total: number;
}

const LEVELS: Record<CmsCourse["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const MODES: Record<CmsCourse["mode"], CourseMode> = {
  online: "Online",
  offline: "Offline",
  hybrid: "Online / Offline",
};

/**
 * The CMS's description field is rich text; the hero prints it as a plain
 * paragraph and the meta description is cut from it. Tags are stripped rather
 * than rendered, because a `<p>` inside a `<meta content>` is not markup, it is
 * noise — and this is never re-inserted as HTML.
 */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** A syllabus entry, in the shape the modules accordion renders. */
function toModule(entry: CmsCourse["syllabus"][number]): Module {
  return {
    title: entry.title,
    // The CMS has no per-module summary. The topic list is the honest summary
    // of what a module covers, rather than a sentence nobody wrote.
    summary: entry.topics.length ? entry.topics.join(" · ") : "Covered in the session.",
    topics: entry.topics,
    duration: entry.hours ? `${entry.hours} hours` : undefined,
  };
}

/**
 * Turns a CMS record into the shape every course section already renders.
 *
 * Anything the CMS cannot express falls back to the same defaults the site's
 * own catalogue factory uses, so a CMS course renders a complete page rather
 * than a page with four empty sections. Sections with genuinely nothing behind
 * them — projects, student reviews — are left empty, and each of those already
 * renders nothing at all rather than an empty frame.
 */
function toCourse(course: CmsCourse): Course {
  const overview =
    toPlainText(course.description) || course.tagline || course.shortDescription;

  const faqs: Faq[] = [
    ...(course.eligibility
      ? [{ q: "Who is eligible for this course?", a: course.eligibility }]
      : []),
    ...(course.certification
      ? [{ q: "Is certification provided?", a: course.certification }]
      : []),
    // The shared set already answers certification; drop the duplicate when the
    // CMS has given a course-specific answer above.
    ...COMMON_FAQS.filter(
      (faq) => !(course.certification && faq.q === "Is certification provided?"),
    ),
  ];

  return {
    slug: course.slug,
    title: course.title,
    shortDescription: course.shortDescription,
    overview,
    category: course.categoryName ?? "Courses",
    badge: course.featured ? "Most Popular" : undefined,
    level: LEVELS[course.level] ?? "Beginner",
    duration: course.duration,
    mode: MODES[course.mode] ?? "Online / Offline",
    certification: Boolean(course.certification),
    heroImage: course.thumbnail?.url || DEFAULT_HERO,
    video: {
      // No video field in the CMS; the section renders its "coming soon" state.
      url: "",
      thumbnail: "/images/classroom.webp",
      caption: `Inside the ${course.title} track.`,
    },
    audience: [
      COMMON_AUDIENCE.beginners,
      COMMON_AUDIENCE.students,
      COMMON_AUDIENCE.freshers,
      COMMON_AUDIENCE.professionals,
      COMMON_AUDIENCE.switchers,
    ],
    whyChooseUs: COMMON_WHY,
    modules: course.syllabus.map(toModule),
    learningOutcomes: course.highlights,
    tools: course.tools,
    careerOutcomes: {
      roles: course.careers,
      opportunities: [
        "Product and agency teams",
        "Freelance projects",
        "Campus placements",
        "In-house roles",
      ],
      nextSteps: [],
      industries: [],
    },
    // Nothing in the CMS describes a project or holds a student review, and
    // both sections render nothing when empty. Inventing either would put
    // fabricated work and fabricated testimonials on a live page.
    projects: [],
    instructor: DEFAULT_INSTRUCTOR,
    reviews: [],
    faqs,
    relatedCourses: [],
    keywords: course.seo.keywords,
  };
}

/**
 * Published CMS courses for one part of the site, already mapped.
 *
 * `segment` mirrors the CMS field of the same name: a course filed under
 * "internship-training" belongs on those pages, not in the main catalogue.
 */
export async function getCmsCourses(segment = "courses"): Promise<Course[]> {
  const { items } = await cmsFetch<ListResponse>(
    `/courses${buildQuery({ limit: 100 })}`,
    ["courses"],
  );

  return items.filter((item) => (item.segment || "courses") === segment).map(toCourse);
}
