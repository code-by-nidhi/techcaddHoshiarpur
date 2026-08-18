"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiZap } from "react-icons/fi";
import { COURSE_MENU, MENU_FEATURED } from "@/lib/coursesMenu";

/**
 * The same catalogue as a touch-friendly accordion for the hamburger sheet.
 * One category open at a time, so the sheet stays within a thumb's reach.
 */
export default function CoursesMegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState<string | null>(COURSE_MENU[0].id);

  return (
    <div className="mt-1 space-y-2 rounded-xl bg-white/[0.03] p-2">
      <ul className="space-y-1.5">
        {COURSE_MENU.map((cat) => {
          const isOpen = open === cat.id;

          return (
            <li key={cat.id} className="overflow-hidden rounded-lg">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cat.id)}
                aria-expanded={isOpen}
                aria-controls={`course-cat-${cat.id}`}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13.5px] transition-colors duration-300 ${
                  isOpen ? "bg-white/[0.07] text-white" : "text-white/75 hover:bg-white/5"
                }`}
              >
                <span aria-hidden className="text-[15px]">
                  {cat.emoji}
                </span>
                <span className="min-w-0 flex-1 truncate font-semibold uppercase tracking-[0.1em] text-[11.5px]">
                  {cat.heading}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-[#60a5fa]"
                >
                  <FiChevronDown className="size-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    id={`course-cat-${cat.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden px-1 pb-2"
                  >
                    {cat.courses.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          onClick={onNavigate}
                          className="flex min-h-[52px] w-full items-center gap-2 rounded-[14px] px-3.5 py-3 text-[15px] text-white/75 transition-colors duration-300 hover:bg-[#3b82f6]/[0.12] hover:text-white"
                        >
                          <span className="min-w-0 truncate">{c.label}</span>
                          {c.trending && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-2 py-[3px] text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                              <FiZap aria-hidden className="size-2.5" />
                              Trending
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <Link
        href={MENU_FEATURED.cta.href}
        onClick={onNavigate}
        className="group/cta flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-5 py-3 text-[13.5px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(37,99,235,0.9)]"
      >
        {MENU_FEATURED.cta.label}
        <FiArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1"
        />
      </Link>
    </div>
  );
}
