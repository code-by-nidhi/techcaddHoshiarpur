"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiBarChart2,
  FiBox,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiExternalLink,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiPlayCircle,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import type { Course, Module } from "@/lib/courses/types";
import { Reveal, fadeUp } from "./shared";

/**
 * Curriculum as a learning roadmap: modules alternate either side of a lit
 * spine, and clicking one opens its detail in place.
 *
 * Module names, summaries, topics, durations and lesson counts all come from
 * the course data untouched — this file only decides how they are presented.
 */

/* Modules carry no icon of their own, so one is chosen by position. The set is
   generic enough to read sensibly for any subject in the catalogue. */
const STEP_ICONS = [
  FiTerminal, FiGitBranch, FiLayers, FiCode, FiBox, FiZap,
  FiBarChart2, FiDatabase, FiGlobe, FiCpu, FiPlayCircle, FiAward,
];

/** Tracker stages: the course's own, or one derived from what it declares. */
function journeyStages(course: Course): string[] {
  if (course.journey?.length) return course.journey;

  const ends = course.level.split(/\s+to\s+/i);
  const stages = [ends[0] ?? "Start", `${course.modules.length} Modules`];
  if (ends[1]) stages.push(ends[1]);
  stages.push("Projects");
  if (course.certification) stages.push("Certification");
  return stages;
}

