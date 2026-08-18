"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import styles from "./AiNavButton.module.css";

/*
 * The AI entry, as a pill rather than a text link.
 *
 * It keeps every handler the other panel triggers use, so hovering still opens
 * the AI dropdown and clicking still follows the href — only the presentation
 * changes. The chevron is dropped: the sparkle carries the affordance, and a
 * chevron inside a gradient capsule reads as a form control.
 */
export default function AiNavButton({
  href,
  active,
  variant = "desktop",
  onMouseEnter,
  onFocus,
  onClick,
}: {
  href: string;
  active: boolean;
  variant?: "desktop" | "mobile";
  onMouseEnter?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={variant === "mobile" ? "block w-full" : "inline-block"}
      /* the lift is a transform on this wrapper, so it never fights the
         gradient animation running on the pill itself */
    >
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onClick={onClick}
        className={`${styles.pill} ${active ? styles.active : ""} ${
          variant === "mobile" ? styles.mobile : ""
        }`}
      >
        <span aria-hidden className={styles.shimmer} />
        <span aria-hidden className={styles.pulse} />
        <span aria-hidden className={`${styles.spark} ${styles.spark1}`} />
        <span aria-hidden className={`${styles.spark} ${styles.spark2}`} />

        <span className={styles.icon}>
          <BsStars aria-hidden size={15} />
        </span>
        <span className={styles.label}>AI</span>
      </Link>
    </motion.span>
  );
}
