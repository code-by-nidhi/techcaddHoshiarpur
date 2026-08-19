"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, PhoneCall, Star } from "lucide-react";
import { LAUNCH } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import Counter from "@/components/UI/Counter";
import MagneticButton from "@/components/UI/MagneticButton";

const ACTION_ICONS = [ArrowRight, PhoneCall, Download];

export default function LaunchCenter() {
  const reduced = useReducedMotion();

  return (
    <section
      id="launch"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#050B1F] section-pad"
    >
      {/* animated field */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="cta-drift absolute left-1/2 top-1/2 size-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.34)_0%,rgba(37,99,235,0.18)_45%,transparent_72%)] blur-3xl" />
        <div
          className="cta-drift absolute left-1/2 top-1/2 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22)_0%,transparent_70%)] blur-3xl"
          style={{ animationDelay: "-9s" }}
        />

        {/* floating particles */}
        {!reduced &&
          Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-1 rounded-full bg-[#93c5fd]/60"
              style={{ left: `${(i * 43) % 100}%`, top: `${(i * 67) % 100}%` }}
              animate={{ y: [0, -40, 0], opacity: [0.15, 0.75, 0.15] }}
              transition={{ duration: 6 + (i % 6), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,#050B1F_80%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#60A5FA] opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#60A5FA]" />
            </span>
            Career launch center
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 font-[family-name:var(--font-poppins)] text-[clamp(2.3rem,5.4vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
            Start Building Your
            <br />
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#60A5FA] to-[#60A5FA] bg-clip-text text-transparent">
              Career Today
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/40">
            {LAUNCH.sub}
          </p>
        </Reveal>

        {/* actions */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {LAUNCH.actions.map((a, i) => {
              const Icon = ACTION_ICONS[i];
              return (
                <MagneticButton
                  key={a.label}
                  href={a.href}
                  className={
                    a.primary
                      ? "group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] px-9 py-4 text-[15.5px] font-semibold text-white shadow-[0_0_48px_-8px_rgba(37, 99, 235,0.95)] transition-shadow duration-300 hover:shadow-[0_0_76px_-6px_rgba(96, 165, 250,1)]"
                      : "group inline-flex items-center gap-2.5 rounded-full border border-white/22 bg-white/[0.04] px-9 py-4 text-[15.5px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.09]"
                  }
                >
                  {a.label}
                  <Icon
                    aria-hidden
                    className="size-[18px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </MagneticButton>
              );
            })}
          </div>
        </Reveal>

        {/* live metrics */}
        <Reveal delay={0.26}>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
            <div className="text-center">
              <p className="font-[family-name:var(--font-poppins)] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-none text-white">
                <Counter to={15} suffix="K+" />
              </p>
              <p className="mt-2 text-[13px] text-white/40">Students</p>
            </div>
            <div className="border-x border-white/10 text-center">
              <p className="font-[family-name:var(--font-poppins)] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-none text-white">
                <Counter to={750} suffix="+" />
              </p>
              <p className="mt-2 text-[13px] text-white/40">Reviews</p>
            </div>
            <div className="text-center">
              <p className="flex items-center justify-center gap-1.5 font-[family-name:var(--font-poppins)] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-none text-white">
                4.9
                <Star aria-hidden className="size-5 fill-[#F59E0B] text-[#F59E0B]" />
              </p>
              <p className="mt-2 text-[13px] text-white/40">Rating</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
