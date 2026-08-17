"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiClock, FiExternalLink, FiPlayCircle } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Chip, Reveal, Section, SectionHead, fadeUp } from "./shared";

/**
 * Curriculum as a timeline of accordions: the spine keeps the sequence legible
 * while collapsed panels stop a six-module syllabus running for pages.
 */
export default function CourseModules({ course }: { course: Course }) {
  const [open, setOpen] = useState(0);
  if (!course.modules.length) return null;

  const totalLessons = course.modules.reduce((n, m) => n + (m.lessons ?? 0), 0);

  return (
    <Section id="curriculum">
      <Reveal>
        <SectionHead
          eyebrow="Curriculum"
          title="Course modules"
          sub={`${course.modules.length} modules${
            totalLessons ? `, ${totalLessons} sessions` : ""
          } — sequenced so each one builds on what you just shipped.`}
        />

        <ol className="relative mt-10">
          <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-slate-200" />

          {course.modules.map((m, i) => {
            const isOpen = open === i;

            return (
              <motion.li key={m.title} variants={fadeUp} className="relative pb-3 pl-11">
                <span
                  aria-hidden
                  className={`absolute left-0 top-4 grid size-8 place-content-center rounded-full border-2 border-white font-[family-name:var(--font-mono-face)] text-[11px] font-bold transition-colors duration-300 ${
                    isOpen
                      ? "bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white"
                      : "bg-slate-100 text-[#64748B]"
                  }`}
                >
                  {i + 1}
                </span>

                <div
                  className={`overflow-hidden rounded-[20px] border bg-white transition-colors duration-300 ${
                    isOpen
                      ? "border-[#2563EB]/30 shadow-[0_20px_46px_-30px_rgba(37,99,235,0.5)]"
                      : "border-slate-200/80"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`module-${i}`}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-slate-50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em] text-[#94A3B8]">
                          Module {i + 1}
                        </span>
                        <span className="mt-1 block font-[family-name:var(--font-sora)] text-[15.5px] font-bold text-[#0F172A]">
                          {m.title}
                        </span>
                      </span>

                      {m.duration && (
                        <span className="hidden items-center gap-1.5 text-[12px] text-[#64748B] sm:flex">
                          <FiClock aria-hidden className="size-3.5" />
                          {m.duration}
                        </span>
                      )}

                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="grid size-8 shrink-0 place-content-center rounded-full bg-[#2563EB]/10 text-[#2563EB]"
                      >
                        <FiChevronDown className="size-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`module-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 px-5 py-4">
                          <p className="text-[13.5px] leading-relaxed text-[#475569]">{m.summary}</p>

                          <ul className="mt-3.5 flex flex-wrap gap-2">
                            {m.topics.map((t) => (
                              <li key={t}>
                                <Chip>{t}</Chip>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[#64748B]">
                            {m.lessons && (
                              <span className="inline-flex items-center gap-1.5">
                                <FiPlayCircle aria-hidden className="size-3.5" />
                                {m.lessons} sessions
                              </span>
                            )}
                            {m.duration && (
                              <span className="inline-flex items-center gap-1.5 sm:hidden">
                                <FiClock aria-hidden className="size-3.5" />
                                {m.duration}
                              </span>
                            )}
                            {m.resource && (
                              <a
                                href={m.resource.href}
                                className="inline-flex items-center gap-1.5 font-semibold text-[#2563EB] hover:underline"
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
              </motion.li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
