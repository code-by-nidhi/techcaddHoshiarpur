"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { AI_MENU } from "@/lib/aiMenu";
import styles from "./WideMegaMenu.module.css";

/*
 * The AI panel: learning paths, a featured course, and a gradient CTA.
 *
 * Layout and glass come from WideMegaMenu.module.css, shared with the
 * Internship panel — three menus open from the same bar and have to read as
 * one system.
 */

const panelIn: Variants = {
  hidden: { opacity: 0, y: -15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.045, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/** Deterministic — index arithmetic, so SSR and the client agree. */
const MOTES = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 41) % 88 + 6}%`,
  top: `${(i * 57) % 70 + 14}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 5 + (i % 4),
  delay: (i % 5) * 0.6,
}));

export default function AiMegaMenu({
  arrow,
  onNavigate,
}: {
  arrow: number;
  onNavigate: () => void;
}) {
  const { heading, subheading, sections, featured, panel } = AI_MENU;
  const pathname = usePathname();

  return (
    <motion.div variants={panelIn} initial="hidden" animate="show" exit="exit" className="relative">
      <span
        aria-hidden
        style={{ left: arrow }}
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/10 bg-[rgba(8,15,40,0.97)]"
      />

      <div className={styles.panel}>
        <span aria-hidden className={styles.tint} />
        <span aria-hidden className={styles.reflection} />
        <span aria-hidden className={styles.edgeGlow} />
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            aria-hidden
            className={styles.mote}
            style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
          />
        ))}

        <div className={styles.body}>
          <div className={styles.aiGrid}>
            {/* -------------------------- learning paths ------------------- */}
            <motion.div variants={itemIn} className={styles.col}>
              <p className={styles.heading}>{heading}</p>
              <p className={styles.headingSub}>{subheading}</p>

              <div className={styles.aiSections}>
                {sections.map((section) => (
                  <div key={section.title}>
                    <span className={`${styles.eyebrow} ${styles.eyebrowFlush}`}>
                      {section.title}
                    </span>
                    <ul className={styles.listTight}>
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            aria-current={pathname === link.href ? "page" : undefined}
                            className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
                          >
                            <span className={styles.linkLabel}>{link.label}</span>
                            <FiChevronRight aria-hidden size={13} className={styles.chev} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ---------------------------- featured ------------------------ */}
            <motion.div variants={itemIn} className={styles.aiCard}>
              <motion.div whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.25 }} className="h-full">
                <Link href={featured.href} onClick={onNavigate} className={styles.featured}>
                  <span className={styles.featuredShot}>
                    <Image
                      src={featured.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_18px_-4px_rgba(96,165,250,1)]">
                      {featured.badge}
                    </span>
                  </span>

                  <span className={styles.featuredBody}>
                    <span className={styles.featuredTitle}>{featured.title}</span>
                    <span className={styles.featuredCopy}>{featured.description}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#60a5fa]">
                      {featured.cta}
                      <FiArrowRight aria-hidden size={13} />
                    </span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* ------------------------------ cta --------------------------- */}
            <motion.div variants={itemIn} className={styles.aiCard}>
              <motion.div whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.25 }} className="h-full">
                <div className={styles.cta}>
                  <p className={styles.ctaCopy}>{panel.copy}</p>
                  <Link href={panel.href} onClick={onNavigate} className={styles.button}>
                    {panel.cta}
                    <FiArrowRight aria-hidden size={14} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Accordion body for the hamburger sheet — the three columns, stacked. */
export function AiMegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const { sections, featured, panel } = AI_MENU;
  const pathname = usePathname();

  return (
    <div className="grid gap-3 px-1">
      {sections.map((section) => (
        <div key={section.title}>
          <span className={styles.eyebrow}>{section.title}</span>
          <ul className={styles.list}>
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  <FiChevronRight aria-hidden size={13} className={styles.chev} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link href={featured.href} onClick={onNavigate} className={styles.featured}>
        <span className={styles.featuredShot}>
          <Image src={featured.image} alt="" aria-hidden fill sizes="90vw" className="object-cover" />
        </span>
        <span className={styles.featuredBody}>
          <span className={styles.featuredTitle}>{featured.title}</span>
        </span>
      </Link>

      <Link href={panel.href} onClick={onNavigate} className={`${styles.button} justify-center`}>
        {panel.cta}
        <FiArrowRight aria-hidden size={14} />
      </Link>
    </div>
  );
}
