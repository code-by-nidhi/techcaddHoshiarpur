"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { MEGA_COLUMNS, MEGA_FEATURED } from "@/lib/megaMenu";
import { CourseLink, FeaturedCard } from "./MegaMenu";

/**
 * The same catalogue as an accordion, for the hamburger sheet. Only one panel
 * is open at a time so the sheet never grows past a thumb's reach.
 */
export default function MegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState<string | null>(MEGA_COLUMNS[0].id);
  const panels = [
    ...MEGA_COLUMNS.map((c) => ({ id: c.id, title: c.title, courses: c.courses })),
    { id: MEGA_FEATURED.id, title: `Featured: ${MEGA_FEATURED.title}`, courses: null },
  ];

  return (
    <ul className="mt-1 space-y-1.5 rounded-xl bg-white/[0.03] p-2">
      {panels.map((panel) => {
        const isOpen = open === panel.id;

        return (
          <li key={panel.id} className="overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : panel.id)}
              aria-expanded={isOpen}
              aria-controls={`mega-panel-${panel.id}`}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] transition-colors duration-300 ${
                isOpen ? "bg-white/[0.07] text-white" : "text-white/75 hover:bg-white/5"
              }`}
            >
              <span className="min-w-0 truncate font-medium">{panel.title}</span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 text-[#60A5FA]"
              >
                <FiChevronDown className="size-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`mega-panel-${panel.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  {panel.courses ? (
                    /* two columns from the tablet breakpoint up */
                    <ul className="grid grid-cols-1 gap-0.5 px-1 py-2 sm:grid-cols-2">
                      {panel.courses.map((course) => (
                        <li key={course.label}>
                          <CourseLink course={course} onNavigate={onNavigate} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-1 py-2">
                      <FeaturedCard onNavigate={onNavigate} />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
