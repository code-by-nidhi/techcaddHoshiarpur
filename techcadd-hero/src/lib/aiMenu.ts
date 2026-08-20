import { getCourse } from "@/lib/courses";

/**
 * Content for the AI mega menu.
 *
 * Links are not written out here — each entry names a catalogue slug and the
 * href is generated as `/courses/${slug}`. The label comes from the course
 * itself, so renaming a course in the catalogue renames it in the menu, and a
 * slug that stops existing fails the build rather than shipping a dead link.
 */

/** Slugs only; titles and hrefs are derived. */
const SECTIONS = [
  { title: "AI Fundamentals", slugs: ["generative-ai", "artificial-intelligence", "prompt-engineering", "chatgpt-ai-tools"] },
  { title: "AI Development", slugs: ["agentic-ai", "ai-powered-marketing", "rag-retrieval-augmented-generation", "ai-powered-courses"] },
];

const FEATURED_SLUG = "artificial-intelligence";

export type AiLink = { label: string; slug: string; href: string };

const toLink = (slug: string): AiLink => {
  const course = getCourse(slug);
  if (!course) {
    // a menu entry pointing at a slug the catalogue does not have would render
    // a 404; fail loudly in dev instead
    throw new Error(`AI menu references a missing course slug: ${slug}`);
  }
  return { label: course.shortTitle ?? course.title, slug, href: `/courses/${slug}` };
};

const featured = getCourse(FEATURED_SLUG);
if (!featured) throw new Error(`AI menu featured course missing: ${FEATURED_SLUG}`);

export const AI_MENU = {
  heading: "Learn AI Skills",
  subheading:
    "Build projects with machine learning, data science, automation, and generative AI.",

  sections: SECTIONS.map((s) => ({ title: s.title, links: s.slugs.map(toLink) })),

  featured: {
    badge: "Featured AI Course",
    /* Hoshiarpur, not Jalandhar: the site was moved off the Jalandhar name
       earlier and the string appears nowhere else in the codebase. */
    title: "Artificial Intelligence Training in Hoshiarpur",
    description: featured.shortDescription,
    /* Its own photograph rather than the course page's hero: this card is the
       one bright object in the panel, and a real classroom shot carries it
       better than the catalogue's stock artwork. */
    image: "/images/featured-ai-course.jpeg",
    href: `/courses/${FEATURED_SLUG}`,
    cta: "View Course",
  },

  panel: {
    copy: "Start with AI fundamentals, then move into real projects and career-ready tools.",
    cta: "Explore AI",
    /* No /ai route exists and the brief said not to create a page. */
    href: `/courses/${FEATURED_SLUG}`,
  },
};
