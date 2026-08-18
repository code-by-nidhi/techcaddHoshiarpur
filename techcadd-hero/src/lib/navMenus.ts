/**
 * Content for the simple navbar dropdowns — the ones that show a short list
 * rather than a full mega panel.
 *
 * Every href points at a page or section that already exists: the AI list is
 * the catalogue's own AI courses, and the other two link to real destinations
 * (`#included` is the programme roadmap, `#outcomes` the placement section).
 * Nothing here invents a programme TechCadd does not already publish.
 */

export type NavMenuItem = {
  label: string;
  href: string;
  /** one line under the label, for the wider items */
  note?: string;
};

export const SIMPLE_MENUS = {
  AI: [
    { label: "Artificial Intelligence", href: "/courses/artificial-intelligence" },
    { label: "Machine Learning", href: "/courses/machine-learning" },
    { label: "Deep Learning", href: "/courses/deep-learning" },
    { label: "Data Science", href: "/courses/data-science" },
    { label: "Data Analytics", href: "/courses/data-analytics" },
    { label: "Power BI", href: "/courses/power-bi" },
    { label: "Tableau", href: "/courses/tableau" },
  ],

  "Internship & Training": [
    {
      label: "Live Project Training",
      href: "/#included",
      note: "Client briefs through sprint planning and release",
    },
    {
      label: "Placement Support",
      href: "/#outcomes",
      note: "Interview preparation, referrals and hiring panels",
    },
    {
      label: "Talk to a Counsellor",
      href: "/contact",
      note: "Find the track that fits before you enrol",
    },
  ],

  "After 12th": [
    { label: "Python Programming", href: "/courses/python-programming" },
    { label: "Web Designing", href: "/courses/web-designing" },
    { label: "Digital Marketing", href: "/courses/digital-marketing" },
    { label: "AutoCAD", href: "/courses/autocad" },
    { label: "Browse all courses", href: "/courses" },
  ],
} satisfies Record<string, NavMenuItem[]>;

export type SimpleLabel = keyof typeof SIMPLE_MENUS;

export const isSimpleLabel = (label: string): label is SimpleLabel =>
  label in SIMPLE_MENUS;
