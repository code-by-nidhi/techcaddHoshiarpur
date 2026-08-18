"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Plus, LifeBuoy } from "lucide-react";
import { HELP, HELP_CATEGORIES } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(HELP[0].q);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HELP.filter(
      (h) =>
        (category === "All" || h.category === category) &&
        (q === "" || h.q.toLowerCase().includes(q) || h.a.toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <section id="faq" className="relative overflow-x-clip bg-[#F8FAFC] section-pad">
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <SectionHeading
          tone="light"
          eyebrow="Help center"
          title="Answers, Before You Ask"
          sub="Search it, or browse by what you're actually trying to find out."
        />

        {/* search */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-8 max-w-2xl">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-5 top-1/2 size-[18px] -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fees, batches, internships…"
              aria-label="Search help articles"
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-13 pr-5 text-[15px] text-[#0F172A] shadow-[0_14px_40px_-32px_rgba(15,23,42,0.8)] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:shadow-[0_18px_44px_-26px_rgba(37,99,235,0.7)]"
              style={{ paddingLeft: "3.25rem" }}
            />
          </div>
        </Reveal>

        {/* category tabs */}
        <Reveal delay={0.16}>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["All", ...HELP_CATEGORIES].map((c) => {
              const on = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={on}
                  className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                    on ? "text-white" : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="help-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#2563EB] to-[#2563EB]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  {!on && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-slate-200 bg-white" />
                  )}
                  {c}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* question cards */}
        <div className="mt-10 space-y-3">
          <AnimatePresence mode="popLayout">
            {results.map((h) => {
              const isOpen = open === h.q;
              return (
                <motion.div
                  key={h.q}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    isOpen ? "border-[#2563EB]/45 shadow-[0_20px_50px_-38px_rgba(37,99,235,0.9)]" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : h.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="hidden rounded-lg bg-[#2563EB]/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2563EB] sm:inline-block">
                        {h.category}
                      </span>
                      <span className="text-[15.5px] font-medium text-[#0F172A]">{h.q}</span>
                    </span>
                    <Plus
                      aria-hidden
                      className={`size-5 shrink-0 text-[#2563EB] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-[14.5px] leading-[1.8] text-[#475569] sm:pl-[7.5rem]">
                          {h.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {results.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <LifeBuoy aria-hidden className="mx-auto size-6 text-[#94A3B8]" />
              <p className="mt-3 text-[14.5px] text-[#475569]">
                Nothing matches that yet — try a different word, or ask a counsellor directly.
              </p>
              <a
                href="#launch"
                className="mt-5 inline-block rounded-full bg-[#0F172A] px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#2563EB]"
              >
                Talk to a counsellor
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
