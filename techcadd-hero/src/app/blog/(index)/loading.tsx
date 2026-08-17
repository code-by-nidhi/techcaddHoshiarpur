import ArticleCardSkeleton from "@/components/blog/ArticleCardSkeleton";

/**
 * Shown while the index streams in. It reproduces the real layout — hero band,
 * featured slab, then the grid — rather than a spinner, so the page settles
 * into place instead of reflowing when the content lands.
 */
export default function BlogLoading() {
  return (
    <>
      <section className="surface-dark relative isolate overflow-hidden bg-royal-deep pt-32 pb-28 sm:pt-36 sm:pb-32">
        <div className="shell flex flex-col items-center gap-5">
          <div className="h-3 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 w-full max-w-3xl animate-pulse rounded-2xl bg-white/10" />
          <div className="h-12 w-2/3 max-w-xl animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-4 h-14 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
        </div>
      </section>

      <div className="surface-light shell -mt-10 sm:-mt-16 lg:-mt-20">
        <div className="glass-card-strong grid overflow-hidden rounded-[var(--radius-hero)] lg:grid-cols-[1.05fr_1fr]">
          <div className="aspect-video w-full animate-pulse bg-[var(--ctx-chip-bg)] lg:aspect-auto lg:min-h-[26rem]" />
          <div className="flex flex-col gap-4 p-10">
            <div className="h-3 w-24 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
            <div className="h-9 w-full animate-pulse rounded-xl bg-[var(--ctx-chip-bg)]" />
            <div className="h-9 w-3/4 animate-pulse rounded-xl bg-[var(--ctx-chip-bg)]" />
            <div className="mt-2 h-4 w-full animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-[var(--ctx-chip-bg)]" />
          </div>
        </div>
      </div>

      <section className="surface-light section-y bg-paper">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
