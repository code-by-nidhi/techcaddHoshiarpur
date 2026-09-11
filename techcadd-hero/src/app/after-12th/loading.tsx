import Navbar from "@/components/Layout/Navbar";
import {
  SkeletonCard,
  SkeletonHeading,
  SkeletonPage,
  SkeletonPageHero,
  SkeletonText,
} from "@/components/UI/Skeleton";

/**
 * Placeholder for the After 12th index and for every programme under it — one
 * file covers both, because `after-12th/[slug]` has no `loading.tsx` of its own
 * and Next falls back to the nearest ancestor's.
 *
 * Two category blocks of six cards, which is the shape of the real page: a
 * heading and standfirst per category, then a three-column grid.
 *
 * `page.tsx` renders its own `<Navbar />` and there is no layout here to carry
 * it, so the skeleton renders one as well.
 */
export default function After12Loading() {
  return (
    <SkeletonPage label="Loading After 12th programmes">
      <Navbar />
      <main>
        <SkeletonPageHero />

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            {Array.from({ length: 2 }, (_, block) => (
              <div key={block} className="mb-14 last:mb-0">
                <SkeletonHeading tone="light" w="w-72" className="h-7 sm:h-8" />
                <SkeletonText tone="light" w="w-full max-w-xl" className="mt-3 h-3.5" />

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }, (_, i) => (
                    <SkeletonCard key={i} tone="light" ratio="aspect-[16/10]" lines={2} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SkeletonPage>
  );
}
