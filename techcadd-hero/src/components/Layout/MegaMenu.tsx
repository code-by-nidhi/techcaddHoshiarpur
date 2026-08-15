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
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/80 bg-white/95 backdrop-blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/95 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35),0_50px_100px_-45px_rgba(37,99,235,0.65)] backdrop-blur-2xl">
        {/* blue gradient accent along the top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.75),transparent)]"
        />

        <div className="row g-0">
          {/* rail */}
          <div className="col-12 col-lg-3">
            <motion.ul
              variants={itemIn}
              className="h-full border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(37,99,235,0.05),transparent)] p-4 lg:border-b-0 lg:border-r"
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
                          ? "translate-x-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.95)]"
                          : "text-[#475569] hover:bg-white hover:text-[#0F172A]"
                      }`}
                    >
                      <span
                        className={`grid size-8 shrink-0 place-content-center rounded-xl transition-colors duration-300 ${
                          on ? "bg-white/20 text-white" : "bg-slate-100 text-[#64748B]"
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
          className="absolute inset-0 rounded-[24px] bg-[linear-gradient(130deg,rgba(37,99,235,0.85),rgba(124,58,237,0.6),rgba(56,189,248,0.85))] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] border border-slate-200/80 bg-white/90 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.6)] backdrop-blur-xl transition-shadow duration-500 group-hover/card:shadow-[0_30px_64px_-30px_rgba(37,99,235,0.55)]">
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
              <h3 className="font-[family-name:var(--font-sora)] text-[15.5px] font-bold tracking-[-0.015em] text-[#0F172A]">
                {card.title}
              </h3>
              <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                {card.badge}
              </span>
            </div>

            <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#475569]">{card.copy}</p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#2563EB]">
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
