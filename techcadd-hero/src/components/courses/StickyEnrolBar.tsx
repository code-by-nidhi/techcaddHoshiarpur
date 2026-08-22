"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiClock, FiPhone } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { useSite } from "@/lib/cms/site-context";


/**
 * Sticky enrolment bar.
 *
 * It appears once the hero's own CTAs have scrolled away and hides again over
 * the closing CTA, so the page never shows two competing enrol buttons at the
 * same moment.
 */
export default function StickyEnrolBar({ course }: { course: Course }) {
  const site = useSite();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const nearBottom = y + window.innerHeight > doc.scrollHeight - 900;
      setShow(y > 700 && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[9000] border-t border-white/10 bg-[#101E52]/95 backdrop-blur-xl"
        >
          <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-5 py-3 sm:px-6 lg:px-8">
            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate font-[family-name:var(--font-sora)] text-[14px] font-bold text-white">
                {course.title}
              </p>
              <p className="mt-0.5 flex items-center gap-3 text-[11.5px] text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <FiClock aria-hidden className="size-3" />
                  {course.duration}
                </span>
                <span aria-hidden>·</span>
                <span>{course.level}</span>
              </p>
            </div>

            <div className="flex flex-1 items-center gap-2.5 sm:flex-initial">
              <a
                {...site.whatsappLink()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/50 sm:flex-initial sm:px-5"
              >
                <FiPhone aria-hidden className="size-3.5" />
                <span className="hidden xs:inline sm:inline">Talk to an Expert</span>
                <span className="xs:hidden sm:hidden">Call</span>
              </a>

              <motion.a
                {...site.whatsappLink()}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(37,99,235,0.95)] sm:flex-initial sm:px-6"
              >
                Enroll Now
                <FiArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
