"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FloatingTechCards from "./FloatingTechCards";
import PlatformRings from "./PlatformRings";
import OrbitArcs from "./OrbitArcs";
import { robotBus, type RobotFocus } from "@/lib/robotBus";

/**
 * Right-hand showcase: the ROBOT.jpeg cutout standing on the neon platform,
 * with orbiting light streaks behind it and a floor reflection below.
 *
 * The robot is static — no drag, no rotation, no cursor movement. Set
 * IDLE_FLOAT to true if you ever want the gentle up-and-down drift back.
 *
 * The stage box is 900x800 in reference units — the robot and every course tag
 * are positioned as percentages of it, so the composition holds at any width.
 *
 * The cutout faces left. Flip it with FACE_RIGHT, but note that mirrors the
 * "techcadd" and "02" decals on the body.
 */
const FACE_RIGHT = false;
const IDLE_FLOAT = true;

const ROBOT = "/images/robot-cutout.webp";

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
        <PlatformRings />

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

        {/* floor reflection */}
        <div
          aria-hidden
          className={`absolute left-[16%] top-[72%] h-[28%] w-[68%] scale-y-[-1] opacity-[0.16] blur-[2px] [mask-image:linear-gradient(to_top,transparent_10%,black_95%)] ${flip}`}
        >
          <Image src={ROBOT} alt="" fill sizes="40vw" className="object-contain object-top" />
        </div>

        {/* soft ground shadow, so the robot reads as standing on the platform */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[73%] z-0 h-[7%] w-[40%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(2,6,23,0.8)_0%,transparent_72%)] blur-md"
        />

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
             * robot-cutout.webp is chopped at its own top edge — the tail was
             * cut off and left a pale ghost across the robot's back. The mask
             * fades that top sliver out so it reads as atmosphere instead of a
             * hard cut. A clean cutout would let this be removed.
             */
            className={`absolute left-[16%] top-[8%] h-[68%] w-[68%] drop-shadow-[0_28px_44px_rgba(2,6,23,0.85)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_3.5%,black_7%)] ${flip}`}
          >
            <Image
              src={ROBOT}
              alt="TechCadd AI robot dog"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>

        {/* contact glow where the feet meet the platform */}
        <motion.div
          aria-hidden
          animate={reduced ? undefined : { opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[76%] z-10 h-[5%] w-[46%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(96,165,250,0.75)_0%,transparent_70%)] blur-md"
        />

        <FloatingTechCards />
      </div>
    </div>
  );
}
