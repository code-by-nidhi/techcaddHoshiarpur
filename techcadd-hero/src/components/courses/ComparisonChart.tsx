"use client";

import { motion } from "framer-motion";
import { FiCheck, FiMinus, FiX } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

/**
 * Comparison against other ways of learning the same material. Deliberately
 * factual: "partial" exists precisely so the other columns are not painted as
 * uniformly worthless, which no reader believes anyway.
 */
function Mark({ value }: { value: boolean | "partial" }) {
  if (value === true) {
    return (
      <span className="mx-auto grid size-7 place-content-center rounded-full bg-[#DCFCE7]" title="Included">
        <FiCheck aria-hidden className="size-4 text-[#15803D]" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="mx-auto grid size-7 place-content-center rounded-full bg-[#FEF3C7]" title="Varies">
        <FiMinus aria-hidden className="size-4 text-[#B45309]" />
        <span className="sr-only">Varies</span>
      </span>
    );
  }
  return (
    <span className="mx-auto grid size-7 place-content-center rounded-full bg-slate-100" title="Not included">
      <FiX aria-hidden className="size-4 text-[#94A3B8]" />
      <span className="sr-only">Not included</span>
    </span>
  );
}

export default function ComparisonChart({ course }: { course: Course }) {
  const { columns, rows } = course.comparison;
  if (!rows.length) return null;

  return (
    <Section>
      <Reveal>
        <SectionHead
          center
          eyebrow="Comparison"
          title="How this compares"
          sub="An honest look at what a structured programme adds over the alternatives. Other options can be excellent — they just leave more of the structure to you."
        />

        {/* the table scrolls inside its own container rather than the page */}
        <motion.div
          variants={fadeUp}
          className="mt-10 overflow-x-auto rounded-[22px] border border-slate-200/80 bg-white shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)]"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">
              {course.title} compared with other ways of learning the same material
            </caption>
            <thead>
              <tr className="border-b border-slate-200">
                <th scope="col" className="px-5 py-4 text-[13px] font-semibold text-[#0F172A]">
                  What you get
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`px-4 py-4 text-center text-[13px] font-semibold ${
                      i === 0 ? "text-[#2563EB]" : "text-[#64748B]"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-b border-slate-100 last:border-0">
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-[13.5px] font-medium text-[#334155]"
                  >
                    {r.feature}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={`${r.feature}-${i}`} className={`px-4 py-3.5 ${i === 0 ? "bg-[#2563EB]/[0.04]" : ""}`}>
                      <Mark value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-4 text-center text-[12px] text-[#94A3B8]">
          Included · Varies by provider · Not included
        </motion.p>
      </Reveal>
    </Section>
  );
}
