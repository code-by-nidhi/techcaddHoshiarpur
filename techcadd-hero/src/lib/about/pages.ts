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
    summary: `${FOUNDER.name} — ${FOUNDER.title}, ${FOUNDER.role}`,
    image: "/images/founder-gaurav.webp",
    imageAlt: "The founder of TechCADD",
    paragraphs: [FOUNDER.quote, ...hero.supporting],
  },
];

/*
 * What the About Us panel shows, which is no longer simply ABOUT_PAGES.
 *
 * ABOUT_PAGES stays whole: it generates /about/[slug], and Our Founder is still
 * one of those pages — it just reaches the bar directly now instead of through
 * this panel. Filtering the array itself would delete the route.
 */

/** The rail, and the mobile sheet. Our Founder is a top-level nav item. */
export const ABOUT_MENU_PAGES = ABOUT_PAGES.filter((p) => p.slug !== "our-founder");

export type AboutMenuCard = {
  key: string;
  title: string;
  badge: string;
  image: string;
  href: string;
};

/**
 * The three destinations in the About Us panel.
 *
 * One list, used by the rail on the left, the cards on the right and the mobile
 * sheet — so the three can never fall out of order or out of step with each
 * other. The `key` is what ties a rail item to its card when one is hovered.
 *
 * Two of them are About pages. The third, Our Team, has no page of its own and
 * is not getting one — it points at the section of /about that already tells
 * that story, so it is a working link rather than a placeholder. Give it a real
 * slug later and only this line changes.
 */
export const ABOUT_MENU_CARDS: AboutMenuCard[] = [
  ...ABOUT_MENU_PAGES.map((p) => ({
    key: p.slug,
    title: p.title,
    badge: p.badge,
    image: p.image,
    href: `/about/${p.slug}`,
  })),
  {
    key: "our-team",
    title: "Our Team",
    badge: "People",
    image: images.heroPrimary.src,
    href: "/about#who-we-are",
  },
];

/**
 * The slugs /about/[slug] generates.
 *
 * Our Founder is excluded: it has a dedicated page at app/about/our-founder,
 * and a literal segment wins over a dynamic one, so anything prerendered here
 * for that slug would never be served. It stays in ABOUT_PAGES, because the
 * sibling pages still cross-link to it.
 */
export const aboutSlugs = () =>
  ABOUT_PAGES.filter((p) => p.slug !== "our-founder").map((p) => p.slug);

export const getAboutPage = (slug: string) => ABOUT_PAGES.find((p) => p.slug === slug);

if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const p of ABOUT_PAGES) {
    if (seen.has(p.slug)) throw new Error(`Duplicate About slug: ${p.slug}`);
    seen.add(p.slug);
  }
}
