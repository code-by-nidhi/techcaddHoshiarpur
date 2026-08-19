"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiCompass, FiGlobe, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Course } from "@/lib/courses/types";
import { Chip, Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function CareerOutcomes({ course }: { course: Course }) {
  const { roles, roleDetails, opportunities, nextSteps, industries } = course.careerOutcomes;

  const blocks: { icon: IconType; title: string; items: string[] }[] = [
    { icon: FiBriefcase, title: "Job roles to target", items: roleDetails?.length ? [] : roles },
    { icon: FiCompass, title: "Where the work is", items: opportunities },
    { icon: FiTrendingUp, title: "Where to go next", items: nextSteps },
    { icon: FiGlobe, title: "Industry applications", items: industries },
  ].filter((b) => b.items.length);

  if (!blocks.length) return null;

  return (
    <Section tint>
      <Reveal>
        <SectionHead
          eyebrow="After the course"
          title="Career outcomes"
          sub={`After completing ${course.title}, these are the directions students most often take. Outcomes depend on your own work and the market — we do not promise placements or salaries.`}
        />

        {roleDetails?.length ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roleDetails.map(({ role, copy }) => (
              <motion.li
                key={role}
                variants={fadeUp}
                className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0"
              >
                <h3 className="flex items-start gap-2.5 font-[family-name:var(--font-sora)] text-[15px] font-bold text-[#0F172A]">
                  <span className="grid size-9 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15">
                    <FiBriefcase aria-hidden className="size-4 text-[#2563EB]" />
                  </span>
                  {role}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#475569]">{copy}</p>
              </motion.li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {blocks.map(({ icon: Icon, title, items }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)]"
            >
              <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-sora)] text-[15px] font-bold text-[#0F172A]">
                <span className="grid size-9 place-content-center rounded-xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15">
                  <Icon aria-hidden className="size-4 text-[#2563EB]" />
                </span>
                {title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((it) => (
                  <li key={it}>
                    <Chip>{it}</Chip>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
