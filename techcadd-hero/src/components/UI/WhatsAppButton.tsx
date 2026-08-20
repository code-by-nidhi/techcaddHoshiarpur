"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { MEGA_FOOTER } from "@/lib/site";

/*
 * Floating WhatsApp CTA, bottom-left.
 *
 * The number comes from `MEGA_FOOTER.contact.whatsapp` rather than being
 * written here, so it stays in step with the footer and the contact page —
 * one place to change if the line ever moves.
 */
export default function WhatsAppButton() {
  const reduce = useReducedMotion();
  const digits = MEGA_FOOTER.contact.whatsapp.replace(/\D/g, "");

  return (
    <motion.a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      /* mirrors the scroll-to-top button's offsets and size on the other edge,
         and sits at the same z-index band so neither can cover the other */
      className="group fixed bottom-5 left-5 z-[9998] grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(37,211,102,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-[30px] sm:left-[30px] sm:size-14"
    >
      <FaWhatsapp aria-hidden className="size-6 sm:size-7" />

      {/* tooltip: pointer-only, so it never blocks a tap on touch */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-[#0B1642] px-3 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:block"
      >
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
