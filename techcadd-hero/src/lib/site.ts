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
    { title: "Live Project Floor", tone: "from-violet-600/40 to-blue-600/20" },
    { title: "Placement Drives", tone: "from-cyan-500/35 to-violet-600/25" },
    { title: "Mentor Sessions", tone: "from-blue-500/35 to-indigo-600/25" },
  ],
};

/* ------------------------------ courses -------------------------------- */

export const CATEGORIES = [
  { icon: Brain, title: "Artificial Intelligence", copy: "Neural networks, LLMs and computer vision, taught with the maths that makes them work.", gradient: "from-[#2563EB] to-[#4F46E5]" },
  { icon: Code2, title: "Full Stack Development", copy: "Front to back, database to deploy — MERN, Java and Next.js.", gradient: "from-[#7C3AED] to-[#C026D3]" },
  { icon: BarChart3, title: "Data Science", copy: "Python, statistics and modelling, plus the storytelling that sells the result.", gradient: "from-[#0891B2] to-[#06B6D4]" },
  { icon: ShieldCheck, title: "Cyber Security", copy: "Offensive and defensive practice on isolated lab networks.", gradient: "from-[#1D4ED8] to-[#0EA5E9]" },
  { icon: Megaphone, title: "Digital Marketing", copy: "Performance marketing, SEO and analytics that tie spend to revenue.", gradient: "from-[#DB2777] to-[#7C3AED]" },
  { icon: Cloud, title: "Cloud & DevOps", copy: "AWS, Docker, Kubernetes and pipelines that deploy themselves.", gradient: "from-[#0D9488] to-[#06B6D4]" },
];

export const COURSES = [
  { icon: Brain, title: "AI & Machine Learning", copy: "Build, train and deploy models — from the maths underneath to a system running in production.", duration: "6 months", accent: "#2563EB" },
  { icon: Code2, title: "Full Stack Development", copy: "MERN and Next.js end to end, with real code review and three deployed applications to show for it.", duration: "6 months", accent: "#7C3AED" },
  { icon: BarChart3, title: "Data Science", copy: "Statistics you actually use, SQL you can be tested on, and dashboards a business will act on.", duration: "5 months", accent: "#06B6D4" },
  { icon: ShieldCheck, title: "Cyber Security", copy: "Network defence, threat modelling and hands-on assessment inside a sandboxed lab range.", duration: "6 months", accent: "#2563EB" },
  { icon: Megaphone, title: "Digital Marketing", copy: "Run live campaigns with a real budget, then report on them the way an agency lead expects.", duration: "4 months", accent: "#7C3AED" },
  { icon: Cloud, title: "Cloud & DevOps", copy: "Ship a service, containerise it, automate the pipeline and keep it running under load.", duration: "5 months", accent: "#06B6D4" },
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

/* -------------------------- student wall ------------------------------ */

export type Review = {
  name: string;
  course: string;
  badge: string;
  rating: number;
  tone: string;
  quote: string;
  featured?: boolean;
};

export const WALL: Review[] = [
  {
    name: "Harmanpreet Singh", course: "Full Stack Development", badge: "Placed as MERN Developer",
    rating: 5, tone: "from-[#2563EB] to-[#4F46E5]", featured: true,
    quote: "I walked in with a commerce degree and no idea what an API was. Eighteen weeks later I was reviewing pull requests. Three deployed projects and a clean commit history did more for me in interviews than any certificate — the code reviews here were brutal in the best possible way, and that is exactly what made the difference when someone finally asked me to explain my architecture.",
  },
  { name: "Simranjeet Kaur", course: "Data Science", badge: "Data Analyst", rating: 5, tone: "from-[#0891B2] to-[#06B6D4]",
    quote: "The SQL and statistics modules were relentless, and that is exactly why the interview felt easy." },
  { name: "Aditya Malhotra", course: "AI & Machine Learning", badge: "Placed as Python Developer", rating: 5, tone: "from-[#4F46E5] to-[#7C3AED]",
    quote: "The internship put me on a real model in production. I stopped learning about ML and started doing it." },
  { name: "Navjot Kaur", course: "Cloud & DevOps", badge: "Internship Completed", rating: 5, tone: "from-[#0D9488] to-[#06B6D4]",
    quote: "Mock interviews were the turning point. By the fourth one I could defend my design decisions without freezing." },
  { name: "Rahul Verma", course: "Cyber Security", badge: "Portfolio Ready", rating: 4, tone: "from-[#2563EB] to-[#0EA5E9]",
    quote: "The lab range is the difference. Reading about threat hunting and doing it on a live network are not the same skill." },
  { name: "Ishita Sharma", course: "Full Stack Development", badge: "Frontend Engineer", rating: 5, tone: "from-[#7C3AED] to-[#C026D3]",
    quote: "Weekend batches meant I never had to choose between my degree and this. Same syllabus, same trainers." },
  { name: "Karan Chadha", course: "Digital Marketing", badge: "Portfolio Ready", rating: 5, tone: "from-[#DB2777] to-[#7C3AED]",
    quote: "Running live campaigns with a real budget taught me more in a month than a year of theory." },
  { name: "Manpreet Gill", course: "Data Science", badge: "Internship Completed", rating: 5, tone: "from-[#1D4ED8] to-[#06B6D4]",
    quote: "My mentor still reviews my work a year after the course ended. That part nobody advertises." },
];

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
  accent: string;
  tech: string[];
  projects: string[];
  useCases: string[];
  careers: string[];
};

