"use client";

import { motion } from "framer-motion";
import { FiAward, FiHome, FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons";
import { LIGHT_GLASS, SectionTitle, Shell, fadeUp, stagger } from "./shared";

const DESKS: { icon: IconType; title: string; copy: string; tint: string }[] = [
  {
    icon: FiUsers,
    title: "Student Support",
    copy: "Academic guidance and career counselling",
    tint: "from-[#2563EB] to-[#3B82F6]",
  },
  {
    icon: FiHome,
    title: "College Support",
    copy: "Institution partnerships and collaborations",
    tint: "from-[#6366F1] to-[#8B5CF6]",
  },
  {
    icon: FiAward,
    title: "Placement Support",
    copy: "Internship and placement assistance",
    tint: "from-[#0EA5E9] to-[#38BDF8]",
  },
];

export default function SupportHub() {
  return (
    /* carries the white form section down into the tinted lower half */
    <section className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_40%,#eef4ff_100%)] py-24 lg:py-28">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            tone="light"
            eyebrow="Support"
            title="Support & Assistance"
            sub="Three desks, each answering a different kind of question."
          />

          <div className="row g-4 mt-2">
            {DESKS.map(({ icon: Icon, title, copy, tint }) => (
              <div key={title} className="col-12 col-md-4">
                <motion.article
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] p-8 transition-shadow duration-500 hover:shadow-[0_34px_70px_-32px_rgba(37,99,235,0.45)] ${LIGHT_GLASS}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 -top-16 h-32 rounded-full bg-[#3B82F6]/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span
                    className={`relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${tint} shadow-[0_14px_30px_-14px_rgba(37,99,235,0.9)] transition-transform duration-500 group-hover:scale-105`}
                  >
                    <Icon aria-hidden className="size-6 text-white" />
                  </span>

                  <h3 className="relative mt-6 font-[family-name:var(--font-sora)] text-[19px] font-bold leading-snug text-[#0F172A]">
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
