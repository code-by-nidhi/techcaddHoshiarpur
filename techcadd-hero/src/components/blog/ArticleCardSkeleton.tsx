/**
 * Placeholder card. Its proportions match `ArticleCard` exactly — image block,
 * two meta lines, title, excerpt, footer — so the grid does not jump when the
 * real content arrives.
 */
export default function ArticleCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="glass-card h-full overflow-hidden rounded-[var(--radius-hero)]"
    >
      <div className="aspect-video w-full animate-pulse bg-[var(--ctx-chip-bg)]" />

      <div className="flex flex-col gap-3 p-6">
        <div className="h-3 w-32 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
        <div className="h-5 w-full animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
        <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
        <div className="mt-4 flex items-center gap-2.5">
          <div className="size-7 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
        </div>
      </div>
    </div>
  );
}
