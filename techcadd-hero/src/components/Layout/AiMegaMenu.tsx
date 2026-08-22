"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight, FiChevronRight, FiCode, FiCpu } from "react-icons/fi";
import { AI_MENU } from "@/lib/aiMenu";
import styles from "./WideMegaMenu.module.css";
import ai from "./AiMegaMenu.module.css";

/*
 * The AI panel: learning paths, a featured course, and a gradient CTA.
 *
 * Layout still comes from WideMegaMenu.module.css, shared with the Internship
 * and Courses panels — three menus open from the same bar and their columns,
 * breakpoints and card heights have to stay in step. The skin comes from
 * AiMegaMenu.module.css, which is this panel's alone: the shared sheet is
 * light, and repainting it here would have dragged two other menus with it.
 * Every styled element therefore carries both classes.
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

/**
 * The round icon that heads each list. Decorative — by position, not by name,
 * so the two section titles stay exactly the strings the menu data holds.
 */
const SECTION_ICONS = [FiCpu, FiCode];

function SectionHeading({ title, index }: { title: string; index: number }) {
  const Icon = SECTION_ICONS[index % SECTION_ICONS.length];
  return (
    <span className={ai.sectionHead}>
      <span aria-hidden className={ai.sectionIcon}>
        <Icon size={13} />
      </span>
      <span className={`${styles.eyebrow} ${styles.eyebrowFlush} ${ai.eyebrow}`}>{title}</span>
    </span>
  );
}

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
    <motion.div
      variants={panelIn}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`relative ${ai.root}`}
    >
      {/* the pointer picks up the top-left stop of the panel gradient */}
      <span
        aria-hidden
        style={{ left: arrow }}
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/12 bg-[#1E2A78]"
      />

      <div className={`${styles.panel} ${ai.panel}`}>
        <span aria-hidden className={ai.tint} />
        <span aria-hidden className={ai.reflection} />
        <span aria-hidden className={ai.edgeGlow} />
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            aria-hidden
            className={`${styles.mote} ${ai.mote}`}
            style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
          />
        ))}

        <div className={`${styles.body} ${ai.body}`}>
          <div className={`${styles.aiGrid} ${ai.grid}`}>
            {/* -------------------------- learning paths ------------------- */}
            <motion.div variants={itemIn} className={styles.col}>
              <p className={`${styles.heading} ${ai.heading}`}>{heading}</p>
              <p className={`${styles.headingSub} ${ai.headingSub}`}>{subheading}</p>

              <div className={styles.aiSections}>
                {sections.map((section, si) => (
                  <div key={section.title} className={ai.group}>
                    <SectionHeading title={section.title} index={si} />
                    <ul className={styles.listTight}>
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            aria-current={pathname === link.href ? "page" : undefined}
                            className={`${styles.link} ${ai.link} ${
                              pathname === link.href ? `${styles.linkActive} ${ai.linkActive}` : ""
                            }`}
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
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-full">
                <Link href={featured.href} onClick={onNavigate} className={`${styles.featured} ${ai.featured}`}>
                  <span className={`${styles.featuredShot} ${ai.featuredShot}`}>
                    <Image
                      src={featured.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#1E2A78] to-[#2A56D4] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_18px_-4px_rgba(125,183,255,1)]">
                      {featured.badge}
                    </span>
                  </span>

                  <span className={`${styles.featuredBody} ${ai.featuredBody}`}>
                    <span className={`${styles.featuredTitle} ${ai.featuredTitle}`}>{featured.title}</span>
                    <span className={`${styles.featuredCopy} ${ai.featuredCopy}`}>{featured.description}</span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* ------------------------------ cta --------------------------- */}
            <motion.div variants={itemIn} className={styles.aiCard}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-full">
                <div className={`${styles.cta} ${ai.cta}`}>
                  <p className={`${styles.ctaCopy} ${ai.ctaCopy}`}>{panel.copy}</p>
                  <Link href={panel.href} onClick={onNavigate} className={`${styles.button} ${ai.button}`}>
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

/**
 * Accordion body for the hamburger sheet — the three columns, stacked.
 *
 * It carries the same skin: the sheet behind it is the navy #101E52 shell, so
 * the shared sheet's near-black link colour was all but invisible there.
 */
export function AiMegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const { sections, featured, panel } = AI_MENU;
  const pathname = usePathname();

  return (
    <div className={`grid gap-3 px-1 ${ai.root}`}>
      {sections.map((section, si) => (
        <div key={section.title} className={ai.group}>
          <SectionHeading title={section.title} index={si} />
          <ul className={styles.list}>
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`${styles.link} ${ai.link} ${
                    pathname === link.href ? `${styles.linkActive} ${ai.linkActive}` : ""
                  }`}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  <FiChevronRight aria-hidden size={13} className={styles.chev} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link href={featured.href} onClick={onNavigate} className={`${styles.featured} ${ai.featured}`}>
        <span className={`${styles.featuredShot} ${ai.featuredShot}`}>
          <Image src={featured.image} alt="" aria-hidden fill sizes="90vw" className="object-cover" />
        </span>
        <span className={`${styles.featuredBody} ${ai.featuredBody}`}>
          <span className={`${styles.featuredTitle} ${ai.featuredTitle}`}>{featured.title}</span>
        </span>
      </Link>

      <Link
        href={panel.href}
        onClick={onNavigate}
        /* drawer-cta: white type on its gradient inside the white mobile sheet */
        className={`drawer-cta ${styles.button} ${ai.button} justify-center transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0`}
      >
        {panel.cta}
        <FiArrowRight aria-hidden size={14} />
      </Link>
    </div>
  );
}
