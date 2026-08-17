"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBriefcase, FiClock, FiCloud, FiCpu, FiFolder, FiMonitor,
  FiRadio, FiStar, FiTrendingUp, FiUnlock, FiUsers, FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { CAPABILITIES, COMMAND_METRICS } from "@/lib/site";
import Counter from "@/components/UI/Counter";
import AiHubBanner from "@/components/sections/AiHubBanner";

/** Category id -> icon. Keyed, so re-ordering the data cannot shift the set. */
const TAB_ICONS: Record<string, IconType> = {
  projects: FiZap,
  mentors: FiUsers,
  career: FiBriefcase,
  labs: FiCpu,
  cloud: FiCloud,
};

/** Highlights are free text, so their icons cycle by position. */
const FEATURE_ICONS: IconType[] = [FiMonitor, FiCpu, FiUnlock, FiRadio];

const METRIC_ICONS: IconType[] = [FiFolder, FiUsers, FiStar, FiClock, FiTrendingUp];

const METRIC_TINTS = [
  "from-[#2563EB] to-[#3B82F6]",
  "from-[#4F46E5] to-[#8B5CF6]",
  "from-[#F59E0B] to-[#F97316]",
  "from-[#0EA5E9] to-[#38BDF8]",
  "from-[#7C3AED] to-[#C026D3]",
];

/** Deterministic particles for the banner — no Math.random, so SSR matches. */
const MOTES = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 41) % 92 + 4}%`,
  top: `${(i * 57) % 78 + 11}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 5 + (i % 4),
  delay: (i % 6) * 0.55,
}));

