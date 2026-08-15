import type { IconType } from "react-icons";
import {
  FiBookOpen, FiHelpCircle, FiHome, FiImage, FiStar,
} from "react-icons/fi";

/** A row in the mega menu's left rail. */
export type ResourceItem = {
  id: string;
  label: string;
  icon: IconType;
  href: string;
};

export const RESOURCES: ResourceItem[] = [
  { id: "blogs", label: "Blogs", icon: FiBookOpen, href: "/#blog" },
  { id: "gallery", label: "Gallery", icon: FiImage, href: "/#about" },
  { id: "faq", label: "FAQ", icon: FiHelpCircle, href: "/#faq" },
  { id: "reviews", label: "Reviews", icon: FiStar, href: "/#stories" },
  { id: "colleges", label: "College Partnerships", icon: FiHome, href: "/contact" },
];

/** The three featured cards that fill the right-hand area. */
export type ResourceCard = {
  id: string;
  title: string;
  badge: string;
  copy: string;
  cta: string;
  href: string;
  image: { src: string; alt: string };
};

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    id: "blogs",
    title: "Blogs",
    badge: "Articles",
    copy: "Latest technology tutorials, career guidance, coding tips, AI updates and industry insights.",
    cta: "Read Articles",
    href: "/#blog",
    image: {
      src: "/images/classroom.webp",
      alt: "A Techcadd training session in a full classroom",
    },
  },
  {
    id: "faq",
    title: "FAQ",
    badge: "Answers",
    copy: "Find answers about admissions, placements, internships, certifications and courses.",
    cta: "View FAQs",
    href: "/#faq",
    image: {
      src: "/images/form.webp",
      alt: "Students discussing a project at the lab machines",
    },
  },
  {
    id: "reviews",
    title: "Reviews",
    badge: "Students",
    copy: "Read testimonials, placement stories, student experiences and success journeys.",
    cta: "See Reviews",
    href: "/#stories",
    image: {
      src: "/images/team-photo.webp",
      alt: "Techcadd students and team outside the campus",
    },
  },
];
