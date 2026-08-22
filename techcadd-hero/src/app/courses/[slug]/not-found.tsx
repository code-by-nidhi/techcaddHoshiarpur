import Link from "next/link";
import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import { COURSES } from "@/lib/courses";
import { getSiteDetails } from "@/lib/cms/site-details";

/**
 * Shown for any slug that is not in the catalogue. Rather than a dead end, it
 * offers the courses that do exist — the visitor almost certainly wanted one
 * of them.
 */
export default async function CourseNotFound() {
  const site = await getSiteDetails();

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#101E52] pb-24 pt-[132px] lg:pt-[160px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.20)_0%,transparent_68%)] blur-3xl" />
          <div className="absolute -right-[8%] top-[12%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24)_0%,transparent_70%)] blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[900px] px-5 text-center sm:px-6">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#93C5FD] backdrop-blur-xl">
            404 — Course not found
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-sora)] text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-[-0.03em] text-white">
            We don&apos;t have a course at that address
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.8] text-white/60">
            The link may be out of date, or the programme may have been renamed. Here is the full
            catalogue — the one you wanted is probably in it.
          </p>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-2.5 text-left sm:grid-cols-2">
            {COURSES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/courses/${c.slug}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[13.5px] text-white/85 backdrop-blur-xl transition-colors duration-300 hover:border-[#60A5FA]/50 hover:bg-white/[0.09]"
                >
                  <span className="min-w-0 truncate font-medium">{c.title}</span>
                  <span className="shrink-0 text-[11.5px] text-white/45">{c.duration}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/courses"
              className="rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_0_34px_-8px_rgba(37,99,235,0.95)]"
            >
              Browse all courses
            </Link>
            <a
              {...site.whatsappLink()}
              className="rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur-xl transition-colors hover:border-white/50"
            >
              Talk to a counsellor
            </a>
          </div>
        </div>
      </main>

      <MegaFooter />
    </>
  );
}
