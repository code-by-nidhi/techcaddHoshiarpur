import type { NextConfig } from "next";

/**
 * Where the CMS serves uploaded images from.
 *
 * `next/image` refuses any host that is not declared here, and article covers
 * and author photographs are served by the CMS on a different origin. Derived
 * from the API address rather than hard-coded so a deployment configures one
 * variable and not two — and so localhost and production need no different
 * config file.
 */
function cmsImagePattern() {
  const api =
    process.env.NEXT_PUBLIC_CMS_API_URL ??
    process.env.CMS_API_URL ??
    process.env.NEXT_PUBLIC_BLOG_API_URL ??
    process.env.BLOG_API_URL ??
    "http://localhost:4000/api/public";

  try {
    const { protocol, hostname, port } = new URL(api);

    return [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        port,
        // Uploads only. The API's JSON routes are not images and should not be
        // reachable through the image optimiser.
        pathname: "/uploads/**",
      },
    ];
  } catch {
    // A malformed URL should not stop the site building — the blog's images
    // simply will not optimise until it is corrected.
    console.warn("[next.config] CMS API URL is not a valid URL — image host not allowed.");
    return [];
  }
}

/**
 * The old, location-free detail URLs, permanently moved.
 *
 * Every detail page now carries the city — `/courses/python-programming` became
 * `/courses/python-programming-course-in-hoshiarpur` — and anything already
 * linked or indexed has to keep working.
 *
 * A pattern rather than a list of sixty-six entries, so a course added to the
 * catalogue or published in the CMS is covered without touching this file.
 *
 * The negative lookahead is the whole trick. Without it `/courses/:slug` also
 * matches the *new* address, which would redirect it to
 * `…-course-in-hoshiarpur-course-in-hoshiarpur` and again, forever. The guard
 * says: match a single path segment that does not already end in the suffix.
 *
 * `statusCode: 301` rather than `permanent: true`, which emits 308. Both are
 * permanent and both pass link equity, but 301 is what was asked for and what
 * every SEO tool reports on.
 */
const SEO_SLUG_REDIRECTS = [
  { base: "/courses", suffix: "-course-in-hoshiarpur" },
  { base: "/internship-training", suffix: "-in-hoshiarpur" },
  { base: "/after-12th", suffix: "-course-in-hoshiarpur" },
].map(({ base, suffix }) => ({
  source: `${base}/:slug((?!.*${suffix}$)[^/]+)`,
  destination: `${base}/:slug${suffix}`,
  statusCode: 301 as const,
}));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return SEO_SLUG_REDIRECTS;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: cmsImagePattern(),
  },
  /*
   * No `optimizePackageImports` here on purpose: Next 15 already applies it to
   * react-icons and lucide-react by default, and adding framer-motion/swiper
   * to the list measured 2 kB WORSE on the homepage.
   */
};

export default nextConfig;
