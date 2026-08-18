"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * Call to action that leans toward the cursor while it is over the button.
 *
 * Rendered as a `next/link` so an in-app href (/contact) is client-navigated
 * and prefetched rather than reloading the whole route.
 */
export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.22);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-shadow duration-300",
        // the home page's primary pill: blue into violet, glowing on hover
        variant === "primary"
          ? "bg-[linear-gradient(100deg,#2563eb_0%,#3b82f6_50%,#60a5fa_100%)] text-white shadow-[0_18px_44px_-16px_rgb(59_130_246/0.85)] hover:shadow-[0_22px_56px_-14px_rgb(96_165_250/0.95)]"
          : "chip-border bg-white/10 text-ink backdrop-blur-md hover:bg-white/15",
        className,
      )}
    >
      {children}
    </MotionLink>
  );
}
