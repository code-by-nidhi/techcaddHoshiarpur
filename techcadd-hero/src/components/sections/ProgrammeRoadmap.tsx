"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck, BookOpen, Award, Building2, Rocket, MessagesSquare, Mic, Trophy,
} from "lucide-react";
import { ROADMAP } from "@/lib/site";

const ICONS = [ClipboardCheck, BookOpen, Award, Building2, Rocket, MessagesSquare, Mic, Trophy];

/** Height of the node row, so the rail can be dropped on its centre line. */
const NODE_ROW = 64;

/** One stop on the track. */
function Step({ step, index }: { step: (typeof ROADMAP)[number]; index: number }) {
  const Icon = ICONS[index];

  return (
    /* items-stretch on the row plus flex-1 on the card is what gives every
       card the same height, whatever its copy runs to */
    <li className="flex w-[80vw] max-w-[320px] shrink-0 snap-start flex-col sm:w-[340px] lg:w-[360px]">
      {/*
       * The node is centred over its own card. Every cell is the same width,
       * so centring is also what makes the gap between nodes identical — one
       * rule, rather than a per-node offset that has to be kept in step.
       */}
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ height: NODE_ROW }}
      >
        <span className="grid size-8 place-items-center rounded-full bg-white ring-2 ring-[#2563EB]">
          <span className="size-2.5 rounded-full bg-[#2563EB]" />
        </span>
        <span className="absolute left-[calc(50%+26px)] font-[family-name:var(--font-mono-face)] text-[11px] tracking-[0.16em] text-[#94A3B8]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="group mt-[28px] flex flex-1 flex-col rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.7)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2563EB]/25 hover:shadow-[0_30px_60px_-32px_rgba(37,99,235,0.55)]">
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-slate-200"
        >
          <Icon aria-hidden className="size-5 text-[#2563EB]" />
        </motion.span>

        <h3 className="mt-[20px] font-[family-name:var(--font-poppins)] text-[19px] font-bold text-[#0F172A]">
          {step.step}
        </h3>
        <p className="mt-[8px] text-[14px] leading-relaxed text-[#475569]">{step.copy}</p>
      </div>
    </li>
  );
}

/**
 * Horizontal roadmap.
 *
 * The track is a real scroll container — `overflow-x: auto` with x-mandatory
 * snapping — rather than a sticky section translating a row under a pinned
 * viewport. That version drove `x` from a hard-coded percentage of the row's
 * own width, a different distance at every breakpoint and card width, so it
 * always over- or under-shot: the first and last cards sat half off the edge
 * and cards were left clipped mid-scroll. Scrolling the element itself cannot
 * overshoot, and the browser's own snapping settles on a whole card every
 * time.
 *
 * The rail and its fill live inside the scrolled row, which is what keeps each
 * node above its own card. Before, the rail was pinned to the section while
 * the cards slid underneath it, and a per-card scroll transform pushed the
 * nodes off it vertically as well — the further down the track, the further
 * the node drifted below the line.
 */
export default function ProgrammeRoadmap() {
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const travel = el.scrollWidth - el.clientWidth;
    setProgress(travel > 0 ? el.scrollLeft / travel : 1);
  }, []);

  /* A track with nothing to scroll — a very wide screen — would leave the fill
     at zero for ever, so it reads as complete instead. Re-measuring on resize
     keeps that honest as the width changes. */
  useEffect(() => {
    measure();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  return (
    /*
     * Surface, not white: this sits directly under the Student Wall, which is
     * white, and two white sections in a row read as one. The stage cards
     * inside are white, so the surface tone also gives them an edge to sit on.
     */
    <section id="included" className="relative bg-[#F8FAFC] py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-[24px] lg:px-[80px]">
        <span className="inline-block rounded-full border border-[#2563EB]/20 bg-[#2563EB]/8 px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.18em] text-[#2563EB]">
          Included with every programme
        </span>
        <h2 className="mt-[20px] max-w-2xl font-[family-name:var(--font-poppins)] text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0F172A]">
          The Career Journey, End To End
        </h2>
        <p className="mt-[12px] max-w-xl text-[15px] leading-relaxed text-[#475569]">
          Eight stages, in order. Keep scrolling to walk the path.
        </p>
      </div>

      {/* ------------------------------- track -------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10"
      >
        <div
          ref={scroller}
          onScroll={measure}
          /*
           * scroll-p matches the gutter, so a snapped card lands level with
           * the first one rather than flush against the edge. The bar is
           * slimmed rather than hidden: with no sticky section driving the
           * track any more, it is the only affordance telling a mouse user
           * that the row scrolls at all.
           */
          className="snap-x snap-mandatory overflow-x-auto scroll-p-[24px] [scrollbar-color:rgba(37,99,235,0.32)_transparent] [scrollbar-width:thin] lg:scroll-p-[80px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(37,99,235,0.3)] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-[8px]"
        >
          {/*
           * min-w-max and the gutters live on this row, not on the scroller:
           * a scroll container drops its own trailing padding in every engine,
           * which is the classic reason a last card ends up flush against the
           * edge. pb leaves room for the card shadow and hover lift, which
           * `overflow-x: auto` would otherwise clip — the y axis cannot stay
           * visible once x is scrollable.
           */}
          <div className="relative mx-auto min-w-max px-[24px] pb-[42px] pt-[2px] lg:px-[80px]">
            {/* the rail, spanning exactly the card area */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[24px] h-px bg-slate-200 lg:inset-x-[80px]"
              style={{ top: NODE_ROW / 2 }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[24px] h-[2px] origin-left bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] transition-transform duration-150 ease-out lg:inset-x-[80px]"
              style={{ top: NODE_ROW / 2, transform: `scaleX(${progress})` }}
            />

            <ol className="flex items-stretch gap-[28px]">
              {ROADMAP.map((s, i) => (
                <Step key={s.step} step={s} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
