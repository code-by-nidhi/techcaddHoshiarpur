"use client";

import { motion } from "framer-motion";
import { ABOUT, MILESTONES, FOUNDER, VALUES } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";

/**
 * Editorial about page: white throughout, generous spacing, a vertical
 * milestone timeline, founder vision, and mission values in an offset
 * two-column rhythm rather than a card grid.
 */
export default function About() {
  return (
    <section id="about" className="relative bg-white">
      {/* eases the dark hero into the white page */}
      <div aria-hidden className="h-28 bg-gradient-to-b from-[#020617] to-white" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        {/* opening statement */}
        <div className="grid gap-12 pb-24 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pb-32">
          <div>
            <Reveal>
              <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
                {ABOUT.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-[family-name:var(--font-poppins)] text-[clamp(2.1rem,4.2vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#0F172A]">
                {ABOUT.title}
              </h2>
            </Reveal>
          </div>

          <div className="lg:pt-14">
            {ABOUT.body.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={0.12 + i * 0.08}>
                <p className="mt-6 max-w-2xl text-[clamp(1rem,1.15vw,1.15rem)] leading-[1.85] text-[#475569] first:mt-0">
                  {p}
                </p>
              </Reveal>
            ))}

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {ABOUT.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.2 + i * 0.06}>
                  <p className="font-[family-name:var(--font-poppins)] text-[26px] font-extrabold leading-none text-[#0F172A]">
                    {s.value}
                    {s.unit && <span className="ml-1 text-[14px] text-[#2563EB]">{s.unit}</span>}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-[#64748B]">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* large imagery block */}
        <Reveal>
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[36px] bg-gradient-to-br from-[#EEF2FF] via-[#E0F2FE] to-[#F8FAFC]">
            {/* replace with <Image src="/images/campus.jpg" fill className="object-cover" /> */}
            <div className="absolute inset-0 grid place-content-center text-center">
              <p className="font-[family-name:var(--font-poppins)] text-[15px] font-semibold text-[#94A3B8]">
                Campus, labs and project floor
              </p>
              <p className="mt-1 text-[13px] text-[#94A3B8]">
                Drop a wide institute photo in here
              </p>
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-slate-200/70" />
          </div>
        </Reveal>

        {/* timeline */}
        <div className="grid gap-12 py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:py-32">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
                Our story
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="mt-5 font-[family-name:var(--font-poppins)] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.028em] text-[#0F172A]">
                Two decades,
                <br />
                five turning points
              </h3>
            </Reveal>
          </div>

          <ol className="relative">
            <span aria-hidden className="absolute left-[7px] top-2 h-full w-px bg-slate-200" />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <li className="relative pb-12 pl-12 last:pb-0">
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute left-0 top-1.5 size-[15px] rounded-full border-[3px] border-white bg-[#2563EB] ring-1 ring-slate-200"
                  />
                  <p className="font-[family-name:var(--font-mono-face)] text-[12px] tracking-[0.16em] text-[#2563EB]">
                    {m.year}
                  </p>
                  <h4 className="mt-2 font-[family-name:var(--font-poppins)] text-[19px] font-bold text-[#0F172A]">
                    {m.title}
                  </h4>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-[1.8] text-[#475569]">{m.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* founder vision */}
        <Reveal>
          <figure className="grid items-center gap-10 rounded-[36px] bg-[#F8FAFC] p-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16 lg:p-16">
            <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#DBEAFE] to-[#E0E7FF]">
              {/* replace with the founder's photograph */}
              <div className="absolute inset-0 grid place-content-center text-center">
                <p className="text-[13px] text-[#94A3B8]">Founder photo</p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
                Founder&apos;s vision
              </span>
              <blockquote className="mt-6 font-[family-name:var(--font-poppins)] text-[clamp(1.25rem,2.1vw,1.75rem)] font-semibold leading-[1.5] tracking-[-0.015em] text-[#0F172A]">
                &ldquo;{FOUNDER.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 text-[14px] text-[#475569]">
                <span className="font-semibold text-[#0F172A]">{FOUNDER.name}</span>
                <span className="mx-2 text-slate-300">/</span>
                {FOUNDER.role}
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* mission and values */}
        <div className="py-24 lg:py-32">
          <Reveal>
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
              Mission &amp; values
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-poppins)] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.028em] text-[#0F172A]">
              Four rules we don&apos;t bend
            </h3>
          </Reveal>

          <ol className="mt-14 divide-y divide-slate-200 border-t border-slate-200">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <li className="group grid gap-4 py-9 transition-colors duration-500 lg:grid-cols-[80px_0.9fr_1.1fr] lg:gap-10">
                  <span className="font-[family-name:var(--font-mono-face)] text-[13px] text-[#94A3B8] transition-colors duration-500 group-hover:text-[#2563EB]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-[family-name:var(--font-poppins)] text-[20px] font-bold leading-snug tracking-[-0.015em] text-[#0F172A]">
                    {v.title}
                  </h4>
                  <p className="max-w-xl text-[14.5px] leading-[1.85] text-[#475569]">{v.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
