import {
  Brain, Code2, BarChart3, ShieldCheck, Megaphone, Cloud,
  Rocket, Users, GraduationCap, FlaskConical, Compass, BadgeCheck,
} from "lucide-react";

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
  tiles: [
    { title: "AI & Robotics Lab", tone: "from-blue-600/40 to-cyan-500/20" },
    { title: "Live Project Floor", tone: "from-cyan-500/40 to-blue-600/20" },
    { title: "Placement Drives", tone: "from-cyan-500/35 to-blue-600/25" },
    { title: "Mentor Sessions", tone: "from-blue-500/35 to-sky-500/25" },
  ],
};

/* ------------------------------ courses -------------------------------- */

export const CATEGORIES = [
  { icon: Brain, title: "Artificial Intelligence", copy: "Neural networks, LLMs and computer vision, taught with the maths that makes them work.", gradient: "from-[#2563EB] to-[#2563EB]" },
  { icon: Code2, title: "Full Stack Development", copy: "Front to back, database to deploy — MERN, Java and Next.js.", gradient: "from-[#60A5FA] to-[#C026D3]" },
  { icon: BarChart3, title: "Data Science", copy: "Python, statistics and modelling, plus the storytelling that sells the result.", gradient: "from-[#0891B2] to-[#60A5FA]" },
  { icon: ShieldCheck, title: "Cyber Security", copy: "Offensive and defensive practice on isolated lab networks.", gradient: "from-[#1D4ED8] to-[#3B82F6]" },
  { icon: Megaphone, title: "Digital Marketing", copy: "Performance marketing, SEO and analytics that tie spend to revenue.", gradient: "from-[#DB2777] to-[#60A5FA]" },
  { icon: Cloud, title: "Cloud & DevOps", copy: "AWS, Docker, Kubernetes and pipelines that deploy themselves.", gradient: "from-[#0D9488] to-[#60A5FA]" },
];

