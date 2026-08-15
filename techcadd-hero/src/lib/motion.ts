import type { Variants } from "framer-motion";

/** Parent container that reveals its children one after another. */
export const stagger = (delayChildren = 0.1, staggerChildren = 0.09): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Standard fade-up used across the hero. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/* -------------------------------------------------------------------------- */
/*  About page                                                                */
/* -------------------------------------------------------------------------- */

/*
 * The /about kit names its states "hidden"/"visible" rather than the
 * "hidden"/"show" pair above, so the two sets stay separate on purpose — a
 * component that mixes them would animate to a state that does not exist.
 */

/** The site's standard ease-out. Typed as a tuple so framer accepts it. */
export const EASE_OUT_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const transition = {
  base: { duration: 0.7, ease: EASE_OUT_SOFT },
  slow: { duration: 0.95, ease: EASE_OUT_SOFT },
} as const;

/** Default reveal: up and in. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

/** Reveal for imagery and cards, which read better easing up in scale. */
export const revealScale: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.965 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transition.slow },
};

/** Parent that releases its children one after another. */
export const staggerParent = (staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});
