"use client";

import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useSite } from "@/lib/cms/site-context";
import { LIGHT_GLASS, SectionTitle, Shell, fadeUp, stagger } from "./shared";
import { MAPS_HREF } from "@/lib/cta";

type Card = { icon: IconType; label: string; value: string; href?: string; tint: string };
type Action = { icon: IconType; label: string; href: string; tint: string };

export default function ContactInfo() {
  /* Built inside the component rather than at module scope: the details are
     CMS content now, so they are not known until render. */
  const site = useSite();
  const { phone, phoneDigits, email, address } = site;

  const CARDS: Card[] = [
    {
      icon: FiPhone,
      label: "Phone",
      value: phone,
      href: `tel:+${phoneDigits}`,
      tint: "from-[#142C8E] to-[#2563EB]",
    },
    {
      icon: FiMail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      tint: "from-[#3B82F6] to-[#60A5FA]",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: address,
      /* the whole card is the link — see the `href ? <a>` branch below */
      href: MAPS_HREF,
      tint: "from-[#3B82F6] to-[#60A5FA]",
    },
  ];

  const ACTIONS: Action[] = [
    {
      icon: FiPhone,
      label: "Call Now",
      href: `tel:+${phoneDigits}`,
      tint: "from-[#142C8E] to-[#2563EB]",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: site.whatsappLink().href,
      tint: "from-[#22C55E] to-[#16A34A]",
    },
    {
      icon: FiMail,
      label: "Email Us",
      href: `mailto:${email}`,
      tint: "from-[#60A5FA] to-[#1D4ED8]",
    },
  ];

  return (
    <section className="relative bg-[#EEF4FF] py-24 lg:py-28">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            tone="light"
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
                    className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[#2563EB]/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    className={`relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${tint} shadow-[0_16px_34px_-14px_rgba(37,99,235,0.95)] transition-transform duration-500 group-hover:scale-105`}
                  >
                    <Icon aria-hidden className="size-7 text-white" />
                  </span>
                  <p className="relative mt-6 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
                    {label}
                  </p>
                  <p className="relative mt-2 break-words text-[16px] font-semibold text-[#0F172A] transition-colors duration-300 group-hover:text-[#2563EB]">
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
                        {...(href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={`group relative flex h-full flex-col overflow-hidden rounded-[27px] p-8 transition-shadow duration-500 hover:shadow-[0_34px_70px_-32px_rgba(37,99,235,0.45)] ${LIGHT_GLASS}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        className={`group relative flex h-full flex-col overflow-hidden rounded-[27px] p-8 transition-shadow duration-500 hover:shadow-[0_34px_70px_-32px_rgba(37,99,235,0.45)] ${LIGHT_GLASS}`}
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
                /* noopener as well as noreferrer: without it the opened tab
                   gets a handle on window.opener and can navigate this one. */
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className={`group inline-flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-7 text-[15px] font-semibold text-[#0F172A] transition-shadow duration-300 hover:shadow-[0_18px_44px_-16px_rgba(37,99,235,0.55)] ${LIGHT_GLASS}`}
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
