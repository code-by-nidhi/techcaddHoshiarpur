import {
  BadgeCheck,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Compass,
  Container,
  Cpu,
  Database,
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Layers,
  LineChart,
  Megaphone,
  MessageSquareQuote,
  PenTool,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Telescope,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for the /about route.
 *
 * Everything here is drawn from the figures already published elsewhere on the
 * site (see `@/lib/site`) so the two never drift apart — the about page is a
 * longer telling of the same story, not a second set of numbers.
 */

export interface AboutImage {
  src: string;
  alt: string;
}

/**
 * Photography, served from public/images. Every frame degrades to a branded
 * gradient carrying its alt text if the file is missing, so a renamed asset
 * never renders as a broken image.
 */
export const images = {
  heroPrimary: {
    src: "/images/about-us.webp",
    alt: "A TechCADD trainer addressing students on stage at the Hoshiarpur campus",
  },
  heroSecondary: {
    src: "/images/about-us1.webp",
    alt: "A seminar session in the TechCADD auditorium, with students seated through the hall",
  },
  team: {
    src: "/images/team-photo.webp",
    alt: "The TechCADD team and students outside the Hoshiarpur campus",
  },
  students: {
    src: "/images/classroom.webp",
    alt: "A full auditorium of TechCADD students during a training session",
  },
  learning: {
    src: "/images/lab.webp",
    alt: "Trainees at work on the TechCADD lab floor",
  },
  /*
   * Paired to the frames they sit in: campus2 is square, so it loses the least
   * to the 4:5 primary crop; campus1 is already 4:3, an exact fit for the
   * secondary card.
   */
  trainingPrimary: {
    src: "/images/campus2.webp",
    alt: "TechCADD students working at the lab benches, laptops and monitors along the wall",
  },
  trainingSecondary: {
    src: "/images/campus1.webp",
    alt: "The TechCADD workstation floor in Hoshiarpur, full of students at work",
  },
} satisfies Record<string, AboutImage>;

/* --------------------------------- hero ---------------------------------- */

export const hero = {
  eyebrow: "About TechCADD Hoshiarpur",
  /** Line breaks are deliberate — the third line carries the accent colour. */
  headline: ["We don't just teach", "technology. We start", "careers."],
  accentLine: 2,
  supporting: [
    "A decade of training engineers in Hoshiarpur, judged by the jobs our students land",
    "rather than the certificates we print.",
  ],
};

/* --------------------------------- stats --------------------------------- */

export const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: GraduationCap, value: "25,000+", label: "Students trained" },
  { icon: Briefcase, value: "5,200+", label: "Internships completed" },
  { icon: Code2, value: "1,000+", label: "Live projects delivered" },
  { icon: Star, value: "4.9", label: "Average Google rating" },
];

/* ------------------------------- who we are ------------------------------- */

export const whoWeAre = {
  eyebrow: "Who we are",
  heading: "A training institute measured by the careers it starts",
  paragraphs: [
    "TechCADD began as a single classroom in Hoshiarpur with one conviction: that a training institute should be judged by the careers it starts, not the certificates it prints.",
    "A decade on, that principle still runs the place. Our trainers ship production software. Our labs mirror the stacks companies actually hire for. Every programme ends where it should — with a student in a job they were genuinely prepared for.",
    "Around a third of every batch arrives from a non-technical degree. The foundation modules assume nothing, counselling happens before payment, and a student who lands in the wrong track is moved rather than left to struggle through it.",
  ],
  /** Phrases lifted out of the paragraphs above in the accent colour. */
  highlights: [
    "the careers it starts",
    "ship production software",
    "counselling happens before payment",
  ],
  infoCard: {
    label: "Training since",
    value: "2016",
    caption: "One classroom in Hoshiarpur, 25,000 students later",
  },
};

/* -------------------------------- purpose --------------------------------- */

export const purpose: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
}[] = [
  {
    icon: Target,
    eyebrow: "Our mission",
    title: "Make every student employable, not merely certified",
    body: "Curriculum built backwards from live job descriptions, taught by engineers who still ship code, and practised the same day on the real toolchain. A student leaves with deployed work, a commit history and the ability to defend both in an interview.",
  },
  {
    icon: Telescope,
    eyebrow: "Our vision",
    title: "The institute Punjab's engineers point back to",
    body: "Not the biggest training centre in the state — the one where a student's first job is better than the one they imagined when they walked in. Every lab, project floor and mentor hour exists to serve that single outcome.",
  },
];

