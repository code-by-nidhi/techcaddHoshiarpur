/**
 * Skeleton shown while a course page streams in. It mirrors the real layout —
 * dark hero, fact strip, then content bands — so the shift when content
 * arrives is minimal.
 */
export default function CourseLoading() {
  return (
    <div aria-busy="true" aria-label="Loading course">
      <div className="relative overflow-hidden bg-[#101E52] pb-16 pt-[104px] lg:pb-20 lg:pt-[128px]">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="h-3 w-52 animate-pulse rounded-full bg-white/10" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="space-y-4">
              <div className="h-7 w-40 animate-pulse rounded-full bg-white/10" />
              <div className="h-11 w-full animate-pulse rounded-2xl bg-white/10" />
              <div className="h-11 w-4/5 animate-pulse rounded-2xl bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
              <div className="h-4 w-11/12 animate-pulse rounded-full bg-white/5" />
              <div className="flex gap-3 pt-4">
                <div className="h-12 w-40 animate-pulse rounded-full bg-white/10" />
                <div className="h-12 w-44 animate-pulse rounded-full bg-white/5" />
              </div>
            </div>
            <div className="aspect-[4/3] w-full animate-pulse rounded-[26px] bg-white/10" />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[76px] animate-pulse rounded-2xl bg-white/[0.06]" />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] space-y-6 px-5 py-16 sm:px-6 lg:px-8">
        <div className="h-8 w-72 animate-pulse rounded-2xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-[22px] bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
