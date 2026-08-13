"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Layers, Briefcase, Target } from "lucide-react";
import { UNIVERSE, type Domain } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";

/**
 * A hub with seven domains orbiting it. Clicking a node pulls its detail into
 * the centre; the ring keeps rotating underneath so the system feels alive
 * without the labels ever spinning upside down.
 */
export default function TechUniverse() {
  const [active, setActive] = useState<Domain>(UNIVERSE[0]);
  const R = 42; // orbit radius, in % of the stage

  return (
    <section id="technologies" className="relative overflow-hidden bg-[#F8FAFC] py-28 lg:py-36">
      {/* particle field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 26 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute size-1 rounded-full bg-[#2563EB]/35"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-block rounded-full border border-[#4F46E5]/20 bg-[#4F46E5]/8 px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.18em] text-[#4F46E5]">
              Technologies we master
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-[family-name:var(--font-poppins)] text-[clamp(1.9rem,3.4vw,3.1rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0F172A]">
              The Technology Universe
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-[15px] leading-relaxed text-[#475569]">
              Pick a domain to see the stack we teach, what students build with it, where industry
              uses it, and the roles it leads to.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* orbit */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              {/* rings */}
              {[100, 78, 56].map((size, i) => (
                <motion.span
                  key={size}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 rounded-full border border-slate-200"
                  style={{
                    width: `${size}%`,
                    height: `${size}%`,
                    x: "-50%",
                    y: "-50%",
                  }}
                  animate={{ rotate: i % 2 ? -360 : 360 }}
                  transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* core */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 grid size-[34%] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-center text-white shadow-[0_30px_70px_-30px_rgba(37,99,235,0.95)]"
              >
                <Sparkles aria-hidden className="mx-auto size-6" />
                <span className="mt-2 block font-[family-name:var(--font-poppins)] text-[15px] font-bold leading-tight">
                  Techcadd
                </span>
                <span className="block text-[11px] text-white/70">7 domains</span>
              </motion.div>

              {/* nodes */}
              {UNIVERSE.map((d, i) => {
                const angle = (i / UNIVERSE.length) * Math.PI * 2 - Math.PI / 2;
                const left = 50 + Math.cos(angle) * R;
                const top = 50 + Math.sin(angle) * R;
                const on = d.id === active.id;

                return (
                  <motion.button
                    key={d.id}
                    type="button"
                    onClick={() => setActive(d)}
                    aria-pressed={on}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.96 }}
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                      y: { duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                      default: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl px-3.5 py-2 text-[12.5px] font-semibold shadow-[0_12px_30px_-18px_rgba(15,23,42,0.8)] transition-colors duration-300 ${
                      on
                        ? "text-white"
                        : "border border-slate-200 bg-white text-[#334155] hover:border-[#2563EB]/40"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="universe-active"
                        className="absolute inset-0 -z-10 rounded-2xl"
                        style={{ background: d.accent }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      />
                    )}
                    {d.label}
                  </motion.button>
                );
              })}
            </div>
          </Reveal>

          {/* detail panel */}
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[30px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_54px_-34px_rgba(15,23,42,0.75)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="size-3 rounded-full"
                    style={{ background: active.accent }}
                    aria-hidden
                  />
                  <h3 className="font-[family-name:var(--font-poppins)] text-[24px] font-extrabold tracking-tight text-[#0F172A]">
                    {active.label}
                  </h3>
                </div>

                <div className="mt-7">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                    Technologies
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg px-2.5 py-1 text-[12.5px] font-medium"
                        style={{ background: `${active.accent}14`, color: active.accent }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                      <Layers aria-hidden className="size-3.5" /> Projects
                    </p>
                    <ul className="mt-3 space-y-2">
                      {active.projects.map((p) => (
                        <li key={p} className="text-[13.5px] leading-snug text-[#334155]">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                      <Target aria-hidden className="size-3.5" /> Industry use cases
                    </p>
                    <ul className="mt-3 space-y-2">
                      {active.useCases.map((u) => (
                        <li key={u} className="text-[13.5px] leading-snug text-[#334155]">
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 border-t border-slate-200/80 pt-6">
                  <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                    <Briefcase aria-hidden className="size-3.5" /> Career paths
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {active.careers.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-[12.5px] font-medium text-[#0F172A]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
