import type { MetadataRoute } from "next";

const SITE = "https://techcadd.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // search result pages are thin duplicates of the index; the articles
      // themselves are what should rank
      disallow: ["/blog?search="],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
