"use client";

import { motion } from "framer-motion";
import { FiBookOpen, FiBriefcase, FiCompass, FiTarget } from "react-icons/fi";
import type { IconType } from "react-icons";
import { GLASS, SectionTitle, Shell, fadeUp, stagger } from "./shared";

const REASONS: { icon: IconType; title: string; copy: string; tint: string }[] = [
  {
    icon: FiCompass,
    title: "Career Planning",
    copy: "Get the right roadmap based on your goals.",
    tint: "from-[#2563EB] to-[#3B82F6]",
  },
  {
    icon: FiBookOpen,
    title: "Course Selection",
    copy: "Choose the best program for your future.",
    tint: "from-[#6366F1] to-[#8B5CF6]",
  },
  {
    icon: FiBriefcase,
    title: "Placement Guidance",
    copy: "Understand hiring trends and opportunities.",
    tint: "from-[#0EA5E9] to-[#38BDF8]",
  },
  {
    icon: FiTarget,
    title: "Skill Assessment",
    copy: "Know what skills employers expect.",
    tint: "from-[#7C3AED] to-[#C026D3]",
  },
];

export default function WhyCounselling() {
  return (
    <section className="relative py-20 lg:py-28">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            eyebrow="Guidance"
            title="Why Students Choose TechCadd Guidance"
            sub="Four conversations that change what you enrol in — and what you leave with."
          />

          <div className="row g-4 mt-2">
            {REASONS.map(({ icon: Icon, title, copy, tint }) => (
              <div key={title} className="col-12 col-sm-6 col-lg-3">
                <motion.article
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] p-7 transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(37,99,235,0.55)] ${GLASS}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-[#2563EB]/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span
                    className={`relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${tint} shadow-[0_14px_30px_-14px_rgba(37,99,235,0.9)] transition-transform duration-500 group-hover:scale-105`}
                  >
                    <Icon aria-hidden className="size-6 text-white" />
                  </span>

                  <h3 className="relative mt-6 font-[family-name:var(--font-sora)] text-[18px] font-bold leading-snug text-white">
                    {title}
                  </h3>
                  <p className="relative mt-2.5 text-[14px] leading-relaxed text-white/60">{copy}</p>
                </motion.article>
              </div>
            ))}
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
