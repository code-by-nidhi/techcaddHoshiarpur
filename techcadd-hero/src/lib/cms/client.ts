/**
 * The site's single point of contact with the CMS.
 *
 * Every dynamic section — the blog, the student wall, the help centre, the
 * enquiry forms — reads from one API, so the base address, the caching policy
 * and the failure behaviour are each defined exactly once here rather than
 * being rediscovered in each feature.
 *
 * The CMS exposes its public surface under `/api/public`. Nothing below ever
 * touches an authenticated route: the admin API needs a session cookie this
 * site does not have, and should not.
 */

/** Read by server components. Falls back to the local API so a fresh clone runs. */
export const CMS_API_URL =
  process.env.CMS_API_URL ??
  // Kept for a deployment still carrying the old variable from when this API
  // served only the blog. Remove once every environment has been updated.
  process.env.BLOG_API_URL ??
  "http://localhost:4000/api/public";

/**
 * The same API as seen from the browser.
 *
 * Public by necessity — it is a plain URL with no secret in it, and the forms
 * that post to it run on the client.
 */
export const PUBLIC_CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL ??
  process.env.NEXT_PUBLIC_BLOG_API_URL ??
  "http://localhost:4000/api/public";

/**
 * How long a cached read stays fresh.
 *
 * An hour is a floor, not the expected latency: the CMS calls this site's
 * `/api/revalidate` after every successful save, so a publish shows up
 * immediately and this only covers the case where that ping does not arrive.
 */
export const REVALIDATE_SECONDS = 3600;

export class CmsApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CmsApiError";
  }
}

export function buildQuery(
  query: Record<string, string | number | boolean | undefined>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === "") continue;
    params.set(key, String(value));
  }

  const serialised = params.toString();
  return serialised ? `?${serialised}` : "";
}

/**
 * A cached GET against the CMS.
 *
 * `tags` are what `/api/revalidate` clears, so a section only needs to name
 * the content it reads — it never has to know which pages render it.
 */
export async function cmsFetch<T>(path: string, tags: string[]): Promise<T> {
  const response = await fetch(`${CMS_API_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new CmsApiError(`CMS responded ${response.status} for ${path}`, response.status);
  }

  return response.json() as Promise<T>;
}

/**
 * Every read a page makes is wrapped in this.
 *
 * A section that renders its built-in content — or nothing — is a far better
 * outcome than a 500 for the whole route because one rail could not load. The
 * CMS being down should cost the site its freshest content, not its homepage.
 */
export async function safely<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error("[cms] request failed:", error);
    return fallback;
  }
}
