"use client";

import { motion } from "framer-motion";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import FeatureCards from "./FeatureCards";
import { DESCRIPTION, HEADING } from "@/lib/content";
import { fadeUp, stagger } from "@/lib/motion";

export default function HeroContent() {
  return (
    <motion.div
      variants={stagger(0.12, 0.1)}
      initial="hidden"
      animate="show"
      className="relative z-10 w-full max-w-[680px] lg:max-w-[780px] lg:pr-6"
    >
      <motion.div variants={fadeUp}>
        <HeroBadge />
      </motion.div>

      <motion.h1
        id="hero-heading"
        variants={fadeUp}
        /* 3.5vw keeps the longest line inside the 44% column — the spans cannot
           wrap on lg, so an oversized value pushes them toward the robot */
        className="mt-[40px] font-[family-name:var(--font-sora)] text-[clamp(2.1rem,3.5vw,4.15rem)] font-extrabold leading-[1.09] tracking-[-0.022em] text-white lg:[&>span]:whitespace-nowrap"
      >
        <span className="block">{HEADING.line1}</span>
        <span className="block">{HEADING.line2}</span>
        {/*
          w-max is load-bearing: bg-clip-text only paints glyphs that fall
          inside the element's background box, so any letter overflowing a
          fixed-width box renders transparent — that is the missing "r".
        */}
        <span className="block bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text pr-[0.08em] text-transparent lg:w-max">
          {HEADING.gradient}
        </span>
        <span className="block">{HEADING.line4}</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-[26px] max-w-[560px] text-[clamp(0.95rem,1.05vw,1.05rem)] leading-[1.75] text-gray-400"
      >
        {DESCRIPTION}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-[34px]">
        <HeroButtons />
      </motion.div>

      <motion.div variants={fadeUp} className="mt-[46px]">
        <FeatureCards />
      </motion.div>
    </motion.div>
  );
}
