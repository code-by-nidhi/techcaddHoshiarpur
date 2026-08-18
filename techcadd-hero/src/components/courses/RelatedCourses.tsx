"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import type { CourseSummary } from "@/lib/courses";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

/**
 * The current course is filtered out upstream by `getRelated`, so anything
 * reaching this component is safe to render.
 */
export default function RelatedCourses({ courses }: { courses: CourseSummary[] }) {
  if (!courses.length) return null;

  return (
    <Section tint>
      <Reveal>
        <SectionHead
          eyebrow="Keep exploring"
          title="Related courses"
          sub="Programmes students often take alongside or after this one."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <motion.li key={c.slug} variants={fadeUp} className="h-full">
              <Link
                href={`/courses/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={c.heroImage}
                    alt={c.title}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 23vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2563EB] backdrop-blur-md">
                    {c.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[family-name:var(--font-sora)] text-[15px] font-bold leading-snug text-[#0F172A]">
                    {c.shortTitle ?? c.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-[12.5px] leading-relaxed text-[#475569]">
                    {c.shortDescription}
                  </p>

                  <span className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#64748B]">
                      <FiClock aria-hidden className="size-3.5" />
                      {c.duration}
                    </span>
                    <FiArrowUpRight
                      aria-hidden
                      className="size-4 text-[#2563EB] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
