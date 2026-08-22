import { safely } from "@/lib/cms/client";
import { getSite, type CmsSite } from "@/lib/cms/content";

/**
 * GET /robots.txt — served from Settings.
 *
 * This was a static `robots.ts` returning a fixed rule set. It is a route
 * handler now because the CMS stores robots.txt as text, and rewriting that
 * text into Next's structured `MetadataRoute.Robots` shape would quietly drop
 * any directive the shape cannot express — which is most of them.
 *
 * Editing this deindexes the site if done carelessly, which is why the CMS puts
 * it behind an administrator rather than an editor.
 */

const SITE = "https://techcadd.com";

/**
 * What is served when the CMS is unreachable or its field is empty.
 *
 * The rules that were in `robots.ts`, unchanged: search-result pages are thin
 * duplicates of the index, and the articles are what should rank.
 */
const FALLBACK = `User-agent: *
Allow: /
Disallow: /blog?search=
`;

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const site = await safely(getSite(), null as CmsSite | null);
  const body = site?.robotsTxt?.trim() ? site.robotsTxt.trim() : FALLBACK.trim();

  /*
   * The sitemap line is appended rather than left to the editor. It is the one
   * directive whose absence costs indexing outright, and an administrator
   * fixing a Disallow has no reason to expect they must also retype it.
   */
  const withSitemap = /^sitemap:/im.test(body)
    ? body
    : `${body}\n\nSitemap: ${SITE}/sitemap.xml`;

  return new Response(`${withSitemap}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Short, so a correction to robots.txt is not cached for hours.
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
