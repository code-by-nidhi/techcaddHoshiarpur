"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  ClipboardCheck, BookOpen, Award, Building2, Rocket, MessagesSquare, Mic, Trophy,
} from "lucide-react";
import { ROADMAP } from "@/lib/site";

const ICONS = [ClipboardCheck, BookOpen, Award, Building2, Rocket, MessagesSquare, Mic, Trophy];

/** One stop on the track. Kept separate so its scroll transforms are hooks in
 *  a component rather than hooks inside a loop. */
function Step({
  step,
  index,
  progress,
}: {
  step: (typeof ROADMAP)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = ICONS[index];
  const start = index / ROADMAP.length;
  const opacity = useTransform(progress, [start - 0.16, start - 0.02], [0.35, 1]);
  const y = useTransform(progress, [start - 0.16, start - 0.02], [26, 0]);

  return (
    <motion.li style={{ opacity, y }} className="w-[320px] shrink-0 sm:w-[360px]">
      {/* node on the line */}
      <div className="relative h-[110px]">
        <span className="absolute left-8 top-[70px] grid size-8 place-items-center rounded-full bg-white ring-2 ring-[#2563EB]">
          <span className="size-2.5 rounded-full bg-[#2563EB]" />
        </span>
        <span className="absolute left-[74px] top-[76px] font-[family-name:var(--font-mono-face)] text-[11px] tracking-[0.16em] text-[#94A3B8]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="group mt-6 rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.7)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2563EB]/25 hover:shadow-[0_30px_60px_-32px_rgba(37,99,235,0.55)]">
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB]/12 to-[#06B6D4]/12 ring-1 ring-inset ring-slate-200"
        >
          <Icon aria-hidden className="size-5 text-[#2563EB]" />
        </motion.span>

        <h3 className="mt-5 font-[family-name:var(--font-poppins)] text-[19px] font-bold text-[#0F172A]">
          {step.step}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">{step.copy}</p>
      </div>
    </motion.li>
  );
}


/**
 * Horizontal roadmap. The section is tall and sticky-pinned; scrolling through
 * it drives the track sideways and fills the progress path, so the journey
 * reads as one continuous move from enrolment to placement.
 */
export default function ProgrammeRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const x = useTransform(progress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="included" ref={ref} className="relative h-[420vh] bg-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
          <span className="inline-block rounded-full border border-[#2563EB]/20 bg-[#2563EB]/8 px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.18em] text-[#2563EB]">
            Included with every programme
          </span>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-poppins)] text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#0F172A]">
            The Career Journey, End To End
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#475569]">
            Eight stages, in order. Keep scrolling to walk the path.
          </p>
        </div>

        {/* track */}
        <div className="relative mt-9">
          <div aria-hidden className="absolute left-0 top-[86px] h-px w-full bg-slate-200" />
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute left-0 top-[86px] h-[2px] w-full origin-left bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4]"
          />

          <motion.ol style={{ x }} className="flex gap-6 pl-6 lg:pl-[4.5rem]">
            {ROADMAP.map((s, i) => (
              <Step key={s.step} step={s} index={i} progress={progress} />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
