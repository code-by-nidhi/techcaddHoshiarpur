"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a figure up the first time it is seen.
 *
 * The value arrives already formatted ("25,000+", "4.9"), so the numeric part
 * is counted and whatever surrounds it is reprinted untouched — no separate
 * prefix/suffix props to keep in sync with the copy.
 */
const NUMERIC = /^(\D*)([\d.,]+)(.*)$/s;

export default function AnimatedCounter({
  value,
  duration = 1.6,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const match = NUMERIC.exec(value);
  const [prefix, digits, suffix] = match ? [match[1], match[2], match[3]] : ["", "", ""];
  const target = digits ? Number(digits.replace(/,/g, "")) : Number.NaN;
  /** Decimal places to hold while counting, so "4.9" never flickers to "5". */
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  const grouped = digits.includes(",");

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // ease-out cubic: fast at first, settling on the figure
      setCurrent(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, prefersReducedMotion]);

  if (Number.isNaN(target)) return <span ref={ref}>{value}</span>;

  const printed = current.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });

  return (
    <span ref={ref}>
      {prefix}
      {printed}
      {suffix}
    </span>
  );
}
