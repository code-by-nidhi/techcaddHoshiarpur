/**
 * Mega-menu content. Kept as plain data so the desktop panel and the mobile
 * accordion render the same catalogue from one source.
 *
 * Every course points at the programmes section for now; give a course its own
 * route and only the `href` here needs to change.
 */

export type MegaCourse = {
  label: string;
  href: string;
  /** renders the "Trending" pill beside the label */
  trending?: boolean;
};

export type MegaColumn = {
  id: string;
  /** the 01 / 02 / 03 rule above the title */
  index: string;
  title: string;
  description: string;
  courses: MegaCourse[];
};

const PROGRAMMES = "/#programs";

export const MEGA_COLUMNS: MegaColumn[] = [
  {
    id: "certification",
    index: "01",
    title: "6 Month Certification Programs",
    description: "Job-ready skills in less than 6 months",
    courses: [
      { label: "MERN Stack Development", href: PROGRAMMES, trending: true },
      { label: "Full Stack Development", href: PROGRAMMES },
      { label: "React Development", href: PROGRAMMES },
      { label: "Node.js Development", href: PROGRAMMES },
      { label: "Python Programming", href: PROGRAMMES },
      { label: "Digital Marketing", href: PROGRAMMES },
      { label: "Graphic Designing", href: PROGRAMMES },
      { label: "Cybersecurity", href: PROGRAMMES, trending: true },
    ],
  },
  {
    id: "professional",
    index: "02",
    title: "1 Year Professional Programs",
    description: "Industry-focused training with internship",
    courses: [
      { label: "Artificial Intelligence", href: PROGRAMMES, trending: true },
      { label: "Machine Learning", href: PROGRAMMES },
      { label: "Data Science", href: PROGRAMMES, trending: true },
      { label: "AI & ML Professional Program", href: PROGRAMMES },
      { label: "Cloud Computing & DevOps", href: PROGRAMMES },
      { label: "Ethical Hacking", href: PROGRAMMES },
      { label: "Data Analytics", href: PROGRAMMES },
    ],
  },
  {
    id: "cad",
    index: "03",
    title: "Engineering & CAD Programs",
    description: "Design and drafting for engineers",
    courses: [
      { label: "AutoCAD", href: PROGRAMMES },
      { label: "SolidWorks", href: PROGRAMMES },
      { label: "Revit", href: PROGRAMMES },
      { label: "CATIA", href: PROGRAMMES },
      { label: "3ds Max", href: PROGRAMMES },
      { label: "Staad Pro", href: PROGRAMMES },
      { label: "Creo", href: PROGRAMMES },
    ],
  },
];

export const MEGA_FEATURED = {
  id: "featured",
  eyebrow: "Featured programme",
  title: "MERN Stack Development",
  features: [
    "Live Projects",
    "Industry Curriculum",
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "Placement Assistance",
    "Internship Opportunities",
    "Career Guidance",
  ],
  cta: { label: "Explore MERN Program", href: PROGRAMMES },
};

export const MEGA_QUOTE = "Learning never exhausts the mind.";

export const MEGA_VIEW_ALL = { label: "View All Courses", href: PROGRAMMES };
