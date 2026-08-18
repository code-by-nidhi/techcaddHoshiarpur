"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiChevronRight, FiZap } from "react-icons/fi";
import { COURSE_MENU, type MenuCourse } from "@/lib/coursesMenu";
import styles from "./CoursesMegaMenu.module.css";

const panelIn: Variants = {
  hidden: { opacity: 0, y: -15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.045, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function CoursesMegaMenu({
  arrow,
  onNavigate,
}: {
  arrow: number;
  onNavigate: () => void;
}) {
  return (
    <motion.div variants={panelIn} initial="hidden" animate="show" exit="exit" className="relative">
      {/* pointer back to the nav item */}
      <span
        aria-hidden
        style={{ left: arrow }}
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/10 bg-[rgba(8,15,40,0.97)]"
      />

      <div className={styles.panel}>
        <span aria-hidden className={styles.tint} />
        <span aria-hidden className={styles.reflection} />
        <span aria-hidden className={styles.edgeGlow} />
        <motion.span
          aria-hidden
          className={styles.shimmer}
          animate={{ x: ["-45%", "145%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
        />

        <div className={styles.body}>
          <div className={styles.grid}>
            {COURSE_MENU.map((cat) => (
              <motion.div key={cat.id} variants={itemIn} className={styles.category}>
                <h3 className={styles.heading}>
                  <span aria-hidden style={{ fontSize: 14 }}>
                    {cat.emoji}
                  </span>
                  <span className={styles.headingText}>{cat.heading}</span>
                </h3>

                <ul className={styles.list}>
                  {cat.courses.map((c) => (
                    <li key={c.label}>
                      <CourseCard course={c} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CourseCard({ course, onNavigate }: { course: MenuCourse; onNavigate: () => void }) {
  return (
    <Link href={course.href} onClick={onNavigate} className={styles.card}>
      <span className={styles.label}>{course.label}</span>
      {course.trending && (
        <span className={styles.badge}>
          <FiZap aria-hidden size={10} />
          Trending
        </span>
      )}
      <FiChevronRight aria-hidden size={14} className={styles.arrow} />
    </Link>
  );
}
