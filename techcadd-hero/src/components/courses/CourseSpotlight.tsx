"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiAward, FiClock } from "react-icons/fi";

/**
 * The homepage course rail: six full-bleed panels that expand under the
 * pointer, in place of the old filter-pills-and-grid.
 *
 * Two layouts, one component. Wide enough, the panels sit in a single row and
 * the hovered one grows while its neighbours give up exactly the width it
 * takes — so the row's footprint never changes and only one card is ever open.
 * Narrower than that the row becomes a snap slider, every card renders open,
 * and no hover is needed to read a course.
 *
 * The catalogue data arrives already resolved from the server component; this
 * file owns presentation only.
 */

export type SpotlightCard = {
  /** the course this panel opens — also the React key */
  slug: string;
  /** display name, which may be broader than one course title (a family card) */
  title: string;
  category: string;
  description: string;
  duration: string;
  placement: string;
  image: string;
  href: string;
};

/* ---------------------------------------------------------------- layout -- */

/** Panels per row — the divisor in the fit check below. */
const COUNT = 6;

/**
 * Panel widths per tier, in px.
 *
 * `shrunk` is not a guess: it is chosen so `expanded + 5 x shrunk` comes out at
 * or under `6 x collapsed`, which is what keeps the row from reflowing the
 * page — the rail occupies the same span open or closed.
 *
 * `wide` carries the design's own numbers and needs ~1380px of rail. `narrow`
 * is the same proportions at the 1280px breakpoint. Below that it is a slider,
 * so no fixed width applies.
 */
const TIERS = {
  wide: { collapsed: 220, expanded: 450, shrunk: 172, pad: 24 },
  narrow: { collapsed: 192, expanded: 400, shrunk: 150, pad: 20 },
} as const;

type Tier = keyof typeof TIERS | "slider";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Rail width a tier needs, so the queries below and the numbers above cannot
 *  drift apart silently in development. */
if (process.env.NODE_ENV !== "production") {
  for (const [name, t] of Object.entries(TIERS)) {
    if (t.expanded + (COUNT - 1) * t.shrunk > COUNT * t.collapsed) {
      throw new Error(`CourseSpotlight: the "${name}" tier grows the row when opened`);
    }
  }
}

const WIDE = "(min-width: 1440px)";
const ROW = "(min-width: 1280px)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(WIDE), window.matchMedia(ROW)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

const readTier = (): Tier => {
  if (window.matchMedia(WIDE).matches) return "wide";
  if (window.matchMedia(ROW).matches) return "narrow";
  return "slider";
};

/**
 * Which layout applies. The server snapshot is `wide` because the row is the
 * primary design; a narrower viewport corrects on hydration, which costs
 * nothing visible — both layouts render identical markup and only the widths
 * differ.
 */
const useTier = (): Tier => useSyncExternalStore(subscribe, readTier, () => "wide");

/* ------------------------------------------------------------------ rail -- */

