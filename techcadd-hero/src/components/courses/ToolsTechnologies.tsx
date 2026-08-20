"use client";

import { motion } from "framer-motion";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function ToolsTechnologies({ course }: { course: Course }) {
  if (!course.tools.length) return null;

  return (
    <Section tone="dark">
      <Reveal>
        <SectionHead
          center
          eyebrow="Toolchain"
          title="Tools & technologies you'll learn"
          sub="The same tooling the teams hiring for this role use every day."
        />

        <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {course.tools.map((t) => (
            <motion.li
              key={t}
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="rounded-2xl border border-slate-200/80 bg-white px-5 py-3 text-[13.5px] font-semibold text-[#334155] shadow-[0_10px_30px_-26px_rgba(15,23,42,0.6)]"
            >
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </Reveal>
    </Section>
  );
}