export const UNIVERSE: Domain[] = [
  { id: "programming", label: "Programming", accent: "#2563EB",
    tech: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
    projects: ["Inventory management system", "REST API with auth", "Algorithm visualiser"],
    useCases: ["Core engineering interviews", "Automation scripting", "Systems fundamentals"],
    careers: ["Software Engineer", "Backend Developer", "Automation Engineer"] },
  { id: "ai", label: "Artificial Intelligence", accent: "#4F46E5",
    tech: ["PyTorch", "TensorFlow", "LLMs", "OpenCV", "Hugging Face", "MLOps"],
    projects: ["Document Q&A with RAG", "Defect detection on a factory line", "Recommendation engine"],
    useCases: ["Support automation", "Quality inspection", "Personalisation"],
    careers: ["ML Engineer", "AI Developer", "Applied Researcher"] },
  { id: "data", label: "Data Science", accent: "#06B6D4",
    tech: ["Pandas", "NumPy", "Power BI", "Tableau", "Statistics", "A/B Testing"],
    projects: ["Churn prediction model", "Sales analytics dashboard", "Pricing experiment analysis"],
    useCases: ["Retention strategy", "Demand forecasting", "Executive reporting"],
    careers: ["Data Analyst", "Data Scientist", "BI Developer"] },
  { id: "cloud", label: "Cloud", accent: "#0EA5E9",
    tech: ["AWS", "Azure", "S3", "Lambda", "IAM", "CloudWatch"],
    projects: ["Serverless image pipeline", "Multi-tier VPC deployment", "Cost-optimised migration"],
    useCases: ["Infrastructure migration", "Elastic scaling", "Disaster recovery"],
    careers: ["Cloud Engineer", "Solutions Architect", "Cloud Support Engineer"] },
  { id: "devops", label: "DevOps", accent: "#0D9488",
    tech: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "Prometheus"],
    projects: ["Zero-downtime deploy pipeline", "Autoscaling K8s cluster", "Infra as code from scratch"],
    useCases: ["Release automation", "Observability", "Platform reliability"],
    careers: ["DevOps Engineer", "SRE", "Platform Engineer"] },
  { id: "security", label: "Cybersecurity", accent: "#1D4ED8",
    tech: ["Linux", "Networking", "SIEM", "Burp Suite", "Wireshark", "Threat Modelling"],
    projects: ["Internal network assessment", "SIEM alert tuning", "Web app security audit"],
    useCases: ["Incident response", "Compliance readiness", "Perimeter defence"],
    careers: ["Security Analyst", "SOC Engineer", "Penetration Tester"] },
  { id: "marketing", label: "Digital Marketing", accent: "#7C3AED",
    tech: ["SEO", "Meta Ads", "Google Ads", "GA4", "Content", "Marketing Automation"],
    projects: ["Full-funnel campaign with live budget", "SEO audit and rebuild", "Lifecycle email flow"],
    useCases: ["Lead generation", "Brand growth", "Attribution reporting"],
    careers: ["Performance Marketer", "SEO Specialist", "Growth Analyst"] },
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
];

export const COMMAND_METRICS = [
  { label: "Live projects", value: 1000, suffix: "+" },
  { label: "Students on campus", value: 1800, suffix: "" },
  { label: "Google reviews", value: 750, suffix: "+" },
  { label: "Training hours delivered", value: 96000, suffix: "+" },
  { label: "Course completion rate", value: 92, suffix: "%" },
];

/* --------------------------- help center ------------------------------ */

export const HELP_CATEGORIES = ["Admissions", "Fees", "Placements", "Internships", "Training", "Support"] as const;

