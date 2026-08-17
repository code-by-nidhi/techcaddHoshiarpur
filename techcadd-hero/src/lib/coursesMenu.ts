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
      { label: "Python Course", href: "/courses/python-programming", trending: true },
      { label: "Java Course", href: "/courses/java-programming" },
      { label: "C++ Course", href: "/courses" },
      { label: "Kotlin Course", href: "/courses" },
      { label: "Web Designing", href: "/courses" },
      { label: "Web Development", href: "/courses/full-stack-web-development" },
      { label: "MERN Stack", href: "/courses/mern-stack-development", trending: true },
      { label: "MEAN Stack", href: "/courses" },
      { label: "PHP Full Stack", href: "/courses" },
    ],
  },
  {
    id: "marketing",
    emoji: "📈",
    heading: "Digital Marketing",
    courses: [
      { label: "Digital Marketing", href: "/courses/digital-marketing", trending: true },
      { label: "Social Media Marketing", href: "/courses" },
      { label: "Google Ads", href: "/courses" },
      { label: "WordPress", href: "/courses" },
      { label: "Shopify", href: "/courses" },
      { label: "SEO", href: "/courses" },
    ],
  },
  {
    id: "ai",
    emoji: "🤖",
    heading: "AI Courses",
    courses: [
      { label: "Power BI", href: "/courses" },
      { label: "Tableau", href: "/courses" },
      { label: "Data Science", href: "/courses", trending: true },
      { label: "Data Analytics", href: "/courses/data-analytics" },
      { label: "Machine Learning", href: "/courses" },
      { label: "Deep Learning", href: "/courses" },
      { label: "Artificial Intelligence", href: "/courses" },
    ],
  },
  {
    id: "security",
    emoji: "🔒",
    heading: "Cyber Security",
    courses: [
      { label: "Cyber Security", href: "/courses", trending: true },
      { label: "Cloud Computing", href: "/courses" },
      { label: "Linux", href: "/courses" },
      { label: "Ethical Hacking", href: "/courses" },
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
