"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiMail, FiMapPin, FiMessageCircle, FiPhone } from "react-icons/fi";
import type { IconType } from "react-icons";
import { CONTACT, Shell, fadeUp, phoneDigits, stagger } from "./shared";

const ROWS: { icon: IconType; value: string; href?: string; external?: boolean }[] = [
  { icon: FiPhone, value: CONTACT.phone, href: `tel:${phoneDigits}` },
  { icon: FiMail, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: FiMapPin, value: CONTACT.location },
];

const ACTIONS: { icon: IconType; label: string; href: string; tint: string; glow: string; external?: boolean }[] = [
  {
    icon: FiPhone,
    label: "Call Now",
    href: `tel:${phoneDigits}`,
    tint: "from-[#142C8E] to-[#2563EB]",
    glow: "hover:shadow-[0_22px_50px_-16px_rgba(37,99,235,0.95)]",
  },
  {
    icon: FiMessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${phoneDigits}`,
    external: true,
    tint: "from-[#22C55E] to-[#16A34A]",
    glow: "hover:shadow-[0_22px_50px_-16px_rgba(34,197,94,0.95)]",
  },
  {
    icon: FiMail,
    label: "Email",
    href: `mailto:${CONTACT.email}`,
    tint: "from-[#F59E0B] to-[#EA580C]",
    glow: "hover:shadow-[0_22px_50px_-16px_rgba(234,88,12,0.95)]",
  },
];

/** Deterministic motes, so SSR and the client render the same markup. */
const MOTES = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 43) % 92 + 4}%`,
  top: `${(i * 61) % 88 + 6}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 6 + (i % 4),
  delay: (i % 6) * 0.7,
}));

export default function StudentDesk() {
  const reduced = useReducedMotion();

  return (
    /* carries the white section above down into the tinted lower half */
    <section
      id="book"
      className="relative scroll-mt-28 overflow-x-clip bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_40%,#eef4ff_100%)] py-24 lg:py-28"
    >
      <Shell>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="row g-5 align-items-center"
        >
          {/* photograph */}
          <div className="col-12 col-lg-5">
            <motion.div variants={fadeUp} className="relative mx-auto max-w-[460px] px-3 sm:px-8 lg:px-0">
              {/* blue-purple bloom behind the frame */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.22),transparent_62%),radial-gradient(circle_at_75%_85%,rgba(96,165,250,0.20),transparent_62%)] blur-2xl"
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-[24px] shadow-[0_30px_70px_-34px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.06]">
                <Image
                  src="/images/form.webp"
                  alt="Students working at the machines in a TechCadd lab"
                  fill
                  sizes="(max-width: 991px) 88vw, 38vw"
                  className="object-cover object-center"
                />
              </div>

              {/* floating glass badge */}
              <motion.div
                animate={reduced ? undefined : { y: [0, -9, 0] }}
                transition={reduced ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 left-1/2 z-10 w-[86%] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-[0_22px_50px_-24px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:left-6 sm:w-auto sm:translate-x-0"
              >
                <p className="flex items-center gap-2 text-[13.5px] font-bold tracking-[-0.01em] text-[#0F172A]">
                  <span aria-hidden>🎓</span> Student Support
                </p>
                <p className="mt-0.5 text-[11.5px] text-[#64748B]">Career Guidance &amp; Assistance</p>
              </motion.div>
            </motion.div>
          </div>

          {/* support card */}
          <div className="col-12 col-lg-7">
            <motion.div variants={fadeUp} className="relative mt-8 lg:mt-0">
              {/* gradient orb drifting behind the card */}
              <motion.span
                aria-hidden
                animate={reduced ? undefined : { y: [0, -18, 0], opacity: [0.55, 0.85, 0.55] }}
                transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-8 -top-10 -z-10 size-56 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35)_0%,rgba(96,165,250,0.22)_45%,transparent_70%)] blur-3xl"
              />

              <motion.div
                whileHover={reduced ? undefined : { y: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="group relative rounded-[32px] p-px"
              >
                {/* gradient border glow */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[32px] bg-[linear-gradient(130deg,rgba(37,99,235,0.55),rgba(96,165,250,0.35),rgba(96,165,250,0.55))] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative overflow-hidden rounded-[31px] border border-white/70 bg-white/80 p-7 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35),0_34px_80px_-42px_rgba(37,99,235,0.55)] backdrop-blur-[20px] sm:p-9">
                  {/* glass reflection across the top */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),transparent)]"
                  />

                  {/* particles */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    {MOTES.map((m, i) => (
                      <motion.span
                        key={i}
                        style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
                        animate={reduced ? undefined : { y: [0, -16, 0], opacity: [0.12, 0.5, 0.12] }}
                        transition={{
                          duration: m.duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: m.delay,
                        }}
                        className="absolute rounded-full bg-[#2563EB]/40"
                      />
                    ))}
                  </div>

                  {/* header */}
                  <div className="relative flex items-center gap-4">
                    <span className="relative shrink-0">
                      <span className="grid size-16 place-content-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#22D3EE] font-[family-name:var(--font-sora)] text-[19px] font-extrabold tracking-[-0.02em] text-white shadow-[0_0_0_6px_rgba(37,99,235,0.10),0_18px_40px_-16px_rgba(37,99,235,0.95)] sm:size-[72px] sm:text-[21px]">
                        SD
                      </span>

                      {/* online indicator, with a soft pulse ring */}
                      <span className="absolute bottom-1 right-1 grid size-4 place-content-center">
                        <motion.span
                          aria-hidden
                          animate={reduced ? undefined : { scale: [1, 2.1, 1], opacity: [0.55, 0, 0.55] }}
                          transition={
                            reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeOut" }
                          }
                          className="absolute size-3.5 rounded-full bg-[#22C55E]"
                        />
                        <span className="relative size-3.5 rounded-full border-2 border-white bg-[#22C55E]" />
                      </span>
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-sora)] text-[clamp(1.3rem,2.2vw,1.7rem)] font-extrabold leading-tight tracking-[-0.025em] text-[#0F172A]">
                        Student Desk
                      </h3>
                      <p className="mt-1 text-[14px] font-medium text-[#2563EB]">Student Support</p>
                      <p className="mt-1 text-[12.5px] text-[#64748B]">
                        Available Mon-Sat • 9 AM - 6 PM
                      </p>
                    </div>
                  </div>

                  {/* contact rows */}
                  <ul className="relative mt-7 space-y-2.5">
                    {ROWS.map(({ icon: Icon, value, href }) => {
                      const body = (
                        <>
                          <span className="grid size-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15 transition-transform duration-300 group-hover/row:scale-105">
                            <Icon aria-hidden className="size-[18px] text-[#2563EB]" />
                          </span>
                          <span className="min-w-0 break-words text-[14.5px] font-medium text-[#0F172A] transition-colors duration-300 group-hover/row:text-[#2563EB]">
                            {value}
                          </span>
                        </>
                      );

                      const shell =
                        "group/row flex items-center gap-3.5 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] backdrop-blur-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.6)]";

                      return (
                        <li key={value}>
                          {href ? (
                            <a href={href} className={shell}>
                              {body}
                            </a>
                          ) : (
                            <div className={shell}>{body}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* actions */}
                  <div className="relative mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {ACTIONS.map(({ icon: Icon, label, href, tint, glow, external }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                        className={`group/btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${tint} px-5 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_16px_36px_-18px_rgba(15,23,42,0.8)] transition-shadow duration-300 ${glow}`}
                      >
                        <Icon
                          aria-hidden
                          className="size-4 transition-transform duration-300 group-hover/btn:scale-110"
                        />
                        {label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
