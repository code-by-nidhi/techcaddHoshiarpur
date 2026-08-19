"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function WhyProgram({ course }: { course: Course }) {
  if (!course.whyChooseUs.length) return null;

  return (
    <Section tint>
      <Reveal>
        <SectionHead
          center
          eyebrow="Why this program"
          title="Why choose this program?"
          sub="Six things that separate a programme you finish from one you benefit from."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {course.whyChooseUs.map((w, i) => (
            <motion.li
              key={w.title}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-shadow duration-500 hover:shadow-[0_28px_56px_-30px_rgba(37,99,235,0.45)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-[#2563EB]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative flex items-center gap-2.5">
                <span className="grid size-7 place-content-center rounded-lg bg-gradient-to-br from-[#142C8E] to-[#2563EB]">
                  <FiCheck aria-hidden className="size-3.5 text-white" />
                </span>
                <span className="font-[family-name:var(--font-mono-face)] text-[11px] text-[#94A3B8]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="relative mt-4 font-[family-name:var(--font-sora)] text-[15.5px] font-bold leading-snug text-[#0F172A]">
                {w.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-[#475569]">{w.copy}</p>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
