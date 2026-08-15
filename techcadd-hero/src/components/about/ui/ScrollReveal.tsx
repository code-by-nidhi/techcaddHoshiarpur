"use client";

import { motion, type TargetAndTransition, type Variants } from "framer-motion";
import { useMemo, type ReactNode } from "react";

import { revealUp } from "@/lib/motion";

/**
 * The kit's one reveal primitive: fires once, on entry, and can render as any
 * of the few elements the sections need so a list item never has to be wrapped
 * in a `div` that would break `ol`/`ul` semantics.
 */
const ELEMENTS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  figure: motion.figure,
} as const;

interface ScrollRevealProps {
  children: ReactNode;
  /** Element to render. Defaults to a `div`. */
  as?: keyof typeof ELEMENTS;
  delay?: number;
  variants?: Variants;
  className?: string;
}

export default function ScrollReveal({
  children,
  as = "div",
  delay = 0,
  variants = revealUp,
  className,
}: ScrollRevealProps) {
  const Component = ELEMENTS[as];

  /*
   * The delay is folded into the variant rather than passed as a `transition`
   * prop: a transition declared inside a variant takes precedence over that
   * prop, so the prop would simply be dropped for every variant in the kit.
   */
  const resolved = useMemo(() => {
    const visible = variants.visible;
    if (!delay || typeof visible !== "object" || visible === null) return variants;

    const target = visible as TargetAndTransition;
    return {
      ...variants,
      visible: { ...target, transition: { ...target.transition, delay } },
    };
  }, [variants, delay]);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={resolved}
      className={className}
    >
      {children}
    </Component>
  );
}
