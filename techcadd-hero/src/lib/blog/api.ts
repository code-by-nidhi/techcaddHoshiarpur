import {
  buildQuery,
  cmsFetch,
  CmsApiError,
  PUBLIC_CMS_API_URL,
  safely,
} from "@/lib/cms/client";
import type {
  Article,
  ArticleDetail,
  ArticleQuery,
  AuthorDetail,
  CategorySummary,
  Paginated,
} from "./types";

/**
 * The blog's reads, in one place.
 *
 * Server components call these directly; the browser talks to the same API
 * through `blogApiUrl` below. The transport itself — base address, caching and
 * failure behaviour — lives in `@/lib/cms/client`, which the student wall and
 * the help centre share, so the blog is not a second way of talking to the
 * same server.
 */

/** Browser-side base. Re-exported because the client components import it from here. */
export const PUBLIC_API_URL = PUBLIC_CMS_API_URL;

/** Kept under its original name: it is what the blog components catch. */
export const BlogApiError = CmsApiError;

export { safely };

/** Query string for the browser, so the client fetcher matches the server one. */
export function blogApiUrl(path: string, query: ArticleQuery = {}): string {
  return `${PUBLIC_API_URL}${path}${buildQuery({ ...query })}`;
}

export function getArticles(query: ArticleQuery = {}): Promise<Paginated<Article>> {
  return cmsFetch<Paginated<Article>>(`/blog/posts${buildQuery({ ...query })}`, ["articles"]);
}

export function getArticle(slug: string): Promise<ArticleDetail> {
  return cmsFetch<ArticleDetail>(`/blog/posts/${encodeURIComponent(slug)}`, [
    "articles",
    `article:${slug}`,
  ]);
}

export function getFeaturedArticle(): Promise<Article | null> {
  return cmsFetch<Article | null>("/blog/featured", ["articles", "featured"]);
}

export function getTrending(limit = 5): Promise<Article[]> {
  return cmsFetch<Article[]>(`/blog/trending?limit=${limit}`, ["articles", "trending"]);
}

export function getEditorsPicks(limit = 3, exclude?: string): Promise<Article[]> {
  return cmsFetch<Article[]>(`/blog/editors-picks${buildQuery({ limit, exclude })}`, [
    "articles",
    "editors-picks",
  ]);
}

export function getRelated(slug: string, limit = 3): Promise<Article[]> {
  return cmsFetch<Article[]>(
    `/blog/posts/${encodeURIComponent(slug)}/related?limit=${limit}`,
    ["articles", `related:${slug}`],
  );
}

export function getCategories(): Promise<CategorySummary[]> {
  return cmsFetch<CategorySummary[]>("/blog/categories", ["categories"]);
}

export function getAuthor(slug: string): Promise<AuthorDetail> {
  return cmsFetch<AuthorDetail>(`/blog/authors/${encodeURIComponent(slug)}`, [
    "authors",
    `author:${slug}`,
  ]);
}
