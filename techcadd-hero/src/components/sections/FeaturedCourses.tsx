import Link from "next/link";
import { FiArrowRight, FiUserCheck } from "react-icons/fi";

import CourseSpotlight, { type SpotlightCard } from "@/components/courses/CourseSpotlight";
import { getAllCourses } from "@/lib/courses";
import { PROGRAMMES } from "@/lib/training/programmes";
import { whatsappLink } from "@/lib/cta";

/**
 * The homepage courses section.
 *
 * The rail is the whole catalogue, not a hand-picked shortlist: `getAllCourses`
 * is the built-in course data with anything published in the CMS merged over
 * it, so a course added in either place appears here on the next request with
 * no code change. The internship and training programmes are appended for the
 * same reason — they are a category a visitor expects to find in "our courses",
 * and each one has a page of its own to open.
 *
 * Nothing in this file names a course. That is deliberate: the previous version
 * listed six pillars by slug, which meant every new course was invisible here
 * until someone remembered to add it.
 */

/** Programmes are grouped under one label rather than their internal buckets. */
const PROGRAMME_CATEGORY = "Internship Programs";

export default async function FeaturedCourses() {
  const courses = await getAllCourses();

  const cards: SpotlightCard[] = [
    ...courses.map((course) => ({
      slug: course.slug,
      title: course.shortTitle ?? course.title,
      category: course.category,
      description: course.shortDescription,
      image: course.heroImage,
      href: `/courses/${course.slug}`,
    })),

    /*
     * Prefixed keys: a programme and a course could in principle share a slug,
     * and React would then drop one of the two cards silently.
     */
    ...PROGRAMMES.map((programme) => ({
      slug: `training-${programme.slug}`,
      title: programme.title,
      category: PROGRAMME_CATEGORY,
      description: programme.summary,
      image: programme.image,
      href: `/internship-training/${programme.slug}`,
    })),
  ];

  return (
    <section id="programs" className="relative overflow-x-clip bg-[#0A1437] section-pad">
      {/* ambience: radial glows over a faint grid, matching /courses */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="absolute -left-[10%] top-[-6%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(35,68,212,0.26)_0%,transparent_68%)] blur-3xl" />
        <div className="absolute -right-[8%] top-[22%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.45)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* ------------------------------- header ------------------------------ */}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-[4.5rem]">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.22em] text-[#93C5FD] backdrop-blur-xl">
            <span aria-hidden className="size-1.5 rounded-full bg-[#60A5FA]" />
            Explore Our Courses
          </span>

          <h2 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-sora)] text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
            Build Skills.{" "}
            <span className="bg-gradient-to-r from-white via-[#60A5FA] to-[#2344D4] bg-clip-text pr-[0.08em] text-transparent">
              Build Future.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-[1.7] text-white/60">
            Industry-focused programs designed for careers that actually hire.
          </p>
        </div>
      </div>

      {/*
       * The rail sits in its own, wider shell than the header above, so it runs
       * the full width of the band rather than inside the header's gutters. Its
       * card widths are fractions of this shell, which is what sets how many
       * are on screen at each breakpoint.
       *
       * The gutters are arbitrary values, not `px-5` / `px-6`: the app loads
       * bootstrap-grid.min.css, whose same-named utilities are !important and
       * would put 48px here whatever this said.
       */}
      {/*
       * `overflow-x-clip` on the shell, because the rail itself is
       * `overflow-visible` so a lifted card is not sliced off at the top — that
       * would otherwise let the looping slides push the page sideways.
       */}
      <div className="relative mx-auto mt-7 w-full max-w-[1440px] overflow-x-clip px-[20px] py-[30px] sm:px-[24px] xl:px-[16px]">
        <CourseSpotlight cards={cards} />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-[4.5rem]">
        {/* ---------------------------- advisor CTA --------------------------- */}
        <div className="mt-7 flex flex-col items-center gap-5 rounded-[24px] border border-white/[0.08] bg-[#101E52]/90 p-6 text-center shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-7 lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row lg:gap-5">
            <span className="grid size-12 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#2344D4] text-white shadow-[0_0_26px_-8px_rgba(35,68,212,0.95)]">
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

          <a
            {...whatsappLink()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2344D4] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(35,68,212,0.95)] transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-[0_0_44px_-6px_rgba(35,68,212,1)] motion-reduce:hover:scale-100 sm:w-auto"
          >
            Talk to Advisor
            <FiArrowRight aria-hidden className="size-4" />
          </a>
        </div>

        <p className="mt-5 text-center text-[13px] text-white/45">
          <Link href="/courses" className="text-[#93C5FD] underline-offset-4 hover:underline">
            Browse all {courses.length} courses
          </Link>
        </p>
      </div>
    </section>
  );
}
