import {
  Skeleton,
  SkeletonHeading,
  SkeletonPage,
  SkeletonText,
} from "@/components/UI/Skeleton";

/**
 * Contact placeholder: dark hero, then the enquiry form beside the campus
 * details. This is the one marketing route that genuinely waits on the CMS —
 * the page awaits `getFaqs()` — so this skeleton is the one most likely to be
 * seen on a cold request rather than only between client navigations.
 *
 * `contact/layout.tsx` supplies the navbar and footer, so neither appears here.
 */
export default function ContactLoading() {
  return (
    <SkeletonPage label="Loading contact page">
      <section className="relative overflow-hidden bg-[#101E52] pb-20 pt-[104px] lg:pb-24 lg:pt-[132px]">
        <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Skeleton tone="dark" className="h-3 w-40 rounded-full" />
          <Skeleton tone="dark" className="mt-8 h-9 w-44 rounded-full" />
          <SkeletonHeading tone="dark" w="w-full max-w-2xl" className="mt-5" />
          <div className="mt-5 flex max-w-xl flex-col gap-2.5">
            <SkeletonText tone="dark" w="w-full" className="h-3.5" />
            <SkeletonText tone="dark" w="w-3/4" className="h-3.5" />
          </div>
        </div>
      </section>

      {/* form on the left, campus details on the right */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col gap-5 rounded-[26px] border border-slate-200/70 p-7">
            <SkeletonHeading tone="light" w="w-2/3" className="h-7 sm:h-8" />
            <SkeletonText tone="light" w="w-full" className="h-3.5" />
            {/* four fields and a submit */}
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} tone="light" className="h-12 w-full rounded-xl" />
            ))}
            <Skeleton tone="light" className="h-28 w-full rounded-xl" />
            <Skeleton tone="light" className="h-12 w-48 rounded-full" />
          </div>

          <div className="flex flex-col gap-5">
            <Skeleton tone="light" className="aspect-[4/3] w-full rounded-[26px]" />
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} tone="light" className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    </SkeletonPage>
  );
}
