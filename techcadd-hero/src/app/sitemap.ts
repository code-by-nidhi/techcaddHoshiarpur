import type { MetadataRoute } from "next";

import { getArticles, getCategories, safely } from "@/lib/blog/api";
import type { Article, CategorySummary } from "@/lib/blog/types";

const SITE = "https://techcadd.com";

/**
 * Sitemap covering the static routes plus every published article.
 *
 * Built from the API rather than a hand-maintained list, so a new article is in
 * the sitemap as soon as it is published. If the API is unreachable the static
 * routes are still emitted — a partial sitemap beats a build failure.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    safely(getArticles({ limit: 50, sort: "latest" }), {
      data: [] as Article[],
      meta: { page: 1, limit: 50, total: 0, totalPages: 1, hasMore: false },
    }),
    safely(getCategories(), [] as CategorySummary[]),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog`, changeFrequency: "daily", priority: 0.9 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.data.map((article) => ({
    url: `${SITE}/blog/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : undefined,
    changeFrequency: "monthly",
    priority: article.featured ? 0.9 : 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((category) => (category.articleCount ?? 0) > 0)
    .map((category) => ({
      url: `${SITE}/blog?category=${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
