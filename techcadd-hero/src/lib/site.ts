import {
  Rocket, Users, GraduationCap, FlaskConical, Compass, BadgeCheck,
} from "lucide-react";
import { CTA } from "@/lib/cta";
import { trainingPath } from "@/lib/seo/routes";

/* ------------------------------- about -------------------------------- */

export const ABOUT = {
  eyebrow: "About Techcadd",
  title: "A Decade Of Building Future Engineers",
  body: [
    "Techcadd began as a single classroom in Hoshiarpur with one conviction: that a training institute should be judged by the careers it starts, not the certificates it prints.",
    "A decade on, that principle still runs the place. Our trainers ship production software. Our labs mirror the stacks companies actually hire for. Every programme ends where it should — with a student in a job they were genuinely prepared for.",
  ],
  stats: [
    { value: "45", unit: "Days", label: "Fast-track training" },
    { value: "6", unit: "Weeks", label: "Summer programmes" },
    { value: "6", unit: "Months", label: "Paid internship track" },
    { value: "Sat–Sun", unit: "", label: "Weekend batches" },
  ],
  /*
   * The headline numbers, shown as a row of cards under the opening block.
   *
   * `to` and `suffix` are split because the counter animates the number and
   * cannot animate the string "25,000+". The separator is the counter's own
   * job — it prints through `toLocaleString`, so 25000 reads as 25,000.
   */
  enterpriseStats: [
    { to: 25000, suffix: "+", label: "Students Trained", icon: "students" },
    { to: 1000, suffix: "+", label: "Hiring Partners", icon: "partners" },
    { to: 500, suffix: "+", label: "Industrial Trainings", icon: "training" },
    { to: 10, suffix: "+", label: "Years Experience", icon: "years" },
    { to: 100, suffix: "+", label: "Expert Trainers", icon: "trainers" },
  ],
  tiles: [
    { title: "AI & Robotics Lab", tone: "from-blue-600/40 to-cyan-500/20" },
    { title: "Live Project Floor", tone: "from-cyan-500/40 to-blue-600/20" },
    { title: "Placement Drives", tone: "from-cyan-500/35 to-blue-600/25" },
    { title: "Mentor Sessions", tone: "from-blue-500/35 to-sky-500/25" },
  ],
};

/* ------------------------------- why us -------------------------------- */

export const WHY = [
  { icon: Rocket, title: "Industry-Oriented Curriculum", copy: "Every module is built backwards from a live job description, then rewritten each year as the stack moves." },
  { icon: Users, title: "Experienced Trainers", copy: "Taught by engineers who still ship production code, so the answers come from practice rather than a slide." },
  { icon: GraduationCap, title: "Placement Assistance", copy: "Resume reviews, mock rounds, on-campus drives and mentor referrals — support that continues until you land." },
  { icon: Compass, title: "Flexible Batches", copy: "Weekday, evening and weekend schedules covering identical material, so a job or a degree isn't a blocker." },
  { icon: FlaskConical, title: "Live Projects", copy: "Real briefs with deadlines, version control and code review. Portfolio work, not classroom exercises." },
  { icon: BadgeCheck, title: "Certifications", copy: "Industry-recognised completion certificates, plus vendor exam prep where the track calls for it." },
];

/* ====================================================================== */
/*  Redesigned sections                                                    */
/* ====================================================================== */

/* ------------------------- career outcomes ---------------------------- */

export const OUTCOMES = {
  headline: [
    { key: "students", value: 25000, suffix: "+", label: "Students trained", note: "Since 2004, across every track" },
    { key: "internships", value: 5200, suffix: "+", label: "Internships completed", note: "Six-month placements inside working teams" },
    { key: "projects", value: 1000, suffix: "+", label: "Live projects delivered", note: "Built by students, shipped for real clients" },
  ],
  assistance: [
    { label: "Mock interviews conducted", value: 8400, suffix: "+" },
    { label: "Resume reviews completed", value: 12600, suffix: "+" },
    { label: "Campus drives hosted", value: 340, suffix: "+" },
    { label: "Mentor referrals made", value: 2100, suffix: "+" },
  ],
  reviews: { rating: 4.9, count: 750, breakdown: [88, 8, 2, 1, 1] },
  alumni: {
    total: 25000,
    cities: [
      { city: "Bengaluru", pct: 26 },
      { city: "Mohali & Chandigarh", pct: 24 },
      { city: "Gurugram & Noida", pct: 19 },
      { city: "Pune", pct: 14 },
      { city: "Hyderabad", pct: 10 },
      { city: "Overseas", pct: 7 },
    ],
  },
  /** eight quarters of enrolments, for the sparkline */
  growth: [42, 51, 49, 63, 71, 68, 84, 96],
};

