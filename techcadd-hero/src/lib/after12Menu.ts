import type { ColumnsMenu } from "./internshipMenu";

/**
 * Content for the After 12th mega menu.
 *
 * Same `pending` convention as the other menus: a topic without a course page
 * of its own routes to the closest real course rather than a dead link.
 * Cybersecurity, 3ds Max, Revit, Cloud/DevOps and Generative AI are the ones
 * with no catalogue entry today.
 */
export const AFTER12_MENU: ColumnsMenu = {
  columns: [
    {
      id: "six-month",
      heading: "6 Month Certificates",
      description: "One skill, job-ready in half a year",
      links: [
        { label: "Digital Marketing & Communication", href: "/courses/digital-marketing" },
        { label: "Python Programming", href: "/courses/python-programming" },
        { label: "Machine Learning & AI", href: "/courses/machine-learning", trending: true },
        { label: "Cybersecurity", href: "/courses", pending: true },
        { label: "Web Development", href: "/courses/web-development" },
      ],
    },
    {
      id: "one-year",
      heading: "1 Year Certificates",
      description: "Full programmes with internship and placement",
      links: [
        { label: "Generative AI", href: "/courses/artificial-intelligence", trending: true, pending: true },
        { label: "Cloud Computing & DevOps", href: "/courses", pending: true },
        { label: "AI & Data Science", href: "/courses/data-science" },
        { label: "Machine Learning & Deep Learning", href: "/courses/deep-learning" },
        { label: "Cybersecurity & Ethical Hacking", href: "/courses", pending: true },
      ],
    },
    {
      id: "engineering",
      heading: "Civil / Mechanical",
      description: "Design and drafting for engineering streams",
      links: [
        { label: "AutoCAD", href: "/courses/autocad" },
        { label: "SolidWorks", href: "/courses/solidworks" },
        { label: "3ds Max", href: "/courses", pending: true },
        { label: "Revit", href: "/courses", pending: true },
        { label: "CATIA", href: "/courses/catia" },
      ],
    },
  ],

  strip: {
    watermark: "AFTER 12TH CAREER PROGRAMS",
    quote: "Choose the right skill today and build the career you want tomorrow.",
    cta: "Browse After 12th Courses",
    /* No /after-12th route exists and the brief said not to create a page, so
       this points at the catalogue index instead of a 404. */
    href: "/courses",
  },
};
