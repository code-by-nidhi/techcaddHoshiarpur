import type {
  Article,
  ArticleDetail,
  ArticleQuery,
  AuthorDetail,
  CategorySummary,
  Paginated,
} from "./types";

/**
 * The blog's single point of contact with the NestJS API.
 *
 * Server components call these directly; the browser talks to the same API
 * through `blogApiUrl` below. Nothing else in the app constructs a blog URL,
 * so the base address, the caching policy and the failure behaviour are each
 * defined exactly once.
 */

/** Server-side base. Falls back to the local API so a fresh clone just runs. */
const API_URL = process.env.BLOG_API_URL ?? "http://localhost:4000/api";

/** Browser-side base — must be a public variable to survive the client bundle. */
export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_BLOG_API_URL ?? "http://localhost:4000/api";

/** Listings change when content does; an hour is a reasonable floor for a blog. */
const REVALIDATE_SECONDS = 3600;

export class BlogApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "BlogApiError";
  }
}

function buildQuery(query: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === "" ) continue;
    params.set(key, String(value));
  }

  const serialised = params.toString();
  return serialised ? `?${serialised}` : "";
}

async function request<T>(path: string, tags: string[]): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new BlogApiError(
      `Blog API responded ${response.status} for ${path}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

/** Query string for the browser, so the client fetcher matches the server one. */
export function blogApiUrl(path: string, query: ArticleQuery = {}): string {
  return `${PUBLIC_API_URL}${path}${buildQuery({ ...query })}`;
}

export function getArticles(query: ArticleQuery = {}): Promise<Paginated<Article>> {
  return request<Paginated<Article>>(`/blog/posts${buildQuery({ ...query })}`, ["articles"]);
}

export function getArticle(slug: string): Promise<ArticleDetail> {
  return request<ArticleDetail>(`/blog/posts/${encodeURIComponent(slug)}`, [
    "articles",
    `article:${slug}`,
  ]);
}

export function getFeaturedArticle(): Promise<Article | null> {
  return request<Article | null>("/blog/featured", ["articles", "featured"]);
}

export function getTrending(limit = 5): Promise<Article[]> {
  return request<Article[]>(`/blog/trending?limit=${limit}`, ["articles", "trending"]);
}

export function getEditorsPicks(limit = 3, exclude?: string): Promise<Article[]> {
  return request<Article[]>(
    `/blog/editors-picks${buildQuery({ limit, exclude })}`,
    ["articles", "editors-picks"],
  );
}

export function getRelated(slug: string, limit = 3): Promise<Article[]> {
  return request<Article[]>(
    `/blog/posts/${encodeURIComponent(slug)}/related?limit=${limit}`,
    ["articles", `related:${slug}`],
  );
}

export function getCategories(): Promise<CategorySummary[]> {
  return request<CategorySummary[]>("/blog/categories", ["categories"]);
}

export function getAuthor(slug: string): Promise<AuthorDetail> {
  return request<AuthorDetail>(`/blog/authors/${encodeURIComponent(slug)}`, [
    "authors",
    `author:${slug}`,
  ]);
}

/**
 * Every read the page makes is wrapped in this: a blog section that renders
 * empty is a far better outcome than a 500 for the whole route because one
 * rail could not load.
 */
export async function safely<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error("[blog] request failed:", error);
    return fallback;
  }
}
