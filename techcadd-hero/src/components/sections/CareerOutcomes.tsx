"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Star, MapPin, TrendingUp } from "lucide-react";
import { OUTCOMES } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";
import Counter from "@/components/UI/Counter";

const ICONS = [GraduationCap, Briefcase, Rocket];

/** Smooth path through the growth series for the sparkline. */
function spark(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * (h - 10) - 5]);
  return pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
    })
    .join(" ");
}

export default function CareerOutcomes() {
  const { headline, assistance, reviews, alumni, growth } = OUTCOMES;
  const path = spark(growth, 260, 70);
  const ring = 2 * Math.PI * 52;

  return (
    <section id="outcomes" className="relative overflow-x-clip bg-[#F8FAFC] section-pad">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <SectionHeading
          tone="light"
          eyebrow="Career outcomes"
          title="The Dashboard, Not The Brochure"
          sub="Everything we track about what happens to students after they walk in — updated each quarter."
        />

        {/* bento grid */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {/* three headline metrics */}
          {headline.map((m, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={m.key} delay={i * 0.06} className="lg:col-span-4">
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-7 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.7)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_64px_-34px_rgba(37,99,235,0.6)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-16 size-44 rounded-full bg-[#2563EB]/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-slate-200">
                    <Icon aria-hidden className="size-5 text-[#2563EB]" />
                  </span>
                  <p className="mt-6 font-[family-name:var(--font-poppins)] text-[clamp(2rem,3vw,2.7rem)] font-extrabold leading-none tracking-tight text-white">
                    <Counter to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mt-2.5 text-[15px] font-semibold text-white">{m.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/50">{m.note}</p>
                </div>
              </Reveal>
            );
          })}

          {/* placement assistance activity */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="h-full rounded-[28px] border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-7 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.7)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-[18px] font-bold text-white">
                    Placement assistance
                  </h3>
                  <p className="mt-1 text-[13px] text-white/50">
                    What the support actually consists of, counted.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#60A5FA]/10 px-3 py-1 text-[12px] font-medium text-[#0891B2]">
                  <TrendingUp aria-hidden className="size-3.5" />
                  Rolling 12 months
                </span>
              </div>

              <ul className="mt-7 grid gap-5 sm:grid-cols-2">
                {assistance.map((a, i) => (
                  <li key={a.label}>
                    <p className="font-[family-name:var(--font-poppins)] text-[26px] font-extrabold leading-none text-[#2563EB]">
                      <Counter to={a.value} suffix={a.suffix} />
                    </p>
                    <p className="mt-1.5 text-[13px] text-white/65">{a.label}</p>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${[100, 92, 46, 62][i]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* google reviews */}
          <Reveal delay={0.14} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[28px] border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-7 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.7)]">
              <h3 className="font-[family-name:var(--font-poppins)] text-[18px] font-bold text-white">
                Google reviews
              </h3>

              <div className="mt-6 flex items-center gap-6">
                {/* rating ring */}
                <div className="relative size-[124px] shrink-0">
                  <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                    <motion.circle
                      cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round"
                      stroke="url(#ratingGrad)"
                      strokeDasharray={ring}
                      initial={{ strokeDashoffset: ring }}
                      whileInView={{ strokeDashoffset: ring * (1 - reviews.rating / 5) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <defs>
                      <linearGradient id="ratingGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#60A5FA" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-content-center text-center">
                    <span className="font-[family-name:var(--font-poppins)] text-[26px] font-extrabold leading-none text-white">
                      {reviews.rating}
                    </span>
                    <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/50">
                      out of 5
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} aria-hidden className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="mt-2 text-[13.5px] text-white/65">
                    From <Counter to={reviews.count} suffix="+" className="font-semibold text-white" />{" "}
                    verified reviews
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {reviews.breakdown.map((pct, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-3 text-[11px] text-white/40">{5 - i}</span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.2 + i * 0.06 }}
                            className="block h-full rounded-full bg-[#F59E0B]"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* alumni network */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-full rounded-[28px] border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-7 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.7)]">
              <div className="flex items-center gap-2">
                <MapPin aria-hidden className="size-4 text-[#2563EB]" />
                <h3 className="font-[family-name:var(--font-poppins)] text-[18px] font-bold text-white">
                  Alumni network
                </h3>
              </div>
              <p className="mt-1 text-[13px] text-white/50">
                Where <Counter to={alumni.total} suffix="+" className="font-semibold text-white" />{" "}
                alumni are working today.
              </p>

              <ul className="mt-6 space-y-3.5">
                {alumni.cities.map((c, i) => (
                  <li key={c.city} className="flex items-center gap-4">
                    <span className="w-40 shrink-0 text-[13.5px] text-white/75">{c.city}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.pct * 3.6}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        className="block h-full rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB]"
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right text-[13px] font-semibold text-white">
                      {c.pct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* enrolment growth */}
          <Reveal delay={0.16} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#2563EB] to-[#2563EB] p-7 text-white shadow-[0_24px_60px_-34px_rgba(37,99,235,0.9)]">
              <div>
                <h3 className="font-[family-name:var(--font-poppins)] text-[18px] font-bold">
                  Enrolment growth
                </h3>
                <p className="mt-1 text-[13px] text-white/75">Last eight quarters</p>
              </div>

              <svg viewBox="0 0 260 70" className="mt-6 w-full" aria-hidden>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>

              <p className="mt-5 text-[13px] text-white/80">
                Batches are running at capacity across weekday, evening and weekend slots.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