/*
 * The student wall used to live here as a `WALL` constant.
 *
 * It is CMS content now — the API serves published reviews, and the section
 * renders whatever an editor has approved. The eight reviews that were here
 * were carried across verbatim by `cms-techcadd/backend/src/db/seed-hsp.ts`,
 * so nothing was lost in the move.
 */

/* ------------------------ programme roadmap --------------------------- */

export const ROADMAP = [
  { step: "Enrollment", copy: "Counselling first, payment second. We map your background to a track before you commit to anything." },
  { step: "Training", copy: "Core concepts from working engineers, practised the same day on lab machines with the real toolchain." },
  { step: "Certificate", copy: "Industry-recognised completion certificate, plus vendor exam prep where the track calls for it." },
  { step: "Internship", copy: "Six months inside a working team, shipping features that reach users." },
  { step: "Live Projects", copy: "Real briefs with deadlines, version control and code review — portfolio work, not exercises." },
  { step: "Doubt Sessions", copy: "Open lab hours and one-to-one time with trainers, for as long as you need them." },
  { step: "Interview Preparation", copy: "Technical rounds, HR rounds and a resume teardown with people who sit on hiring panels." },
  { step: "Placement Support", copy: "Campus drives, mentor referrals and continued support until you land the role." },
];

/* ---------------------- technology universe --------------------------- */

export type Domain = {
  id: string;
  label: string;
  /** shown inside the node, so long labels stay readable on two lines */
  short: string;
  accent: string;
  tech: string[];
  projects: string[];
  industries: string[];
  careers: string[];
  placement: string;
};

export const UNIVERSE: Domain[] = [
  { id: "web", label: "Python & Web Development", short: "Python & Web", accent: "#2563EB",
    tech: ["Python", "HTML & CSS", "JavaScript", "Django", "WordPress", "Git"],
    projects: ["Business Website", "Python Automation Scripts", "Blog with CMS", "Web App with Database"],
    industries: ["Small Businesses", "Startups", "Agencies"],
    careers: ["Python Developer", "Web Developer", "Web Designer", "WordPress Developer"],
    placement: "95% Placement Assistance" },
  { id: "ai", label: "Generative AI", short: "Gen AI", accent: "#2563EB",
    tech: ["ChatGPT", "Prompting", "Python", "OpenAI API", "Automation", "AI Image Tools"],
    projects: ["AI Chat Assistant", "Content Generation Workflow", "Document Summariser", "AI-Powered Automation"],
    industries: ["Support Automation", "Content & Media", "Productivity"],
    careers: ["AI Developer", "Prompt Engineer", "AI Automation Specialist", "Python Developer"],
    placement: "95% Placement Assistance" },
  { id: "accounting", label: "Basics & Accounting", short: "Accounting", accent: "#3B82F6",
    tech: ["MS Office", "Advance Excel", "Tally Prime", "QuickBooks", "GST", "Typing"],
    projects: ["GST Billing Setup", "Company Accounts in Tally", "Excel MIS Reports", "Payroll Sheet"],
    industries: ["Retail & Trading", "CA Firms", "Offices"],
    careers: ["Accountant", "Tally Operator", "Computer Operator", "Data Entry Operator"],
    placement: "95% Placement Assistance" },
  { id: "marketing", label: "Digital Marketing", short: "Digital Marketing", accent: "#60A5FA",
    tech: ["SEO", "SMO", "Google Ads", "Meta Ads", "GA4", "Content"],
    projects: ["Full-funnel campaign with live budget", "SEO audit and rebuild", "Social media calendar", "Landing page CRO test"],
    industries: ["Lead Generation", "Brand Growth", "Local Business"],
    careers: ["Digital Marketer", "SEO Specialist", "Social Media Manager", "Ads Specialist"],
    placement: "95% Placement Assistance" },
  { id: "cad", label: "CAD / CAM", short: "CAD / CAM", accent: "#0D9488",
    tech: ["AutoCAD", "SolidWorks", "CATIA", "NX CAD", "Mastercam", "CNC"],
    projects: ["Parametric part library", "Sheet metal enclosure", "CNC toolpath programme", "Assembly and GD&T drawing set"],
    industries: ["Manufacturing", "Automotive", "Tool Rooms"],
    careers: ["Design Engineer", "CAD Draughtsman", "CAM Programmer", "CNC Programmer"],
    placement: "95% Placement Assistance" },
];

