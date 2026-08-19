import { COURSE_MENU, MENU_FEATURED } from "@/lib/coursesMenu";
import { getCourse } from "@/lib/courses";
import type { ColumnsMenu } from "@/lib/internshipMenu";

/**
 * The Courses mega menu, reshaped onto the same `ColumnsMenu` structure the
 * Training and After 12th panels use — so all three share one component and
 * one design language rather than drifting apart.
 *
 * Course names, order, categories and hrefs come straight from `COURSE_MENU`.
 * The preview image and description are looked up in the catalogue by slug, so
 * nothing here duplicates course copy.
 */

/** One line under each column heading, matching the Training panel's rhythm. */
const COLUMN_BLURB: Record<string, string> = {
  programming: "Languages, frameworks and full stack tracks",
  marketing: "Campaigns, content and the platforms behind them",
  ai: "Models, data and the tooling around them",
  engineering: "Design and drafting for engineering streams",
};

const slugOf = (href: string) => href.replace("/courses/", "");

export const COURSES_COLUMNS_MENU: ColumnsMenu = {
  columns: COURSE_MENU.map((category) => ({
    id: category.id,
    heading: category.heading,
    description: COLUMN_BLURB[category.id] ?? "",
    links: category.courses.map((c) => {
      const course = getCourse(slugOf(c.href));
      return {
        label: c.label,
        href: c.href,
        trending: c.trending,
        /* falls back to the menu's own artwork when a slug has no catalogue
           entry, so a preview is always available */
        image: course?.heroImage ?? c.image,
        description: course?.shortDescription,
      };
    }),
  })),

  strip: {
    watermark: "COURSES",
    quote: "Learn industry-ready skills with practical training and live projects.",
    cta: "Explore All Courses",
    href: MENU_FEATURED.cta.href,
  },
};