export const COURSES = [
  { icon: Brain, title: "AI & Machine Learning", copy: "Build, train and deploy models — from the maths underneath to a system running in production.", duration: "6 months", accent: "#2563EB" },
  { icon: Code2, title: "Full Stack Development", copy: "MERN and Next.js end to end, with real code review and three deployed applications to show for it.", duration: "6 months", accent: "#60A5FA" },
  { icon: BarChart3, title: "Data Science", copy: "Statistics you actually use, SQL you can be tested on, and dashboards a business will act on.", duration: "5 months", accent: "#60A5FA" },
  { icon: ShieldCheck, title: "Cyber Security", copy: "Network defence, threat modelling and hands-on assessment inside a sandboxed lab range.", duration: "6 months", accent: "#2563EB" },
  { icon: Megaphone, title: "Digital Marketing", copy: "Run live campaigns with a real budget, then report on them the way an agency lead expects.", duration: "4 months", accent: "#60A5FA" },
  { icon: Cloud, title: "Cloud & DevOps", copy: "Ship a service, containerise it, automate the pipeline and keep it running under load.", duration: "5 months", accent: "#60A5FA" },
];

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
  { id: "fullstack", label: "Full Stack Development", short: "Full Stack", accent: "#2563EB",
    tech: ["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript"],
    projects: ["E-Commerce Platform", "CRM Dashboard", "Job Portal", "Admin Panel"],
    industries: ["SaaS Products", "Startups", "Enterprise Applications"],
    careers: ["Frontend Developer", "Backend Developer", "MERN Developer", "Full Stack Engineer"],
    placement: "95% Placement Assistance" },
  { id: "ai", label: "Artificial Intelligence", short: "AI", accent: "#2563EB",
    tech: ["PyTorch", "TensorFlow", "LLMs", "OpenCV", "Hugging Face", "MLOps"],
    projects: ["Document Q&A with RAG", "Defect detection on a factory line", "Recommendation engine", "Vision inspection pipeline"],
    industries: ["Support Automation", "Quality Inspection", "Personalisation"],
    careers: ["ML Engineer", "AI Developer", "Computer Vision Engineer", "Applied Researcher"],
    placement: "95% Placement Assistance" },
  { id: "cloud", label: "Cloud & DevOps", short: "Cloud & DevOps", accent: "#3B82F6",
    tech: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"],
    projects: ["Zero-downtime deploy pipeline", "Serverless image pipeline", "Autoscaling K8s cluster", "Infrastructure as code"],
    industries: ["Infrastructure Migration", "Release Automation", "Platform Reliability"],
    careers: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"],
    placement: "95% Placement Assistance" },
  { id: "security", label: "Cybersecurity", short: "Cyber Security", accent: "#1D4ED8",
    tech: ["Linux", "Networking", "SIEM", "Burp Suite", "Wireshark", "Threat Modelling"],
    projects: ["Internal network assessment", "SIEM alert tuning", "Web app security audit", "Incident response drill"],
    industries: ["Incident Response", "Compliance Readiness", "Perimeter Defence"],
    careers: ["Security Analyst", "SOC Engineer", "Penetration Tester", "Security Consultant"],
    placement: "95% Placement Assistance" },
  { id: "data", label: "Data Analytics", short: "Data Analytics", accent: "#60A5FA",
    tech: ["Python", "Pandas", "SQL", "Power BI", "Tableau", "Statistics"],
    projects: ["Churn prediction model", "Sales analytics dashboard", "Pricing experiment analysis", "Customer segmentation"],
    industries: ["Retention Strategy", "Demand Forecasting", "Executive Reporting"],
    careers: ["Data Analyst", "Data Scientist", "BI Developer", "Analytics Consultant"],
    placement: "95% Placement Assistance" },
  { id: "marketing", label: "Digital Marketing", short: "Digital Marketing", accent: "#60A5FA",
    tech: ["SEO", "Meta Ads", "Google Ads", "GA4", "Content", "Marketing Automation"],
    projects: ["Full-funnel campaign with live budget", "SEO audit and rebuild", "Lifecycle email flow", "Landing page CRO test"],
    industries: ["Lead Generation", "Brand Growth", "Attribution Reporting"],
    careers: ["Performance Marketer", "SEO Specialist", "Growth Analyst", "Campaign Manager"],
    placement: "95% Placement Assistance" },
  { id: "cad", label: "CAD / CAM", short: "CAD / CAM", accent: "#0D9488",
    tech: ["AutoCAD", "SolidWorks", "CATIA", "Creo", "ANSYS", "NX CAM"],
    projects: ["Parametric part library", "Sheet metal enclosure", "CNC toolpath programme", "Assembly and GD&T drawing set"],
    industries: ["Manufacturing", "Automotive", "Architecture & Interiors"],
    careers: ["Design Engineer", "CAD Draughtsman", "CAM Programmer", "Product Designer"],
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
  actions: [
    { label: "Book Demo", href: "#demo", primary: true },
    { label: "Talk to Counsellor", href: "#counsellor", primary: false },
    { label: "Download Brochure", href: "#brochure", primary: false },
  ],
  metrics: [
    { value: 15000, suffix: "K+", label: "Students", display: 15 },
    { value: 750, suffix: "+", label: "Reviews", display: 750 },
    { value: 4.9, suffix: "", label: "Rating", display: 4.9 },
  ],
};

/* ------------------------- mega footer -------------------------------- */

export const MEGA_FOOTER = {
  columns: [
    { title: "Courses", links: ["Artificial Intelligence", "Full Stack Development", "Data Science", "Cyber Security", "Digital Marketing", "Cloud & DevOps"] },
    { title: "Career Tracks", links: ["MERN Developer", "Data Analyst", "ML Engineer", "Cloud Engineer", "Security Analyst", "Performance Marketer"] },
    { title: "Resources", links: ["Knowledge Hub", "Student Success", "Technology Universe", "Career Roadmap", "Help Center"] },
    { title: "Company", links: ["About Us", "Our Labs", "Mentor Network", "Careers at Techcadd", "Contact"] },
    { title: "Support", links: ["Admissions", "Fees & Instalments", "Batch Schedules", "Doubt Sessions", "Alumni Support"] },
  ],
  contact: {
    address: "Techcadd, Hoshiarpur, Punjab",
    phone: "+91 00000 00000",
    whatsapp: "+91 00000 00000",
    email: "hello@techcadd.com",
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
  name: "Founder & Director",
  role: "Techcadd, Hoshiarpur",
};

export const VALUES = [
  { title: "Taught by practitioners", copy: "Every trainer ships production code. Answers come from practice, not from a slide deck written three years ago." },
  { title: "Built, not watched", copy: "Students leave with deployed work and a commit history — the things a hiring manager opens first." },
  { title: "Honest counselling", copy: "If a track isn't right for you, we say so before you pay. A wrong enrolment helps nobody." },
  { title: "Support without an expiry", copy: "Doubt sessions, mentor hours and referrals continue after the certificate is printed." },
];
