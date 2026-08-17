"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { blogApiUrl } from "@/lib/blog/api";
import type { Article, ArticleQuery, Paginated } from "@/lib/blog/types";

import ArticleCard from "./ArticleCard";

interface LoadMoreArticlesProps {
  /** The filters the server used, so page 2 matches page 1. */
  query: ArticleQuery;
  initialPage: number;
  initialHasMore: boolean;
}

/**
 * "Load more" for the article grid.
 *
 * Appends to the DOM rather than navigating, so the reader keeps their scroll
 * position and the pages above are not refetched. The first page is rendered on
 * the server — this component only ever handles what comes after it.
 */
export default function LoadMoreArticles({
  query,
  initialPage,
  initialHasMore,
}: LoadMoreArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function loadMore() {
    setLoading(true);
    setFailed(false);

    try {
      const next = page + 1;
      const response = await fetch(blogApiUrl("/blog/posts", { ...query, page: next }));
      if (!response.ok) throw new Error(`API responded ${response.status}`);

      const payload = (await response.json()) as Paginated<Article>;

      setArticles((current) => [...current, ...payload.data]);
      setPage(payload.meta.page);
      setHasMore(payload.meta.hasMore);
    } catch {
      // the already-loaded articles stay on screen; only the control reports it
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {articles.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : null}

      {hasMore ? (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="chip-border inline-flex items-center gap-2.5 rounded-full bg-[var(--ctx-chip-bg)] px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white disabled:cursor-wait disabled:opacity-70 motion-reduce:hover:transform-none"
          >
            {loading ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Loading articles…
              </>
            ) : (
              "Load More Articles"
            )}
          </button>

          {failed ? (
            <p role="alert" className="text-sm text-ink-muted">
              Those articles didn&apos;t load. Check your connection and try again.
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
