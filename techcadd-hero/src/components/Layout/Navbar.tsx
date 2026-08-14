"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

/**
 * Transparent over the hero (so the reference composition holds), then it
 * condenses into a floating glass bar once you scroll past the fold.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock the page while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[9999]"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "mx-auto mt-3 max-w-[1360px] rounded-2xl border border-white/10 bg-[#020617]/85 px-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/*
         * flex-nowrap + whitespace-nowrap throughout: without them the long
         * labels wrap at ~1280-1400px, which makes the bar grow a second row
         * and sit over the hero copy.
         */}
        <nav
          className={`mx-auto flex w-full max-w-[1600px] flex-nowrap items-center justify-between gap-4 whitespace-nowrap px-6 transition-all duration-500 lg:gap-6 lg:px-[4.5rem] xl:px-8 2xl:px-[4.5rem] ${
            scrolled ? "h-[68px] lg:px-6" : "h-[86px]"
          }`}
        >
          <a href="#home" aria-label="TechCadd — home" className="shrink-0">
            <Image
              src="/images/techcadd-logo-white.png"
              alt="TechCadd — Your Skill & Technology Partner"
              width={899}
              height={242}
              priority
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-[38px] sm:h-[42px]" : "h-[40px] sm:h-[52px]"
              }`}
            />
          </a>

          {/* desktop navigation */}
          <ul className="hidden min-w-0 shrink-0 flex-nowrap items-center gap-x-[18px] xl:flex 2xl:gap-x-[26px]">
            {NAV_LINKS.map((link) =>
              link.active ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current="page"
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-[18px] py-[9px] text-[14px] font-medium text-white shadow-[0_0_30px_-2px_rgba(37,99,235,0.75)] transition-shadow duration-300 hover:shadow-[0_0_44px_0_rgba(37,99,235,0.95)] 2xl:px-[22px] 2xl:text-[15px]"
                  >
                    {link.label}
                    <span aria-hidden className="text-[13px] text-white/80">+</span>
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 whitespace-nowrap text-[14px] text-white/90 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.9)] 2xl:text-[15px]"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        aria-hidden
                        className="size-3.5 translate-y-px text-white/60 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white/90"
                      />
                    )}
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
              className="inline-block whitespace-nowrap rounded-full bg-white px-[18px] py-[9px] text-[13.5px] font-semibold text-[#0a0f1e] shadow-[0_6px_24px_-6px_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0_10px_34px_-6px_rgba(255,255,255,0.55)] sm:px-[26px] sm:py-[11px] sm:text-[15px]"
            >
              Book Demo
            </motion.a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-lg text-white/85 transition-colors hover:bg-white/5 xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/95 backdrop-blur-xl xl:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045 } } }}
              className="divide-y divide-white/8 p-2"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] transition-colors ${
                      link.active
                        ? "bg-gradient-to-r from-[#2563eb]/25 to-transparent font-medium text-white"
                        : "text-white/85 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown aria-hidden className="size-4 text-white/40" />}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="p-2 pt-3"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-white px-6 py-3 text-center text-[15px] font-semibold text-[#0a0f1e]"
                >
                  Book Demo
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
