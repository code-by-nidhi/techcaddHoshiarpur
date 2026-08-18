"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { RESOURCES, RESOURCE_CARDS, type ResourceCard } from "@/lib/megaMenu";

export const panelIn: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.07, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
};

/** Deterministic particles — index arithmetic, never Math.random. */
const MOTES = Array.from({ length: 9 }, (_, i) => ({
  left: `${(i * 43) % 90 + 5}%`,
  top: `${(i * 59) % 72 + 12}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 5 + (i % 4),
  delay: (i % 5) * 0.6,
}));

const itemIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Resources mega menu: a rail of destinations on the left, three featured
 * cards on the right.
 *
 * `arrow` is the pointer's offset from the panel's own left edge, in px — the
 * navbar measures it so the tip lands under the Resources item even when the
 * panel has been nudged inward to stay on screen.
 */
export default function MegaMenu({
  arrow,
  onNavigate,
}: {
  arrow: number;
  onNavigate: () => void;
}) {
  const [active, setActive] = useState(RESOURCES[0].id);

  return (
    <motion.div variants={panelIn} initial="hidden" animate="show" exit="exit" className="relative">
      {/* pointer connecting the panel to the nav item */}
      <span
        aria-hidden
        style={{ left: arrow }}
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/10 bg-[#0a1b52]"
      />

      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,#08122f_0%,#0a1b52_35%,#0b1450_65%,#131f68_100%)] shadow-[0_25px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(59,130,246,0.12)] backdrop-blur-[20px]">
        {/* blue gradient accent along the top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.75),transparent)]"
        />
        {/* soft radial highlights + a top reflection, matching the other panels */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_70%)] blur-2xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-28 right-[-6%] size-96 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.2),transparent_70%)] blur-2xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent)]"
        />
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            aria-hidden
            style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
            className="pointer-events-none absolute rounded-full bg-[#93c5fd] shadow-[0_0_8px_2px_rgba(147,197,253,0.5)]"
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
          />
        ))}

        <div className="row g-0">
          {/* rail */}
          <div className="col-12 col-lg-3">
            <motion.ul
              variants={itemIn}
              className="relative h-full border-b border-white/[0.07] bg-[linear-gradient(180deg,rgba(37,99,235,0.16),transparent)] p-4 lg:border-b-0 lg:border-r"
            >
              {RESOURCES.map((item) => {
                const on = item.id === active;
                const Icon = item.icon;

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActive(item.id)}
                      onFocus={() => setActive(item.id)}
                      onClick={onNavigate}
                      className={`group/row mb-1 flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] transition-[background-color,color,transform] duration-300 ${
                        on
                          ? "translate-x-0.5 bg-gradient-to-r from-[#142C8E] to-[#2563EB] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.95)]"
                          : "text-white/80 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      <span
                        className={`grid size-8 shrink-0 place-content-center rounded-xl transition-colors duration-300 ${
                          on ? "bg-white/20 text-white" : "bg-white/[0.08] text-white/70"
                        }`}
                      >
                        <Icon aria-hidden className="size-[15px]" />
                      </span>
                      <span className="min-w-0 truncate">{item.label}</span>
                      <FiArrowRight
                        aria-hidden
                        className={`ml-auto size-3.5 shrink-0 transition-all duration-300 ${
                          on ? "opacity-90" : "-translate-x-1 opacity-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* featured cards */}
          <div className="col-12 col-lg-9">
            <div className="row g-3 p-4 sm:g-4 sm:p-5">
              {RESOURCE_CARDS.map((card) => (
                <div key={card.id} className="col-12 col-md-6 col-xl-4">
                  <FeatureCard card={card} onNavigate={onNavigate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------------- card ----------------------------------- */

export function FeatureCard({
  card,
  onNavigate,
}: {
  card: ResourceCard;
  onNavigate: () => void;
}) {
  return (
    <motion.div variants={itemIn} className="h-full">
      <Link
        href={card.href}
        onClick={onNavigate}
        className="group/card relative flex h-full flex-col rounded-[24px] p-px transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0"
      >
        {/* gradient border glow, lit on hover */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[24px] bg-[linear-gradient(130deg,rgba(37,99,235,0.85),rgba(96,165,250,0.6),rgba(96,165,250,0.85))] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] border border-white/[0.08] bg-white/[0.06] shadow-[0_14px_36px_-26px_rgba(0,0,0,0.7)] backdrop-blur-[16px] transition-shadow duration-500 group-hover/card:shadow-[0_30px_64px_-30px_rgba(37,99,235,0.55)]">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={card.image.src}
              alt={card.image.alt}
              fill
              sizes="(max-width: 767px) 90vw, 300px"
              className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:group-hover/card:scale-100"
            />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center gap-2">
              <h3 className="font-[family-name:var(--font-sora)] text-[15.5px] font-bold tracking-[-0.015em] text-white">
                {card.title}
              </h3>
              <span className="rounded-full bg-[#2563EB]/25 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#93C5FD]">
                {card.badge}
              </span>
            </div>

            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-white/75">{card.copy}</p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#60A5FA]">
              {card.cta}
              <FiArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
