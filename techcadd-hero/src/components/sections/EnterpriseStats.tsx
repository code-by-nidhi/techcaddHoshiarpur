"use client";

import { motion, type Variants } from "framer-motion";
import {
  Briefcase, Building2, CalendarClock, GraduationCap, Users,
  type LucideIcon,
} from "lucide-react";
import { ABOUT } from "@/lib/site";
import Counter from "@/components/UI/Counter";

/**
 * The five headline numbers, as a row of white cards.
 *
 * This used to sit inside About, below the opening statement and the video.
 * It is its own section now because it belongs between the hero and About
 * rather than inside it — the numbers are the first thing to land after the
 * hero's claim, and reading them there is what makes the claim credible.
 *
 * Moving it also gave it the job About's first child used to do: easing the
 * navy hero into the white page. That gradient is the band this section is
 * drawn on, so the cards ride the hand-off instead of following it — see the
 * note on the backdrop below. About therefore no longer carries a gradient of
 * its own; it begins on white, because this section has already arrived there.
 */

/** Blue line icons for the stat cards, one per figure. */
const STAT_ICONS: Record<string, LucideIcon> = {
  students: Users,
  partners: Building2,
  training: Briefcase,
  years: CalendarClock,
  trainers: GraduationCap,
};

const cardStack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Five across on a desktop and two on a phone, which leaves the fifth card
 * alone on its own row — `last:odd:col-span-2` widens it to fill the row
 * rather than leaving a hole beside it.
 */
export default function EnterpriseStats() {
  return (
    <section
      aria-labelledby="stats-heading"
      /*
       * Pulled up into the hero by `--stats-lift`, and transparent where it
       * overlaps. The hero reserves the same amount at its foot, so what the
       * cards cover is empty navy rather than its feature chips.
       *
       * The section cannot carry its own background: an opaque one would paint
       * a white slab over the bottom of the hero instead of letting the navy
       * show around the cards. So the ground is a child that starts at the
       * lift — below the overlap — and only the cards are opaque above it.
       *
       * `z-10` is belt and braces. This is already the later sibling, but the
       * hero is `isolate` and positioned, and being explicit costs nothing.
       */
      className="relative z-10 mt-[calc(var(--stats-lift)*-1)] overflow-x-clip"
    >
      <h2 id="stats-heading" className="sr-only">
        TechCadd in numbers
      </h2>

      {/*
       * The ground, starting where the hero ends.
       *
       * `tech-light` rather than plain white: it is what About stands on, and
       * both are white underneath, but tech-light also carries the faint blue
       * grid and corner washes. Painting this white left a visible horizontal
       * seam at About's top edge where that texture switched on; sharing the
       * class runs the grid straight through the two.
       */}
      <div
        aria-hidden
        className="tech-light pointer-events-none absolute inset-x-0 bottom-0 top-[var(--stats-lift)]"
      />

      {/*
       * The hero-to-page hand-off, laid over that ground and starting on the
       * same line, so its first pixel is the hero's own navy and the join is
       * invisible.
       *
       * It fades to transparent navy rather than to white, so what emerges
       * underneath is the tech-light above — grid and all — instead of a flat
       * white panel that would then meet that texture at a hard line. Written
       * longhand because `to-transparent` interpolates towards transparent
       * *black*, which greys the middle of the fade.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[var(--stats-lift)] h-44 bg-[linear-gradient(180deg,#101E52_0%,rgba(16,30,82,0.55)_45%,rgba(16,30,82,0)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 lg:px-[4.5rem] lg:pb-20">
        <motion.ul
          variants={cardStack}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5"
        >
          {ABOUT.enterpriseStats.map((stat) => {
            const Icon = STAT_ICONS[stat.icon] ?? Users;
            return (
              <motion.li
                key={stat.label}
                variants={cardItem}
                className="group rounded-[20px] border border-slate-200/70 bg-white p-5 text-center shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-[#2563EB]/30 hover:shadow-[0_30px_60px_-28px_rgba(37,99,235,0.55)] last:odd:col-span-2 motion-reduce:hover:translate-y-0 lg:p-6 lg:last:odd:col-span-1"
              >
                <span
                  aria-hidden
                  className="mx-auto grid size-11 place-content-center rounded-2xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15 transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                >
                  <Icon className="size-5 text-[#2563EB]" />
                </span>

                <Counter
                  to={stat.to}
                  suffix={stat.suffix}
                  className="mt-3.5 block font-[family-name:var(--font-poppins)] text-[clamp(1.5rem,2.4vw,2.05rem)] font-extrabold leading-none tracking-[-0.03em] text-[#0F172A]"
                />

                <span className="mt-2 block text-[12.5px] font-medium leading-snug text-[#64748B] lg:text-[13px]">
                  {stat.label}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
