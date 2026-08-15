"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * The vertical line behind the journey list, drawn downward as the section
 * scrolls past.
 *
 * It sits on `--rail`, the x-position the list itself declares, so the line and
 * the nodes can never disagree about where the rail is.
 */
export default function TimelineRail() {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute top-2 bottom-2 left-[var(--rail)] w-px -translate-x-1/2 bg-[var(--ctx-hairline)]"
    >
      <motion.span
        style={prefersReducedMotion ? { scaleY: 1 } : { scaleY }}
        className="absolute inset-0 origin-top bg-linear-to-b from-brand to-accent"
      />
    </span>
  );
}
