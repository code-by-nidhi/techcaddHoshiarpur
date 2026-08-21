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
const IDLE_FLOAT = false;

/*
 * The staged render: robot, neon platform and rings all baked into one image.
 *
 * Because the platform travels with the artwork, the CSS platform is gone —
 * PlatformRings and the mirrored floor reflection are not rendered, since a
 * second set of rings under a baked-in one reads as a rendering fault.
 *
 * This render is a true cutout: 52% of its pixels are fully transparent and all
 * four corners are clear, so it has no rectangle to hide and needs no blending
 * mask over it. The earlier `robot-blend` treatment was there because the
 * render before this one carried its own near-black backdrop; feathering this
 * one would only eat into the robot and the outer rings of its platform.
 */
const ROBOT = "/images/hero-robot.webp";

/*
 * The robot's box inside the 9:8 stage, per breakpoint.
 *
 * The artwork is 3:2 and its subject runs corner to corner — under 1% of
 * transparent margin on any side — so the box is cut to that same ratio and
 * `object-contain` neither letterboxes nor crops. Height is therefore always
 * width x 0.75 once both are expressed as percentages of their own axis, and
 * left/top are whatever centres it.
 *
 * The widths are not a style choice, they are what the ring leaves over. A tag
 * at nine o'clock sits with its centre on the ring ellipse, so the robot may be
 * no wider than twice (ring radius - half a tag - the 24px gap). Worked through
 * at the narrowest stage in each band:
 *
 *   band        stage      ring rx   side tag   robot may be   used
 *   768-1023    720 x 640  295px     ~103px     <= 439px       57%
 *   1024-1279   477 x 424  188px     ~97px      <= 231px       46%
 *   1280+       620 x 551  245px     ~121px     <= 293px       46%
 *
 * The two upper bands land on the same 46% by coincidence, not by design: the
 * laptop band gets there by shrinking its tags 20%, the desktop band by having
 * a wider stage to start with.
 *
 * Below 768 there is no ring — the tags are a grid under the stage — so the
 * robot takes nearly the whole box.
 *
 * These are classes rather than inline styles because they have to change at
 * breakpoints, and inline geometry cannot.
 */
const ROBOT_BOX = [
  "left-[4%] top-[15.5%] w-[92%] h-[69%]",
  "md:left-[21.5%] md:top-[28.6%] md:w-[57%] md:h-[42.75%]",
  "lg:left-[27%] lg:top-[32.75%] lg:w-[46%] lg:h-[34.5%]",
].join(" ");

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
          className="absolute left-1/2 top-[54%] z-[1] size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-[background] duration-500"
          style={{
            background: `radial-gradient(circle, ${tint} 0%, rgba(96, 165, 250,0.14) 45%, transparent 70%)`,
          }}
        />

        {/* second pool, revealed on hover so the glow lifts without any scaling */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[54%] z-[1] size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26)_0%,rgba(96,165,250,0.16)_48%,transparent_72%)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        {/*
          * A violet companion to the blue pools above. Kept low and wide: the
          * brand accent is blue, and this only has to stop the halo reading as
          * one flat colour where the masked edges meet the background.
          */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[52%] z-[1] size-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,111,236,0.16)_0%,rgba(96,165,250,0.10)_45%,transparent_70%)] blur-3xl"
        />

        {/* light beam falling from behind the robot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-[1] h-[78%] w-[48%] -translate-x-1/2 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            background:
              "linear-gradient(to bottom, rgba(147,197,253,0) 0%, rgba(96,165,250,0.20) 46%, rgba(96, 165, 250,0.24) 100%)",
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
            className={`absolute drop-shadow-[0_28px_44px_rgba(5,11,31,0.65)] ${ROBOT_BOX} ${flip}`}
          >
            <Image
              src={ROBOT}
              alt="TechCadd AI robot dog"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 50vw"
              /* No mask: the render is a cutout, so it already has no edge. */
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
