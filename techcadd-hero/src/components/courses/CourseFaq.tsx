"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function CourseFaq({
  course,
  tone = "light",
}: {
  course: Course;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!course.faqs.length) return null;

  return (
    <Section id="faq" tone={tone}>
      <Reveal>
        <SectionHead
          center
          eyebrow="Questions"
          title="Frequently asked questions"
          sub={`The questions counsellors are asked most about ${course.title}.`}
        />

        <ul className="mx-auto mt-10 max-w-3xl space-y-3">
          {course.faqs.map((f, i) => {
            const isOpen = open === i;

            return (
              <motion.li
                key={f.q}
                variants={fadeUp}
                className={`overflow-hidden rounded-[18px] border bg-white transition-colors duration-300 ${
                  isOpen ? "border-[#2563EB]/30" : "border-slate-200/80"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-slate-50"
                  >
                    <span className="text-[14.5px] font-semibold text-[#0F172A]">{f.q}</span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`grid size-8 shrink-0 place-content-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-[#2563EB] text-white" : "bg-[#2563EB]/10 text-[#2563EB]"
                      }`}
                    >
                      <FiChevronDown className="size-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[13.5px] leading-[1.85] text-[#475569]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
