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
      { label: "Python Course", href: "/courses/python-programming", trending: true },
      { label: "Java Course", href: "/courses/java-programming" },
      { label: "C Course", href: "/courses/c-programming" },
      { label: "C++ Course", href: "/courses/cpp-programming" },
      { label: "Kotlin Course", href: "/courses/kotlin-programming" },
      { label: "Web Designing", href: "/courses/web-designing" },
      { label: "Web Development", href: "/courses/web-development" },
      { label: "MERN Stack", href: "/courses/mern-stack-development", trending: true },
      { label: "MEAN Stack", href: "/courses/mean-stack-development" },
      { label: "PHP Full Stack", href: "/courses/php-full-stack" },
    ],
  },
  {
    id: "marketing",
    emoji: "📈",
    heading: "Digital Marketing",
    courses: [
      { label: "Digital Marketing", href: "/courses/digital-marketing", trending: true },
      { label: "Social Media Marketing", href: "/courses/social-media-marketing" },
      { label: "Google Ads", href: "/courses/google-ads" },
      { label: "WordPress", href: "/courses/wordpress" },
      { label: "Shopify", href: "/courses/shopify" },
      { label: "SEO", href: "/courses/seo" },
    ],
  },
  {
    id: "ai",
    emoji: "🤖",
    heading: "AI Courses",
    courses: [
      { label: "Artificial Intelligence", href: "/courses/artificial-intelligence", trending: true },
      { label: "Machine Learning", href: "/courses/machine-learning" },
      { label: "Data Analytics", href: "/courses/data-analytics" },
      { label: "Tableau", href: "/courses/tableau" },
      { label: "Power BI", href: "/courses/power-bi" },
      { label: "Data Science", href: "/courses/data-science" },
      { label: "Deep Learning", href: "/courses/deep-learning" },
    ],
  },
  {
    id: "engineering",
    emoji: "⚙️",
    heading: "Civil & Mechanical",
    courses: [
      { label: "AutoCAD", href: "/courses/autocad", trending: true, image: "/images/courses/civil-mechanical/autocad.webp" },
      { label: "SolidWorks", href: "/courses/solidworks", image: "/images/courses/civil-mechanical/solidworks.webp" },
      { label: "CATIA", href: "/courses/catia", image: "/images/courses/civil-mechanical/catia.webp" },
      { label: "NC CAD", href: "/courses/nc-cad", image: "/images/courses/civil-mechanical/nc-cad.webp" },
      { label: "NX CAM", href: "/courses/nx-cam", image: "/images/courses/civil-mechanical/nx-cam.webp" },
      { label: "SolidCAM", href: "/courses/solidcam", image: "/images/courses/civil-mechanical/solidcam.webp" },
      { label: "MasterCAM", href: "/courses/mastercam", image: "/images/courses/civil-mechanical/mastercam.webp" },
      { label: "CNC Manual Programming", href: "/courses/cnc-manual-programming", image: "/images/courses/civil-mechanical/cnc-manual-programming.webp" },
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
