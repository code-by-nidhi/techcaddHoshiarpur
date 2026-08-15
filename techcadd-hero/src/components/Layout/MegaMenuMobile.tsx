"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { RESOURCES, RESOURCE_CARDS } from "@/lib/megaMenu";

/**
 * The same resources for the hamburger sheet: the rail becomes a touch-sized
 * list, and the three cards stack underneath.
 */
export default function MegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mt-1 space-y-3 rounded-xl bg-white/[0.03] p-2">
      <ul className="space-y-1">
        {RESOURCES.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="group/row flex items-center gap-3 rounded-lg px-3 py-3 text-[13.5px] text-white/80 transition-colors duration-300 hover:bg-white/5 hover:text-white"
              >
                <span className="grid size-7 shrink-0 place-content-center rounded-lg bg-white/[0.06] text-[#93C5FD]">
                  <Icon aria-hidden className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1 truncate font-medium">{item.label}</span>
                <FiArrowRight
                  aria-hidden
                  className="size-3.5 shrink-0 text-[#60A5FA] transition-transform duration-300 group-hover/row:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* stacked cards */}
      <ul className="space-y-2.5 px-1 pb-1">
        {RESOURCE_CARDS.map((card, i) => (
          <motion.li
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={card.href}
              onClick={onNavigate}
              className="flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-2 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.09]"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-[13.5px] font-bold text-white">{card.title}</span>
                  <span className="rounded-full bg-[#2563eb]/25 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#93C5FD]">
                    {card.badge}
                  </span>
                </span>
                <span className="mt-1 block line-clamp-2 text-[11.5px] leading-relaxed text-white/55">
                  {card.copy}
                </span>
              </span>

              <FiArrowRight aria-hidden className="size-4 shrink-0 text-[#60A5FA]" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
