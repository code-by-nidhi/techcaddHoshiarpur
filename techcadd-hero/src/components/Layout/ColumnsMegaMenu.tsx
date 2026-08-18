"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight, FiChevronRight, FiZap } from "react-icons/fi";
import type { ColumnsMenu } from "@/lib/internshipMenu";
import styles from "./WideMegaMenu.module.css";

/*
 * Three columns of links over a feature strip — the shape Internship &
 * Training and After 12th both use. One component driven by data rather than
 * two near-identical files, so a change to the hover or badge behaviour lands
 * in both menus at once.
 *
 * Shares WideMegaMenu.module.css with the AI panel, so the glass, separators
 * and link behaviour stay identical across all three.
 */

const panelIn: Variants = {
  hidden: { opacity: 0, y: -15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function ColumnsMegaMenu({
  menu,
  arrow,
  onNavigate,
}: {
  menu: ColumnsMenu;
  arrow: number;
  onNavigate: () => void;
}) {
  const { columns, strip } = menu;
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

        <div className={styles.body}>
          <div className={styles.grid}>
            {columns.map((col) => (
              <motion.div key={col.id} variants={itemIn} className={styles.col}>
                <p className={styles.heading}>{col.heading}</p>
                <p className={styles.headingSub}>{col.description}</p>

                <ul className={`${styles.list} mt-3`}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
                      >
                        <span className={styles.linkLabel}>{link.label}</span>
                        {link.trending && (
                          <span className={styles.badge}>
                            <FiZap aria-hidden size={9} />
                            Trending
                          </span>
                        )}
                        <FiChevronRight aria-hidden size={13} className={styles.chev} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ---------------------------- feature strip ---------------------- */}
          <motion.div variants={itemIn} className={styles.strip}>
            <span aria-hidden className={styles.watermark}>
              {strip.watermark}
            </span>

            <p className={styles.quote}>&ldquo;{strip.quote}&rdquo;</p>

            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
              <Link href={strip.href} onClick={onNavigate} className={styles.button}>
                {strip.cta}
                <FiArrowRight aria-hidden size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/** Accordion body for the hamburger sheet — the three columns, stacked. */
export function ColumnsMegaMenuMobile({
  menu,
  onNavigate,
}: {
  menu: ColumnsMenu;
  onNavigate: () => void;
}) {
  const { columns, strip } = menu;
  const pathname = usePathname();

  return (
    <div className="grid gap-3 px-1">
      {columns.map((col) => (
        <div key={col.id}>
          <span className={styles.eyebrow}>{col.heading}</span>
          <ul className={styles.list}>
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  {link.trending && (
                    <span className={styles.badge}>
                      <FiZap aria-hidden size={9} />
                      Trending
                    </span>
                  )}
                  <FiChevronRight aria-hidden size={13} className={styles.chev} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link href={strip.href} onClick={onNavigate} className={`${styles.button} justify-center`}>
        {strip.cta}
        <FiArrowRight aria-hidden size={14} />
      </Link>
    </div>
  );
}
