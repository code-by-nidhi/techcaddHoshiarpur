/**
 * Training and internship formats, and the source for both the mega menu and
 * the /internship-training routes.
 *
 * These are formats rather than courses: a format says how long you attend,
 * what you produce and what you leave with, while the subject itself comes
 * from the course catalogue. That is why this is a lighter shape than
 * `Course` — inventing modules and projects per format would duplicate the
 * catalogue and get stale.
 *
 * Durations and inclusions here are scaffolding. Check them against what
 * TechCadd actually runs before this is published.
 */

export type TrainingCategory = "short-term" | "long-term" | "programmes";

export type Programme = {
  slug: string;
  title: string;
  category: TrainingCategory;
  badge?: string;
  /** shown under the title on the detail page and in listings */
  summary: string;
  duration: string;
  /** who the format is designed around */
  audience: string;
  /** what a student actually gets */
  includes: string[];
  outcomes: string[];
};

export const CATEGORY_META: Record<
  TrainingCategory,
  { id: string; heading: string; description: string }
> = {
  "short-term": {
    id: "short-term",
    heading: "Short Term",
    description: "Summer, winter and university-mandated batches",
  },
  "long-term": {
    id: "long-term",
    heading: "Long Term",
    description: "Deeper tracks that finish with live projects",
  },
  programmes: {
    id: "programmes",
    heading: "Programmes",
    description: "Industry placement and internship letters",
  },
};

const COMMON_INCLUDES = [
  "Training certificate on completion",
  "Mentor hours with working engineers",
  "Access to the lab outside class time",
];

