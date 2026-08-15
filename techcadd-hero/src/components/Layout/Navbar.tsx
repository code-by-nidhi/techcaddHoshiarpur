"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  /** Only route links can be current; section links land on the home page. */
  const isActive = (href: string) => !href.includes("#") && pathname === href;

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
          className={`mx-auto flex w-full max-w-[1600px] flex-nowrap items-center justify-between gap-3 overflow-x-hidden whitespace-nowrap px-4 transition-all duration-500 sm:px-6 lg:gap-6 lg:px-[4.5rem] xl:px-8 2xl:px-[4.5rem] ${
            scrolled ? "h-[68px] lg:px-6" : "h-[86px]"
          }`}
        >
          {/*
           * The logo is the only element allowed to give ground — capped at
           * 130px on phones so the CTA and the menu button always fit on one
           * row. Both of those stay shrink-0.
           */}
          <Link href="/" aria-label="TechCadd — home" className="min-w-0 shrink">
            <Image
              src="/images/techcadd-logo-white.png"
              alt="TechCadd — Your Skill & Technology Partner"
              width={899}
              height={242}
              priority
              className={`h-auto w-auto max-w-[130px] object-contain transition-all duration-500 sm:max-w-none ${
                scrolled ? "sm:h-[42px]" : "sm:h-[52px]"
              }`}
            />
          </Link>

          {/* desktop navigation */}
          <ul className="hidden min-w-0 shrink-0 flex-nowrap items-center gap-x-[20px] xl:flex 2xl:gap-x-[28px]">
            {NAV_LINKS.map((link) => {
              const current = isActive(link.href);

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`group relative inline-flex items-center gap-1 whitespace-nowrap py-1 text-[14px] transition-colors duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.9)] 2xl:text-[15px] ${
                      current ? "font-medium text-white" : "text-white/90"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        aria-hidden
                        className="size-3.5 translate-y-px text-white/60 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white/90"
                      />
                    )}

                    {/* blue indicator: parked under the current link, drawn in
                        from the left on hover for the others */}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] shadow-[0_0_10px_rgba(59,130,246,0.9)] transition-[width] duration-300 ease-out ${
                        current ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* the site's standing CTA, room permitting */}
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
              className="hidden whitespace-nowrap rounded-full bg-white px-[22px] py-[10px] text-[14px] font-semibold text-[#0a0f1e] shadow-[0_6px_24px_-6px_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0_10px_34px_-6px_rgba(255,255,255,0.55)] 2xl:inline-block"
            >
              Book Demo
            </motion.a>

            <motion.div
              className="shrink-0"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
            >
              <Link
                href="/contact"
                className="inline-block whitespace-nowrap rounded-full border border-white/20 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_0_30px_-4px_rgba(37,99,235,0.9)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_50px_0_rgba(59,130,246,1)] sm:px-[26px] sm:py-[11px] sm:text-[15px]"
              >
                {/* the label sheds a word below 576px, where space runs out */}
                <span className="min-[576px]:hidden">Counselling</span>
                <span className="hidden min-[576px]:inline">Free Counselling</span>
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="grid size-10 shrink-0 place-items-center rounded-lg text-white/85 transition-colors hover:bg-white/5 xl:hidden"
            >
              {/* the two glyphs cross-fade with a quarter turn */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="grid place-items-center"
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/95 backdrop-blur-xl xl:hidden"
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
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] transition-colors ${
                      isActive(link.href)
                        ? "bg-gradient-to-r from-[#2563eb]/25 to-transparent font-medium text-white"
                        : "text-white/85 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown aria-hidden className="size-4 text-white/40" />}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="space-y-2 p-2 pt-3"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-6 py-3 text-center text-[15px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)]"
                >
                  Free Counselling
                </Link>
                <a
                  href="/#contact"
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
