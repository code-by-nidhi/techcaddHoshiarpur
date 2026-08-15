"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiCheck, FiTrendingUp } from "react-icons/fi";
import {
  MEGA_COLUMNS, MEGA_FEATURED, MEGA_QUOTE, MEGA_VIEW_ALL, type MegaCourse,
} from "@/lib/megaMenu";

/** The panel itself: fade, rise and a touch of scale. */
export const panelIn: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.2, ease: "easeIn" } },
};

const columnIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Desktop mega panel. Rendered by the navbar inside its fixed header, so it
 * floats under the bar and stays centred at any width.
 */
export default function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      variants={panelIn}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative w-[min(1400px,calc(100vw-3rem))] rounded-[30px] border border-white/[0.14] bg-[#070c1c]/90 p-8 shadow-[0_40px_90px_-30px_rgba(2,6,23,0.95),0_0_60px_-20px_rgba(37,99,235,0.55)] backdrop-blur-2xl"
    >
      {/* premium border glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[30px] bg-[linear-gradient(120deg,rgba(96,165,250,0.35),rgba(168,85,247,0.25),rgba(56,189,248,0.35))] opacity-40"
        style={{ WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }}
      />

      <div className="row g-4">
        {MEGA_COLUMNS.map((col) => (
          <motion.div key={col.id} variants={columnIn} className="col-12 col-md-6 col-xl-3">
            <p className="font-[family-name:var(--font-mono-face)] text-[11px] tracking-[0.22em] text-[#60A5FA]">
              {col.index}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-sora)] text-[15.5px] font-bold leading-snug text-white">
              {col.title}
            </h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/45">{col.description}</p>

            <ul className="mt-4 space-y-0.5">
              {col.courses.map((course) => (
                <li key={course.label}>
                  <CourseLink course={course} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* featured */}
        <motion.div variants={columnIn} className="col-12 col-xl-3">
          <FeaturedCard onNavigate={onNavigate} />
        </motion.div>
      </div>

      {/* footer strip */}
      <motion.div
        variants={columnIn}
        className="mt-7 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center"
      >
        <p className="text-[13px] italic text-white/45">&ldquo;{MEGA_QUOTE}&rdquo;</p>
        <Link
          href={MEGA_VIEW_ALL.href}
          onClick={onNavigate}
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#93C5FD] transition-colors hover:text-white"
        >
          {MEGA_VIEW_ALL.label}
          <FiArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------- pieces --------------------------------- */

/** One catalogue row: slides right, glows blue, reveals its arrow. */
export function CourseLink({
  course,
  onNavigate,
}: {
  course: MegaCourse;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={course.href}
      onClick={onNavigate}
      className="group/item flex items-center gap-2 rounded-xl px-2.5 py-[7px] text-[13.5px] text-white/70 transition-[background-color,color,transform] duration-300 hover:translate-x-1 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_24px_-10px_rgba(59,130,246,0.9)] focus-visible:bg-white/[0.06] focus-visible:text-white"
    >
      <span className="truncate">{course.label}</span>

      {course.trending && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-2 py-[3px] text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white">
          <FiTrendingUp aria-hidden className="size-2.5" />
          Trending
        </span>
      )}

      <FiArrowUpRight
        aria-hidden
        className="ml-auto size-3.5 shrink-0 text-[#60A5FA] opacity-0 transition-all duration-300 group-hover/item:opacity-100 group-focus-visible/item:opacity-100"
      />
    </Link>
  );
}

/** The gradient promo card that closes the row. */
export function FeaturedCard({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#1e3a8a_0%,#2563eb_45%,#7c3aed_100%)] p-6 shadow-[0_26px_60px_-28px_rgba(37,99,235,0.95)] transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-16 size-44 rounded-full bg-white/25 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <p className="relative font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-white/70">
        {MEGA_FEATURED.eyebrow}
      </p>
      <h3 className="relative mt-2.5 font-[family-name:var(--font-sora)] text-[18px] font-extrabold leading-snug text-white">
        <span aria-hidden>🚀</span> {MEGA_FEATURED.title}
      </h3>

      <ul className="relative mt-4 grid grid-cols-1 gap-x-3 gap-y-1.5 sm:grid-cols-2 xl:grid-cols-1">
        {MEGA_FEATURED.features.map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-[12px] text-white/85">
            <FiCheck aria-hidden className="size-3 shrink-0 text-[#93C5FD]" />
            <span className="truncate">{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={MEGA_FEATURED.cta.href}
        onClick={onNavigate}
        className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0a0f1e] transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_rgba(255,255,255,0.8)]"
      >
        {MEGA_FEATURED.cta.label}
        <FiArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