export default function CourseModules({ course }: { course: Course }) {
  const [open, setOpen] = useState<number>(0);
  if (!course.modules.length) return null;

  const total = course.modules.length;
  const totalLessons = course.modules.reduce((n, m) => n + (m.lessons ?? 0), 0);
  const stages = journeyStages(course);

  return (
    <section
      id="curriculum"
      className="relative overflow-x-clip bg-[#101C4D] py-16 lg:py-20"
    >
      {/* ---------------------------- decoration ---------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="absolute -left-[10%] top-[6%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.26)_0%,transparent_68%)] blur-3xl" />
        <div className="absolute -right-[8%] top-[42%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(20,44,142,0.40)_0%,transparent_70%)] blur-3xl" />
        {/* coding symbols, set very low so they read as texture */}
        <span className="absolute left-[6%] top-[18%] font-[family-name:var(--font-mono-face)] text-[5rem] text-white/[0.03]">
          {"{ }"}
        </span>
        <span className="absolute right-[9%] top-[62%] font-[family-name:var(--font-mono-face)] text-[4.5rem] text-white/[0.03]">
          {"</>"}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <Reveal>
          {/* ----------------------- learning path header ------------------- */}
          <motion.div variants={fadeUp} className="text-center">
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#93C5FD]">
              Curriculum
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-sora)] text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-[-0.025em] text-white">
              Course modules
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-[1.8] text-white/55">
              {total} modules{totalLessons ? `, ${totalLessons} sessions` : ""} — sequenced so each
              one builds on what you just shipped.
            </p>

            <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
              {[
                { icon: FiLayers, label: `${total} Modules` },
                { icon: FiClock, label: course.duration },
                { icon: FiBarChart2, label: course.level },
                ...(course.certification
                  ? [{ icon: FiAward, label: "Certificate Included" }]
                  : []),
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-2 text-[12px] font-medium text-white/75 backdrop-blur-xl"
                >
                  <Icon aria-hidden className="size-3.5 text-[#60A5FA]" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ------------------------ progress tracker ---------------------- */}
          <motion.ol
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5"
          >
            {stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/[0.12] px-3 py-1.5 text-[11.5px] font-semibold text-[#93C5FD]">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#60A5FA]" />
                  {stage}
                </span>
                {i < stages.length - 1 && (
                  <span aria-hidden className="h-px w-4 bg-gradient-to-r from-[#2563EB] to-transparent sm:w-6" />
                )}
              </li>
            ))}
          </motion.ol>

          {/* --------------------------- roadmap ---------------------------- */}
          <ol className="relative mt-14">
            {/* the spine: centred from lg, left-aligned when stacked */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-transparent via-[#2563EB]/45 to-transparent lg:left-1/2"
            />

            {course.modules.map((m, i) => (
              <RoadmapStep
                key={m.title}
                module={m}
                index={i}
                total={total}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- a step -------------------------------- */

function RoadmapStep({
  module: m,
  index,
  total,
  isOpen,
  onToggle,
}: {
  module: Module;
  index: number;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  const left = index % 2 === 0;

  return (
    <motion.li
      variants={fadeUp}
      className={`relative pb-6 pl-14 lg:w-1/2 lg:pl-0 ${
        left ? "lg:pr-12 lg:text-left" : "lg:ml-auto lg:pl-12"
      }`}
    >
      {/* node on the spine */}
      <motion.span
        aria-hidden
        whileHover={{ scale: 1.12 }}
        className={`absolute left-0 top-6 z-10 grid size-10 place-content-center rounded-full border border-white/15 font-[family-name:var(--font-mono-face)] text-[12px] font-bold transition-[background-color,box-shadow] duration-300 lg:top-8 ${
          left ? "lg:-right-5 lg:left-auto" : "lg:-left-5"
        } ${
          isOpen
            ? "bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white shadow-[0_0_26px_-4px_rgba(37,99,235,1)]"
            : "bg-[#0A1533] text-[#93C5FD] shadow-[0_0_18px_-8px_rgba(37,99,235,0.9)]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* connector from the spine to the card */}
      <span
        aria-hidden
        className={`absolute top-11 hidden h-px w-12 transition-colors duration-300 lg:block ${
          left ? "right-0" : "left-0"
        } ${
          isOpen
            ? "bg-gradient-to-r from-[#2563EB] to-[#60A5FA]"
            : "bg-white/12"
        }`}
      />

      <div
        className={`group rounded-[22px] bg-gradient-to-br p-px transition-[transform,box-shadow] duration-300 hover:-translate-y-2 motion-reduce:hover:translate-y-0 ${
          isOpen
            ? "from-[#2563EB]/70 via-[#60A5FA]/40 to-transparent shadow-[0_26px_56px_-30px_rgba(37,99,235,0.85)]"
            : "from-white/[0.14] to-transparent hover:shadow-[0_26px_56px_-30px_rgba(37,99,235,0.7)]"
        }`}
      >
        <div className="rounded-[21px] bg-[rgba(7,15,40,0.95)] backdrop-blur-xl">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`module-${index}`}
            className="w-full px-5 py-5 text-left"
          >
            <span className="flex items-start gap-3.5">
              <span className="grid size-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_12px_26px_-14px_rgba(37,99,235,0.95)] transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                <Icon aria-hidden className="size-5 text-white" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-[family-name:var(--font-mono-face)] text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Module {index + 1}
                </span>
                <span className="mt-1 block font-[family-name:var(--font-sora)] text-[15.5px] font-bold leading-snug text-white">
                  {m.title}
                </span>
              </span>

              {m.duration && (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/65">
                  <FiClock aria-hidden className="size-3" />
                  {m.duration}
                </span>
              )}
            </span>

            <span className="mt-3 block text-[13px] leading-relaxed text-white/55">{m.summary}</span>

            {/* topics as pills */}
            <span className="mt-3.5 flex flex-wrap gap-1.5">
              {m.topics.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10.5px] text-white/65"
                >
                  {t}
                </span>
              ))}
              {m.topics.length > 4 && (
                <span className="rounded-full border border-[#2563EB]/30 bg-[#2563EB]/15 px-2.5 py-1 text-[10.5px] font-semibold text-[#93C5FD]">
                  +{m.topics.length - 4} more
                </span>
              )}
            </span>

            {/* progress through the course */}
            <span className="mt-4 flex items-center gap-2.5">
              <span aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: `${((index + 1) / total) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-full rounded-full bg-gradient-to-r from-[#142C8E] to-[#60A5FA]"
                />
              </span>
              <span className="font-[family-name:var(--font-mono-face)] text-[10px] text-white/40">
                {index + 1}/{total}
              </span>
            </span>
          </button>

          {/* -------------------------- expanded ------------------------- */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={`module-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/[0.08] px-5 py-4">
                  <p className="font-[family-name:var(--font-mono-face)] text-[10px] uppercase tracking-[0.18em] text-white/40">
                    What this module covers
                  </p>

                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {m.topics.map((t, ti) => (
                      <motion.li
                        key={t}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: ti * 0.04 }}
                        className="flex items-center gap-2 text-[12.5px] text-white/70"
                      >
                        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-[#60A5FA]" />
                        {t}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-white/50">
                    {m.lessons && (
                      <span className="inline-flex items-center gap-1.5">
                        <FiPlayCircle aria-hidden className="size-3.5" />
                        {m.lessons} sessions
                      </span>
                    )}
                    {m.resource && (
                      <a
                        href={m.resource.href}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#60A5FA] hover:underline"
                      >
                        <FiExternalLink aria-hidden className="size-3.5" />
                        {m.resource.label}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.li>
  );
}