export const HELP: { category: (typeof HELP_CATEGORIES)[number]; q: string; a: string }[] = [
  { category: "Admissions", q: "Do I need a technical background to start?", a: "No. Around a third of each batch comes from non-technical degrees. Counselling exists to place you in a track that matches where you're starting from, and the foundation modules assume nothing." },
  { category: "Admissions", q: "When do new batches begin?", a: "New batches open every month across weekday, evening and weekend slots. Your counsellor will tell you the next start date for the track you're considering." },
  { category: "Admissions", q: "Can I switch tracks after enrolling?", a: "Yes, within the first two weeks. If the fit isn't right, we move you across and adjust the schedule rather than leaving you to struggle through." },
  { category: "Fees", q: "Are there instalment options?", a: "Yes. Most programmes can be paid in two or three instalments across the duration of the course. Details are confirmed at counselling, in writing." },
  { category: "Fees", q: "Is there a fee for repeating a module?", a: "No. If you fall behind, you can repeat the module with a later batch at no extra cost." },
  { category: "Placements", q: "How does placement assistance actually work?", a: "Resume reviews, mock technical and HR rounds, on-campus drives with recruiting companies, and direct referrals from mentors. Support continues after your course ends until you're placed." },
  { category: "Placements", q: "How long does placement support last?", a: "It doesn't expire on a fixed date. Students stay in the drive and referral pipeline until they land a role." },
  { category: "Internships", q: "Are the internships paid?", a: "Most six-month internships carry a stipend, which varies by company and role. Your counsellor will tell you exactly what applies to your track." },
  { category: "Internships", q: "Is the internship guaranteed?", a: "Internship placement is part of the six-month tracks, subject to completing the training modules and project work that come before it." },
  { category: "Training", q: "Can I attend while working or studying full time?", a: "Yes. Weekend batches run Saturday and Sunday, evening batches run on weekdays. Both cover identical material — only the schedule differs." },
  { category: "Training", q: "What happens if I miss classes?", a: "Sessions are recorded and lab access continues outside class hours. Doubt sessions exist precisely for catching up." },
  { category: "Support", q: "Can I get help after the course ends?", a: "Yes. Alumni keep access to doubt sessions, mentor hours and the referral network." },
  { category: "Support", q: "Is there a certificate at the end?", a: "Yes, an industry-recognised completion certificate, plus certification prep for vendor exams like AWS and Microsoft where the track calls for it." },
];

/* -------------------------- knowledge hub ----------------------------- */

export type Post = {
  title: string;
  excerpt: string;
  category: "MERN" | "AI" | "Data Science" | "Career" | "Cloud";
  author: string;
  role: string;
  minutes: number;
  date: string;
  trending?: boolean;
  tone: string;
};

export const POSTS: Post[] = [
  { title: "What a hiring manager actually looks for in a fresher's GitHub", excerpt: "Commit history, README quality and one finished project beat ten abandoned tutorials. Here's what gets read first, and what gets skipped entirely.", category: "Career", author: "Ravi Sethi", role: "Placement Lead", minutes: 8, date: "Aug 2026", trending: true, tone: "from-[#2563EB] to-[#4F46E5]" },
  { title: "Building your first RAG pipeline without drowning in frameworks", excerpt: "Chunking, embeddings, retrieval and the three mistakes that make answers worse than no retrieval at all.", category: "AI", author: "Dr. Neha Arora", role: "AI Track Mentor", minutes: 11, date: "Aug 2026", trending: true, tone: "from-[#4F46E5] to-[#7C3AED]" },
  { title: "The MERN stack in 2026: what changed and what didn't", excerpt: "Server components shifted the front end, but the fundamentals interviewers test have barely moved.", category: "MERN", author: "Amit Khanna", role: "Full Stack Mentor", minutes: 9, date: "Jul 2026", trending: true, tone: "from-[#0891B2] to-[#06B6D4]" },
  { title: "SQL questions that decide data analyst interviews", excerpt: "Window functions, self joins and the query patterns that come up in almost every round.", category: "Data Science", author: "Priya Bansal", role: "Data Science Mentor", minutes: 7, date: "Jul 2026", tone: "from-[#0D9488] to-[#06B6D4]" },
  { title: "From lab to production: your first deployment on AWS", excerpt: "IAM, networking and the cost traps that catch every first-time deployer.", category: "Cloud", author: "Sahil Bedi", role: "Cloud & DevOps Mentor", minutes: 10, date: "Jul 2026", tone: "from-[#1D4ED8] to-[#0EA5E9]" },
  { title: "Six months of internship, honestly reviewed", excerpt: "What students actually do in a working team, and how to make the experience count on a CV.", category: "Career", author: "Ravi Sethi", role: "Placement Lead", minutes: 6, date: "Jun 2026", tone: "from-[#7C3AED] to-[#C026D3]" },
];

export const TOPICS = ["MERN", "AI", "Data Science", "Career", "Cloud", "Interviews", "Internships", "Portfolio"];

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
