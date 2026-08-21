"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Button that leans toward the cursor while it's nearby.
 *
 * Renders an anchor when it has somewhere to go and a real `<button>` when it
 * only has something to do — an `<a>` with no href is not in the tab order, so
 * a modal trigger built from one is unreachable by keyboard.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.28,
  target,
  rel,
}: {
  children: ReactNode;
  href?: string;
  /** Given without `href`, this renders a button instead of a link. */
  onClick?: () => void;
  className?: string;
  strength?: number;
  /** Set together for an external destination, e.g. a wa.me link. */
  target?: string;
  rel?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    onPointerMove: onMove,
    onPointerLeave: reset,
    style: { x, y },
    className,
  };

  if (!href) {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.a>
  );
}
