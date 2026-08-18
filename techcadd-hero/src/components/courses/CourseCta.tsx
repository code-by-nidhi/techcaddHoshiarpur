"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { demoBus } from "@/lib/demoBus";
import type { Course } from "@/lib/courses/types";
import { Reveal, fadeUp } from "./shared";

export default function CourseCta({ course }: { course: Course }) {
  return (
    <section className="relative overflow-x-clip bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <Reveal>
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(125deg,#1E3A8A_0%,#2563EB_45%,#60A5FA_100%)] px-6 py-14 text-center sm:px-12"
          >
            <motion.span
              aria-hidden
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.35)_0%,transparent_66%)] blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight tracking-[-0.025em] text-white">
                Ready to start your learning journey?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-[1.8] text-white/80">
                Build practical skills, work on real projects and take the next step towards your
                career.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3.5">
                <motion.button
                  type="button"
                  onClick={() => demoBus.open()}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-[#0F172A] shadow-[0_16px_40px_-14px_rgba(5,11,31,0.6)]"
                >
                  Enroll in {course.shortTitle ?? course.title}
                  <FiArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>

                <motion.a
                  href="/contact"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/20"
                >
                  <FiPhone aria-hidden className="size-4" />
                  Talk to an Expert
                </motion.a>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