/* -------------------------------- journey --------------------------------- */

export const journeySection = {
  eyebrow: "Our journey",
  heading: "A decade, five turning points",
};

export const milestones = [
  {
    year: "2016",
    title: "One classroom in Hoshiarpur",
    description:
      "TechCADD opens with a single lab, a handful of machines, and one conviction: judge a training institute by the careers it starts.",
  },
  {
    year: "2018",
    title: "First industry partnerships",
    description:
      "Local software firms begin sending live briefs to our students — the beginning of the live project floor.",
  },
  {
    year: "2020",
    title: "Internship programme formalised",
    description:
      "Six-month placements inside working teams become part of the core tracks rather than an optional extra.",
  },
  {
    year: "2023",
    title: "AI and cloud labs open",
    description:
      "GPU workstations and cloud sandboxes arrive as the hiring market shifts toward data and infrastructure roles.",
  },
  {
    year: "2026",
    title: "25,000 students later",
    description:
      "Alumni working across Bengaluru, Mohali, Gurugram, Pune, Hyderabad and beyond — and the same conviction.",
  },
];

/* --------------------------------- values --------------------------------- */

export const valuesSection = {
  eyebrow: "What we stand for",
  heading: "Four rules we don't bend",
};

export const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wrench,
    title: "Taught by practitioners",
    description:
      "Every trainer ships production code. Answers come from practice, not from a slide deck written three years ago.",
  },
  {
    icon: Layers,
    title: "Built, not watched",
    description:
      "Students leave with deployed work and a commit history — the things a hiring manager opens first.",
  },
  {
    icon: MessageSquareQuote,
    title: "Honest counselling",
    description:
      "If a track isn't right for you, we say so before you pay. A wrong enrolment helps nobody.",
  },
  {
    icon: HeartHandshake,
    title: "Support without an expiry",
    description:
      "Doubt sessions, mentor hours and referrals continue after the certificate is printed.",
  },
];

/* --------------------------- more than training --------------------------- */

export const moreThanTraining = {
  eyebrow: "More than training",
  heading: "A campus built like a workplace",
  paragraphs: [
    "GPU workstations, robotics benches and cloud sandboxes sit open outside class hours, because the hour a concept finally lands is rarely the hour it was taught.",
    "On the project floor, student teams take real client briefs through sprint planning, code review and release — the same rituals they will meet in their first week of work.",
    "Mentors are working engineers who teach, review and refer. Many of them sit on the hiring panels our students eventually face.",
  ],
};

/**
 * The campus, shown rather than described: four image tiles under the panel.
 */
export const campusHighlights: {
  name: string;
  description: string;
  image: AboutImage;
  icon: LucideIcon;
}[] = [
  {
    name: "AI & robotics lab",
    description: "GPU training rigs, robotics and IoT benches, open outside class hours.",
    image: { src: "/images/ai.webp", alt: "The TechCADD AI and robotics lab" },
    icon: Bot,
  },
  {
    name: "Live project floor",
    description: "Client briefs run through sprint planning, code review and release.",
    image: { src: "/images/mern.webp", alt: "Students on the live project floor" },
    icon: Code2,
  },
  {
    name: "Placement drives",
    description: "On-campus rounds, mentor referrals and support that runs until you land.",
    image: {
      src: "/images/data-science.webp",
      alt: "A placement drive in progress on campus",
    },
    icon: Handshake,
  },
  {
    name: "Mentor sessions",
    description: "One-to-one hours, portfolio teardowns and mock technical rounds.",
    image: { src: "/images/cloud.webp", alt: "A mentor session with students" },
    icon: Users,
  },
];

/* ------------------------------ what we teach ----------------------------- */

export const technologySection = {
  eyebrow: "What we teach",
  heading: "The stacks companies are hiring for",
  intro:
    "Seven tracks, each rebuilt every year as the market moves. Grouping below is presentational — every name is taught as its own module inside the track it belongs to.",
};

export const technologyCategories = [
  { id: "development", label: "Development" },
  { id: "ai-data", label: "AI & Data" },
  { id: "cloud-security", label: "Cloud & Security" },
  { id: "design", label: "Design & CAD" },
  { id: "marketing", label: "Marketing" },
] as const;

