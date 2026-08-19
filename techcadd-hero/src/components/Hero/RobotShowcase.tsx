"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FloatingTechCards, { TechCardsGrid } from "./FloatingTechCards";
import OrbitArcs from "./OrbitArcs";
import PlatformRings from "./PlatformRings";
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
const IDLE_FLOAT = false;

/*
 * The robot cutout — the model alone on transparency, with no platform baked
 * in. That is what lets the CSS platform below it do its job: PlatformRings
 * draws the neon rings, the glass floor disc and the light pooling, and the
 * mirrored copy of this image draws the reflection standing on it.
 *
 * robot-stage.webp is the alternative render with the platform baked in. Do
 * not swap it back in here without removing PlatformRings and the reflection
 * first — two platforms stacked on one another read as a rendering fault.
 */
const ROBOT = "/images/robot-cutout.webp";

/*
 * Stage geometry, in percentages of the 9:8 stage box. The reflection reuses
 * ROBOT_LEFT and ROBOT_W verbatim, so the mirror stays locked to the robot at
 * every breakpoint rather than drifting out from under its feet.
 */
const ROBOT_LEFT = "16%";
const ROBOT_TOP = "8%";
const ROBOT_W = "68%";
/** Feet land at 8 + 66 = 74%, which is where the platform disc begins. */
const ROBOT_H = "66%";
const FEET = "74%";

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
            background: `radial-gradient(circle, ${tint} 0%, rgba(96, 165, 250,0.14) 45%, transparent 70%)`,
          }}
        />

        {/* second pool, revealed on hover so the glow lifts without any scaling */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[54%] size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26)_0%,rgba(96,165,250,0.16)_48%,transparent_72%)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* light beam falling from behind the robot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-[78%] w-[48%] -translate-x-1/2 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            background:
              "linear-gradient(to bottom, rgba(147,197,253,0) 0%, rgba(96,165,250,0.20) 46%, rgba(96, 165, 250,0.24) 100%)",
          }}
        />

        <OrbitArcs />

        {/* neon platform: concentric rings, glass floor disc, light pooling */}
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
            style={{ left: ROBOT_LEFT, top: ROBOT_TOP, width: ROBOT_W, height: ROBOT_H }}
            className={`absolute drop-shadow-[0_28px_44px_rgba(5,11,31,0.65)] ${flip}`}
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

        {/*
         * Floor reflection: the same cutout, mirrored under the feet.
         *
         * The mask is authored in the element's own coordinate space, which is
         * painted before the flip is applied — so "to top" here lands as
         * opaque-at-the-contact-point once the element is turned over, and the
         * reflection fades as it travels away from the robot.
         */}
        <div
          aria-hidden
          style={{
            left: ROBOT_LEFT,
            top: FEET,
            width: ROBOT_W,
            height: "22%",
            maskImage: "linear-gradient(to top, black 0%, transparent 78%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 78%)",
          }}
          className={`pointer-events-none absolute z-10 -scale-y-100 opacity-30 blur-[3px] ${flip}`}
        >
          <Image
            src={ROBOT}
            alt=""
            fill
            sizes="(max-width: 1024px) 92vw, 50vw"
            className="object-contain object-bottom"
          />
        </div>

        {/* contact glow where the feet meet the disc */}
        <div
          aria-hidden
          style={{ top: FEET, background: `radial-gradient(ellipse, ${tint} 0%, transparent 70%)` }}
          className="pointer-events-none absolute left-1/2 z-10 h-[7%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-md transition-[background] duration-500"
        />

        <FloatingTechCards />
      </div>

      {/* phones get the same tags as a grid, clear of the robot */}
      <TechCardsGrid />
    </div>
  );
}
