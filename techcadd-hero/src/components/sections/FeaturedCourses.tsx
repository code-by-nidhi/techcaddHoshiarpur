import { Suspense } from "react";
import Link from "next/link";
import { FiArrowRight, FiUserCheck } from "react-icons/fi";

import CourseExplorer, { type ExplorerCourse } from "@/components/courses/CourseExplorer";
import { COURSES, getCourse } from "@/lib/courses";

/**
 * The homepage courses section.
 *
 * It renders the same card component as the catalogue index, so the two never
 * drift apart, but over a curated shortlist rather than all {COURSES.length}
 * programmes — the full grid belongs on /courses, which the footer link goes
 * to. Everything is derived from the catalogue by slug, so a renamed course
 * follows automatically and a deleted one fails the build.
 */

/** The shortlist, one or two per category so every filter pill has content. */
const FEATURED_SLUGS = [
  "full-stack-web-development",
  "mern-stack-development",
  "python-programming",
  "java-programming",
  "artificial-intelligence",
  "data-science",
  "web-designing",
  "digital-marketing",
  "autocad",
];

export default function FeaturedCourses() {
  const courses: ExplorerCourse[] = FEATURED_SLUGS.map((slug) => {
    const c = getCourse(slug);
    if (!c) {
      // a shortlist entry with no catalogue course would render a dead card
      throw new Error(`FeaturedCourses references a missing slug: ${slug}`);
    }
    return {
      slug: c.slug,
      title: c.shortTitle ?? c.title,
      shortDescription: c.shortDescription,
      category: c.category,
      duration: c.duration,
      level: c.level,
      heroImage: c.heroImage,
      badge: c.badge,
      tools: c.tools.slice(0, 3),
    };
  });

  return (
    <section id="programs" className="relative overflow-x-clip bg-[#020B2D] section-pad">
      {/* ambience: radial glows over a faint grid, matching /courses */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="absolute -left-[10%] top-[-6%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.26)_0%,transparent_68%)] blur-3xl" />
        <div className="absolute -right-[8%] top-[22%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(20,44,142,0.40)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-[4.5rem]">
        {/* ------------------------------ header ------------------------------ */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.22em] text-[#93C5FD] backdrop-blur-xl">
            <span aria-hidden className="size-1.5 rounded-full bg-[#60A5FA]" />
            Explore Our Courses
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Build Skills.{" "}
            <span className="bg-gradient-to-r from-white via-[#60A5FA] to-[#2563EB] bg-clip-text pr-[0.08em] text-transparent">
              Build Future.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-[1.8] text-white/60">
            Industry-focused courses designed to make you job-ready and future-ready.
          </p>
        </div>

        {/* ------------------------- filters + grid --------------------------- */}
        <div className="mt-10">
          <Suspense fallback={null}>
            <CourseExplorer courses={courses} />
          </Suspense>
        </div>

        {/* ---------------------------- advisor CTA --------------------------- */}
        <div className="mt-12 flex flex-col items-center gap-5 rounded-[24px] border border-white/[0.08] bg-[rgba(7,15,40,0.95)] p-6 text-center shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8 lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row lg:gap-5">
            <span className="grid size-12 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white shadow-[0_0_26px_-8px_rgba(37,99,235,0.95)]">
              <FiUserCheck aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-[family-name:var(--font-sora)] text-[16.5px] font-bold text-white">
                Not sure which course is right for you?
              </p>
              <p className="mt-1 text-[13.5px] text-white/55">
                Get free career guidance from our experts.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(37,99,235,0.95)] transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-[0_0_44px_-6px_rgba(37,99,235,1)] motion-reduce:hover:scale-100 sm:w-auto"
          >
            Talk to Advisor
            <FiArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <p className="mt-6 text-center text-[13px] text-white/45">
          <Link href="/courses" className="text-[#93C5FD] underline-offset-4 hover:underline">
            Browse all {COURSES.length} courses
          </Link>
        </p>
      </div>
    </section>
  );
}
