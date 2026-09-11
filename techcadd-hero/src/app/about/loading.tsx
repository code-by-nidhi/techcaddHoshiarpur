import {
  Skeleton,
  SkeletonHeading,
  SkeletonPage,
  SkeletonText,
} from "@/components/UI/Skeleton";

/**
 * Placeholder for /about and everything nested under it — the founder profile
 * and the `[slug]` pages both fall back to this one.
 *
 * No `<Navbar />` and no `<main>` here, unlike the courses and training
 * placeholders: `about/layout.tsx` renders both around whatever this segment
 * returns, so adding them would double the header the same way the pages
 * themselves used to.
 *
 * The hero opens dark with a stats strip across its foot, then the first
 * content band runs white — that pair is the whole first screen.
 */
export default function AboutLoading() {
  return (
    <SkeletonPage label="Loading about page">
      <section className="relative overflow-hidden bg-[#101E52] pb-16 pt-[104px] lg:pb-20 lg:pt-[132px]">
        <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
          <Skeleton tone="dark" className="h-3 w-44 rounded-full" />
          <Skeleton tone="dark" className="mt-8 h-9 w-52 rounded-full" />
          <SkeletonHeading tone="dark" w="w-full max-w-3xl" className="mt-5" />
          <SkeletonHeading tone="dark" w="w-2/3 max-w-xl" className="mt-3" />

          <div className="mt-6 flex max-w-2xl flex-col gap-2.5">
            <SkeletonText tone="dark" w="w-full" className="h-3.5" />
            <SkeletonText tone="dark" w="w-5/6" className="h-3.5" />
          </div>

          {/* the stats strip that sits at the foot of the hero */}
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} tone="dark" className="h-[92px] rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* first white band: copy beside a picture */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="flex flex-col gap-4">
            <Skeleton tone="light" className="h-3 w-28 rounded-full" />
            <SkeletonHeading tone="light" w="w-full" />
            <SkeletonText tone="light" w="w-full" className="mt-2 h-3.5" />
            <SkeletonText tone="light" w="w-11/12" className="h-3.5" />
            <SkeletonText tone="light" w="w-4/5" className="h-3.5" />
            <Skeleton tone="light" className="mt-4 h-12 w-44 rounded-full" />
          </div>
          <Skeleton tone="light" className="aspect-[4/3] w-full rounded-[26px]" />
        </div>
      </section>
    </SkeletonPage>
  );
}
