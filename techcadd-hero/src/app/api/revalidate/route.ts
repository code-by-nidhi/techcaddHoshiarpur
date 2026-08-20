import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate — the CMS telling us content changed.
 *
 * Without this, an editor's change waits out this site's cache window before
 * appearing, which reads as the save having failed and is the single most
 * common complaint about a headless setup. The CMS calls this after every
 * successful write.
 *
 * Every tag is cleared rather than only the one that changed. The CMS does not
 * say what it saved, and the alternative — parsing a body we would then have
 * to trust — buys nothing: these tags cover a handful of small reads, and
 * refetching all of them is cheaper than showing one of them stale.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Every tag `@/lib/cms` attaches to a cached read. */
const TAGS = [
  "articles",
  "featured",
  "trending",
  "editors-picks",
  "categories",
  "authors",
  "reviews",
  "faqs",
  // Contact details, social links and the headline figures — the footer and
  // the contact page read these on every route.
  "site",
  // Courses published in the CMS, merged into the site's own catalogue.
  "courses",
];

export async function POST(request: Request): Promise<NextResponse> {
  const secret = process.env.REVALIDATE_SECRET;

  /*
   * Refusing outright when no secret is configured, rather than allowing the
   * call through. An unauthenticated endpoint that drops the whole cache is a
   * free way to make this site rebuild every page on demand.
   */
  if (!secret) {
    console.warn("[revalidate] REVALIDATE_SECRET is not set — refusing the request.");
    return NextResponse.json({ revalidated: false }, { status: 503 });
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  for (const tag of TAGS) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tags: TAGS });
}
