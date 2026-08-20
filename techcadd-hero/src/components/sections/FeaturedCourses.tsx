import Link from "next/link";
import { FiArrowRight, FiUserCheck } from "react-icons/fi";

import CourseSpotlight, { type SpotlightCard } from "@/components/courses/CourseSpotlight";
import { COURSES, getCourse } from "@/lib/courses";

/**
 * The homepage courses section.
 *
 * Six pillar panels rather than the full catalogue grid — the grid belongs on
 * /courses, which the link at the foot of the section goes to. Each panel is
 * anchored to a real catalogue slug so its artwork, duration and category come
 * from the same source the course page renders from, and a renamed or deleted
 * course fails the build rather than shipping a dead card.
 */

/**
 * The six pillars.
 *
 * `slug` is the catalogue course the panel draws its facts from. `title` and
 * `description` override it where the panel stands for a family rather than a
 * single course — "Civil & Mechanical" covers eight CAD/CAM programmes, so it
 * borrows AutoCAD's artwork but opens the filtered catalogue.
 */
const PILLARS: {
  slug: string;
  title?: string;
  category?: string;
  description?: string;
  duration?: string;
  href?: string;
}[] = [
  { slug: "full-stack-web-development", title: "Full Stack Development" },
  { slug: "python-programming", title: "Python Programming" },
  {
    slug: "data-science",
    title: "AI & Data Science",
    description:
      "Python, statistics and modelling through to the storytelling that gets a result acted on.",
  },
  { slug: "digital-marketing", title: "Digital Marketing" },
  { slug: "java-programming", title: "Java Programming" },
  {
    slug: "autocad",
    title: "Civil & Mechanical",
    category: "Engineering",
    description:
      "AutoCAD, SolidWorks, CATIA and CNC — the drafting and design stack that design offices actually run on.",
    duration: "2 – 4 Months",
    href: "/courses?category=Civil+%26+Mechanical+Engineering",
  },
];

/** True of every track, so it is stated once rather than stored per course. */
const PLACEMENT = "Placement assistance";

export default function FeaturedCourses() {
  const cards: SpotlightCard[] = PILLARS.map((pillar) => {
    const course = getCourse(pillar.slug);
    if (!course) {
      // a pillar with no catalogue course behind it would render a dead panel
      throw new Error(`FeaturedCourses references a missing slug: ${pillar.slug}`);
    }

    return {
      slug: course.slug,
      title: pillar.title ?? course.shortTitle ?? course.title,
      category: pillar.category ?? course.category,
      description: pillar.description ?? course.shortDescription,
      duration: pillar.duration ?? course.duration,
      placement: PLACEMENT,
      image: course.heroImage,
      href: pillar.href ?? `/courses/${course.slug}`,
    };
  });

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

          <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Build Skills.{" "}
            <span className="bg-gradient-to-r from-white via-[#60A5FA] to-[#2344D4] bg-clip-text pr-[0.08em] text-transparent">
              Build Future.
            </span>
          </h2>

          <p className="mx-auto mt-3.5 max-w-xl text-[15.5px] leading-[1.8] text-white/60">
            Industry-focused programs designed for careers that actually hire.
          </p>
        </div>
      </div>

      {/*
       * The rail sits in its own, wider shell than the header above. An open
       * row is 1380px of panels, which the header's gutters would not leave
       * room for — it would either overflow or force the panels below the
       * widths the design is drawn at.
       *
       * The gutters are arbitrary values, not `px-5` / `px-6`: the app loads
       * bootstrap-grid.min.css, whose same-named utilities are !important and
       * would win, putting 48px here whatever this said.
       */}
      <div className="relative mx-auto mt-9 w-full max-w-[1440px] px-[20px] sm:px-[24px] xl:px-[16px]">
        <CourseSpotlight cards={cards} />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-[4.5rem]">
        {/* ---------------------------- advisor CTA --------------------------- */}
        <div className="mt-9 flex flex-col items-center gap-5 rounded-[24px] border border-white/[0.08] bg-[#101E52]/90 p-6 text-center shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-7 lg:flex-row lg:justify-between lg:text-left">
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

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2344D4] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(35,68,212,0.95)] transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-[0_0_44px_-6px_rgba(35,68,212,1)] motion-reduce:hover:scale-100 sm:w-auto"
          >
            Talk to Advisor
            <FiArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <p className="mt-5 text-center text-[13px] text-white/45">
          <Link href="/courses" className="text-[#93C5FD] underline-offset-4 hover:underline">
            Browse all {COURSES.length} courses
          </Link>
        </p>
      </div>
    </section>
  );
}
