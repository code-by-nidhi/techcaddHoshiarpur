"use client";

import { useBlogQuery } from "@/hooks/useBlogQuery";
import type { CategorySummary } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

/**
 * The category pills.
 *
 * Buttons rather than links, because selecting one rewrites the query string
 * of the page you are already on. Empty categories are filtered out — a pill
 * that can only ever produce "no articles found" is a dead end.
 */
export default function CategoryFilter({ categories }: { categories: CategorySummary[] }) {
  const { category: active, setParams } = useBlogQuery();

  const shown = categories.filter((entry) => (entry.articleCount ?? 0) > 0);

  return (
    <nav aria-label="Article categories" className="relative">
      {/* horizontal scroll on small screens, wrapping row from `sm` */}
      <ul className="-mx-6 flex snap-x gap-2.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {[{ id: "all", name: "All", slug: "all", description: "" }, ...shown].map((entry) => {
          const current = active === entry.slug;

          return (
            <li key={entry.slug} className="snap-start">
              <button
                type="button"
                aria-pressed={current}
                onClick={() =>
                  setParams({ category: entry.slug === "all" ? undefined : entry.slug })
                }
                className={cn(
                  "chip-border inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-[var(--ease-out-soft)]",
                  current
                    ? "border-transparent bg-royal-deep text-white shadow-[0_14px_30px_-18px_rgb(8_21_64/0.9)]"
                    : "bg-[var(--ctx-chip-bg)] text-ink-muted hover:-translate-y-0.5 hover:text-ink motion-reduce:hover:transform-none",
                )}
              >
                {entry.name}
                {entry.articleCount !== undefined && entry.slug !== "all" ? (
                  <span className={cn("text-xs", current ? "text-white/60" : "text-ink-dim")}>
                    {entry.articleCount}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
