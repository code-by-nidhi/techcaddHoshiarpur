import { CATEGORY_META, programmesByCategory, type TrainingCategory } from "@/lib/training/programmes";
import { trainingPath } from "@/lib/seo/routes";

/**
 * Internship & Training mega menu, derived from the programme data rather than
 * written out here: labels, badges and hrefs all come from `PROGRAMMES`, so a
 * programme added there appears in the menu with a working route.
 */

export type TrainingLink = {
  label: string;
  href: string;
  trending?: boolean;
  /** marks a topic with no page of its own — still used by the After 12th menu */
  pending?: boolean;
};

/** Shared by every three-column menu (Internship & Training, After 12th). */
export type ColumnsMenu = {
  columns: { id: string; heading: string; description: string; links: TrainingLink[] }[];
  strip: { watermark: string; quote: string; cta: string; href: string };
};

const ORDER: TrainingCategory[] = ["short-term", "long-term", "programmes"];

export const INTERNSHIP_MENU: ColumnsMenu = {
  columns: ORDER.map((category) => {
    const meta = CATEGORY_META[category];
    return {
      id: meta.id,
      heading: meta.heading,
      description: meta.description,
      links: programmesByCategory(category).map((p) => ({
        label: p.title,
        href: trainingPath(p.slug),
        trending: p.badge === "Trending",
      })),
    };
  }),

  strip: {
    /* set behind the quote as oversized outlined type */
    watermark: "INTERNSHIP & TRAINING",
    quote: "Practical experience is the bridge between learning and employment.",
    cta: "See All Training Formats",
    href: "/internship-training",
  },
};
