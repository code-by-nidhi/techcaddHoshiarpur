"use client";

import Reveal from "./Reveal";

/**
 * Works on both the dark sections and the light ones — pass tone="light"
 * when the section sits on white.
 */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-block rounded-full px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.18em] ${
              light
                ? "border border-[#2563EB]/20 bg-[#2563EB]/8 text-[#2563EB]"
                : "border border-[#2563EB]/40 bg-[#2563EB]/10 text-[#93c5fd]"
            }`}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          className={`mt-5 font-[family-name:var(--font-sora)] text-[clamp(1.9rem,3.4vw,3.1rem)] font-extrabold leading-[1.1] tracking-[-0.02em] ${
            light ? "text-white" : "text-white"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {sub && (
        <Reveal delay={0.12}>
          <p
            className={`mt-4 text-[15px] leading-relaxed ${light ? "text-white/65" : "text-white/40"} ${
              centered ? "mx-auto max-w-2xl" : ""
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
