"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Check } from "lucide-react";
import { CAPABILITIES, COMMAND_METRICS } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";
import Counter from "@/components/UI/Counter";

/** Three-pane analytics layout: categories, workspace, live metrics. */
export default function CommandCenter() {
  const [active, setActive] = useState(CAPABILITIES[0]);

  return (
    <section id="capabilities" className="relative overflow-x-clip bg-white py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <SectionHeading
          tone="light"
          eyebrow="Capabilities"
          title="Innovation Command Center"
          sub="What the campus actually runs — labs, project floor, mentor network and career studio, with the numbers behind them."
        />

        <div className="mt-16 overflow-hidden rounded-[32px] border border-slate-200/80 bg-[#F8FAFC] shadow-[0_26px_70px_-44px_rgba(15,23,42,0.85)]">
          <div className="grid lg:grid-cols-[260px_1fr_290px]">
            {/* left: categories */}
            <nav
              aria-label="Capabilities"
              className="border-b border-slate-200/80 bg-white p-4 lg:border-b-0 lg:border-r"
            >
              <p className="px-3 pb-3 pt-2 text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                Categories
              </p>
              <ul className="flex gap-2 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
                {CAPABILITIES.map((c) => {
                  const on = c.id === active.id;
                  return (
                    <li key={c.id} className="shrink-0 lg:shrink">
                      <button
                        type="button"
                        onClick={() => setActive(c)}
                        aria-pressed={on}
                        className={`relative w-full whitespace-nowrap rounded-xl px-4 py-3 text-left text-[14px] font-medium transition-colors duration-300 ${
                          on ? "text-white" : "text-[#334155] hover:bg-slate-100"
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId="capability-pill"
                            className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#4F46E5]"
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                          />
                        )}
                        {c.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* centre: workspace */}
            <div className="relative min-h-[340px] border-b border-slate-200/80 p-8 lg:border-b-0 lg:border-r">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <h3 className="font-[family-name:var(--font-poppins)] text-[22px] font-extrabold tracking-tight text-[#0F172A]">
                    {active.label}
                  </h3>
                  <p className="mt-3 max-w-lg text-[14.5px] leading-[1.75] text-[#475569]">
                    {active.copy}
                  </p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                    {active.highlights.map((h, i) => (
                      <motion.li
                        key={h}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className="rounded-2xl border border-slate-200/80 bg-white p-4"
                      >
                        <Check aria-hidden className="size-4 text-[#06B6D4]" />
                        <p className="mt-2.5 text-[13px] font-medium leading-snug text-[#0F172A]">
                          {h}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* right: live metrics */}
            <aside className="bg-white p-6">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#06B6D4] opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#06B6D4]" />
                </span>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                  Live metrics
                </p>
                <Activity aria-hidden className="ml-auto size-4 text-[#2563EB]" />
              </div>

              <ul className="mt-5 space-y-4">
                {COMMAND_METRICS.map((m, i) => (
                  <li key={m.label} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <p className="font-[family-name:var(--font-poppins)] text-[22px] font-extrabold leading-none text-[#0F172A]">
                      <Counter to={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-1.5 text-[12.5px] text-[#64748B]">{m.label}</p>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${[100, 72, 58, 88, 92][i]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.06 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
