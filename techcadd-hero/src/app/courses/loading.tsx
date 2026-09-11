import Navbar from "@/components/Layout/Navbar";
import {
  Skeleton,
  SkeletonCard,
  SkeletonHeading,
  SkeletonPage,
  SkeletonText,
} from "@/components/UI/Skeleton";

/**
 * Catalogue placeholder: centred hero, the filter rail, then the card grid.
 *
 * `courses/page.tsx` renders its own `<Navbar />` — there is no courses layout
 * to carry it — so the skeleton has to render one too, or the header vanishes
 * while the route streams.
 *
 * Nine cards, which is what the grid shows above the fold at three columns.
 */
export default function CoursesLoading() {
  return (
    <SkeletonPage label="Loading courses">
      <Navbar />
      <main className="relative overflow-x-clip bg-[#101E52]">
        <section className="relative pb-20 pt-[104px] lg:pt-[128px]">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <Skeleton tone="dark" className="h-3 w-40 rounded-full" />

            {/* the hero copy is centred on this page, unlike the other inner
                pages, so the placeholder is centred with it */}
            <div className="mt-10 flex flex-col items-center gap-5">
              <Skeleton tone="dark" className="h-9 w-56 rounded-full" />
              <SkeletonHeading tone="dark" w="w-full max-w-3xl" />
              <SkeletonHeading tone="dark" w="w-2/3 max-w-xl" />
              <div className="mt-2 flex w-full max-w-2xl flex-col items-center gap-2.5">
                <SkeletonText tone="dark" w="w-full" className="h-3.5" />
                <SkeletonText tone="dark" w="w-3/4" className="h-3.5" />
              </div>
            </div>

            {/* filter rail */}
            <div className="mt-12 flex flex-wrap justify-center gap-2.5">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} tone="dark" className="h-10 w-28 rounded-full" />
              ))}
            </div>

            {/* card grid */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }, (_, i) => (
                <SkeletonCard key={i} tone="light" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </SkeletonPage>
  );
}
