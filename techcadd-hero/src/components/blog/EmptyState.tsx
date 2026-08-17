"use client";

import { FileQuestion } from "lucide-react";

import { useBlogQuery } from "@/hooks/useBlogQuery";

/**
 * What the grid shows when a search or filter matches nothing. It offers the
 * way out rather than only reporting the dead end.
 */
export default function EmptyState({ search }: { search?: string }) {
  const { setParams } = useBlogQuery();

  return (
    <div className="glass-card flex flex-col items-center rounded-[var(--radius-hero)] px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="chip-border grid size-14 place-content-center rounded-full bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)]"
      >
        <FileQuestion className="size-6" strokeWidth={1.75} />
      </span>

      <h3 className="type-h3 mt-6 text-ink">No articles found.</h3>

      <p className="type-body-sm mt-3 max-w-md text-ink-muted">
        {search
          ? `Nothing matched “${search}”. Try a broader term, or browse a category instead.`
          : "There is nothing in this category yet. Try another one."}
      </p>

      <button
        type="button"
        onClick={() => setParams({ search: undefined, category: undefined })}
        className="mt-7 rounded-full bg-royal-deep px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand"
      >
        {search ? "Clear search" : "Show all articles"}
      </button>
    </div>
  );
}