export default function CommandCenter() {
  const [active, setActive] = useState(CAPABILITIES[0]);
  const ActiveIcon = TAB_ICONS[active.id] ?? FiCpu;

  return (
    <section id="capabilities" className="relative overflow-x-clip bg-white py-16 lg:py-20">
      {/* depth layers: radial wash, grid pattern, drifting blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(79,70,229,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000, transparent 75%)",
          }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-32 size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.13)_0%,transparent_70%)] blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -right-20 bottom-16 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.13)_0%,transparent_70%)] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-[4.5rem]">
        {/* compact header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#2563EB]">
            Capabilities
          </span>
          <h2 className="mt-2.5 font-[family-name:var(--font-sora)] text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold leading-[1.12] tracking-[-0.028em] text-[#0F172A]">
            Innovation{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] bg-clip-text pr-[0.06em] text-transparent">
              Command Center
            </span>
          </h2>
          <p className="mt-2.5 text-[clamp(0.9rem,1.5vw,1rem)] leading-[1.75] text-[#475569]">
            What the campus actually runs — labs, project floor, mentor network and career studio,
            with the numbers behind them.
          </p>
        </motion.div>

        <div className="row g-3 g-lg-4 mt-3 align-items-stretch">
          {/* ---------------------------- tabs ---------------------------- */}
          <div className="col-12 col-lg-3">
            <nav
              aria-label="Capabilities"
              className="h-100 rounded-[22px] border border-slate-200/80 bg-white/70 p-2.5 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.7)] backdrop-blur-xl"
            >
              {/* scrolls horizontally on phones, stacks from lg */}
              <ul className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
                {CAPABILITIES.map((c) => {
                  const Icon = TAB_ICONS[c.id] ?? FiCpu;
                  const on = c.id === active.id;

                  return (
                    <li key={c.id} className="shrink-0 snap-start lg:shrink">
                      <button
                        type="button"
                        onClick={() => setActive(c)}
                        aria-pressed={on}
                        className={`relative flex w-full items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-[16px] px-3.5 py-3 text-left text-[13px] font-medium transition-[background-color,color,box-shadow] duration-300 ${
                          on
                            ? "bg-[linear-gradient(120deg,rgba(37,99,235,0.14),rgba(124,58,237,0.14))] text-[#0F172A] shadow-[0_10px_26px_-18px_rgba(79,70,229,0.9)] backdrop-blur-xl"
                            : "text-[#475569] hover:bg-slate-50"
                        }`}
                      >
                        {/* left accent rail on the active tab */}
                        <span
                          aria-hidden
                          className={`absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#2563EB] to-[#7C3AED] transition-opacity duration-300 ${
                            on ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <span
                          className={`grid size-8 shrink-0 place-content-center rounded-xl transition-colors duration-300 ${
                            on
                              ? "bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-[0_8px_20px_-10px_rgba(79,70,229,0.95)]"
                              : "bg-slate-100 text-[#64748B]"
                          }`}
                        >
                          <Icon aria-hidden className="size-4" />
                        </span>
                        <span className="min-w-0 truncate">{c.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* --------------------------- centre ---------------------------- */}
          <div className="col-12 col-lg-6">
            <div className="flex h-100 flex-col gap-3 lg:gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] shadow-[0_12px_28px_-12px_rgba(79,70,229,0.95)]">
                      <ActiveIcon aria-hidden className="size-5 text-white" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-sora)] text-[clamp(1.05rem,2vw,1.35rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A]">
                        {active.label}
                      </h3>
                      <p className="mt-1.5 text-[clamp(0.85rem,1.4vw,0.95rem)] leading-[1.7] text-[#475569]">
                        {active.copy}
                      </p>
                    </div>
                  </div>

                  {/* feature cards */}
                  <div className="row g-2 g-sm-3 mt-2">
                    {active.highlights.map((h, i) => {
                      const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];

                      return (
                        <div key={h} className="col-12 col-sm-6 col-xl-4">
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -5 }}
                            className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-white/70 bg-white/70 p-3.5 shadow-[0_12px_30px_-26px_rgba(15,23,42,0.7)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_22px_46px_-28px_rgba(79,70,229,0.55)]"
                          >
                            <span className="grid size-9 place-content-center rounded-full bg-gradient-to-br from-[#2563EB]/12 to-[#7C3AED]/12 ring-1 ring-inset ring-[#2563EB]/15">
                              <Icon aria-hidden className="size-4 text-[#2563EB]" />
                            </span>
                            <p className="mt-2.5 text-[12.5px] font-semibold leading-snug text-[#0F172A]">
                              {h}
                            </p>
                            {/* accent line */}
                            <span
                              aria-hidden
                              className="mt-3 block h-[2px] w-8 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] transition-all duration-500 group-hover:w-full"
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <AiHubBanner />
            </div>
          </div>

          {/* --------------------------- metrics --------------------------- */}
          <div className="col-12 col-lg-3">
            <div className="row g-2 g-sm-3 h-100">
              {COMMAND_METRICS.map((m, i) => {
                const Icon = METRIC_ICONS[i % METRIC_ICONS.length];

                return (
                  <div key={m.label} className="col-12 col-sm-6 col-lg-12">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-70px" }}
                      transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="group relative flex h-full flex-col justify-center overflow-hidden rounded-[18px] border border-white/70 bg-white/70 p-3.5 shadow-[0_12px_30px_-26px_rgba(15,23,42,0.7)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_22px_46px_-28px_rgba(79,70,229,0.55)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`grid size-8 shrink-0 place-content-center rounded-full bg-gradient-to-br ${
                            METRIC_TINTS[i % METRIC_TINTS.length]
                          } shadow-[0_8px_18px_-10px_rgba(79,70,229,0.9)]`}
                        >
                          <Icon aria-hidden className="size-3.5 text-white" />
                        </span>
                        <p className="font-[family-name:var(--font-poppins)] text-[19px] font-extrabold leading-none tracking-[-0.02em] text-[#0F172A]">
                          <Counter to={m.value} suffix={m.suffix} duration={1.4} />
                        </p>
                      </div>

                      <p className="mt-2 text-[11.5px] leading-snug text-[#64748B]">{m.label}</p>

                      {/*
                       * A reveal accent, not a data bar: these are absolute
                       * counts with no denominator, so a partial fill would
                       * imply a ratio that does not exist.
                       */}
                      <span aria-hidden className="mt-2.5 block h-1 overflow-hidden rounded-full bg-slate-100">
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className={`block h-full origin-left rounded-full bg-gradient-to-r ${
                            METRIC_TINTS[i % METRIC_TINTS.length]
                          }`}
                        />
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
