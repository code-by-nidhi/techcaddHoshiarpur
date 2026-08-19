"use client";

import { motion } from "framer-motion";
import { FiUserCheck } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { CARD, Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function WhoCanJoin({ course }: { course: Course }) {
  if (!course.audience.length) return null;

  return (
    <Section>
      <Reveal>
        <SectionHead
          center
          eyebrow="Audience"
          title="Who can do this course?"
          sub="The programme is built to work for people arriving from very different starting points."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {course.audience.map((a) => (
            <motion.li
              key={a.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`${CARD} p-5`}
            >
              <span className="grid size-10 place-content-center rounded-xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15">
                <FiUserCheck aria-hidden className="size-[18px] text-[#2563EB]" />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-sora)] text-[15.5px] font-bold text-white">
                {a.label}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65">{a.copy}</p>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