type CategoryId = (typeof technologyCategories)[number]["id"];

export const technologies: {
  name: string;
  icon: LucideIcon;
  category: CategoryId;
}[] = [
  { name: "React", icon: Code2, category: "development" },
  { name: "Next.js", icon: Code2, category: "development" },
  { name: "Node.js", icon: Code2, category: "development" },
  { name: "Express", icon: Code2, category: "development" },
  { name: "MongoDB", icon: Database, category: "development" },
  { name: "TypeScript", icon: Code2, category: "development" },
  { name: "Java", icon: Code2, category: "development" },

  { name: "Python", icon: Brain, category: "ai-data" },
  { name: "PyTorch", icon: Brain, category: "ai-data" },
  { name: "TensorFlow", icon: Brain, category: "ai-data" },
  { name: "LLMs & RAG", icon: Sparkles, category: "ai-data" },
  { name: "OpenCV", icon: Cpu, category: "ai-data" },
  { name: "Pandas", icon: BarChart3, category: "ai-data" },
  { name: "SQL", icon: Database, category: "ai-data" },
  { name: "Power BI", icon: LineChart, category: "ai-data" },
  { name: "Tableau", icon: LineChart, category: "ai-data" },

  { name: "AWS", icon: Cloud, category: "cloud-security" },
  { name: "Docker", icon: Container, category: "cloud-security" },
  { name: "Kubernetes", icon: Container, category: "cloud-security" },
  { name: "Terraform", icon: Cloud, category: "cloud-security" },
  { name: "GitHub Actions", icon: Cloud, category: "cloud-security" },
  { name: "Linux & Networking", icon: ShieldCheck, category: "cloud-security" },
  { name: "SIEM", icon: ShieldCheck, category: "cloud-security" },
  { name: "Burp Suite", icon: ShieldCheck, category: "cloud-security" },

  { name: "AutoCAD", icon: PenTool, category: "design" },
  { name: "SolidWorks", icon: PenTool, category: "design" },
  { name: "CATIA", icon: PenTool, category: "design" },
  { name: "Creo", icon: PenTool, category: "design" },
  { name: "ANSYS", icon: FlaskConical, category: "design" },
  { name: "NX CAM", icon: Wrench, category: "design" },

  { name: "SEO", icon: Megaphone, category: "marketing" },
  { name: "Google Ads", icon: Megaphone, category: "marketing" },
  { name: "Meta Ads", icon: Megaphone, category: "marketing" },
  { name: "GA4", icon: BarChart3, category: "marketing" },
  { name: "Marketing automation", icon: Megaphone, category: "marketing" },
];

/* ------------------------------- why choose ------------------------------- */

export const whySection = {
  eyebrow: "Why it matters",
  heading: "Six reasons students pick TechCADD",
};

export const whyChoose: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Rocket,
    title: "Industry-oriented curriculum",
    description:
      "Every module is built backwards from a live job description, then rewritten each year as the stack moves.",
  },
  {
    icon: Users,
    title: "Experienced trainers",
    description:
      "Taught by engineers who still ship production code, so the answers come from practice rather than a slide.",
  },
  {
    icon: GraduationCap,
    title: "Placement assistance",
    description:
      "Resume reviews, mock rounds, on-campus drives and mentor referrals — support that continues until you land.",
  },
  {
    icon: Compass,
    title: "Flexible batches",
    description:
      "Weekday, evening and weekend schedules covering identical material, so a job or a degree isn't a blocker.",
  },
  {
    icon: FlaskConical,
    title: "Live projects",
    description:
      "Real briefs with deadlines, version control and code review. Portfolio work, not classroom exercises.",
  },
  {
    icon: BadgeCheck,
    title: "Certifications",
    description:
      "Industry-recognised completion certificates, plus vendor exam prep where the track calls for it.",
  },
];

/* ---------------------------------- cta ----------------------------------- */

export const cta = {
  eyebrow: "Come and see for yourself",
  heading: "Sit through a real session before you commit",
  body: "Book a free demo class, meet the trainer who would take your batch, and decide afterwards. Counselling first, payment second.",
  primary: { label: "Book a free demo", href: "/contact" },
  secondary: { label: "Browse the courses", href: "/#programs" },
};
