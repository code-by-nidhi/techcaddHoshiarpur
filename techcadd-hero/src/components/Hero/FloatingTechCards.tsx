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
    <span className="grid size-[30px] place-items-center rounded-[9px] bg-[#1d4ed8]/25 ring-1 ring-[#3b82f6]/50">
      <Icon aria-hidden className="size-4 text-[#60a5fa]" />
    </span>
  );
}

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
            className="flex items-center gap-2.5 rounded-[16px] border border-[#3b82f6]/45 bg-[#070c1c]/75 px-4 py-2.5 shadow-[0_0_26px_-8px_rgba(59,130,246,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-shadow duration-300 hover:border-[#60a5fa]/80 hover:shadow-[0_0_44px_-6px_rgba(59,130,246,1)]"
          >
            <TagIcon icon={tag.icon} />
            <span className="whitespace-nowrap text-[13.5px] font-medium text-white">
              {tag.label}
            </span>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
