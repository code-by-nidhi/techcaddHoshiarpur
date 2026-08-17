"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FloatingTechCards, { TechCardsGrid } from "./FloatingTechCards";
import OrbitArcs from "./OrbitArcs";
import { robotBus, type RobotFocus } from "@/lib/robotBus";

/**
 * Right-hand showcase: the robot stage render, with orbiting light streaks and
 * drifting motes behind it. The platform and its glow are part of the render.
 *
 * The robot is static — no drag, no rotation, no cursor movement. Set
 * IDLE_FLOAT to true if you ever want the gentle up-and-down drift back.
 *
 * The stage box is 900x800 in reference units — the robot and every course tag
 * are positioned as percentages of it, so the composition holds at any width.
 *
 * The robot faces left. Flip it with FACE_RIGHT, but note that mirrors the
 * "techcadd" and "02" decals on the body.
 */
const FACE_RIGHT = false;
const IDLE_FLOAT = true;

/*
 * The stage render: robot, platform and glow baked into one 840x640 image with
 * feathered transparent edges, so it sits over the hero without a seam.
 *
 * Because the platform travels with it, the CSS PlatformRings, floor
 * reflection and ground shadow are no longer drawn — two platforms stacked on
 * one another read as a rendering fault. robot-cutout-clean.webp remains in
 * the folder if you want the cutout composition back.
 */
const ROBOT = "/images/robot-stage.webp";

/** Ambient motes drifting around the stage, purely decorative. */
const MOTES = [
  { left: "14%", top: "26%", size: 3, drift: 16, duration: 7.5, delay: 0 },
  { left: "31%", top: "12%", size: 2, drift: 12, duration: 9, delay: 1.2 },
  { left: "72%", top: "18%", size: 3, drift: 18, duration: 8.2, delay: 0.6 },
  { left: "84%", top: "44%", size: 2, drift: 14, duration: 10, delay: 2.1 },
  { left: "22%", top: "58%", size: 2, drift: 11, duration: 8.8, delay: 1.8 },
  { left: "63%", top: "64%", size: 3, drift: 15, duration: 9.6, delay: 0.9 },
  { left: "48%", top: "8%", size: 2, drift: 13, duration: 11, delay: 2.6 },
];

export default function RobotShowcase() {
  const reduced = useReducedMotion();
  const flip = FACE_RIGHT ? "scale-x-[-1]" : "";

  // hovering a course tag tints the glow behind the robot
  const [focus, setFocus] = useState<RobotFocus>(null);
  useEffect(() => robotBus.subscribe(setFocus), []);
  const tint = focus
    ? `rgba(${focus.color.map((c) => Math.round(c * 255)).join(",")},0.34)`
    : "rgba(37,99,235,0.28)";

  return (
    <div className="relative z-10 mx-auto w-full max-w-[760px] lg:max-w-none">
      {/*
       * The stage keeps its 9:8 ratio, but on desktop its width is also capped
       * by the height the hero has left over — otherwise a short viewport
       * overflows the section, which clips the robot's head off the top.
       */}
      <div className="robot-stage group relative mx-auto aspect-[9/8] w-full">
        {/* ambient glow pool — takes the colour of the hovered course tag */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[54%] size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-[background] duration-500"
          style={{
            background: `radial-gradient(circle, ${tint} 0%, rgba(139,92,246,0.14) 45%, transparent 70%)`,
          }}
        />

        {/* second pool, revealed on hover so the glow lifts without any scaling */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[54%] size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26)_0%,rgba(168,85,247,0.16)_48%,transparent_72%)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* light beam falling from behind the robot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-[78%] w-[48%] -translate-x-1/2 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            background:
              "linear-gradient(to bottom, rgba(147,197,253,0) 0%, rgba(96,165,250,0.20) 46%, rgba(168,85,247,0.24) 100%)",
          }}
        />

        <OrbitArcs />

        {/* drifting motes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {MOTES.map((m) => (
            <motion.span
              key={`${m.left}-${m.top}`}
              style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
              animate={reduced ? undefined : { y: [0, -m.drift, 0], opacity: [0.2, 0.75, 0.2] }}
              transition={{
                duration: m.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: m.delay,
              }}
              className="absolute rounded-full bg-[#93c5fd] shadow-[0_0_8px_2px_rgba(147,197,253,0.55)]"
            />
          ))}
        </div>

        {/* the robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="absolute inset-0 z-10"
        >
          <motion.div
            animate={IDLE_FLOAT && !reduced ? { y: [0, -6, 0] } : undefined}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            /*
             * Geometry, in stage percentages:
             *   72 wide / 62 tall holds the render's own 21:16 ratio, so
             *   object-contain never letterboxes it;
             *   left 14 centres it (100 - 72) / 2;
             *   top 12 leaves headroom above the robot and ends at 74, which
             *   keeps the whole composition clear of the badge ring.
             *
             * It was 88 wide, sized for the old cutout. At that width the
             * render reached 94% across and the badges sat on top of it.
             */
            className={`absolute left-[14%] top-[12%] h-[62%] w-[72%] drop-shadow-[0_28px_44px_rgba(2,6,23,0.65)] ${flip}`}
          >
            <Image
              src={ROBOT}
              alt="TechCadd AI robot dog"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="object-contain object-center"
            />
          </motion.div>
        </motion.div>

        <FloatingTechCards />
      </div>

      {/* phones get the same tags as a grid, clear of the robot */}
      <TechCardsGrid />
    </div>
  );
}
