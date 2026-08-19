/**
 * Course catalogue types.
 *
 * Everything a course page renders is described here, so adding a course is a
 * data change and never a UI change. Optional fields degrade gracefully: a
 * section whose data is missing simply does not render.
 */

export type CourseMode = "Online" | "Offline" | "Hybrid" | "Online / Offline";

export type Module = {
  title: string;
  summary: string;
  topics: string[];
  /** e.g. "3 weeks" */
  duration?: string;
  lessons?: number;
  /** optional supporting link, shown as "Resource" on the module */
  resource?: { label: string; href: string };
};

export type Project = {
  name: string;
  summary: string;
  tech: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  image?: string;
};

export type Review = {
  name: string;
  /** shown when there is no avatar image */
  initials: string;
  rating: number;
  quote: string;
  course: string;
  role?: string;
  avatar?: string;
};

export type Faq = { q: string; a: string };

export type Instructor = {
  heading: string;
  intro: string;
  points: { title: string; copy: string }[];
};

export type Course = {
  slug: string;
  title: string;
  /** used in <title>, breadcrumbs and related-course cards when set */
  shortTitle?: string;
  shortDescription: string;
  /** longer paragraph for the hero and meta description */
  overview: string;
  category: string;
  /**
   * Optional marketing badge for the catalogue grid. Only set this where it is
   * actually true — an empty badge is better than one every card carries.
   */
  badge?: "Most Popular" | "Trending" | "New" | "High Demand";
  level: string;
  duration: string;
  mode: CourseMode;
  certification: boolean;
  heroImage: string;
  /** leave `url` empty until a real introduction video exists */
  video: { url: string; thumbnail: string; caption: string };
  rating?: { score: number; count: number };
  audience: { label: string; copy: string }[];
  whyChooseUs: { title: string; copy: string }[];
  modules: Module[];
  /**
   * Stage labels for the roadmap's progress tracker. Optional: without it the
   * tracker is derived from `level` and the module count, so a course that has
   * not defined a journey still renders a correct one.
   */
  journey?: string[];
  learningOutcomes: string[];
  tools: string[];
  careerOutcomes: {
    roles: string[];
    /** roles with a line of copy each; falls back to `roles` when absent */
    roleDetails?: { role: string; copy: string }[];
    opportunities: string[];
    nextSteps: string[];
    industries: string[];
  };
  projects: Project[];
  instructor: Instructor;
  reviews: Review[];
  faqs: Faq[];
  /** slugs; the current course is filtered out at render time */
  relatedCourses: string[];
  keywords: string[];
};