export default function CourseSpotlight({ cards }: { cards: SpotlightCard[] }) {
  const reduce = useReducedMotion();
  const tier = useTier();
  const size = tier === "slider" ? null : TIERS[tier];

  /** Index of the open panel, or null when the row is at rest. */
  const [open, setOpen] = useState<number | null>(null);

  /* Guarded so a pointer that has already reached the next panel is not
     closed again by the previous panel's late hover-end. */
  const close = useCallback(
    (i: number) => setOpen((current) => (current === i ? null : current)),
    [],
  );

  const widthOf = (i: number) => {
    if (!size) return "78vw";
    if (open === null) return size.collapsed;
    return i === open ? size.expanded : size.shrunk;
  };

  const duration = reduce ? 0 : 0.5;

  /*
   * The entrance reveal is triggered once for the whole rail rather than per
   * panel. On the slider only the first panel is ever inside the viewport, so
   * a per-panel trigger left the other five blank until they were swiped into
   * view — the rail looked empty. "some" rather than a fraction because the
   * rail is six panels wide: on a phone the visible slice is a small
   * proportion of its area, whatever its vertical position.
   */
  const rail = useRef<HTMLUListElement>(null);
  const revealed = useInView(rail, { once: true, amount: "some" });

  return (
    <ul
      ref={rail}
      /* Spacing is written as arbitrary values throughout this file rather
         than as `px-5` / `gap-3`. The app loads bootstrap-grid.min.css, whose
         utilities share those names and carry !important, so the plain classes
         resolve to Bootstrap's scale and silently break the width arithmetic
         above. Arbitrary values generate class names Bootstrap does not have. */
      className="-mx-[20px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto px-[20px] pb-[16px] [scrollbar-width:none] xl:mx-0 xl:justify-center xl:overflow-visible xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden"
      onMouseLeave={() => setOpen(null)}
    >
      {cards.map((card, i) => {
        /* On the slider there is nothing to hover, so every panel shows its
           detail rather than hiding it behind an interaction that cannot
           happen on a touch screen. */
        const shown = !size || open === i;

        return (
          <motion.li
            key={card.slug}
            /* initial={false}: the width is applied, not animated, on mount —
               otherwise every panel would grow in from zero on first paint. */
            initial={false}
            animate={{ width: widthOf(i) }}
            transition={{ duration, ease: EASE }}
            onHoverStart={() => setOpen(i)}
            onHoverEnd={() => close(i)}
            className="relative max-w-[300px] shrink-0 snap-center xl:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              animate={
                revealed
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 34, scale: 0.97 }
              }
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : i * 0.07,
                ease: EASE,
              }}
            >
              <Link
                href={card.href}
                onFocus={() => setOpen(i)}
                onBlur={() => close(i)}
                aria-label={`${card.title} — explore course`}
                className="group relative block h-[500px] overflow-hidden rounded-[24px] outline-none ring-offset-2 ring-offset-[#0A1437] focus-visible:ring-2 focus-visible:ring-[#60A5FA] sm:h-[560px] xl:h-[650px]"
              >
                {/* ---------------------------- artwork -------------------------- */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: shown && size && !reduce ? 1.08 : 1 }}
                  transition={{ duration: duration + 0.2, ease: EASE }}
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 450px, 78vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Three washes. A flat tint first, because the catalogue
                    artwork is landscape and cropping it to a 220px column
                    leaves half-words of the banner type across the panel —
                    sunk far enough into the brand navy it reads as texture
                    rather than as broken lettering. Then a base gradient that
                    keeps the title legible over any image, and a deeper one
                    that only fades up when the panel opens, so the detail copy
                    has ground to sit on. */}
                <div aria-hidden className="absolute inset-0 bg-[#0A1437]/45" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1437] via-[#0A1437]/65 to-[#0A1437]/35"
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1437] via-[#0A1437]/85 to-transparent"
                  animate={{ opacity: shown ? 1 : 0 }}
                  transition={{ duration, ease: EASE }}
                />

                {/* --------------------------- glow border ----------------------- */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[24px]"
                  animate={{
                    boxShadow: shown
                      ? "inset 0 0 0 1px rgba(96,165,250,0.55), 0 26px 70px -28px rgba(35,68,212,0.95)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.10), 0 18px 44px -34px rgba(10,20,55,0.90)",
                  }}
                  transition={{ duration, ease: EASE }}
                />

                {/* ------------------------- content overlay --------------------- */}
                <div
                  className="relative flex h-full flex-col justify-between p-[24px]"
                  style={size ? { padding: size.pad } : undefined}
                >
                  {/* top: category badge, then the course name. Held at the
                      *shrunk* content width — the narrowest a panel ever gets —
                      so the title wraps once and then never reflows again,
                      whichever card the pointer is on. */}
                  <div
                    className="max-w-full"
                    style={size ? { width: size.shrunk - size.pad * 2 } : undefined}
                  >
                    <span className="inline-flex items-center gap-[6px] rounded-full border border-white/20 bg-white/[0.08] px-[10px] py-[4px] font-[family-name:var(--font-mono-face)] text-[8.5px] uppercase tracking-[0.12em] whitespace-nowrap text-[#BFDBFE] backdrop-blur-md">
                      <span aria-hidden className="size-1 rounded-full bg-[#60A5FA]" />
                      {card.category}
                    </span>

                    <h3 className="mt-[12px] font-[family-name:var(--font-sora)] text-[19px] font-extrabold leading-[1.18] tracking-[-0.02em] text-white xl:text-[18px]">
                      {card.title}
                    </h3>
                  </div>

                  {/*
                   * Bottom: the detail, revealed with the width.
                   *
                   * Faded rather than mounted on hover — a closed panel still
                   * carries its description, duration and placement line in the
                   * server HTML, which is what a crawler reads. Unmounting it
                   * would have made five of the six courses invisible to search.
                   */}
                  <div className="w-full">
                    <motion.div
                      initial={false}
                      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 16 }}
                      transition={{
                        duration: reduce ? 0 : 0.38,
                        // on the way in it waits for the panel to be worth
                        // reading; on the way out it leaves at once
                        delay: reduce || !shown ? 0 : 0.14,
                        ease: EASE,
                      }}
                      /* laid out at the open width from the first frame, so the
                         copy does not reflow while the panel grows */
                      style={size ? { width: size.expanded - size.pad * 2 } : undefined}
                    >
                      <p className="text-[13.5px] leading-[1.7] text-white/75">
                        {card.description}
                      </p>

                      <dl className="mt-[16px] flex flex-wrap gap-x-[20px] gap-y-[8px] text-[12px] text-white/60">
                        <div className="flex items-center gap-[6px]">
                          <dt className="sr-only">Duration</dt>
                          <FiClock aria-hidden className="size-3.5 shrink-0 text-[#60A5FA]" />
                          <dd>{card.duration}</dd>
                        </div>
                        <div className="flex items-center gap-[6px]">
                          <dt className="sr-only">Placement</dt>
                          <FiAward aria-hidden className="size-3.5 shrink-0 text-[#60A5FA]" />
                          <dd>{card.placement}</dd>
                        </div>
                      </dl>

                      {/* the whole panel is the link, so this is styling only */}
                      <span className="mt-[20px] inline-flex items-center gap-[8px] rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2344D4] px-[20px] py-[10px] text-[13px] font-semibold text-white shadow-[0_0_26px_-8px_rgba(35,68,212,1)] transition-transform duration-300 group-hover:translate-x-0.5">
                        Explore Course
                        <FiArrowRight aria-hidden className="size-3.5" />
                      </span>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.li>
        );
      })}
    </ul>
  );
}
