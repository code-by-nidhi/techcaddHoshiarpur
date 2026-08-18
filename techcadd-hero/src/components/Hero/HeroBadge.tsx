"use client";

import { BADGE } from "@/lib/content";

export default function HeroBadge() {
  return (
    /* gradient hairline border: 1px gradient wrapper around a dark pill */
    <div className="inline-block rounded-full bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#60a5fa]/40 p-px">
      <div className="rounded-full bg-[#060a16]/95 px-[26px] py-[11px]">
        <span className="font-[family-name:var(--font-mono-face)] text-[11.5px] font-medium uppercase tracking-[0.2em] text-white/85">
          {BADGE}
        </span>
      </div>
    </div>
  );
}
