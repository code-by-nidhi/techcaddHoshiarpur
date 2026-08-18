"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Fragment, useRef, type PointerEvent, type ReactNode } from "react";

import DiamondFrame from "@/components/about/ui/DiamondFrame";
import { hero, images } from "@/data/about";
import { EASE_OUT_SOFT, staggerParent, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const textChild = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

interface HeroSectionProps {
  /** The statistics row, passed from the page so it stays server-rendered. */
  children?: ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /* Gentle parallax on the diamond composition as the hero scrolls away. */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const parallaxY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.5 });

  /* The backdrop travels slower than the content, which reads as depth
     between the decorative layer and the copy sitting on top of it. */
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(sectionProgress, [0, 1], ["0%", "16%"]);

  /* Pointer-led drift on the composition. Capped at 12px and mouse-only, so it
     reads as the artwork responding rather than following the cursor. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.6 });
  const driftY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.6 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    pointerX.set(((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 24);
    pointerY.set(((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 24);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-labelledby="hero-heading"
      className="surface-dark relative isolate overflow-hidden bg-royal-deep pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16"
    >
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: backdropY }}
        className="absolute inset-0 -z-10"
      >
        <HeroBackdrop />
      </motion.div>

      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          {/* ------------------------------ Copy ------------------------------ */}
          <motion.div
            variants={staggerParent(0.09)}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="relative z-10"
          >
            <motion.p
              variants={textChild}
              className="pill-outline inline-flex rounded-full px-5 py-2.5 text-sm font-medium tracking-[0.01em] text-ink"
            >
              {hero.eyebrow}
            </motion.p>

            <h1 id="hero-heading" className="type-display mt-7">
              {hero.headline.map((line, index) => (
                <motion.span
                  key={line}
                  variants={textChild}
                  className={cn(
                    "block",
                    // same blue-into-violet sweep the home headline carries
                    index === hero.accentLine && "text-gradient-brand",
                  )}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Short rule with a node at its end. */}
            <motion.div
              variants={textChild}
              aria-hidden="true"
              className="mt-10 flex items-center gap-2"
            >
              <motion.span
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.5 }}
                className="h-px w-14 origin-left bg-linear-to-r from-brand-bright/30 to-brand-bright"
              />
              <span className="animate-node size-1.5 rounded-full bg-brand-bright" />
            </motion.div>

            <motion.p
              variants={textChild}
              className="type-lead mt-7 max-w-lg text-ink-dim"
            >
              {hero.supporting.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? <br className="hidden sm:inline" /> : null}
                  {index > 0 ? " " : null}
                  {line}
                </Fragment>
              ))}
            </motion.p>
          </motion.div>

          {/* ----------------------------- Visual ----------------------------- */}
          {/* Geometry note: a rotated square's visual size is √2 × its width, so
              the `w-[64%]` frame below occupies ~90% of the stage. The stage
              stays inside its grid column, so nothing bleeds over the copy or
              past the container. */}
          <motion.div
            ref={stageRef}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: 0.15 }}
            style={prefersReducedMotion ? undefined : { y: parallaxY }}
            className="relative mx-auto aspect-[1/0.94] w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none"
          >
            {/* Inner layer carries the pointer drift, so the scroll parallax on
                the stage and the mouse drift never have to be summed by hand. */}
            <motion.div
              style={prefersReducedMotion ? undefined : { x: driftX, y: driftY }}
              className="absolute inset-0"
            >
              {/* Glow behind the composition — blue core, violet halo, as on
                  the robot stage. */}
              <div
                aria-hidden="true"
                className="animate-drift absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35)_0%,rgba(96,165,250,0.28)_55%,transparent_75%)] blur-[110px]"
              />

              {/* Primary diamond, centred on the stage. */}
              <div className="absolute top-1/2 left-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2">
                <DiamondFrame
                  image={images.heroPrimary}
                  priority
                  outlines
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 40vw, 30vw"
                />
              </div>

              {/* Secondary diamond, centred on the primary's lower-left face:
                  that face's midpoint sits at (27.5%, 72.5%) of the stage, and
                  these offsets place this frame's centre there. Hidden on the
                  narrowest screens, where two diamonds crowd. */}
              <div className="absolute top-[58%] left-[13%] hidden w-[28%] sm:block">
                <DiamondFrame
                  image={images.heroSecondary}
                  radius="rounded-[16%]"
                  sizes="(max-width: 1024px) 18vw, 13vw"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics row sits inside the hero's backdrop. It takes the full
            container width rather than stopping short: capped at 5xl, four
            columns leave about 250px each, which a 2.7rem figure beside a 68px
            badge cannot fit — the numbers ran into the dividers. */}
        {children ? <div className="relative z-10">{children}</div> : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Hero backdrop: royal-navy wash, dot-matrix corners and the thin arcs down the
 * left edge. Pure CSS/SVG, decorative, and reduced on small screens.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/*
        The home hero's backdrop, layer for layer: near-black base, a warmer
        navy pocket behind the composition, a violet glow high on the right, two
        blues below it, and a vignette that pulls the left side back down so the
        copy keeps its contrast.
      */}
      <div className="absolute inset-0 bg-[#050B1F]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_78%_60%,rgba(12,26,74,0.95)_0%,rgba(6,10,26,0.6)_45%,transparent_75%)]" />

      <div className="absolute top-[6%] right-[-12%] size-[52rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.30)_0%,transparent_68%)] blur-3xl" />

      <div className="absolute right-[16%] bottom-[2%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,transparent_70%)] blur-3xl" />

      <div className="absolute top-[18%] -left-40 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.18)_0%,transparent_70%)] blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(2,4,10,0.55)_0%,transparent_60%)]" />

      {/* Dot matrices, top-right and bottom-right. */}
      <div className="dot-grid absolute top-24 right-0 hidden h-40 w-56 opacity-40 [mask-image:linear-gradient(to_left,#000,transparent)] md:block" />
      <div className="dot-grid absolute right-6 bottom-14 hidden h-44 w-40 opacity-25 [mask-image:linear-gradient(to_top,#000,transparent)] md:block" />

      {/* Thin arcs along the left edge. */}
      <svg
        className="absolute top-1/4 -left-24 hidden h-[28rem] w-64 lg:block"
        viewBox="0 0 256 448"
        fill="none"
      >
        <g stroke="#3B82F6" strokeOpacity="0.28" strokeWidth="1">
          <path d="M-40 0C120 90 190 220 150 448" />
          <path d="M-70 0C90 90 160 220 120 448" />
          <path d="M-100 0C60 90 130 220 90 448" />
        </g>
      </svg>
    </div>
  );
}
