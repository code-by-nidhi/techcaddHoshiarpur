"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  BarChart3,
  Brain,
  Cloud,
  Layers,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { PythonMark, ReactMark } from "@/components/UI/BrandMarks";
import { COURSE_TAGS, type CourseTag } from "@/lib/content";
import { robotBus } from "@/lib/robotBus";

const LUCIDE: Record<string, LucideIcon> = {
  code: Code2,
  chart: BarChart3,
  brain: Brain,
  cloud: Cloud,
  layers: Layers,
  globe: Globe,
};

function TagIcon({ icon }: { icon: CourseTag["icon"] }) {
  if (icon === "python") return <PythonMark className="size-[22px]" />;
  if (icon === "react") return <ReactMark className="size-[22px]" />;
  const Icon = LUCIDE[icon];
  return (
    <span className="grid size-[30px] place-items-center rounded-[9px] border border-[rgba(120,180,255,0.4)] bg-[rgba(70,140,255,0.18)] shadow-[0_0_14px_-2px_rgba(96,165,250,0.75)]">
      <Icon aria-hidden className="size-4 text-[#bfdbfe]" />
    </span>
  );
}

/*
 * Lit from the hero rather than sitting on it: the fill is a translucent blue
 * rather than near-black, so the background glow reads through the glass
 * instead of being blocked by it.
 */
const CARD =
  "flex items-center gap-2.5 rounded-[16px] border border-[rgba(120,180,255,0.35)] bg-[rgba(35,75,180,0.35)] px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,120,255,0.25),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-[18px] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-[rgba(150,200,255,0.65)] hover:bg-[rgba(45,90,205,0.45)] hover:shadow-[0_14px_44px_rgba(0,140,255,0.45)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 sm:px-4";

/**
 * The orbit. Below `sm` the absolute ring would collide with the robot, so the
 * tags are rendered as a grid underneath the stage instead — see
 * `TechCardsGrid`, which the showcase places below the platform.
 */
export default function FloatingTechCards() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
      {COURSE_TAGS.map((tag, i) => (
        <motion.div
          key={tag.id}
          style={{ left: tag.left, top: tag.top }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5 + i * 0.09,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-auto absolute"
        >
          <motion.button
            type="button"
            aria-label={tag.label}
            onHoverStart={() => robotBus.set({ effect: tag.effect, color: tag.color })}
            onHoverEnd={() => robotBus.set(null)}
            onFocus={() => robotBus.set({ effect: tag.effect, color: tag.color })}
            onBlur={() => robotBus.set(null)}
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tag.delay,
            }}
            whileHover={{ scale: 1.07 }}
            className={CARD}
          >
            <TagIcon icon={tag.icon} />
            <span className="whitespace-nowrap text-[13.5px] font-semibold tracking-[0.01em] text-white">
              {tag.label}
            </span>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

/** Same cards, same styling, laid out as a grid for phones. */
export function TechCardsGrid() {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:hidden">
      {COURSE_TAGS.map((tag, i) => (
        <motion.li
          key={tag.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`${CARD} justify-center px-3 py-2.5`}>
            <TagIcon icon={tag.icon} />
            <span className="truncate text-[12.5px] font-semibold tracking-[0.01em] text-white">{tag.label}</span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
