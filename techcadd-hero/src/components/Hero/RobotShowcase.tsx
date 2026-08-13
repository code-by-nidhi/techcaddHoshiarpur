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
const IDLE_FLOAT = false;

const ROBOT = "/images/robot-cutout.webp";

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
      <div className="relative aspect-[9/8] w-full">
        {/* ambient glow pool — takes the colour of the hovered course tag */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[54%] size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-[background] duration-500"
          style={{
            background: `radial-gradient(circle, ${tint} 0%, rgba(139,92,246,0.14) 45%, transparent 70%)`,
          }}
        />

        <OrbitArcs />
        <PlatformRings />

        {/* floor reflection */}
        <div
          aria-hidden
          className={`absolute left-[16%] top-[72%] h-[28%] w-[68%] scale-y-[-1] opacity-[0.16] blur-[2px] [mask-image:linear-gradient(to_top,transparent_10%,black_95%)] ${flip}`}
        >
          <Image src={ROBOT} alt="" fill sizes="40vw" className="object-contain object-top" />
        </div>

        {/* the robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="absolute inset-0 z-10"
        >
          <motion.div
            animate={IDLE_FLOAT && !reduced ? { y: [0, -12, 0] } : undefined}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute left-[16%] top-[8%] h-[68%] w-[68%] drop-shadow-[0_28px_44px_rgba(2,6,23,0.85)] ${flip}`}
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
