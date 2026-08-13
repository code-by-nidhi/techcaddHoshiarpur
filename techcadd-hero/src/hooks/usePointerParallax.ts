"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Tracks the pointer as normalised (-1..1) spring values.
 * Returns motion values so parallax runs off the React render loop.
 */
export function usePointerParallax(stiffness = 110, damping = 22) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        x.set((e.clientX / window.innerWidth) * 2 - 1);
        y.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [x, y, reduced]);

  const config = { stiffness, damping, mass: 0.5 };
  return { x: useSpring(x, config), y: useSpring(y, config), reduced };
}
