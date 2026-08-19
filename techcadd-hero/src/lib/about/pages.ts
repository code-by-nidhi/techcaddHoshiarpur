import { hero, images, purpose, whoWeAre } from "@/data/about";
import { FOUNDER } from "@/lib/site";

/**
 * The three About pages behind the mega menu.
 *
 * Every string here is lifted from the copy the /about route already
 * publishes — `whoWeAre`, `purpose` and `FOUNDER` — so the menu, the detail
 * pages and the About page cannot drift apart, and no new marketing copy is
 * invented for them.
 */

export type AboutPage = {
  slug: string;
  title: string;
  /** the small tag on the card */
  badge: string;
  /** one line under the title, used on the card and as the meta description */
  summary: string;
  image: string;
  imageAlt: string;
  /** section body, in order */
  paragraphs: string[];
};

export const ABOUT_PAGES: AboutPage[] = [
  {
    slug: "about-techcadd",
    title: "About Techcadd",
    badge: "Story",
    summary: whoWeAre.heading,
    image: images.team.src,
    imageAlt: images.team.alt,
    paragraphs: whoWeAre.paragraphs,
  },
  {
    slug: "mission-and-vision",
    title: "Mission and Vision",
    badge: "Purpose",
    summary: `${purpose[0].title} — ${purpose[1].title}.`,
    image: images.students.src,
    imageAlt: images.students.alt,
    paragraphs: purpose.map((p) => `${p.title}. ${p.body}`),
  },
  {
    slug: "our-founder",
    title: "Our Founder",
    badge: "Profile",
    summary: `${FOUNDER.name}, ${FOUNDER.role}`,
    image: "/images/founder-gaurav.webp",
    imageAlt: "The founder of TechCADD",
    paragraphs: [FOUNDER.quote, ...hero.supporting],
  },
];

export const aboutSlugs = () => ABOUT_PAGES.map((p) => p.slug);

export const getAboutPage = (slug: string) => ABOUT_PAGES.find((p) => p.slug === slug);

if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const p of ABOUT_PAGES) {
    if (seen.has(p.slug)) throw new Error(`Duplicate About slug: ${p.slug}`);
    seen.add(p.slug);
  }
}
