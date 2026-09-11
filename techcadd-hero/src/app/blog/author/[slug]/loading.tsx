import ArticleCardSkeleton from "@/components/blog/ArticleCardSkeleton";
import { Skeleton, SkeletonPage } from "@/components/UI/Skeleton";

/**
 * Author placeholder: the profile masthead, then that author's articles.
 *
 * The grid reuses `ArticleCardSkeleton` — the same card the blog index
 * placeholder uses — so the two pages agree on what a pending article looks
 * like and the shape is maintained in one place.
 *
 * Like `/blog/[slug]`, this route is server-rendered per request, so the
 * skeleton is shown on a genuine cold load rather than only between client
 * navigations. The navbar comes from `blog/layout.tsx`.
 */
export default function AuthorLoading() {
  return (
    <SkeletonPage label="Loading author profile">
      <header className="surface-dark relative isolate overflow-hidden bg-royal-deep pb-20 pt-32 sm:pt-36">
        <div className="shell flex flex-col items-center gap-5 text-center">
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="h-10 w-64 rounded-2xl" />
          <Skeleton className="h-3.5 w-40 rounded-full" />
          <div className="flex w-full max-w-xl flex-col items-center gap-2.5">
            <Skeleton className="h-3.5 w-full rounded-full" />
            <Skeleton className="h-3.5 w-4/5 rounded-full" />
          </div>
        </div>
      </header>

      <section className="surface-light section-y bg-paper">
        <div className="shell">
          <Skeleton className="h-7 w-56 rounded-xl" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </SkeletonPage>
  );
}
