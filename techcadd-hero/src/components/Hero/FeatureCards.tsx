"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/content";
import { stagger, fadeUp } from "@/lib/motion";

export default function FeatureCards() {
  return (
    <motion.ul
      variants={stagger(0.05, 0.09)}
      initial="hidden"
      animate="show"
      /* a grid rather than flex-wrap: wrapping used to strand a divider in the
         middle of a row, and even columns keep the three labels aligned */
      className="grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-y-0"
    >
      {FEATURES.map(({ icon: Icon, line1, line2 }, i) => (
        <motion.li
          key={line1}
          variants={fadeUp}
          className={`group flex min-w-0 items-center gap-3.5 ${
            i > 0 ? "sm:border-l sm:border-white/10 sm:pl-[22px]" : ""
          } ${i < FEATURES.length - 1 ? "sm:pr-[22px]" : ""}`}
        >
          <span className="grid size-[46px] shrink-0 place-items-center rounded-[14px] border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-blue-400/40 group-hover:shadow-[0_0_22px_-4px_rgba(59,130,246,0.8)]">
            <Icon
              aria-hidden
              className="size-[19px] text-[#60a5fa] drop-shadow-[0_0_6px_rgba(96,165,250,0.85)]"
            />
          </span>
          <span className="text-[13.5px] leading-[1.35] text-white/85">
            <span className="block whitespace-nowrap">{line1}</span>
            <span className="block whitespace-nowrap">{line2}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
