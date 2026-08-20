"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** One rhythm, one heading treatment, used by every section on the page. */

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const CARD =
  "rounded-[22px] border border-slate-200/80 bg-white shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)]";

/**
 * Brand navy — the same value the navbar carries, so a dark band on a course
 * page and the bar above it read as one surface rather than two near-misses.
 */
export const DARK = "#101C4D";

export function Section({
  id,
  tint = false,
  tone = "light",
  children,
  className = "",
}: {
  id?: string;
  /** soft blue-grey ground, for alternating bands */
  tint?: boolean;
  /**
   * "dark" paints the section brand navy and adds `course-dark`, which
   * re-tints the headings, body copy, cards and borders inside it. The colour
   * inversion lives in globals.css rather than in every child component, so a
   * section can be flipped by changing this one prop.
   */
  tone?: "light" | "dark";
  children: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <section
      id={id}
      style={dark ? { backgroundColor: DARK } : undefined}
      className={`relative overflow-x-clip py-16 lg:py-20 ${
        dark ? "course-dark" : tint ? "bg-[#F6F9FF]" : "bg-white"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <motion.div variants={fadeUp} className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#2563EB]">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-[family-name:var(--font-sora)] text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-[-0.025em] text-[#0F172A] ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </h2>
      {sub && <p className="mt-3 text-[14.5px] leading-[1.8] text-[#475569]">{sub}</p>}
    </motion.div>
  );
}

/** Wraps a block so its children stagger in once scrolled to. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Small labelled pill used for tools, topics and tech lists. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#334155]">
      {children}
    </span>
  );
}
