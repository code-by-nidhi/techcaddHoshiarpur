"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

export default function InstructorSection({ course }: { course: Course }) {
  const { heading, intro, points } = course.instructor;
  if (!points.length) return null;

  return (
    <Section tint>
      <Reveal className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <motion.div variants={fadeUp} className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-5 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.16),transparent_62%)] blur-2xl"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] shadow-[0_26px_60px_-34px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.06]">
            <Image
              src="/images/classroom.webp"
              alt="A TechCadd trainer running a session"
              fill
              sizes="(max-width: 1023px) 92vw, 40vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <div>
          <SectionHead eyebrow="Teaching" title={heading} sub={intro} />

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <motion.li
                key={p.title}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_32px_-28px_rgba(15,23,42,0.6)]"
              >
                <h3 className="flex items-start gap-2.5 font-[family-name:var(--font-sora)] text-[14.5px] font-bold leading-snug text-[#0F172A]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB]">
                    <FiCheck aria-hidden className="size-3 text-white" />
                  </span>
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#475569]">{p.copy}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
