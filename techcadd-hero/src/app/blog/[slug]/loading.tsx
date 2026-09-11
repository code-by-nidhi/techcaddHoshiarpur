import { Skeleton, SkeletonPage, SkeletonText } from "@/components/UI/Skeleton";

/**
 * Article placeholder: dark masthead, then the sidebar-and-body split.
 *
 * `/blog/[slug]` is one of the few genuinely dynamic routes in the app — it is
 * server-rendered per request and awaits four CMS calls — so unlike the static
 * marketing pages this skeleton is what a cold visitor actually sees, not just
 * something that flashes between client navigations.
 *
 * `surface-dark` and `surface-light` are what set `--ctx-chip-bg` on the two
 * bands, so the blocks below take their tone from the band and are left on the
 * default `auto`.
 *
 * The navbar comes from `blog/layout.tsx`.
 */
export default function ArticleLoading() {
  return (
    <SkeletonPage label="Loading article">
      <header className="surface-dark relative isolate overflow-hidden bg-royal-deep pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="shell flex flex-col gap-5">
          <Skeleton className="h-3 w-56 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-11 w-full max-w-3xl rounded-2xl sm:h-14" />
          <Skeleton className="h-11 w-3/4 max-w-2xl rounded-2xl sm:h-14" />

          {/* byline: avatar, name, date */}
          <div className="mt-4 flex items-center gap-3">
            <Skeleton className="size-11 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-36 rounded-full" />
              <Skeleton className="h-3 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="surface-light relative isolate bg-paper pb-20">
        <div className="shell">
          {/* the cover image straddles the two bands */}
          <Skeleton className="aspect-[16/9] w-full rounded-[var(--radius-hero)]" />

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
            {/* contents rail, first in the source order on desktop */}
            <aside className="lg:order-first">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-3 w-24 rounded-full" />
                {Array.from({ length: 6 }, (_, i) => (
                  <Skeleton key={i} className="h-3 w-full rounded-full" />
                ))}
              </div>
            </aside>

            {/* body: a few paragraphs, a subheading, then more */}
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <SkeletonText key={i} w={i === 3 ? "w-2/3" : "w-full"} className="h-3.5" />
              ))}
              <Skeleton className="mt-6 h-8 w-1/2 rounded-xl" />
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonText key={i} w={i === 4 ? "w-3/5" : "w-full"} className="h-3.5" />
              ))}
              <Skeleton className="mt-6 aspect-[16/9] w-full rounded-2xl" />
              {Array.from({ length: 3 }, (_, i) => (
                <SkeletonText key={i} w={i === 2 ? "w-4/5" : "w-full"} className="h-3.5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
