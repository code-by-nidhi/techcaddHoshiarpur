"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiAward, FiBriefcase, FiCheck, FiLayers, FiUsers } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

/*
 * Teaching section: an image collage on the left, the course's own points on
 * the right. The heading, intro and every card come from `course.instructor`
 * untouched — only the presentation around them is defined here.
 */

/** Floating glass badges over the collage. */
const BADGES = [
  { icon: FiUsers, label: "1000+ Students Trained", pos: "left-3 top-5 sm:-left-5 sm:top-8" },
  { icon: FiLayers, label: "Live Projects", pos: "right-3 top-[38%] sm:-right-4" },
  { icon: FiBriefcase, label: "Placement Support", pos: "bottom-[30%] left-2 sm:-left-6" },
  { icon: FiAward, label: "Industry Experts", pos: "bottom-4 right-4 sm:-right-2" },
];

/** Compact stat row under the collage. */
const STATS = [
  { to: 1000, suffix: "+", label: "Happy Students" },
  { to: 50, suffix: "+", label: "Industry Projects" },
  { to: 100, suffix: "%", label: "Practical Training" },
  { to: null, display: "Yes", label: "Placement Support" },
];

/** Counts up once the row is on screen; static under reduced motion. */
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
      // ease-out so it settles rather than stopping dead
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

export default function InstructorSection({ course }: { course: Course }) {
  const { heading, intro, points } = course.instructor;
  if (!points.length) return null;

  return (
    <Section tint>
      {/* 40 / 60 from lg; stacked below, with the collage on top */}
      <Reveal className="grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
        {/* ------------------------- image showcase ------------------------- */}
        <motion.div variants={fadeUp} className="relative">
          {/* glow + dotted pattern behind the collage */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.20),transparent_62%),radial-gradient(circle_at_75%_85%,rgba(96,165,250,0.18),transparent_60%)] blur-2xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 -z-10 size-24 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_1.2px,transparent_1.2px)] bg-[size:10px_10px] opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-5 -left-3 -z-10 size-28 rounded-full bg-[radial-gradient(circle,rgba(20,44,142,0.22)_1.2px,transparent_1.2px)] bg-[size:11px_11px] opacity-60"
          />

          {/* main image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] shadow-[0_26px_60px_-34px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.06]"
          >
            <Image
              src="/images/classroom.webp"
              alt="A TechCadd trainer running a session"
              fill
              sizes="(max-width: 1023px) 92vw, 40vw"
              className="object-cover"
            />
          </motion.div>

          {/* two overlapping smaller frames — hidden on the narrowest screens
              so nothing can push past the viewport edge */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-8 -right-2 hidden w-[42%] overflow-hidden rounded-[18px] shadow-[0_22px_44px_-26px_rgba(15,23,42,0.7)] ring-4 ring-white sm:block"
          >
            <span className="relative block aspect-[4/3]">
              <Image
                src="/images/campus1.webp"
                alt=""
                aria-hidden
                fill
                loading="lazy"
                sizes="(max-width: 1023px) 40vw, 18vw"
                className="object-cover"
              />
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="absolute -left-4 top-1/2 hidden w-[30%] -translate-y-1/2 overflow-hidden rounded-[16px] shadow-[0_22px_44px_-26px_rgba(15,23,42,0.7)] ring-4 ring-white lg:block"
          >
            <span className="relative block aspect-square">
              <Image
                src="/images/campus2.webp"
                alt=""
                aria-hidden
                fill
                loading="lazy"
                sizes="14vw"
                className="object-cover"
              />
            </span>
          </motion.div>

          {/* glass badges */}
          {BADGES.map(({ icon: Icon, label, pos }, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className={`absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-2.5 py-1.5 text-[10.5px] font-semibold text-[#0F172A] shadow-[0_10px_26px_-16px_rgba(15,23,42,0.8)] backdrop-blur-md sm:px-3 sm:text-[11.5px] ${pos}`}
            >
              <Icon aria-hidden className="size-3 text-[#2563EB] sm:size-3.5" />
              {label}
            </motion.span>
          ))}

          {/* -------------------------- statistics ------------------------- */}
          <ul className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((s) => (
              <motion.li
                key={s.label}
                variants={fadeUp}
                className="rounded-[16px] border border-white/70 bg-white/70 p-3 text-center shadow-[0_10px_28px_-24px_rgba(15,23,42,0.7)] backdrop-blur-[14px]"
              >
                <p className="font-[family-name:var(--font-sora)] text-[19px] font-extrabold tracking-[-0.02em] text-[#142C8E]">
                  {s.to === null ? s.display : <Counter to={s.to} suffix={s.suffix} />}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-[#475569]">{s.label}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* -------------------------- feature cards ------------------------- */}
        <div>
          <SectionHead eyebrow="Teaching" title={heading} sub={intro} />

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <motion.li
                key={p.title}
                variants={fadeUp}
                /* gradient border via a 1px padded wrapper, so the card keeps a
                   solid interior without a second background layer */
                className="group h-full rounded-[20px] bg-gradient-to-br from-[#2563EB]/25 via-[#60A5FA]/15 to-transparent p-px transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_26px_54px_-28px_rgba(37,99,235,0.65)] motion-reduce:hover:translate-y-0"
              >
                <div className="flex h-full flex-col rounded-[19px] border border-white/60 bg-white/80 p-5 backdrop-blur-[14px]">
                  <span className="grid size-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_12px_26px_-14px_rgba(37,99,235,0.95)] transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                    <FiCheck aria-hidden className="size-5 text-white" />
                  </span>

                  <h3 className="mt-4 font-[family-name:var(--font-sora)] text-[15.5px] font-bold leading-snug tracking-[-0.015em] text-[#0F172A]">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-[#475569]">
                    {p.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
