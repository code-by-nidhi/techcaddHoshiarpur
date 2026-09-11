import Navbar from "@/components/Layout/Navbar";
import {
  SkeletonCard,
  SkeletonHeading,
  SkeletonPage,
  SkeletonPageHero,
  SkeletonText,
} from "@/components/UI/Skeleton";

/**
 * Placeholder for the Internship & Training index and for every programme
 * under it — `internship-training/[slug]` has no `loading.tsx` of its own, so
 * Next falls back to this one.
 *
 * Same shape as the After 12th placeholder because the two pages are built the
 * same way: dark hero, then category blocks of cards on white. They are kept as
 * two files rather than one shared component because they are two routes and a
 * shared one would have to be parameterised for nothing — the duplication here
 * is four lines of layout.
 *
 * `page.tsx` renders its own `<Navbar />`, so the skeleton renders one too.
 */
export default function InternshipTrainingLoading() {
  return (
    <SkeletonPage label="Loading internship and training programmes">
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
