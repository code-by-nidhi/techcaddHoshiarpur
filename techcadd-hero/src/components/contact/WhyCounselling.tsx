"use client";

import { motion } from "framer-motion";
import { FiBookOpen, FiBriefcase, FiCompass, FiTarget } from "react-icons/fi";
import type { IconType } from "react-icons";
import { LIGHT_GLASS, SectionTitle, Shell, fadeUp, stagger } from "./shared";

const REASONS: { icon: IconType; title: string; copy: string; tint: string }[] = [
  {
    icon: FiCompass,
    title: "Career Planning",
    copy: "Get the right roadmap based on your goals.",
    tint: "from-[#142C8E] to-[#2563EB]",
  },
  {
    icon: FiBookOpen,
    title: "Course Selection",
    copy: "Choose the best program for your future.",
    tint: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    icon: FiBriefcase,
    title: "Placement Guidance",
    copy: "Understand hiring trends and opportunities.",
    tint: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    icon: FiTarget,
    title: "Skill Assessment",
    copy: "Know what skills employers expect.",
    tint: "from-[#60A5FA] to-[#C026D3]",
  },
];

export default function WhyCounselling() {
  return (
    /* carries the white form section down into the tinted lower half */
    <section className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_40%,#eef4ff_100%)] py-24 lg:py-32">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            tone="light"
            title="Why Students Choose TechCadd Guidance"
            sub="Four conversations that change what you enrol in — and what you leave with."
          />

          <div className="row g-4 mt-4">
            {REASONS.map(({ icon: Icon, title, copy, tint }) => (
              <div key={title} className="col-12 col-sm-6 col-lg-3">
                <motion.article
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] p-7 transition-shadow duration-500 hover:shadow-[0_34px_70px_-34px_rgba(37,99,235,0.45)] ${LIGHT_GLASS}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-[#2563EB]/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="relative">
                    {/* glow pooling under the icon */}
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tint} opacity-45 blur-lg transition-opacity duration-500 group-hover:opacity-80`}
                    />
                    <span
                      className={`relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${tint} shadow-[0_14px_30px_-14px_rgba(37,99,235,0.9)] transition-transform duration-500 group-hover:scale-105`}
                    >
                      <Icon aria-hidden className="size-6 text-white" />
                    </span>
                  </span>

                  <h3 className="relative mt-6 font-[family-name:var(--font-sora)] text-[18px] font-bold leading-snug text-[#0F172A]">
                    {title}
                  </h3>
                  <p className="relative mt-2.5 text-[14px] leading-relaxed text-[#475569]">{copy}</p>
                </motion.article>
              </div>
            ))}
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
