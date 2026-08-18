"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiCheck, FiPhone } from "react-icons/fi";
import {
  Ambience, CONTACT, Eyebrow, GLASS, Particles, Shell, fadeUp, phoneDigits, stagger,
} from "./shared";

const PROOF = [
  "25,000+ Students Guided",
  "100+ Hiring Partners",
  "95% Placement Assistance",
  "Career Experts Available",
];

export default function ContactHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#020817] pb-24 pt-[132px] lg:pb-32 lg:pt-[168px]">
      <Ambience />
      <Particles />

      <Shell>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="row g-5 align-items-center"
        >
          {/* copy */}
          <div className="col-12 col-lg-6">
            <motion.div variants={fadeUp}>
              <Eyebrow>Career Guidance</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 font-[family-name:var(--font-sora)] text-[clamp(2.2rem,4.2vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.028em] text-white"
            >
              Let&apos;s Build Your{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#3B82F6] to-[#60A5FA] bg-clip-text pr-[0.08em] text-transparent">
                Career Path
              </span>{" "}
              Together
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[15.5px] leading-[1.85] text-white/65"
            >
              Speak with our expert counsellors and get personalized guidance on courses,
              placements, internships, certifications, and career opportunities.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3.5">
              <motion.a
                href="#book"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_0_36px_-8px_rgba(37,99,235,0.95)] transition-shadow duration-300 hover:shadow-[0_0_54px_-6px_rgba(59,130,246,1)]"
              >
                Book Free Counselling
                <FiArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                href={`tel:${phoneDigits}`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className={`inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:border-[#60A5FA]/60 ${GLASS}`}
              >
                <FiPhone aria-hidden className="size-4 text-[#93C5FD]" />
                Call Now
              </motion.a>
            </motion.div>
          </div>

          {/* floating proof card */}
          <div className="col-12 col-lg-6">
            <motion.div variants={fadeUp} className="relative mx-auto max-w-[520px] lg:ml-auto lg:mr-0">
              {/* glow pools behind the card */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.35),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(96,165,250,0.28),transparent_62%)] blur-2xl"
              />

              <motion.div
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* animated gradient border */}
                <motion.span
                  aria-hidden
                  animate={reduced ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "220% 220%" }}
                  className="absolute -inset-px rounded-[30px] bg-[linear-gradient(120deg,rgba(96,165,250,0.9),rgba(96,165,250,0.7),rgba(96,165,250,0.9),rgba(96,165,250,0.9))] opacity-70"
                />

                <div className={`relative rounded-[29px] p-8 sm:p-10 ${GLASS}`}>
                  <p className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#93C5FD]">
                    Why students trust us
                  </p>

                  <ul className="mt-7 space-y-4">
                    {PROOF.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3.5"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_8px_20px_-8px_rgba(37,99,235,0.9)]">
                          <FiCheck aria-hidden className="size-4 text-white" />
                        </span>
                        <span className="text-[15px] font-medium text-white/90">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-[13px] leading-relaxed text-white/50">
                      Counsellors reply within the hour on{" "}
                      <a href={`tel:${phoneDigits}`} className="font-semibold text-[#93C5FD]">
                        {CONTACT.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
