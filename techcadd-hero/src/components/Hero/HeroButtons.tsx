"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <motion.a
        href="#courses"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
        className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] px-[34px] py-[17px] text-[15.5px] font-semibold text-white shadow-[0_0_38px_-6px_rgba(99,102,241,0.9)] transition-shadow duration-300 hover:shadow-[0_0_60px_-4px_rgba(139,92,246,1)]"
      >
        Explore Courses
        <ArrowRight
          aria-hidden
          className="size-[18px] transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.a>

      <motion.a
        href="#demo"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
        className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.03] px-[34px] py-[17px] text-[15.5px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.07] hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.5)]"
      >
        Book Free Demo
      </motion.a>
    </div>
  );
}
