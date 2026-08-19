"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function LearningOutcomes({ course }: { course: Course }) {
  if (!course.learningOutcomes.length) return null;

  return (
    <Section>
      <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <SectionHead
          eyebrow="Outcomes"
          title="What you will learn"
          sub="Concrete capabilities, not topics covered. Each one is demonstrated in work you keep."
        />

        <motion.ul variants={fadeUp} className="grid gap-2.5 sm:grid-cols-2">
          {course.learningOutcomes.map((o) => (
            <li
              key={o}
              className="flex items-start gap-3 rounded-2xl border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-4 shadow-[0_10px_30px_-26px_rgba(15,23,42,0.6)]"
            >
              <FiCheckCircle aria-hidden className="mt-0.5 size-[18px] shrink-0 text-[#2563EB]" />
              <span className="text-[13.5px] leading-relaxed text-white/75">{o}</span>
            </li>
          ))}
        </motion.ul>
      </Reveal>
    </Section>
  );
}
