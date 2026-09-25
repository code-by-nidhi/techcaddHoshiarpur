import { COURSE_MENU, MENU_FEATURED } from "@/lib/coursesMenu";
import type { ColumnsMenu } from "@/lib/internshipMenu";

/**
 * The Courses mega menu, reshaped onto the same `ColumnsMenu` structure the
 * Training and After 12th panels use — so all three share one component and
 * one design language rather than drifting apart.
 *
 * Course names, order, categories and hrefs come straight from `COURSE_MENU`.
 */

/** One line under each column heading, matching the Training panel's rhythm. */
const COLUMN_BLURB: Record<string, string> = {
  basics: "Office, typing, GST and billing skills",
  marketing: "Promote a business online",
  engineering: "Mechanical and civil design",
  programming: "Python, AI and websites",
};

export const COURSES_COLUMNS_MENU: ColumnsMenu = {
  numbered: true,
  columns: COURSE_MENU.map((category) => ({
    id: category.id,
    heading: category.heading,
    description: COLUMN_BLURB[category.id] ?? "",
    links: category.courses.map((c) => ({
      label: c.label,
      href: c.href,
      trending: c.trending,
    })),
  })),

  strip: {
    watermark: "COURSES",
    quote: "Learn industry-ready skills with practical training and live projects.",
    cta: "Explore All Courses",
    href: MENU_FEATURED.cta.href,
  },
};
