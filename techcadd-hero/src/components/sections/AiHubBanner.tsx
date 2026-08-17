"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiCheck, FiCpu, FiDatabase, FiPlay, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

const PILLS = [
  "Open Lab Access",
  "Industry Projects",
  "Expert Mentorship",
  "Placement Support",
];

/** Holographic chips that orbit the illustration. */
const CHIPS: { icon: IconType; label: string; place: string; delay: number }[] = [
  { icon: FiCpu, label: "GPU", place: "left-0 top-4", delay: 0 },
  { icon: FiDatabase, label: "Cloud", place: "right-0 top-1/3", delay: 1.1 },
  { icon: FiZap, label: "IoT", place: "left-2 bottom-6", delay: 2.2 },
];

/** Deterministic particles — no Math.random, so SSR and the client agree. */
const MOTES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 94 + 3}%`,
  top: `${(i * 59) % 84 + 8}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 5 + (i % 5),
  delay: (i % 7) * 0.5,
}));

/**
 * AI Innovation Hub banner.
 *
 * The illustration is robot-stage.webp — the previous asset,
 * robot-cutout-clean.webp, had been deleted from public/images, so the banner
 * was requesting a file that no longer existed.
 */
export default function AiHubBanner() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -5 }}
      className="relative mt-auto rounded-[32px] p-px"
    >
      {/* animated glow border */}
      <motion.span
        aria-hidden
        animate={reduced ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={reduced ? undefined : { duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "240% 240%" }}
        className="absolute inset-0 rounded-[32px] bg-[linear-gradient(120deg,#2563EB,#6366F1,#A855F7,#2563EB)] shadow-[0_0_40px_-10px_rgba(99,102,241,0.85)]"
      />

      <div className="relative overflow-hidden rounded-[31px] bg-[linear-gradient(125deg,#0b1030_0%,#141b4d_48%,#241a52_100%)] backdrop-blur-xl">
        {/* gradient mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.40),transparent_55%),radial-gradient(circle_at_82%_75%,rgba(168,85,247,0.34),transparent_55%)]"
        />
        {/* grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(147,197,253,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(147,197,253,0.16) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage: "radial-gradient(ellipse 75% 70% at 40% 50%, #000, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 40% 50%, #000, transparent 78%)",
          }}
        />

        {/* circuit lines */}
        <svg
          aria-hidden
          viewBox="0 0 600 260"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full opacity-60"
        >
          <defs>
            <linearGradient id="hub-circuit" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
              <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 60 H120 L150 32 H300" fill="none" stroke="url(#hub-circuit)" strokeWidth="1.2" />
          <path d="M0 210 H90 L128 176 H260" fill="none" stroke="url(#hub-circuit)" strokeWidth="1.2" />
          <path d="M600 96 H470 L436 130 H320" fill="none" stroke="url(#hub-circuit)" strokeWidth="1.2" />
          <circle cx="150" cy="32" r="2.5" fill="#93C5FD" />
          <circle cx="128" cy="176" r="2.5" fill="#A855F7" />
          <circle cx="436" cy="130" r="2.5" fill="#60A5FA" />
        </svg>

        {/* moving light streak */}
        <motion.span
          aria-hidden
          animate={reduced ? undefined : { x: ["-30%", "130%"] }}
          transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          className="pointer-events-none absolute inset-y-0 w-1/4 bg-[linear-gradient(105deg,transparent,rgba(147,197,253,0.10),transparent)]"
        />

        {/* particles */}
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            aria-hidden
            style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
            animate={reduced ? undefined : { y: [0, -12, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
            className="pointer-events-none absolute rounded-full bg-[#93c5fd] shadow-[0_0_8px_2px_rgba(147,197,253,0.5)]"
          />
        ))}

        {/* glass reflection */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent)]"
        />

        <div className="relative row g-3 g-sm-4 align-items-center p-4 sm:p-5">
          {/* illustration */}
          <div className="col-12 col-sm-5">
            <div className="relative mx-auto max-w-[230px] sm:max-w-none">
              <motion.span
                aria-hidden
                animate={reduced ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [1, 1.07, 1] }}
                transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.55)_0%,transparent_68%)] blur-2xl"
              />

              <motion.div
                animate={reduced ? undefined : { y: [0, -9, 0] }}
                transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/robot-stage.webp"
                  alt="TechCadd robotics platform in the AI lab"
                  width={840}
                  height={640}
                  sizes="(max-width: 575px) 230px, 240px"
                  className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(2,6,23,0.75)]"
                />
              </motion.div>

              {/* holographic chips */}
              {CHIPS.map(({ icon: Icon, label, place, delay }) => (
                <motion.span
                  key={label}
                  aria-hidden
                  animate={reduced ? undefined : { y: [0, -7, 0], opacity: [0.75, 1, 0.75] }}
                  transition={
                    reduced ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
                  }
                  className={`absolute z-10 hidden items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:inline-flex ${place}`}
                >
                  <Icon className="size-3 text-[#93c5fd]" />
                  {label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="col-12 col-sm-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#93c5fd] backdrop-blur-md">
              <span aria-hidden>🚀</span> Industry Grade Labs
            </span>

            <h3 className="mt-3 font-[family-name:var(--font-sora)] text-[clamp(1.15rem,2.4vw,1.6rem)] font-extrabold leading-[1.15] tracking-[-0.022em] text-white">
              Learn. Build. Innovate.{" "}
              <span className="bg-gradient-to-r from-[#93c5fd] to-[#c4b5fd] bg-clip-text pr-[0.06em] text-transparent">
                Get Hired.
              </span>
            </h3>

            <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">
              Train on real-world infrastructure including AI labs, robotics platforms, cloud
              environments, IoT systems, and industry-grade development setups.
            </p>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {PILLS.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-1 text-[10.5px] font-medium text-white/80 backdrop-blur-md"
                >
                  <FiCheck aria-hidden className="size-3 text-[#93c5fd]" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <motion.a
                href="/#programs"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12.5px] font-semibold text-[#0F172A] shadow-[0_14px_32px_-14px_rgba(2,6,23,0.85)]"
              >
                Explore Labs
                <FiArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                href="/#about"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-5 py-2.5 text-[12.5px] font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-white/60"
              >
                <FiPlay aria-hidden className="size-3.5" />
                Virtual Tour
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
