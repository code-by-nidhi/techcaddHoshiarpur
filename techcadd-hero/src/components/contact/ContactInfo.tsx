"use client";

import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { CONTACT, GLASS, SectionTitle, Shell, fadeUp, phoneDigits, stagger } from "./shared";

const CARDS: { icon: IconType; label: string; value: string; href?: string; tint: string }[] = [
  {
    icon: FiPhone,
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${phoneDigits}`,
    tint: "from-[#2563EB] to-[#3B82F6]",
  },
  {
    icon: FiMail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    tint: "from-[#6366F1] to-[#8B5CF6]",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: CONTACT.location,
    tint: "from-[#0EA5E9] to-[#38BDF8]",
  },
];

const ACTIONS: { icon: IconType; label: string; href: string; tint: string }[] = [
  {
    icon: FiPhone,
    label: "Call Now",
    href: `tel:${phoneDigits}`,
    tint: "from-[#2563EB] to-[#3B82F6]",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: `https://wa.me/${phoneDigits}`,
    tint: "from-[#22C55E] to-[#16A34A]",
  },
  {
    icon: FiMail,
    label: "Email Us",
    href: `mailto:${CONTACT.email}`,
    tint: "from-[#7C3AED] to-[#C026D3]",
  },
];

export default function ContactInfo() {
  return (
    <section className="relative py-20 lg:py-28">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            eyebrow="Reach us"
            title="Get In Touch"
            sub="Call, write, or walk in — whichever suits you."
          />

          <div className="row g-4 mt-2">
            {CARDS.map(({ icon: Icon, label, value, href, tint }) => {
              const inner = (
                <>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[#2563EB]/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    className={`relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${tint} shadow-[0_16px_34px_-14px_rgba(37,99,235,0.95)] transition-transform duration-500 group-hover:scale-105`}
                  >
                    <Icon aria-hidden className="size-7 text-white" />
                  </span>
                  <p className="relative mt-6 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-white/45">
                    {label}
                  </p>
                  <p className="relative mt-2 break-words text-[16px] font-semibold text-white transition-colors duration-300 group-hover:text-[#93C5FD]">
                    {value}
                  </p>
                </>
              );

              return (
                <div key={label} className="col-12 col-md-4">
                  <motion.div
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="relative h-full rounded-[28px]"
                  >
                    {/* gradient border, lit on hover */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br ${tint} opacity-0 transition-opacity duration-500 group-hover:opacity-60`}
                    />

                    {href ? (
                      <a
                        href={href}
                        className={`group relative flex h-full flex-col overflow-hidden rounded-[27px] p-8 transition-shadow duration-500 hover:shadow-[0_30px_64px_-28px_rgba(37,99,235,0.6)] ${GLASS}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        className={`group relative flex h-full flex-col overflow-hidden rounded-[27px] p-8 transition-shadow duration-500 hover:shadow-[0_30px_64px_-28px_rgba(37,99,235,0.6)] ${GLASS}`}
                      >
                        {inner}
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* quick actions */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
            {ACTIONS.map(({ icon: Icon, label, href, tint }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className={`group inline-flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-7 text-[15px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.9)] ${GLASS}`}
              >
                <span
                  className={`grid size-10 place-items-center rounded-full bg-gradient-to-br ${tint} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105`}
                >
                  <Icon aria-hidden className="size-[18px] text-white" />
                </span>
                {label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </Shell>
    </section>
  );
}
