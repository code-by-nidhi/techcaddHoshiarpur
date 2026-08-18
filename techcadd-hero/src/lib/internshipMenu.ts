/**
 * Content for the Internship & Training mega menu.
 *
 * None of these training formats has a page of its own yet, so every link is
 * marked `pending` and routed to the closest real destination: the programme
 * roadmap for what a track includes, the outcomes section for placement, and
 * the contact page for enrolment questions. Give a format its own route and
 * only the href here changes.
 */

export type TrainingLink = { label: string; href: string; trending?: boolean; pending?: boolean };

/** Shared by every three-column menu (Internship & Training, After 12th). */
export type ColumnsMenu = {
  columns: { id: string; heading: string; description: string; links: TrainingLink[] }[];
  strip: { watermark: string; quote: string; cta: string; href: string };
};

/** Real anchors and pages that already exist on the site. */
const ROADMAP = "/#included";
const OUTCOMES = "/#outcomes";
const CONTACT = "/contact";

export const INTERNSHIP_MENU: ColumnsMenu = {
  columns: [
    {
      id: "short",
      heading: "Short Term",
      description: "Summer, winter and university-mandated batches",
      links: [
        { label: "45 Days Training", href: ROADMAP, trending: true, pending: true },
        { label: "6 Weeks Training", href: ROADMAP, trending: true, pending: true },
        { label: "2 Months Training", href: ROADMAP, pending: true },
        { label: "Summer Internship", href: ROADMAP, pending: true },
        { label: "Winter Internship", href: ROADMAP, pending: true },
      ],
    },
    {
      id: "long",
      heading: "Long Term",
      description: "Deeper tracks that finish with live projects",
      links: [
        { label: "4 Months Training", href: ROADMAP, pending: true },
        { label: "6 Months Training", href: ROADMAP, pending: true },
        { label: "Industrial Project Training", href: ROADMAP, pending: true },
        { label: "Full Stack Internship", href: "/courses/full-stack-web-development" },
        { label: "Job Ready Program", href: OUTCOMES, pending: true },
      ],
    },
    {
      id: "programmes",
      heading: "Programmes",
      description: "Industry placement and internship letters",
      links: [
        { label: "Industrial Training", href: ROADMAP, trending: true, pending: true },
        { label: "Internship Program", href: ROADMAP, pending: true },
        { label: "Live Project Program", href: ROADMAP, pending: true },
        { label: "Placement Assistance Program", href: OUTCOMES },
        { label: "Corporate Training", href: CONTACT, pending: true },
      ],
    },
  ],

  strip: {
    /* set behind the quote as oversized outlined type */
    watermark: "INTERNSHIP & TRAINING",
    quote: "Practical experience is the bridge between learning and employment.",
    cta: "See All Training Formats",
    /* No /internship-training route exists and the brief said not to create a
       page, so this points at the programme roadmap instead of a 404. */
    href: ROADMAP,
  },
};