/* ----------------------- innovation command centre -------------------- */

export const CAPABILITIES = [
  { id: "labs", label: "AI & Robotics Labs", copy: "GPU workstations, robotics kits and the stacks companies actually hire for, open outside class hours.",
    highlights: ["GPU training rigs", "Robotics and IoT benches", "Open lab access"] },
  { id: "projects", label: "Live Project Floor", copy: "Student teams take real briefs through sprint planning, code review and release.",
    highlights: ["Client briefs", "Sprint rituals", "Peer code review"] },
  { id: "mentors", label: "Mentor Network", copy: "Working engineers who teach, review and refer — the same people who sit on hiring panels.",
    highlights: ["1:1 mentor hours", "Portfolio reviews", "Referral network"] },
  { id: "career", label: "Career Studio", copy: "Resume teardowns, mock rounds and interview coaching run continuously, not once at the end.",
    highlights: ["Mock technical rounds", "HR round practice", "Offer negotiation"] },
  { id: "cloud", label: "Cloud Infrastructure", copy: "Cloud sandboxes and deployment pipelines students run themselves, on the platforms teams actually use.",
    highlights: ["AWS & Azure sandboxes", "CI/CD pipelines", "Container playground"] },
];

export const COMMAND_METRICS = [
  { label: "Live projects", value: 1000, suffix: "+" },
  { label: "Students on campus", value: 1800, suffix: "" },
  { label: "Google reviews", value: 750, suffix: "+" },
  { label: "Training hours delivered", value: 96000, suffix: "+" },
  { label: "Course completion rate", value: 92, suffix: "%" },
];

/* --------------------------- help center ------------------------------ */

/*
 * The help centre used to live here as `HELP` and `HELP_CATEGORIES`.
 *
 * Both are CMS content now. The categories are no longer a fixed list either:
 * the section derives its tabs from the questions themselves, so filing one
 * under a new heading is enough to make a tab for it appear.
 */

/*
 * The knowledge hub used to live here as `POSTS` and `TOPICS`.
 *
 * The homepage band now shows real articles from the blog, and its topic pills
 * are the blog categories that actually have something published in them — so
 * a card on the homepage always leads to an article that exists.
 */

/* ------------------------- launch centre ------------------------------ */

export const LAUNCH = {
  heading: "Start Building Your Career Today",
  sub: "Book a free demo class, sit through a real session, and decide afterwards. No commitment until you've seen how we teach.",
  /*
   * Both of these pointed at anchors that exist nowhere in the markup, so
   * neither button did anything at all.
   *
   * "Book Demo" now raises the shared enquiry dialog — `CTA.lead` is the
   * sentinel the Launch Center reads to render a button rather than a link.
   * "Talk to Counsellor" stays on WhatsApp, where the counselling team works.
   */
  actions: [
    { label: "Book Demo", href: CTA.lead, primary: true },
    { label: "Talk to Counsellor", href: CTA.whatsapp, external: true, primary: false },
  ],
};

/* ------------------------- mega footer -------------------------------- */

/**
 * The footer sitemap.
 *
 * Every entry carries the route it goes to. They were labels with `href="#"`
 * until now, which read as a five-column sitemap and behaved as thirty dead
 * links — the single worst thing on the page for anyone using a keyboard or a
 * screen reader. Nothing here points at a page that does not exist: a heading
 * with no destination was dropped rather than given a placeholder.
 */
