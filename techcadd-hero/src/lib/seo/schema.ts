import { MEGA_FOOTER } from "@/lib/site";

/**
 * Structured data builders.
 *
 * Everything here is generated from constants and from our own catalogue —
 * never from user input — so the JSON is safe to inline. Each node carries a
 * stable `@id` so pages can reference the organisation rather than restate it,
 * which is what keeps one canonical entity across the site instead of a dozen
 * near-duplicates competing with each other.
 *
 * Nothing is invented. Where a detail is genuinely unknown — a street address,
 * geo coordinates, social profiles — the property is omitted rather than
 * guessed: a wrong `sameAs` points a search engine at somebody else's account,
 * and a wrong address is worse.
 */

export const SITE = "https://techcadd.com";
export const ORG_NAME = "TechCadd Hoshiarpur";

/** Stable identities, so every page points at the same two entities. */
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

type Json = Record<string, unknown>;

/** Only the social networks that actually have a URL — see MEGA_FOOTER.social. */
const sameAs = Object.values(MEGA_FOOTER.social).filter((u): u is string => Boolean(u));

/**
 * The postal address.
 *
 * `MEGA_FOOTER.contact.address` is "Techcadd, Hoshiarpur, Punjab" — a locality
 * and a region, with no street line. Splitting a street out of it would mean
 * inventing one, so the schema carries what is known and stops there.
 */
const address: Json = {
  "@type": "PostalAddress",
  addressLocality: "Hoshiarpur",
  addressRegion: "Punjab",
  addressCountry: "IN",
};

/** The publisher, referenced by @id from every other node. */
export function organizationSchema(): Json {
  return {
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: ORG_NAME,
    alternateName: "TechCadd",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/images/techcadd-logo.png` },
    image: `${SITE}/og.jpg`,
    description:
      "Industry-focused training, real-world projects, and expert mentorship to help you launch your dream tech career in AI and software.",
    email: MEGA_FOOTER.contact.email,
    telephone: MEGA_FOOTER.contact.phone,
    address,
    areaServed: { "@type": "AdministrativeArea", name: "Punjab, India" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      telephone: MEGA_FOOTER.contact.phone,
      email: MEGA_FOOTER.contact.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "pa"],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: ORG_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The campus as a place of business — this is the node local search reads.
 * It is deliberately a separate entity from the organisation above, linked by
 * `parentOrganization`, so opening hours and a phone number describe the
 * premises rather than the brand.
 */
export function localBusinessSchema(): Json {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#local`,
    name: ORG_NAME,
    url: SITE,
    image: `${SITE}/og.jpg`,
    telephone: MEGA_FOOTER.contact.phone,
    email: MEGA_FOOTER.contact.email,
    address,
    parentOrganization: { "@id": ORG_ID },
    priceRange: "₹₹",
  };
}

/** A trail of `[name, path]` pairs; paths are site-relative. */
export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${SITE}${step.path}`,
    })),
  };
}

/** A listing page's items, in the order the page renders them. */
export function itemListSchema(
  name: string,
  items: { name: string; path: string }[],
): Json {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json | null {
  /* An empty FAQPage is a structured-data error, not an empty section — the
     CMS can return nothing, so the caller gets null and renders no node. */
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Wraps nodes into the single `@graph` a page emits. */
export function graph(...nodes: (Json | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
