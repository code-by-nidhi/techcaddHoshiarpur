import { Suspense } from "react";

import ArticleCard from "@/components/blog/ArticleCard";
import BlogHero from "@/components/blog/BlogHero";
import CareerCTA from "@/components/blog/CareerCTA";
import CategoryFilter from "@/components/blog/CategoryFilter";
import EditorsPicks from "@/components/blog/EditorsPicks";
import EmptyState from "@/components/blog/EmptyState";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import LoadMoreArticles from "@/components/blog/LoadMoreArticles";
import NewsletterSection from "@/components/blog/NewsletterSection";
import TrendingArticles from "@/components/blog/TrendingArticles";
import {
  getArticles,
  getCategories,
  getEditorsPicks,
  getFeaturedArticle,
  getTrending,
  safely,
} from "@/lib/blog/api";
import type { Article, ArticleQuery, CategorySummary } from "@/lib/blog/types";

/** Articles per page, matching the API's default. */
const PAGE_SIZE = 9;

interface BlogPageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

/**
 * The blog index.
 *
 * A server component: the first screen of articles, the featured story and the
 * rails are all rendered on the server, so the page is complete and indexable
 * before any JavaScript runs. Only the four interactive pieces — search,
 * category pills, load-more and the two forms — are client components.
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const search = params.search?.trim() || undefined;
  const category = params.category && params.category !== "all" ? params.category : undefined;

  /* A search or a category filter turns the page into a results view: the
     featured story and the editor's picks are editorial furniture, and showing
     them above someone's filtered results buries what they asked for. */
  const filtering = Boolean(search || category);

  const query: ArticleQuery = { category, search, limit: PAGE_SIZE, sort: "latest" };

  const [articles, categories, featured, trending, picks] = await Promise.all([
    safely(getArticles({ ...query, page: 1 }), {
      data: [] as Article[],
      meta: { page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1, hasMore: false },
    }),
    safely(getCategories(), [] as CategorySummary[]),
    filtering ? Promise.resolve(null) : safely(getFeaturedArticle(), null),
    safely(getTrending(5), [] as Article[]),
    filtering ? Promise.resolve([]) : safely(getEditorsPicks(3), [] as Article[]),
  ]);

  // the featured story leads the page, so it must not appear again in the grid
  const gridArticles = featured
    ? articles.data.filter((article) => article.id !== featured.id)
    : articles.data;

  return (
    <>
      <BlogHero articleCount={articles.meta.total} />

      {featured ? <FeaturedArticle article={featured} /> : null}

      <section
        aria-labelledby="latest-heading"
        className="surface-light section-y relative isolate bg-paper"
      >
        <div className="shell">
          <Suspense fallback={<div className="h-12" />}>
            <CategoryFilter categories={categories} />
          </Suspense>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_19rem] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 id="latest-heading" className="type-h3 text-ink">
                  {search
                    ? `Results for “${search}”`
                    : category
                      ? categories.find((entry) => entry.slug === category)?.name ?? "Articles"
                      : "Latest articles"}
                </h2>

                <p className="text-sm text-ink-dim" aria-live="polite">
                  {articles.meta.total} article{articles.meta.total === 1 ? "" : "s"} found
                </p>
              </div>

              {gridArticles.length === 0 ? (
                <div className="mt-8">
                  <Suspense fallback={null}>
                    <EmptyState search={search} />
                  </Suspense>
                </div>
              ) : (
                <>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {gridArticles.map((article, index) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        priority={index < 3 && !featured}
                      />
                    ))}
                  </div>

                  <LoadMoreArticles
                    query={query}
                    initialPage={articles.meta.page}
                    initialHasMore={articles.meta.hasMore}
                  />
                </>
              )}
            </div>

            <aside className="lg:pt-1">
              <TrendingArticles articles={trending} />
            </aside>
          </div>
        </div>
      </section>

      {picks.length > 0 ? <EditorsPicks articles={picks} /> : null}

      <NewsletterSection />
      <CareerCTA />
    </>
  );
}
