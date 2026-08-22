"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { Course, Project } from "@/lib/courses/types";
import { useSite } from "@/lib/cms/site-context";
import { Chip, Reveal, Section, SectionHead, fadeUp } from "./shared";


const LEVEL_TINT: Record<Project["level"], string> = {
  Beginner: "bg-[#DCFCE7] text-[#166534]",
  Intermediate: "bg-[#DBEAFE] text-[#1E40AF]",
  Advanced: "bg-[#EDE9FE] text-[#1E40AF]",
};

export default function Projects({ course }: { course: Course }) {
  const site = useSite();
  if (!course.projects.length) return null;

  return (
    <Section tone="dark">
      <Reveal>
        <SectionHead
          eyebrow="Practice"
          title="Hands-on projects"
          sub="Every module ends in built work. These are the pieces you finish the programme holding."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {course.projects.map((p) => (
            <motion.li
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.45)]"
            >
              {p.image && (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-[family-name:var(--font-sora)] text-[15.5px] font-bold leading-snug text-[#0F172A]">
                    {p.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${LEVEL_TINT[p.level]}`}
                  >
                    {p.level}
                  </span>
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-[#475569]">{p.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-4 text-[12px] text-[#64748B]">
                  <span className="font-semibold text-[#334155]">Skills practised: </span>
                  {p.skills.join(", ")}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div variants={fadeUp} className="mt-9 text-center">
          <a
            {...site.whatsappLink()}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#2563EB]/25 bg-white px-7 py-3.5 text-[14px] font-semibold text-[#2563EB] shadow-[0_14px_36px_-28px_rgba(37,99,235,0.8)] transition-colors duration-300 hover:bg-[#2563EB] hover:text-white"
          >
            Explore Projects
            <FiArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </Reveal>
    </Section>
  );
}
