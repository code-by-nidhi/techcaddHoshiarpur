/**
 * After 12th certificate programmes — the source for the mega menu and the
 * /after-12th routes.
 *
 * A programme is a *pathway*, not a course: it says how long the certificate
 * takes and which catalogue courses it is built from. That is why these pages
 * link to `/courses/<slug>` rather than restating a syllabus — publishing the
 * same curriculum at two URLs would split the SEO and drift apart the moment
 * one is edited.
 *
 * Durations and groupings here are scaffolding. Check them against what
 * TechCadd actually certifies before this is published.
 */

export type After12Category = "6-month-certificates" | "1-year-certificates" | "civil-mechanical";

export type After12Programme = {
  slug: string;
  title: string;
  category: After12Category;
  badge?: string;
  duration: string;
  summary: string;
  /** catalogue slugs this pathway is built from; may be empty */
  courseSlugs: string[];
  /**
   * Optional artwork for this pathway. When absent the hero falls back to the
   * first linked course's image, then to the shared default — so a pathway
   * always has a hero without needing its own file.
   */
  heroImage?: string;
};

export const AFTER12_CATEGORY_META: Record<
  After12Category,
  { id: string; heading: string; description: string }
> = {
  "6-month-certificates": {
    id: "six-month",
    heading: "6 Month Certificates",
    description: "One skill, job-ready in half a year",
  },
  "1-year-certificates": {
    id: "one-year",
    heading: "1 Year Certificates",
    description: "Full programmes with internship and placement",
  },
  "civil-mechanical": {
    id: "engineering",
    heading: "Civil / Mechanical",
    description: "Design and drafting for engineering streams",
  },
};

export const AFTER12_PROGRAMMES: After12Programme[] = [
  /* --------------------------- 6 month certificates --------------------- */
  {
    slug: "digital-marketing-communication",
    title: "Digital Marketing & Communication",
    category: "6-month-certificates",
    duration: "6 months",
    summary: "Campaigns, content and the writing that carries them, ending in a live campaign.",
    courseSlugs: ["digital-marketing", "seo", "social-media-marketing"],
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    category: "6-month-certificates",
    duration: "6 months",
    summary: "Programming from first principles, then automation and a portfolio of working scripts.",
    courseSlugs: ["python-programming"],
  },
  {
    slug: "machine-learning-ai",
    title: "Machine Learning & AI",
    category: "6-month-certificates",
    badge: "Trending",
    duration: "6 months",
    summary: "The maths that matters, then models you train, evaluate and deploy.",
    courseSlugs: ["machine-learning", "artificial-intelligence"],
  },

  /* ---------------------------- 1 year certificates --------------------- */
  {
    slug: "generative-ai",
    title: "Generative AI",
    category: "1-year-certificates",
    badge: "Trending",
    duration: "1 year",
    summary: "A full year on generative systems, from prompting through retrieval to agents.",
    courseSlugs: ["generative-ai", "prompt-engineering", "rag-retrieval-augmented-generation", "agentic-ai"],
  },
  {
    slug: "cloud-computing-devops",
    title: "Cloud Computing & DevOps",
    category: "1-year-certificates",
    duration: "1 year",
    summary: "Infrastructure, pipelines and the operational side of shipping software.",
    courseSlugs: [],
  },
  {
    slug: "ai-data-science",
    title: "AI & Data Science",
    category: "1-year-certificates",
    duration: "1 year",
    summary: "Analysis, visualisation and modelling, built around a portfolio of real datasets.",
    courseSlugs: ["data-science", "data-analytics", "power-bi", "tableau"],
  },
  {
    slug: "machine-learning-deep-learning",
    title: "Machine Learning & Deep Learning",
    category: "1-year-certificates",
    duration: "1 year",
    summary: "Classical models first, then neural networks and the training loop in depth.",
    courseSlugs: ["machine-learning", "deep-learning"],
  },

  /* ----------------------------- civil / mechanical --------------------- */
  {
    slug: "autocad",
    title: "AutoCAD",
    category: "civil-mechanical",
    duration: "3 to 6 months",
    summary: "2D drafting to a company standard, with templates, dimensioning and plotting.",
    courseSlugs: ["autocad"],
  },
  {
    slug: "solidworks",
    title: "SolidWorks",
    category: "civil-mechanical",
    duration: "3 to 6 months",
    summary: "Parametric modelling, assemblies and drawings for mechanical design.",
    courseSlugs: ["solidworks"],
  },
  /* These two have no catalogue course to borrow artwork from, so they carry
     their own rather than falling through to the shared default hero. */
  {
    slug: "3ds-max",
    title: "3ds Max",
    category: "civil-mechanical",
    duration: "3 to 6 months",
    summary: "Modelling, materials and rendering for architectural visualisation.",
    heroImage: "/images/courses/civil-mechanical/3ds-max.jpeg",
    courseSlugs: [],
  },
  {
    slug: "revit",
    title: "Revit",
    category: "civil-mechanical",
    duration: "3 to 6 months",
    summary: "BIM modelling, families and construction documentation.",
    heroImage: "/images/courses/civil-mechanical/revit.jpeg",
    courseSlugs: [],
  },
];

/** Shown when a pathway has no artwork and no linked course to borrow from. */
export const DEFAULT_AFTER12_HERO = "/images/courses/default-course.webp";

export const after12Slugs = () => AFTER12_PROGRAMMES.map((p) => p.slug);

export const getAfter12 = (slug: string) => AFTER12_PROGRAMMES.find((p) => p.slug === slug);

export const after12ByCategory = (category: After12Category) =>
  AFTER12_PROGRAMMES.filter((p) => p.category === category);

if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const p of AFTER12_PROGRAMMES) {
    if (seen.has(p.slug)) throw new Error(`Duplicate After 12th slug: ${p.slug}`);
    seen.add(p.slug);
  }
}
