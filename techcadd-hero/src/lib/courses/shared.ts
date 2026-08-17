import type { Comparison, Faq, Instructor } from "./types";

/**
 * Defaults every course inherits unless it overrides them. This is what keeps
 * a new course to a handful of lines: only the parts that genuinely differ
 * between programmes need to be written out.
 */

export const DEFAULT_COMPARISON: Comparison = {
  columns: ["TechCadd", "Free videos", "Self study", "Generic courses"],
  rows: [
    { feature: "Structured curriculum", values: [true, false, false, true] },
    { feature: "Mentor support", values: [true, false, false, "partial"] },
    { feature: "Guided projects", values: [true, "partial", "partial", true] },
    { feature: "Doubt sessions", values: [true, false, false, "partial"] },
    { feature: "Code review on your work", values: [true, false, false, "partial"] },
    { feature: "Career guidance", values: [true, false, false, "partial"] },
  ],
};

export const DEFAULT_INSTRUCTOR: Instructor = {
  heading: "Why learn with us?",
  intro:
    "Every trainer here still ships production code. That is the whole basis of the teaching: answers come from current practice rather than from a slide deck written three years ago.",
  points: [
    {
      title: "Practitioners, not presenters",
      copy: "Sessions are run by engineers working on live systems, so the examples come from real codebases.",
    },
    {
      title: "Project-based from week one",
      copy: "You build as you learn. Each module ends in something that runs, not in a quiz.",
    },
    {
      title: "Personalised guidance",
      copy: "Small batches mean your mentor knows what you are stuck on and what you are aiming at.",
    },
    {
      title: "Doubt support that continues",
      copy: "Doubt sessions and mentor hours carry on after the certificate is printed.",
    },
  ],
};

/** Questions every course answers the same way. */
export const COMMON_FAQS: Faq[] = [
  {
    q: "Is the course online or offline?",
    a: "Both. Batches run at the Hoshiarpur campus and online, covering identical material, so you can switch format if your schedule changes.",
  },
  {
    q: "Do I get doubt support?",
    a: "Yes. Scheduled doubt sessions run alongside the batch, and mentor hours continue after you finish the programme.",
  },
  {
    q: "Is certification provided?",
    a: "Yes. You receive a completion certificate, and where a track has a recognised vendor exam we prepare you for it.",
  },
  {
    q: "Will I work on real projects?",
    a: "Yes. Every module ends in built work, and the programme finishes with a portfolio project that goes through code review.",
  },
];

/** Audience blocks reused across the more general programmes. */
export const COMMON_AUDIENCE = {
  beginners: {
    label: "Beginners",
    copy: "No prior experience needed — the first modules start from fundamentals.",
  },
  students: {
    label: "College students",
    copy: "Fits alongside a degree, with weekend and evening batches covering the same syllabus.",
  },
  freshers: {
    label: "Freshers",
    copy: "Build the portfolio and interview practice that a first role actually asks for.",
  },
  professionals: {
    label: "Working professionals",
    copy: "Weekend batches and 1-on-1 mentoring for people training without taking leave.",
  },
  switchers: {
    label: "Career switchers",
    copy: "A structured route in from another field, with guidance on how to position the move.",
  },
  freelancers: {
    label: "Freelancers",
    copy: "Skills you can bill for, plus the delivery habits clients expect.",
  },
  entrepreneurs: {
    label: "Entrepreneurs",
    copy: "Enough hands-on depth to build, brief or evaluate the work yourself.",
  },
} as const;

/** "Why this program" cards most courses share. */
export const COMMON_WHY = [
  {
    title: "Industry-oriented curriculum",
    copy: "Built backwards from live job descriptions and rewritten as the stack moves.",
  },
  {
    title: "Hands-on from day one",
    copy: "You spend more time building than watching. Every concept lands in working code.",
  },
  {
    title: "Mentor guidance",
    copy: "Small batches, direct access to your trainer, and reviews on the work you produce.",
  },
  {
    title: "Real-world tools",
    copy: "The same editors, version control and deployment tooling teams use in production.",
  },
  {
    title: "Interview preparation",
    copy: "Mock rounds, portfolio review and the questions this particular role gets asked.",
  },
  {
    title: "Career-focused outcome",
    copy: "The programme ends with work you can show and a plan for the roles you are targeting.",
  },
];
