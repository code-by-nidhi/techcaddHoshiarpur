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
