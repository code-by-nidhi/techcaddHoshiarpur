import {
  AFTER12_CATEGORY_META,
  after12ByCategory,
  type After12Category,
} from "@/lib/after12/programmes";
import type { ColumnsMenu } from "./internshipMenu";
import { after12Path } from "@/lib/seo/routes";

/**
 * After 12th mega menu, derived from the programme data: labels, badges and
 * hrefs all come from `AFTER12_PROGRAMMES`, so adding a programme there gives
 * it a menu entry and a working route at once.
 */

const ORDER: After12Category[] = [
  "6-month-certificates",
  "1-year-certificates",
  "civil-mechanical",
];

export const AFTER12_MENU: ColumnsMenu = {
  columns: ORDER.map((category) => {
    const meta = AFTER12_CATEGORY_META[category];
    return {
      id: meta.id,
      heading: meta.heading,
      description: meta.description,
      links: after12ByCategory(category).map((p) => ({
        label: p.title,
        href: after12Path(p.slug),
        trending: p.badge === "Trending",
      })),
    };
  }),

  strip: {
    watermark: "AFTER 12TH CAREER PROGRAMS",
    quote: "Choose the right skill today and build the career you want tomorrow.",
    cta: "Browse After 12th Courses",
    href: "/after-12th",
  },
};
