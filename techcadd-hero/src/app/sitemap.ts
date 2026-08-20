import type { MetadataRoute } from "next";

import { getArticles, getCategories, safely } from "@/lib/blog/api";
import type { Article, CategorySummary } from "@/lib/blog/types";
import { getAllCourses } from "@/lib/courses";

const SITE = "https://techcadd.com";

/**
 * Sitemap covering the static routes plus every published article.
 *
 * Built from the API rather than a hand-maintained list, so a new article is in
 * the sitemap as soon as it is published. If the API is unreachable the static
 * routes are still emitted — a partial sitemap beats a build failure.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories, courses] = await Promise.all([
    safely(getArticles({ limit: 50, sort: "latest" }), {
      data: [] as Article[],
      meta: { page: 1, limit: 50, total: 0, totalPages: 1, hasMore: false },
    }),
    safely(getCategories(), [] as CategorySummary[]),
    // Already falls back to the built-in catalogue if the CMS is unreachable.
    getAllCourses(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/internship-training`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/after-12th`, changeFrequency: "monthly", priority: 0.7 },
  ];

  /* Every course page was missing from the sitemap entirely — forty routes
     that search engines could only reach by crawling the catalogue index. */
  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE}/courses/${course.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

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

  return [...staticRoutes, ...courseRoutes, ...articleRoutes, ...categoryRoutes];
}
