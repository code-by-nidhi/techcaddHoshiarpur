import Navbar from "@/components/Layout/Navbar";
import { Skeleton, SkeletonPage, SkeletonText } from "@/components/UI/Skeleton";

/**
 * Home placeholder.
 *
 * The navbar is rendered here as well as in `page.tsx`, because the home route
 * has no layout that carries it — leaving it out would make the fixed header
 * disappear for as long as the skeleton is up, which reads as the site
 * breaking rather than as the page loading.
 *
 * Only the hero is drawn. Everything below it is under the fold on every
 * viewport the site supports, so a placeholder there costs markup and buys
 * nothing; the dark band running the full height is what stops the page
 * flashing white before the real hero paints.
 */
export default function HomeLoading() {
  return (
    <SkeletonPage label="Loading home page">
      <Navbar />
      <main>
        <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#101E52]">
          <div className="mx-auto grid min-h-[100svh] w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-[calc(var(--nav-h)+1.75rem)] sm:pt-[calc(var(--nav-h)+2.5rem)] lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-4 lg:px-[4.5rem] lg:pb-10 lg:pt-[calc(var(--nav-h)+3.75rem)]">
            {/* ---- copy column ---- */}
            <div className="flex flex-col gap-5">
              <Skeleton tone="dark" className="h-7 w-64 rounded-full" />
              <div className="mt-2 flex flex-col gap-3">
                <Skeleton tone="dark" className="h-11 w-full max-w-xl rounded-2xl sm:h-14" />
                <Skeleton tone="dark" className="h-11 w-11/12 max-w-lg rounded-2xl sm:h-14" />
                <Skeleton tone="dark" className="h-11 w-3/4 max-w-md rounded-2xl sm:h-14" />
              </div>
              <div className="mt-3 flex max-w-lg flex-col gap-2.5">
                <SkeletonText tone="dark" w="w-full" className="h-3.5" />
                <SkeletonText tone="dark" w="w-4/5" className="h-3.5" />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Skeleton tone="dark" className="h-12 w-44 rounded-full" />
                <Skeleton tone="dark" className="h-12 w-40 rounded-full" />
              </div>
            </div>

            {/* ---- stage column: one disc, matching the robot's footprint ---- */}
            <div className="relative hidden aspect-[9/8] w-full lg:block">
              <Skeleton
                tone="dark"
                className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
            </div>
          </div>
        </section>
      </main>
    </SkeletonPage>
  );
}