export const MEGA_FOOTER = {
  /*
   * Every entry carries its own href — the footer used to render `href="#"`
   * for all of them. Category entries point at the catalogue index with a
   * `?category=` filter rather than inventing per-category routes, because the
   * index already filters on exactly these names.
   */
  columns: [
    {
      title: "Courses",
      links: [
        { label: "Programming", href: "/courses?category=Programming" },
        { label: "AI & Data", href: "/courses?category=Data+%26+AI" },
        { label: "Digital Marketing", href: "/courses?category=Marketing" },
        { label: "Web Development", href: "/courses?category=Web+Development" },
        { label: "Civil & Mechanical", href: "/courses?category=Civil+%26+Mechanical+Engineering" },
        { label: "All Courses", href: "/courses" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Founder", href: "/about/our-founder" },
        { label: "Mission and Vision", href: "/about/mission-and-vision" },
        { label: "AI", href: "/courses?category=AI" },
        { label: "Resources", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Programmes",
      links: [
        { label: "Internship & Training", href: "/internship-training" },
        { label: "After 12th", href: "/after-12th" },
        { label: "Industrial Training", href: trainingPath("industrial-training") },
        { label: "6 Months Training", href: trainingPath("6-months-training") },
        { label: "Summer Internship", href: trainingPath("summer-internship") },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Placement Support", href: "/#outcomes" },
        { label: "Student Reviews", href: "/#stories" },
        { label: "FAQs", href: "/#faq" },
        { label: "Enquire Now", href: CTA.lead },
        { label: "Knowledge Hub", href: "/#blog" },
      ],
    },
  ],
  contact: {
    address: "Techcadd, Hoshiarpur, Punjab",
    phone: "+91 62843 47710",
    whatsapp: "+91 62843 47710",
    email: "info@techcadd.com",
  },
  /*
   * Left empty deliberately: I do not know TechCadd's official handles, and a
   * guessed URL points at somebody else's account. The footer renders only the
   * networks with a URL here, so nothing ships as a dead link. Fill these in
   * and the icons appear.
   */
  social: {
    linkedin: "",
    instagram: "",
    youtube: "",
    facebook: "",
    x: "",
  },
};

/* --------------------------- about page ------------------------------- */

export const MILESTONES = [
  { year: "2016", title: "One classroom in Hoshiarpur", copy: "Techcadd opens with a single lab, a handful of machines, and one conviction: judge a training institute by the careers it starts." },
  { year: "2018", title: "First industry partnerships", copy: "Local software firms begin sending live briefs to our students — the beginning of the live project floor." },
  { year: "2020", title: "Internship programme formalised", copy: "Six-month placements inside working teams become part of the core tracks rather than an optional extra." },
  { year: "2023", title: "AI and cloud labs open", copy: "GPU workstations and cloud sandboxes arrive as the hiring market shifts toward data and infrastructure roles." },
  { year: "2026", title: "25,000 students later", copy: "Alumni working across Bengaluru, Mohali, Gurugram, Pune, Hyderabad and beyond — and the same conviction." },
];

export const FOUNDER = {
  quote:
    "We never wanted to be the biggest institute in Punjab. We wanted to be the one where a student's first job is better than the one they imagined when they walked in. Everything else — the labs, the projects, the mentor hours — exists to serve that single outcome.",
  /* Spelled Gourav, not Gaurav — the image file is named the other way. */
  name: "Mr. Gourav Gupta",
  /** The post. `name` used to carry this, before there was a name to carry. */
  title: "Founder & CEO",
  /** Where, not what — read as the second line under the name. */
  role: "Techcadd, Hoshiarpur",
  /** The three descriptors that sit under the name on the founder page. */
  credentials: [
    "Visionary Entrepreneur",
    "Technology Educator",
    "Skill Development Advocate",
  ],
};

export const VALUES = [
  { title: "Taught by practitioners", copy: "Every trainer ships production code. Answers come from practice, not from a slide deck written three years ago." },
  { title: "Built, not watched", copy: "Students leave with deployed work and a commit history — the things a hiring manager opens first." },
  { title: "Honest counselling", copy: "If a track isn't right for you, we say so before you pay. A wrong enrolment helps nobody." },
  { title: "Support without an expiry", copy: "Doubt sessions, mentor hours and referrals continue after the certificate is printed." },
];
