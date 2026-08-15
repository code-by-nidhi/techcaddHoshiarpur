"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** The glass recipe every panel on this page shares. */
export const GLASS =
  "border border-white/[0.15] bg-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-[20px]";

/** Real contact details, kept in one place so every card and link agrees. */
export const CONTACT = {
  phone: "+91 98881 22255",
  email: "info@techcadd.com",
  location: "TechCadd Jalandhar Campus",
};

/** Digits only, for tel: and wa.me links. */
export const phoneDigits = CONTACT.phone.replace(/\D/g, "");

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Ambient motes. Positions come from index arithmetic rather than Math.random
 * so the server and client render the same markup.
 */
const MOTES = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 41) % 100}%`,
  top: `${(i * 59) % 94}%`,
  size: i % 4 === 0 ? 3 : 2,
  drift: 14 + (i % 5) * 4,
  duration: 7 + (i % 6),
  delay: (i % 8) * 0.6,
}));

export function Particles({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {MOTES.map((m, i) => (
        <motion.span
          key={i}
          style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
          animate={reduced ? undefined : { y: [0, -m.drift, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: m.delay,
          }}
          className="absolute rounded-full bg-[#93C5FD] opacity-30 shadow-[0_0_8px_2px_rgba(147,197,253,0.4)]"
        />
      ))}
    </div>
  );
}

/** Blue and violet blooms, matching the hero's palette. */
export function Ambience() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] top-[-8%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,transparent_68%)] blur-3xl" />
      <div className="absolute -right-[8%] top-[18%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.26)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-12%] left-[28%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

/** Hairline that fades out at both ends. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent)] ${className}`}
    />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#93C5FD] ${GLASS}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]" />
      {children}
    </span>
  );
}

/** Section heading used by every block below the hero. */
export function SectionTitle({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-6 font-[family-name:var(--font-sora)] text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.12] tracking-[-0.028em] text-white">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[15px] leading-[1.8] text-white/60">{sub}</p>}
    </motion.div>
  );
}

/** Wraps a block in the page's max width and standard rhythm. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem] ${className}`}>
      {children}
    </div>
  );
}
