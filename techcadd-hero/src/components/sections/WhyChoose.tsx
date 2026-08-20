"use client";

import { ArrowRight } from "lucide-react";
import { WHY } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import { whatsappLink } from "@/lib/cta";

/**
 * Split layout: the heading holds the left rail on desktop while the feature
 * cards scroll past it, which reads more like a product page than a plain grid.
 */
export default function WhyChoose() {
  return (
    <section id="why" className="relative overflow-x-clip bg-white section-pad">
      <div className="mx-auto grid w-full max-w-[1400px] gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-[4.5rem]">
        {/* left rail */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="inline-block rounded-full border border-[#2563EB]/20 bg-[#2563EB]/8 px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.18em] text-[#2563EB]">
              Why Techcadd
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-5 font-[family-name:var(--font-sora)] text-[clamp(2rem,3.8vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#0F172A]">
              Why Choose
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
                Techcadd?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-[#475569]">
              Because a training institute should be judged by the careers it starts, not the
              certificates it prints. Everything below exists for that one reason.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <a
              {...whatsappLink()}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#0F172A] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_18px_40px_-16px_rgba(37,99,235,0.8)]"
            >
              Talk to a counsellor
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* feature cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {WHY.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 0.06} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2563EB]/25 hover:shadow-[0_28px_56px_-28px_rgba(37,99,235,0.55)]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[#2563EB]/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-slate-200 transition-transform duration-500 group-hover:scale-105">
                  <Icon aria-hidden className="size-5 text-[#2563EB]" />
                </span>

                <h3 className="relative mt-5 font-[family-name:var(--font-sora)] text-[16.5px] font-bold leading-snug text-[#0F172A]">
                  {title}
                </h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-[#475569]">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
