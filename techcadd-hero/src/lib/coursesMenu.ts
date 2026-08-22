import { coursePath } from "@/lib/seo/routes";

/**
 * Courses mega-menu content.
 *
 * Items that exist in the course catalogue link straight to their detail page;
 * the rest point at the catalogue index, so nothing in the menu dead-ends.
 * When a new course is added to `lib/courses/catalogue.ts`, swap its href here
 * from "/courses" to "/courses/<slug>".
 */

export type MenuCourse = {
  label: string;
  href: string;
  trending?: boolean;
  /** preview artwork shown in the panel when this row is hovered */
  image?: string;
};

export type MenuCategory = {
  id: string;
  /** rendered beside the heading */
  emoji: string;
  heading: string;
  courses: MenuCourse[];
};

export const COURSE_MENU: MenuCategory[] = [
  {
    id: "programming",
    emoji: "💻",
    heading: "Programming",
    courses: [
      { label: "Python Course", href: coursePath("python-programming"), trending: true },
      { label: "Java Course", href: coursePath("java-programming") },
      { label: "C Course", href: coursePath("c-programming") },
      { label: "C++ Course", href: coursePath("cpp-programming") },
      { label: "Kotlin Course", href: coursePath("kotlin-programming") },
      { label: "Web Designing", href: coursePath("web-designing") },
      { label: "Web Development", href: coursePath("web-development") },
      { label: "MERN Stack", href: coursePath("mern-stack-development"), trending: true },
      { label: "MEAN Stack", href: coursePath("mean-stack-development") },
      { label: "PHP Full Stack", href: coursePath("php-full-stack") },
    ],
  },
  {
    id: "marketing",
    emoji: "📈",
    heading: "Digital Marketing",
    courses: [
      { label: "Digital Marketing", href: coursePath("digital-marketing"), trending: true },
      { label: "Social Media Marketing", href: coursePath("social-media-marketing") },
      { label: "Google Ads", href: coursePath("google-ads") },
      { label: "WordPress", href: coursePath("wordpress") },
      { label: "Shopify", href: coursePath("shopify") },
      { label: "SEO", href: coursePath("seo") },
    ],
  },
  {
    id: "ai",
    emoji: "🤖",
    heading: "AI Courses",
    courses: [
      { label: "Artificial Intelligence", href: coursePath("artificial-intelligence"), trending: true },
      { label: "Machine Learning", href: coursePath("machine-learning") },
      { label: "Data Analytics", href: coursePath("data-analytics") },
      { label: "Tableau", href: coursePath("tableau") },
      { label: "Power BI", href: coursePath("power-bi") },
      { label: "Data Science", href: coursePath("data-science") },
      { label: "Deep Learning", href: coursePath("deep-learning") },
    ],
  },
  {
    id: "engineering",
    emoji: "⚙️",
    heading: "Civil & Mechanical",
    courses: [
      { label: "AutoCAD", href: coursePath("autocad"), trending: true, image: "/images/courses/civil-mechanical/autocad.webp" },
      { label: "SolidWorks", href: coursePath("solidworks"), image: "/images/courses/civil-mechanical/solidworks.webp" },
      { label: "CATIA", href: coursePath("catia"), image: "/images/courses/civil-mechanical/catia.webp" },
      { label: "NC CAD", href: coursePath("nc-cad"), image: "/images/courses/civil-mechanical/nc-cad.webp" },
      { label: "NX CAM", href: coursePath("nx-cam"), image: "/images/courses/civil-mechanical/nx-cam.webp" },
      { label: "SolidCAM", href: coursePath("solidcam"), image: "/images/courses/civil-mechanical/solidcam.webp" },
      { label: "MasterCAM", href: coursePath("mastercam"), image: "/images/courses/civil-mechanical/mastercam.webp" },
      { label: "CNC Manual Programming", href: coursePath("cnc-manual-programming"), image: "/images/courses/civil-mechanical/cnc-manual-programming.webp" },
    ],
  },
];

export const MENU_FEATURED = {
  title: "Explore Our Most Popular Courses",
  subtitle: "Industry Experts • Live Projects • Placement Support",
  cta: { label: "Explore All Courses", href: "/courses" },
};

export const MENU_HIGHLIGHT = {
  title: "Why Choose TechCadd?",
  points: [
    "Industry Trainers",
    "Live Projects",
    "Placement Support",
    "Interview Preparation",
    "Certifications",
    "Career Guidance",
  ],
};
