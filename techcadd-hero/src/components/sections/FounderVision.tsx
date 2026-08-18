"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiAward, FiCheckCircle } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa6";
import { FOUNDER } from "@/lib/site";

/**
 * Founder's vision, as a testimonial card.
 *
 * The phrase below is highlighted inside the quote when it appears. If the
 * quote is ever rewritten and the phrase no longer matches, the text simply
 * renders plain — no crash, no half-highlighted sentence.
 */
const HIGHLIGHT = "a student's first job is better than the one they imagined";

function withHighlight(quote: string) {
  const at = quote.indexOf(HIGHLIGHT);
  if (at === -1) return <>{quote}</>;

  return (
    <>
      {quote.slice(0, at)}
      <span className="bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] bg-clip-text pr-[0.06em] font-semibold text-transparent">
        {HIGHLIGHT}
      </span>
      {quote.slice(at + HIGHLIGHT.length)}
    </>
  );
}

/** Deterministic particles — no Math.random, so SSR and the client agree. */
const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 43) % 92 + 4}%`,
  top: `${(i * 61) % 86 + 7}%`,
  size: i % 3 === 0 ? 4 : 3,
  duration: 6 + (i % 5),
  delay: (i % 7) * 0.55,
}));

export default function FounderVision() {
  const reduced = useReducedMotion();

  return (
    /* no container here: About supplies the max-width and gutters, and
       nesting a second one doubled the padding on every breakpoint */
    <div className="relative section-pad">
      <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] p-px sm:rounded-[40px]"
        >
          {/* animated gradient border */}
          <motion.span
            aria-hidden
            animate={reduced ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "240% 240%" }}
            className="absolute inset-0 rounded-[32px] bg-[linear-gradient(120deg,rgba(37,99,235,0.45),rgba(37,99,235,0.30),rgba(96,165,250,0.45),rgba(37,99,235,0.45))] sm:rounded-[40px]"
          />

          <div className="relative overflow-hidden rounded-[31px] bg-[linear-gradient(140deg,#F5F8FF_0%,#F6F4FF_45%,#EFF6FF_100%)] px-5 py-7 sm:rounded-[39px] sm:px-8 sm:py-9 lg:px-12 lg:py-11">
            {/* soft glows */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16)_0%,transparent_70%)] blur-3xl" />
              <div className="absolute -bottom-28 -right-20 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.16)_0%,transparent_70%)] blur-3xl" />
            </div>

            {/* decorative curved lines */}
            <svg
              aria-hidden
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 size-full opacity-[0.35]"
            >
              <path
                d="M-20 320 C 140 250, 220 340, 380 250 S 560 150, 640 190"
                fill="none"
                stroke="url(#fv-line)"
                strokeWidth="1.5"
              />
              <path
                d="M-20 80 C 120 20, 260 120, 400 60 S 580 20, 640 60"
                fill="none"
                stroke="url(#fv-line)"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="fv-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* particles */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {MOTES.map((m, i) => (
                <motion.span
                  key={i}
                  style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
                  animate={reduced ? undefined : { y: [0, -14, 0], opacity: [0.15, 0.6, 0.15] }}
                  transition={{
                    duration: m.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: m.delay,
                  }}
                  className="absolute rounded-full bg-[#3B82F6]/50"
                />
              ))}
            </div>

            <div className="row g-4 g-lg-5 align-items-center position-relative">
              {/* founder image */}
              <div className="col-12 col-lg-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="group relative mx-auto max-w-[420px] pb-10 lg:pb-0"
                >
                  {/* radial glow behind the portrait */}
                  <motion.span
                    aria-hidden
                    animate={reduced ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.05, 1] }}
                    transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_35%_30%,rgba(37,99,235,0.30),transparent_62%),radial-gradient(circle_at_75%_80%,rgba(96,165,250,0.28),transparent_62%)] blur-2xl"
                  />

                  {/*
                   * Geometric frame: a 2px gradient border, a diagonal accent
                   * sweeping the lower corner and two corner brackets.
                   *
                   * The cut is drawn rather than clipped on purpose — CSS
                   * clip-path replaces border-radius outright, so a polygon
                   * notch would have cost the 32px corners entirely.
                   */}
                  <div className="relative rounded-[32px] bg-[linear-gradient(135deg,#2563EB,#3B82F6_45%,#60A5FA)] p-[2px] shadow-[0_0_40px_-12px_rgba(59,130,246,0.75),0_30px_70px_-34px_rgba(15,23,42,0.55)]">
                    <div className="relative overflow-hidden rounded-[30px]">
                      <Image
                        src="/images/founder-gaurav.webp"
                        alt="Gaurav, Founder & Director of TechCadd"
                        width={608}
                        height={580}
                        sizes="(max-width: 991px) 88vw, 34vw"
                        className="h-auto w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                      />

                      {/* diagonal accent across the lower-right corner */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-10 -right-16 h-24 w-56 rotate-[-38deg] bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.55),rgba(37,99,235,0.55))] blur-[2px]"
                      />

                      {/* corner brackets */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-4 top-4 size-7 rounded-tl-lg border-l-2 border-t-2 border-white/70"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-4 right-4 size-7 rounded-br-lg border-b-2 border-r-2 border-white/70"
                      />
                    </div>
                  </div>

                  {/* floating badge */}
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -8, 0] }}
                    transition={reduced ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 left-1/2 z-10 w-max -translate-x-1/2 rounded-2xl border border-white/80 bg-white/85 px-5 py-3 shadow-[0_22px_50px_-24px_rgba(15,23,42,0.55)] backdrop-blur-xl lg:left-6 lg:translate-x-0"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_10px_22px_-10px_rgba(37,99,235,0.95)]">
                        <FiAward aria-hidden className="size-4 text-white" />
                      </span>
                      <span className="leading-tight">
                        <span className="block font-[family-name:var(--font-poppins)] text-[13.5px] font-extrabold tracking-[-0.01em] text-[#0F172A]">
                          Founder &amp; Director
                        </span>
                        <span className="mt-0.5 block text-[11.5px] text-[#64748B]">
                          {FOUNDER.role}
                        </span>
                      </span>
                    </span>
                  </motion.div>
                </motion.div>

              </div>

              {/* testimonial card */}
              <div className="col-12 col-lg-7">
                <motion.figure
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  whileHover={reduced ? undefined : { y: -6 }}
                  className="relative m-0 rounded-[26px] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.55)] backdrop-blur-[20px] transition-shadow duration-500 hover:shadow-[0_40px_90px_-40px_rgba(37,99,235,0.45)] sm:p-8 lg:p-10"
                >
                  {/* floating quote mark */}
                  <motion.span
                    aria-hidden
                    animate={reduced ? undefined : { y: [0, -6, 0] }}
                    transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-5 right-6 grid size-12 place-content-center rounded-2xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_16px_36px_-14px_rgba(37,99,235,0.9)] sm:size-14"
                  >
                    <FaQuoteLeft className="size-5 text-white sm:size-6" />
                  </motion.span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/15 bg-white/80 px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-[#2563EB] backdrop-blur-xl">
                    <span aria-hidden className="size-1.5 rounded-full bg-[#2563EB]" />
                    Founder&apos;s Vision
                  </span>

                  <blockquote className="mt-6 font-[family-name:var(--font-poppins)] text-[clamp(1.05rem,2vw,1.6rem)] font-medium leading-[1.65] tracking-[-0.012em] text-[#0F172A]">
                    &ldquo;{withHighlight(FOUNDER.quote)}&rdquo;
                  </blockquote>

                  <div aria-hidden className="mt-7 h-px w-full bg-[linear-gradient(90deg,rgba(37,99,235,0.35),rgba(96,165,250,0.25),transparent)]" />

                  <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className="grid size-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] font-[family-name:var(--font-poppins)] text-[13px] font-extrabold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.95)]">
                      TC
                    </span>

                    <span className="min-w-0 leading-tight">
                      <span className="block text-[15px] font-bold tracking-[-0.01em] text-[#0F172A]">
                        {FOUNDER.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-[#64748B]">
                        {FOUNDER.role}
                      </span>
                    </span>

                    <span className="ms-lg-auto inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/25 bg-[#22C55E]/10 px-3 py-1.5 text-[11.5px] font-semibold text-[#15803D]">
                      <FiCheckCircle aria-hidden className="size-3.5" />
                      Verified Founder
                    </span>
                  </figcaption>
                </motion.figure>
              </div>
            </div>
          </div>
      </motion.div>
    </div>
  );
}
