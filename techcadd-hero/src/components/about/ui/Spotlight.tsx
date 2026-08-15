"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

/**
 * Follows the pointer with a soft highlight over whatever it wraps.
 *
 * The position is written to CSS custom properties rather than React state:
 * a pointer move fires dozens of times a second, and re-rendering the card on
 * each one would cost far more than the effect is worth.
 */
export default function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse") return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("group/spot relative", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 ease-[var(--ease-out-soft)] group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(18rem 18rem at var(--spot-x, 50%) var(--spot-y, 50%), rgb(37 99 235 / 18%), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
