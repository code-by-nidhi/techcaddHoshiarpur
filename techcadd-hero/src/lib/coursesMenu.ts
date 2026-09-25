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
    id: "basics",
    emoji: "🧾",
    heading: "Basics & Accounting",
    courses: [
      { label: "Basic Computer", href: "/courses" },
      { label: "MS Office", href: "/courses" },
      { label: "Advance Excel", href: "/courses" },
      { label: "Google Workspace", href: "/courses" },
      { label: "CAT Pro", href: "/courses" },
      { label: "Punjabi Typing", href: "/courses" },
      { label: "English Typing", href: "/courses" },
      { label: "Tally ERP-9", href: "/courses" },
      { label: "Tally Prime", href: "/courses" },
      { label: "QuickBooks", href: "/courses" },
    ],
  },
  {
    id: "marketing",
    emoji: "📈",
    heading: "Digital Marketing",
    courses: [
      { label: "Digital Marketing", href: coursePath("digital-marketing"), trending: true },
      { label: "SEO", href: coursePath("seo") },
      { label: "SMO", href: coursePath("social-media-marketing") },
      { label: "Google Ads", href: coursePath("google-ads") },
      { label: "Meta Ads", href: "/courses" },
    ],
  },
  {
    id: "engineering",
    emoji: "⚙️",
    heading: "CAD / CAM",
    courses: [
      { label: "AutoCAD", href: coursePath("autocad") },
      { label: "SolidWorks", href: coursePath("solidworks") },
      { label: "CATIA", href: coursePath("catia") },
      { label: "NX CAD", href: coursePath("nc-cad") },
      { label: "NX CAM", href: coursePath("nx-cam") },
      { label: "Mastercam", href: coursePath("mastercam") },
      { label: "SolidCAM", href: coursePath("solidcam") },
      { label: "WorkNC", href: "/courses" },
      { label: "CNC Programming", href: coursePath("cnc-manual-programming") },
    ],
  },
  {
    id: "programming",
    emoji: "💻",
    heading: "Programming & AI",
    courses: [
      { label: "Core Python", href: coursePath("python-programming") },
      { label: "Generative AI", href: coursePath("generative-ai") },
      { label: "Web Designing", href: coursePath("web-designing") },
      { label: "Web Development with Python", href: coursePath("web-development") },
      { label: "WordPress", href: coursePath("wordpress") },
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
