"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiGlobe,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, fadeUp } from "./shared";

/*
 * Teaching section: an image collage and stat grid on the left, the course's
 * own points on the right.
 *
 * The heading, intro and every card come from `course.instructor` untouched —
 * this file only decides how they are presented.
 */

/* Cards carry no icon of their own, so one is chosen by position. */
const CARD_ICONS = [FiBookOpen, FiTrendingUp, FiBriefcase, FiGlobe, FiUsers, FiCode];

/** Floating glass badges over the collage. */
const BADGES = [
  { icon: FiUsers, title: "1000+", label: "Students Trained", pos: "left-0 top-2 sm:-left-2" },
  { icon: FiCode, title: null, label: "Live Projects", pos: "bottom-[22%] left-2 sm:left-4" },
  { icon: FiBriefcase, title: null, label: "Placement Support", pos: "-bottom-2 right-2 sm:right-6" },
];

const STATS = [
  { icon: FiUsers, to: 1000, suffix: "+", label: "Happy Students" },
  { icon: FiBriefcase, to: 50, suffix: "+", label: "Industry Projects" },
  { icon: FiAward, to: 100, suffix: "%", label: "Practical Training" },
  { icon: FiUserCheck, to: null, display: "Yes", label: "Industry Experts" },
];

/** Counts up once on screen; static under reduced motion. */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const DURATION = 1100;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/**
 * Paints the course name inside the heading blue, without touching the copy —
 * if the name is not in the heading the whole string renders as written.
 */
function highlight(heading: string, name: string): ReactNode {
  const at = heading.toLowerCase().indexOf(name.toLowerCase());
  if (at === -1) return heading;

  return (
    <>
      {heading.slice(0, at)}
      <span className="text-[#2563EB]">{heading.slice(at, at + name.length)}</span>
      {heading.slice(at + name.length)}
    </>
  );
}

export default function InstructorSection({ course }: { course: Course }) {
  const { heading, intro, points } = course.instructor;
  if (!points.length) return null;

  const name = course.shortTitle ?? course.title;

  return (
    <Section tint>
      <Reveal className="grid w-full max-w-full items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
        {/* ------------------------- image showcase ------------------------- */}
        <motion.div variants={fadeUp} className="relative w-full max-w-full">
          {/* soft blue blob + dotted patterns */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[12%] top-[6%] -z-10 size-[72%] rounded-[46%_54%_38%_62%/58%_42%_58%_42%] bg-[#2563EB]/[0.10] blur-2xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-1 -top-3 -z-10 size-24 bg-[radial-gradient(circle,rgba(37,99,235,0.32)_1.3px,transparent_1.3px)] bg-[size:11px_11px] opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-4 left-0 -z-10 size-28 bg-[radial-gradient(circle,rgba(20,44,142,0.24)_1.3px,transparent_1.3px)] bg-[size:12px_12px] opacity-60"
          />

          {/* collage */}
          <div className="relative pb-[26%]">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35 }}
              className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[24px] shadow-[0_30px_64px_-34px_rgba(15,23,42,0.6)] ring-1 ring-inset ring-slate-900/[0.06]"
            >
              <Image
                src="/images/classroom.webp"
                alt="A TechCadd trainer running a session"
                fill
                sizes="(max-width: 1023px) 92vw, 38vw"
                className="object-cover"
              />
            </motion.div>

            {/* two smaller frames overlapping the lower edge */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-[8%] left-0 w-[52%] overflow-hidden rounded-[18px] shadow-[0_22px_46px_-26px_rgba(15,23,42,0.75)] ring-4 ring-white"
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src="/images/campus1.webp"
                  alt=""
                  aria-hidden
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 46vw, 20vw"
                  className="object-cover"
                />
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-0 right-[4%] w-[46%] overflow-hidden rounded-[18px] shadow-[0_22px_46px_-26px_rgba(15,23,42,0.75)] ring-4 ring-white"
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src="/images/campus2.webp"
                  alt=""
                  aria-hidden
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 42vw, 18vw"
                  className="object-cover"
                />
              </span>
            </motion.div>

            {/* floating badges */}
            {BADGES.map(({ icon: Icon, title, label, pos }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                className={`absolute z-10 inline-flex items-center gap-2.5 rounded-[16px] border border-white/70 bg-white/90 px-3 py-2.5 shadow-[0_16px_36px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md ${pos}`}
              >
                <span className="grid size-8 shrink-0 place-content-center rounded-[10px] bg-[#2563EB]/10">
                  <Icon aria-hidden className="size-4 text-[#2563EB]" />
                </span>
                <span className="text-left">
                  {title && (
                    <span className="block font-[family-name:var(--font-sora)] text-[14px] font-extrabold leading-none text-[#0F172A]">
                      {title}
                    </span>
                  )}
                  <span
                    className={`block text-[11.5px] leading-tight text-[#475569] ${
                      title ? "mt-0.5" : "font-semibold text-[#0F172A]"
                    }`}
                  >
                    {label}
                  </span>
                </span>
              </motion.span>
            ))}
          </div>

          {/* --------------------------- stats 2x2 -------------------------- */}
          <ul className="mt-8 grid grid-cols-2 gap-3.5">
            {STATS.map(({ icon: Icon, to, suffix, display, label }) => (
              <motion.li
                key={label}
                variants={fadeUp}
                className="flex items-center gap-3 rounded-[18px] border border-slate-200/70 bg-white p-4 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-26px_rgba(37,99,235,0.55)] motion-reduce:hover:translate-y-0"
              >
                <span className="grid size-11 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_12px_26px_-14px_rgba(37,99,235,0.95)]">
                  <Icon aria-hidden className="size-[18px] text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block font-[family-name:var(--font-sora)] text-[19px] font-extrabold leading-none tracking-[-0.02em] text-[#0F172A]">
                    {to === null ? display : <Counter to={to} suffix={suffix} />}
                  </span>
                  <span className="mt-1 block text-[11.5px] leading-tight text-[#475569]">
                    {label}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* -------------------------- feature cards ------------------------- */}
        <div className="w-full max-w-full">
          <motion.div variants={fadeUp}>
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Teaching
            </span>
            <span aria-hidden className="mt-2 block h-[3px] w-7 rounded-full bg-[#2563EB]" />

            <h2 className="mt-5 font-[family-name:var(--font-sora)] text-[clamp(1.5rem,2.8vw,2.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0F172A]">
              {highlight(heading, name)}
            </h2>

            <p className="mt-4 max-w-xl text-[14.5px] leading-[1.8] text-[#475569]">{intro}</p>
          </motion.div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {points.map((p, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];

              return (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  className="group flex h-full flex-col rounded-[20px] border border-slate-200/70 bg-white p-6 shadow-[0_14px_34px_-30px_rgba(15,23,42,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] motion-reduce:hover:translate-y-0"
                >
                  <span className="grid size-12 shrink-0 place-content-center rounded-[14px] bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_14px_28px_-16px_rgba(37,99,235,0.95)] transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                    <Icon aria-hidden className="size-[22px] text-white" />
                  </span>

                  <h3 className="mt-5 font-[family-name:var(--font-sora)] text-[16px] font-bold leading-snug tracking-[-0.015em] text-[#0F172A]">
                    {p.title}
                  </h3>
                  <span aria-hidden className="mt-2.5 block h-[3px] w-7 rounded-full bg-[#2563EB]" />

                  <p className="mt-3.5 flex-1 text-[13.5px] leading-relaxed text-[#475569]">
                    {p.copy}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
