"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import type { NavMenuItem } from "@/lib/navMenus";
import styles from "./CoursesMegaMenu.module.css";

/*
 * The short-list dropdown, used by Branches.
 *
 * It borrows the mega menu's stylesheet rather than restating the glass
 * recipe, so the panel background, card treatment and hover state stay in one
 * place and cannot drift apart.
 */

/**
 * A branch on its own website is a different kind of link from a route.
 *
 * `next/link` is for routes; an off-site address has to be a plain anchor, and
 * it opens in a new tab — with `noopener`, without which the opened tab can
 * navigate this one somewhere else. Everything else, including the `#`
 * placeholders the branches carry today, stays a Link.
 */
const isExternal = (href: string) => /^https?:\/\//.test(href);

const panelIn: Variants = {
  hidden: { opacity: 0, y: -15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
};

export default function NavDropdown({
  items,
  arrow,
  onNavigate,
}: {
  items: readonly NavMenuItem[];
  arrow: number;
  onNavigate: () => void;
}) {
  return (
    <motion.div variants={panelIn} initial="hidden" animate="show" exit="exit" className="relative">
      {/* pointer back to the nav item */}
      <span
        aria-hidden
        style={{ left: arrow }}
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/10 bg-[rgba(20, 36, 92,0.97)]"
      />

      <div className={styles.panel}>
        <span aria-hidden className={styles.tint} />
        <span aria-hidden className={styles.reflection} />
        <span aria-hidden className={styles.edgeGlow} />

        <div className={styles.body}>
          <ul className={styles.list}>
            {/* keyed by label, not href: six branches all sitting on `#`
                would collide and React would drop five of them */}
            {items.map((item) => {
              const external = isExternal(item.href);
              const Tag = external ? "a" : Link;
              return (
                <motion.li key={item.label} variants={itemIn}>
                  <Tag
                    href={item.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={onNavigate}
                    className={styles.card}
                  >
                    <span className="min-w-0">
                      <span className={styles.label}>{item.label}</span>
                      {item.note && (
                        <span className="mt-0.5 block text-[11.5px] leading-snug text-white/45 [.mobile-nav-sheet_&]:text-[#4B5563]">
                          {item.note}
                        </span>
                      )}
                    </span>
                    <FiChevronRight aria-hidden size={14} className={styles.arrow} />
                  </Tag>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/** Mobile accordion body — the drawer already supplies the heading. */
export function NavDropdownMobile({
  items,
  onNavigate,
}: {
  items: readonly NavMenuItem[];
  onNavigate: () => void;
}) {
  return (
    <ul>
      {items.map((item) => {
        const external = isExternal(item.href);
        const Tag = external ? "a" : Link;
        return (
          <li key={item.label}>
            <Tag
              href={item.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={onNavigate}
              className="flex w-full items-center gap-2 rounded-[12px] px-3 py-2 text-[14px] text-[#4B5563] transition-colors duration-300 hover:bg-[#FFD21F]/20 hover:text-[#081B63]"
            >
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <FiChevronRight aria-hidden size={14} className="shrink-0 text-[#60a5fa]" />
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}
