"use client";

import { BADGE } from "@/lib/content";

export default function HeroBadge() {
  return (
    /*
     * Same glass as the floating skill badges: a gradient hairline around a
     * translucent blue fill, so the hero glow reads through it rather than
     * being blocked by a near-black pill.
     */
    <div className="inline-block rounded-full bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#60a5fa]/40 p-px shadow-[0_8px_30px_rgba(0,120,255,0.25)]">
      <div className="rounded-full bg-[rgba(35,75,180,0.35)] px-[26px] py-[11px] backdrop-blur-[18px]">
        <span className="font-[family-name:var(--font-mono-face)] text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/90">
          {BADGE}
        </span>
      </div>
    </div>
  );
}