export const PROGRAMMES: Programme[] = [
  /* ------------------------------ short term ------------------------------ */
  {
    slug: "45-days-training",
    title: "45 Days Training",
    category: "short-term",
    badge: "Trending",
    summary: "The standard university summer requirement, built around one working project.",
    duration: "45 days",
    audience: "Engineering and BCA students with a summer training requirement",
    includes: ["One subject track of your choice", "A project you build and present", "Training letter for your college", ...COMMON_INCLUDES],
    outcomes: ["Complete the college training requirement", "Ship one project end to end", "Present work to a reviewer"],
  },
  {
    slug: "6-weeks-training",
    title: "6 Weeks Training",
    category: "short-term",
    badge: "Trending",
    summary: "Six focused weeks on a single track, ending with a reviewed project.",
    duration: "6 weeks",
    audience: "Students whose curriculum specifies a six-week training block",
    includes: ["One subject track", "Weekly code review", "Training letter for your college", ...COMMON_INCLUDES],
    outcomes: ["Working knowledge of one stack", "A reviewed project in your portfolio", "A completion letter"],
  },
  {
    slug: "2-months-training",
    title: "2 Months Training",
    category: "short-term",
    summary: "Enough time to cover fundamentals properly and still build something real.",
    duration: "2 months",
    audience: "Students with a longer summer window, or anyone starting from scratch",
    includes: ["One subject track", "Two projects", "Interview preparation session", ...COMMON_INCLUDES],
    outcomes: ["Fundamentals covered without rushing", "Two projects to show", "A first pass at interview questions"],
  },
  {
    slug: "summer-internship",
    title: "Summer Internship",
    category: "short-term",
    summary: "Summer months spent on the project floor rather than in a classroom.",
    duration: "6 to 8 weeks",
    audience: "Students on summer break looking for practical experience",
    includes: ["A place on a project team", "Sprint planning and code review", "Internship letter", ...COMMON_INCLUDES],
    outcomes: ["Experience of a working team", "A shipped feature", "An internship letter"],
  },
  {
    slug: "winter-internship",
    title: "Winter Internship",
    category: "short-term",
    summary: "The same project-floor experience, run over the winter break.",
    duration: "4 to 6 weeks",
    audience: "Students on winter break, and final-year students building a portfolio",
    includes: ["A place on a project team", "Sprint planning and code review", "Internship letter", ...COMMON_INCLUDES],
    outcomes: ["Experience of a working team", "A shipped feature", "An internship letter"],
  },

  /* ------------------------------- long term ------------------------------ */
  {
    slug: "4-months-training",
    title: "4 Months Training",
    category: "long-term",
    summary: "A full track with time for depth, revision and a substantial project.",
    duration: "4 months",
    audience: "Final-year students and career switchers",
    includes: ["A complete subject track", "Two to three projects", "Interview preparation", "Placement support", ...COMMON_INCLUDES],
    outcomes: ["Job-ready depth in one track", "A portfolio worth sending", "Interview practice with feedback"],
  },
  {
    slug: "6-months-training",
    title: "6 Months Training",
    category: "long-term",
    summary: "The full programme: fundamentals, specialisation, live projects and placement support.",
    duration: "6 months",
    audience: "Students on a six-month industrial training requirement, and career switchers",
    includes: ["A complete subject track plus a specialisation", "Live client project", "Interview preparation", "Placement support", ...COMMON_INCLUDES],
    outcomes: ["Depth across a full stack", "Live project experience", "Placement support until you land a role"],
  },
  {
    slug: "industrial-project-training",
    title: "Industrial Project Training",
    category: "long-term",
    summary: "Project-first: you join a brief already in progress and ship against it.",
    duration: "3 to 6 months",
    audience: "Students who already have fundamentals and want delivery experience",
    includes: ["A real client brief", "Sprint planning, review and release", "Project completion letter", ...COMMON_INCLUDES],
    outcomes: ["Experience of a real delivery cycle", "Work you can talk through in detail", "A project letter"],
  },
  {
    slug: "full-stack-internship",
    title: "Full Stack Internship",
    category: "long-term",
    summary: "Front end, back end and deployment, on a team building something real.",
    duration: "6 months",
    audience: "Students targeting full stack developer roles",
    includes: ["Front end and back end work", "Database and deployment", "Code review", "Placement support", ...COMMON_INCLUDES],
    outcomes: ["Confidence across the whole stack", "A deployed application", "An internship letter"],
  },
  {
    slug: "job-ready-program",
    title: "Job Ready Program",
    category: "long-term",
    summary: "Built backwards from the interview: skills, portfolio, practice, referrals.",
    duration: "6 months",
    audience: "Anyone whose next step is a first job in tech",
    includes: ["A complete subject track", "Portfolio review", "Mock interviews", "Referrals to hiring partners", ...COMMON_INCLUDES],
    outcomes: ["A portfolio a hiring manager will open", "Interview practice under pressure", "Introductions to hiring partners"],
  },

  /* ------------------------------ programmes ------------------------------ */
  {
    slug: "industrial-training",
    title: "Industrial Training",
    category: "programmes",
    badge: "Trending",
    summary: "The university-recognised format, with the paperwork colleges ask for.",
    duration: "6 weeks to 6 months",
    audience: "Students with an industrial training requirement from their university",
    includes: ["Choice of duration to match your syllabus", "Project work and a report", "Training letter and certificate", ...COMMON_INCLUDES],
    outcomes: ["Requirement met with documentation", "A project and a written report", "Something real to present"],
  },
  {
    slug: "internship-program",
    title: "Internship Program",
    category: "programmes",
    summary: "A place on a working team, with the letter at the end of it.",
    duration: "6 weeks to 6 months",
    audience: "Students and freshers who need documented internship experience",
    includes: ["A place on a project team", "Mentor supervision", "Internship letter", ...COMMON_INCLUDES],
    outcomes: ["Documented internship experience", "Work produced under supervision", "A reference"],
  },
  {
    slug: "live-project-program",
    title: "Live Project Program",
    category: "programmes",
    summary: "Real client briefs taken through sprint planning, review and release.",
    duration: "8 to 12 weeks",
    audience: "Students who have the theory and need delivery practice",
    includes: ["A live client brief", "Sprint planning and standups", "Code review before release", ...COMMON_INCLUDES],
    outcomes: ["The rituals of a working team", "Shipped work with your name on it", "A project letter"],
  },
  {
    slug: "placement-assistance-program",
    title: "Placement Assistance Program",
    category: "programmes",
    summary: "Portfolio, interview practice and introductions, until you land a role.",
    duration: "Runs until you are placed",
    audience: "Students finishing a track, and alumni looking to move",
    includes: ["Portfolio and CV review", "Mock interviews with feedback", "Referrals to hiring partners", "Support that does not expire"],
    outcomes: ["A CV and portfolio that get replies", "Interview practice with real feedback", "Introductions to hiring partners"],
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    category: "programmes",
    summary: "Team training built around your stack and delivered on your schedule.",
    duration: "Scoped per engagement",
    audience: "Companies upskilling an existing team",
    includes: ["Curriculum scoped to your stack", "On-site or online delivery", "Progress reporting", "Certificates for participants"],
    outcomes: ["A team levelled up on one stack", "Training mapped to your codebase", "Reporting you can show internally"],
  },
];

export const programmeSlugs = () => PROGRAMMES.map((p) => p.slug);

export const getProgramme = (slug: string) => PROGRAMMES.find((p) => p.slug === slug);

export const programmesByCategory = (category: TrainingCategory) =>
  PROGRAMMES.filter((p) => p.category === category);

if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const p of PROGRAMMES) {
    if (seen.has(p.slug)) throw new Error(`Duplicate programme slug: ${p.slug}`);
    seen.add(p.slug);
  }
}
