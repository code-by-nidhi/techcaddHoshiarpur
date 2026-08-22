"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  ClipboardCheck, BookOpen, Award, Building2, Rocket, MessagesSquare, Mic, Trophy,
} from "lucide-react";
import { ROADMAP } from "@/lib/site";

const ICONS = [ClipboardCheck, BookOpen, Award, Building2, Rocket, MessagesSquare, Mic, Trophy];

/** Height of the node row, so the rail can be dropped on its centre line. */
const NODE_ROW = 64;

/** Below this the section is a touch scroller instead of a pinned track. */
const PIN_QUERY = "(min-width: 1024px)";

/* -------------------------------------------------------------------------- */
/*  card                                                                       */
/* -------------------------------------------------------------------------- */

function Step({ step, index }: { step: (typeof ROADMAP)[number]; index: number }) {
  const Icon = ICONS[index];

  return (
    /* items-stretch on the row plus flex-1 on the card is what gives every
       card the same height, whatever its copy runs to */
    <li className="flex w-[80vw] max-w-[320px] shrink-0 snap-start flex-col sm:w-[340px] sm:max-w-none lg:w-[360px]">
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

/* -------------------------------------------------------------------------- */
/*  shared pieces                                                              */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
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
  );
}

/**
 * The rail, the fill and the eight cards.
 *
 * All three live in the same box, so whatever moves the box moves them
 * together — which is what keeps each node above its own card. The previous
 * pinned version drew the rail on the section while the cards slid underneath
 * it, and the two drifted apart the further along the track you got.
 *
 * `w-max` and the gutters sit here too, so the box measures exactly
 * gutter + cards + gutter. That measurement is what the travel distance is
 * derived from, which is what stops the first and last card being cut.
 */
function Track({
  innerRef,
  fill,
}: {
  innerRef?: RefObject<HTMLDivElement | null>;
  fill: MotionValue<number> | number;
}) {
  return (
    <div
      ref={innerRef}
      className="relative w-max px-[24px] pb-[42px] pt-[2px] lg:px-[80px]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[24px] h-px bg-slate-200 lg:inset-x-[80px]"
        style={{ top: NODE_ROW / 2 }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-[24px] h-[2px] origin-left bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] lg:inset-x-[80px]"
        style={{ top: NODE_ROW / 2, scaleX: fill }}
      />

      <ol className="flex items-stretch gap-[28px]">
        {ROADMAP.map((s, i) => (
          <Step key={s.step} step={s} index={i} />
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  desktop: pinned, scroll-linked                                             */
/* -------------------------------------------------------------------------- */

function PinnedRoadmap() {
  const section = useRef<HTMLDivElement>(null);
  const pane = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  /** Horizontal distance the track has to cover, and the pinned pane's height. */
  const [travel, setTravel] = useState(0);
  const [paneHeight, setPaneHeight] = useState(0);

  /*
   * Measured, never guessed. The original pinned version drove x from a
   * hard-coded `-72%` of the row's own width — a different number of pixels at
   * every breakpoint and card width, so it always over- or under-shot and left
   * the first and last cards cut off. Re-measuring on resize is the equivalent
   * of ScrollTrigger's invalidateOnRefresh.
   */
  const measure = useCallback(() => {
    const t = track.current;
    const v = viewport.current;
    const p = pane.current;
    if (!t || !v || !p) return;
    /* scrollWidth spans gutter + cards + gutter, so at full travel the track's
       right gutter lands on the viewport's right edge — the last card keeps
       exactly the breathing space the first one starts with. */
    setTravel(Math.max(0, t.scrollWidth - v.clientWidth));
    setPaneHeight(p.offsetHeight);
  }, []);

  useLayoutEffect(() => {
    measure();

    /*
     * A cold first paint can hand back a track of zero width, which measures a
     * travel of zero and leaves the section its unscrolled height — the pin
     * then never moves. One more pass after the browser has laid out, and
     * another once the display faces have swapped in, covers both.
     */
    const raf = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure).catch(() => {});

    const ro = new ResizeObserver(measure);
    for (const el of [track.current, viewport.current, pane.current]) {
      if (el) ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* The section is exactly as tall as the pinned pane plus the distance the
     track has to travel, so the journey finishes precisely as the pin lets go
     — no dead scroll at either end. */
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.0005 });
  const x = useTransform(progress, [0, 1], [0, -travel]);

  return (
    <div
      ref={section}
      style={{ height: paneHeight ? paneHeight + travel : undefined }}
      className="relative"
    >
      <div
        ref={pane}
        className="sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden py-12 lg:py-16"
      >
        <Header />

        <div ref={viewport} className="relative mt-10 w-full overflow-hidden">
          <motion.div style={{ x }} className="will-change-transform">
            <Track innerRef={track} fill={progress} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  touch: swipe, no pin                                                       */
/* -------------------------------------------------------------------------- */

function SwipeRoadmap() {
  const scroller = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const travel = el.scrollWidth - el.clientWidth;
    setFill(travel > 0 ? el.scrollLeft / travel : 1);
  }, []);

  useEffect(() => {
    measure();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div className="py-16">
      <Header />
      <div
        ref={scroller}
        onScroll={measure}
        /* scroll-p matches the gutter so a snapped card lands level with the
           first one rather than flush against the edge */
        className="mt-10 snap-x snap-mandatory overflow-x-auto scroll-p-[24px] [scrollbar-color:rgba(37,99,235,0.32)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(37,99,235,0.3)] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-[8px]"
      >
        <Track fill={fill} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Which mode applies. Pinned is the server snapshot, since it is the design. */
function usePinned() {
  const [pinned, setPinned] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);
  return pinned;
}

/**
 * Horizontal roadmap.
 *
 * The section is tall and its inner pane is pinned; scrolling the page drives
 * the track sideways and fills the progress rail, so the journey reads as one
 * continuous move from enrolment to placement. Framer's `useScroll` supplies
 * the scrub — the project already depends on it, and adding GSAP for a single
 * section would have cost more than it bought.
 *
 * Below `lg`, and whenever the reader has asked for reduced motion, the pin is
 * dropped for an ordinary touch scroller: pinning the viewport and taking over
 * the scroll wheel is exactly what someone setting that preference is asking
 * not to have.
 */
export default function ProgrammeRoadmap() {
  const reduce = useReducedMotion();
  const pinned = usePinned();

  return (
    /*
     * Surface, not white: this sits directly under the Student Wall, which is
     * white, and two white sections in a row read as one. The stage cards
     * inside are white, so the surface tone also gives them an edge to sit on.
     */
    <section id="included" className="relative tech-light">
      {pinned && !reduce ? <PinnedRoadmap /> : <SwipeRoadmap />}
    </section>
  );
}
