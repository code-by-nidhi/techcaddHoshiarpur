"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiLayers } from "react-icons/fi";
import { GLASS, Particles, Shell, fadeUp, stagger } from "./shared";

export default function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-28">
      <Shell>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(120deg,#1E3A8A_0%,#2563EB_38%,#4F46E5_70%,#7C3AED_100%)] px-7 py-16 text-center sm:px-12 lg:px-16 lg:py-20"
          >
            <Particles />

            {/* floating glass shards */}
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { y: [0, -18, 0], rotate: [0, 6, 0] }}
              transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className={`pointer-events-none absolute -left-6 top-10 hidden size-28 rounded-[26px] sm:block ${GLASS}`}
            />
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { y: [0, 16, 0], rotate: [0, -5, 0] }}
              transition={
                reduced ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
              }
              className={`pointer-events-none absolute -right-8 bottom-8 hidden size-36 rounded-[30px] sm:block ${GLASS}`}
            />

            {/* glow pulse */}
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
              transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.35)_0%,transparent_66%)] blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.028em] text-white">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-[1.8] text-white/80">
                Connect with our counsellors today and discover the right career path.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <motion.a
                  href="#book"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-[#0F172A] shadow-[0_16px_40px_-14px_rgba(2,6,23,0.6)]"
                >
                  Book Free Session
                  <FiArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.a>

                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/#programs"
                    className={`group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-white ${GLASS}`}
                  >
                    <FiLayers aria-hidden className="size-4" />
                    Explore Courses
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Shell>
    </section>
  );
}
