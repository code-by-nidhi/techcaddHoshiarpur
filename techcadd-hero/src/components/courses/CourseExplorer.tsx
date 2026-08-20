"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCheck, FiClock } from "react-icons/fi";

/*
 * The catalogue grid with category filter pills.
 *
 * It receives a slim projection of the catalogue rather than whole Course
 * objects — the grid needs eight fields, and serialising modules, FAQs and
 * projects for 39 courses into the page payload would cost far more than the
 * markup it renders.
 *
 * Filtering is client state on an already-rendered list, so every card is in
 * the HTML for crawlers regardless of which pill is active.
 */

export type ExplorerCourse = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  duration: string;
  level: string;
  heroImage: string;
  badge?: string;
  tools: string[];
};

const ALL = "All Courses";

/** Badge tint per label — neon on the dark ground, all within the brand set. */
const BADGE_TONE: Record<string, string> = {
  "Most Popular": "from-[#142C8E] to-[#2563EB]",
  Trending: "from-[#1E40AF] to-[#60A5FA]",
  New: "from-[#2563EB] to-[#93C5FD]",
  "High Demand": "from-[#142C8E] to-[#3B82F6]",
  "Best Seller": "from-[#1E40AF] to-[#93C5FD]",
};

/* True of every track, so it is stated once rather than stored per course. */
const FEATURES = ["Live Projects", "Certification", "Placement Support", "Industry Training"];

export default function CourseExplorer({ courses }: { courses: ExplorerCourse[] }) {
  const reduce = useReducedMotion();

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(courses.map((c) => c.category)))],
    [courses],
  );

  /* Footer links arrive as /courses?category=Programming, so the pill they
     name is the one selected on landing. An unknown value falls back to All
     rather than showing an empty grid. */
  const params = useSearchParams();
  const requested = params.get("category");
  const [active, setActive] = useState(
    requested && categories.includes(requested) ? requested : ALL,
  );

  const visible = useMemo(
    () => (active === ALL ? courses : courses.filter((c) => c.category === active)),
    [active, courses],
  );

  return (
    <>
      {/* ----------------------------- filters ----------------------------- */}
      <ul className="-mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {categories.map((category) => {
          const on = category === active;
          return (
            <li key={category} className="snap-start shrink-0">
              <button
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={on}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-[background-color,border-color,box-shadow,color] duration-300 ${
                  on
                    ? "border border-white/20 bg-gradient-to-r from-[#142C8E] to-[#2563EB] text-white shadow-[0_0_26px_-6px_rgba(37,99,235,0.95)]"
                    : "border border-white/10 bg-white/[0.05] text-white/70 backdrop-blur-xl hover:border-[#2563EB]/50 hover:text-white hover:shadow-[0_0_22px_-8px_rgba(37,99,235,0.9)]"
                }`}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ------------------------------ grid ------------------------------- */}
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course, i) => (
          <motion.li
            key={course.slug}
            /* `layout` keeps cards from jumping when a filter changes */
            layout
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.04 }}
            className="h-full"
          >
            <Link
              href={`/courses/${course.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[rgba(7,15,40,0.95)] shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[#2563EB]/45 hover:shadow-[0_28px_60px_-28px_rgba(37,99,235,0.65)] motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={course.heroImage}
                  alt={course.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(2,11,45,0.85))]"
                />

                {course.badge && (
                  <span
                    className={`absolute left-3 top-3 rounded-full bg-gradient-to-r px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_18px_-4px_rgba(37,99,235,1)] ${
                      BADGE_TONE[course.badge] ?? BADGE_TONE.Trending
                    }`}
                  >
                    {course.badge}
                  </span>
                )}

                <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-[#020B2D]/70 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#93C5FD] backdrop-blur-md">
                  {course.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-[family-name:var(--font-sora)] text-[16px] font-bold leading-snug tracking-[-0.015em] text-white">
                  {course.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/55">
                  {course.shortDescription}
                </p>

                <ul className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-1.5 text-[11px] text-white/60"
                    >
                      <FiCheck aria-hidden className="size-3 shrink-0 text-[#60A5FA]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock aria-hidden className="size-3.5 text-[#60A5FA]" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiBarChart2 aria-hidden className="size-3.5 text-[#60A5FA]" />
                    {course.level}
                  </span>
                </p>

                <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_0_24px_-8px_rgba(37,99,235,0.95)] transition-[transform,box-shadow] duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_0_36px_-6px_rgba(37,99,235,1)] motion-reduce:group-hover:scale-100">
                  Explore Course
                  <FiArrowRight aria-hidden className="size-3.5" />
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-[14px] text-white/50">
          No courses in this category yet.
        </p>
      )}
    </>
  );
}
