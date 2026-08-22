"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useSite } from "@/lib/cms/site-context";
import { LAUNCH } from "@/lib/site";
import { CTA } from "@/lib/cta";
import { openLeadCapture } from "@/lib/demoBus";
import Reveal from "@/components/UI/Reveal";
import MagneticButton from "@/components/UI/MagneticButton";

const ACTION_ICONS = [ArrowRight, PhoneCall];

export default function LaunchCenter() {
  const site = useSite();
  const reduced = useReducedMotion();

  return (
    <section
      id="launch"
      /*
       * `min-h-[100svh]` was the entire height of this section: the content is
       * only about 310px tall, and the rest was empty ground either side of it,
       * because `items-center` parked it in the middle of a full viewport.
       * Measured at 900px on every width before this change.
       *
       * `section-pad` had to go with it rather than sit alongside `py-*`. Both
       * set padding-block at the same specificity, and `section-pad` is defined
       * after Tailwind's utilities in globals.css, so it would have won and the
       * padding here would have done nothing.
       */
      className="relative overflow-hidden tech-dark py-16 lg:py-20"
    >
      {/* animated field */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="cta-drift absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.34)_0%,rgba(37,99,235,0.18)_45%,transparent_72%)] blur-3xl" />
        <div
          className="cta-drift absolute left-1/2 top-1/2 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22)_0%,transparent_70%)] blur-3xl"
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

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,#101E52_80%)]" />
      </div>

      <div className="mx-auto w-full max-w-[860px] px-6 text-center">
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
          <h2 className="mt-5 font-[family-name:var(--font-poppins)] text-[clamp(1.85rem,3.6vw,3.25rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white">
            Start Building Your
            <br />
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#60A5FA] to-[#60A5FA] bg-clip-text text-transparent">
              Career Today
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#94A3B8]">
            {LAUNCH.sub}
          </p>
        </Reveal>

        {/* actions */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            {LAUNCH.actions.map((a, i) => {
              const Icon = ACTION_ICONS[i];
              /* `CTA.lead` is a sentinel, not a destination: it asks for the
                 shared enquiry dialog. Passing no href is what makes
                 MagneticButton render a real button rather than an anchor. */
              const lead = a.href === CTA.lead;
              /* The data file can only name the built-in number, so the CMS
                 one is substituted here — the same href every other WhatsApp
                 CTA on the site resolves to. */
              const href = a.href === CTA.whatsapp ? site.whatsappLink().href : a.href;
              return (
                <MagneticButton
                  key={a.label}
                  href={lead ? undefined : href}
                  onClick={lead ? () => openLeadCapture("hero") : undefined}
                  {...(!lead && "external" in a && a.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={
                    a.primary
                      ? "group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_48px_-8px_rgba(37, 99, 235,0.95)] transition-shadow duration-300 hover:shadow-[0_0_76px_-6px_rgba(96, 165, 250,1)]"
                      : "group inline-flex items-center gap-2.5 rounded-full border border-white/22 bg-white/[0.04] px-8 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.09]"
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
      </div>
    </section>
  );
}
