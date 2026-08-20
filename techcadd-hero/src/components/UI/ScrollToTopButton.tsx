"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

/*
 * Floating "back to top" control.
 *
 * The scroll listener is passive and throttled through rAF: the handler only
 * flips a boolean, so it must never be the reason a scroll drops frames.
 */

/** How far down before the button is useful. */
const SHOW_AFTER = 350;

export default function ScrollToTopButton() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setShow(window.scrollY > SHOW_AFTER);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduce ? ("instant" as ScrollBehavior) : "smooth",
            })
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          /* sits above the page but below the preloader and the modal */
          className="fixed bottom-5 right-5 z-[9998] grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#142C8E] via-[#1E40AF] to-[#2563EB] text-white shadow-[0_10px_25px_rgba(37,99,235,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(37,99,235,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] sm:bottom-[30px] sm:right-[30px] sm:size-14"
        >
          <FiArrowUp aria-hidden className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
