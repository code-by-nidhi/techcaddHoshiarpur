/**
 * Content for the AI mega menu.
 *
 * `pending: true` marks a topic that has no course page of its own yet — those
 * links fall back to the Artificial Intelligence course so nothing dead-ends.
 * Give any of them a real slug in the catalogue and just swap the href here.
 */

export type AiLink = { label: string; href: string; pending?: boolean };

/** Where topics without their own page send people for now. */
const AI_COURSE = "/courses/artificial-intelligence";

export const AI_MENU = {
  heading: "Learn AI Skills",
  subheading:
    "Build projects with machine learning, data science, automation, and generative AI.",

  sections: [
    {
      title: "AI Fundamentals",
      links: [
        { label: "Generative AI", href: AI_COURSE, pending: true },
        { label: "Artificial Intelligence (AI)", href: AI_COURSE },
        { label: "Prompt Engineering", href: AI_COURSE, pending: true },
        { label: "ChatGPT & AI Tools", href: AI_COURSE, pending: true },
      ] satisfies AiLink[],
    },
    {
      title: "AI Development",
      links: [
        { label: "Agentic AI", href: AI_COURSE, pending: true },
        { label: "AI-Powered Marketing", href: "/courses/digital-marketing" },
        { label: "RAG (Retrieval-Augmented Generation)", href: "/courses/machine-learning", pending: true },
        { label: "AI-Powered Courses", href: "/courses" },
      ] satisfies AiLink[],
    },
  ],

  featured: {
    badge: "Featured AI Course",
    /* Hoshiarpur, not Jalandhar: the site was moved off the Jalandhar name
       earlier and the string appears nowhere else in the codebase. */
    title: "Artificial Intelligence Training in Hoshiarpur",
    description:
      "From the maths that matters to models you deploy — built around a portfolio, not a syllabus.",
    image: "/images/ai.webp",
    href: AI_COURSE,
    cta: "View Course",
  },

  panel: {
    copy: "Start with AI fundamentals, then move into real projects and career-ready tools.",
    cta: "Explore AI",
    /* No /ai route exists and the brief said not to create a page, so this
       points at the AI course instead of a 404. */
    href: AI_COURSE,
  },
};
