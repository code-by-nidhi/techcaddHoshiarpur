"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { COURSES } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";

export default function FeaturedCourses() {
  return (
    <section id="programs" className="relative bg-white py-28 lg:py-36">
      {/* faint tint so the glass cards have something to sit against */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(37,99,235,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <SectionHeading
          tone="light"
          eyebrow="Featured courses"
          title="Explore Professional Courses"
          sub="Full programmes with structured modules, live projects and mentor-led sessions."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {COURSES.map(({ icon: Icon, title, copy, duration, accent }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white/70 p-7 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_32px_64px_-30px_rgba(37,99,235,0.6)]">
                {/* gradient hairline that appears on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
                />

                <span
                  className="grid size-13 w-13 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  style={{ background: `${accent}14`, width: "3.25rem", height: "3.25rem" }}
                >
                  <Icon aria-hidden className="size-6" style={{ color: accent }} />
                </span>

                <h3 className="mt-6 font-[family-name:var(--font-sora)] text-[19px] font-bold leading-snug text-[#0F172A]">
                  {title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-[#475569]">{copy}</p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-5">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B]">
                    <Clock aria-hidden className="size-4" style={{ color: accent }} />
                    {duration}
                  </span>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors"
                    style={{ color: accent }}
                  >
                    Learn More
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
