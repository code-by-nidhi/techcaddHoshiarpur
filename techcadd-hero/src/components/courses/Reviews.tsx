"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

/**
 * Review carousel. One card at a time on phones, three across on desktop —
 * paging by a whole screen rather than a single card, so the arrows always do
 * something visible.
 */
export default function Reviews({ course }: { course: Course }) {
  const [page, setPage] = useState(0);
  const reviews = course.reviews;
  if (!reviews.length) return null;

  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);

  return (
    <Section tint>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="Student voices"
            title="What students say"
            sub={`Reviews from people who completed ${course.title}.`}
          />

          {pages > 1 && (
            <motion.div variants={fadeUp} className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => (p - 1 + pages) % pages)}
                aria-label="Previous reviews"
                className="grid size-10 place-content-center rounded-full border border-slate-200 bg-white text-[#475569] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                <FiChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => (p + 1) % pages)}
                aria-label="Next reviews"
                className="grid size-10 place-content-center rounded-full border border-slate-200 bg-white text-[#475569] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                <FiChevronRight className="size-4" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.ul
              key={page}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((r) => (
                <li
                  key={r.name + r.quote.slice(0, 12)}
                  className="flex h-full flex-col rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)]"
                >
                  <span className="flex gap-0.5" aria-label={`Rated ${r.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        aria-hidden
                        className={`size-4 ${
                          i < r.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </span>

                  <blockquote className="mt-4 flex-1 text-[13.5px] leading-[1.8] text-[#475569]">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <span className="grid size-10 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-[12.5px] font-bold text-white">
                      {r.initials}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-[13.5px] font-semibold text-[#0F172A]">
                        {r.name}
                      </span>
                      <span className="block truncate text-[11.5px] text-[#64748B]">
                        {r.role ? `${r.role} · ` : ""}
                        {r.course}
                      </span>
                    </span>
                  </figcaption>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {pages > 1 && (
          <div className="mt-7 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to review page ${i + 1}`}
                aria-current={i === page}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page ? "w-7 bg-[#2563EB]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}
