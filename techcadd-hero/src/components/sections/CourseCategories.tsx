"use client";

import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";

export default function CourseCategories() {
  return (
    <section id="courses" className="relative bg-[#F8FAFC]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-28 lg:px-[4.5rem] lg:py-36">
        <SectionHeading
          tone="light"
          eyebrow="Course categories"
          title="Choose Your Field"
          sub="Six tracks, each built backwards from the job it leads to."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ icon: Icon, title, copy, gradient }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.55)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_70px_-28px_rgba(37,99,235,0.75)]`}
              >
                {/* light sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="relative grid size-14 place-items-center rounded-2xl bg-white/20 ring-1 ring-inset ring-white/30 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                  <Icon aria-hidden className="size-6 text-white" />
                </span>

                <h3 className="relative mt-6 font-[family-name:var(--font-sora)] text-[21px] font-bold leading-snug text-white">
                  {title}
                </h3>
                <p className="relative mt-2.5 text-[14px] leading-relaxed text-white/85">{copy}</p>

                <a
                  href="#programs"
                  className="relative mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[14px] font-semibold text-[#0F172A] transition-all duration-300 hover:gap-3 hover:bg-white"
                >
                  Explore Program
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
