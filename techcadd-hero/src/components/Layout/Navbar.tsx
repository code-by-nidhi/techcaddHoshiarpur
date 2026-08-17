"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import { NAV_LINKS } from "@/lib/content";
import { demoBus } from "@/lib/demoBus";

/*
 * Both panels are split out of the navbar chunk: their markup, their images
 * and the resources data only travel once someone actually opens one. The
 * navbar itself is on every route, so keeping it small matters.
 */
const MegaMenu = dynamic(() => import("./MegaMenu"));
const MegaMenuMobile = dynamic(() => import("./MegaMenuMobile"));

/** The one nav item that opens the resources panel. */
const MEGA_TRIGGERS = new Set(["Resources"]);

/** Panel geometry, in px. */
const PANEL_W = 1240;
const EDGE = 16;

/**
 * Transparent over the hero (so the reference composition holds), then it
 * condenses into a floating glass bar once you scroll past the fold.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const pathname = usePathname();

  /**
   * Hover intent: a short grace period on leave, so crossing the gap between
   * the trigger and the panel does not snap the menu shut.
   */
  const triggerRef = useRef<HTMLLIElement>(null);
  const [anchor, setAnchor] = useState({ left: 0, top: 0, width: PANEL_W, arrow: 0 });

  /**
   * Centre the panel under the trigger, then pull it back inside the viewport
   * if that would push it off the edge, and report where the pointer has to
   * sit so it still lands under the item.
   */
  const measure = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const width = Math.min(PANEL_W, vw - EDGE * 2);
    const centre = r.left + r.width / 2;
    const left = Math.min(Math.max(EDGE, centre - width / 2), vw - width - EDGE);
    setAnchor({ left, top: r.bottom, width, arrow: centre - left });
  }, []);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMega(false), 160);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // the bar changes height as it condenses, so re-measure while it is open
  useEffect(() => {
    if (!mega) return;
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [mega, measure]);

  /**
   * Only route links can be current; section links land on the home page.
   *
   * Nested routes count as their parent: reading /blog/some-article should keep
   * "Resources" lit, not leave the bar looking like you navigated off the site.
   */
  const isActive = (href: string) =>
    !href.includes("#") &&
    (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));

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

  // Escape closes the mega panel wherever focus happens to be
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  // a route change should never leave a panel hanging open
  useEffect(() => {
    setMega(false);
    setOpen(false);
  }, [pathname]);

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
            ? /* the condensed bar is a floating pill: it needs a margin on
                 phones too, or its rounded corners sit flush to the screen
                 edges and it reads as a stretched full-bleed strip */
              "mx-3 mt-2 rounded-2xl border border-white/10 bg-[#020617]/85 px-1.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:mx-auto sm:mt-3 sm:max-w-[1360px] sm:px-2"
            : "border-b border-transparent"
        }`}
      >
        {/*
         * flex-nowrap + whitespace-nowrap throughout: without them the long
         * labels wrap at ~1280-1400px, which makes the bar grow a second row
         * and sit over the hero copy.
         */}
        <nav
          className={`mx-auto flex w-full max-w-full flex-nowrap items-center justify-between gap-2.5 whitespace-nowrap px-3 transition-all duration-500 sm:max-w-[1600px] sm:gap-3 sm:px-6 lg:gap-6 lg:px-[4.5rem] xl:px-8 2xl:px-[4.5rem] ${
            scrolled ? "h-[60px] sm:h-[68px] lg:px-6" : "h-[68px] sm:h-[86px]"
          }`}
        >
          {/*
           * The logo is the only element allowed to give ground. On phones it
           * is bounded by BOTH an explicit height and a max-width, so it
           * condenses on scroll exactly as it does on desktop and can never
           * push the CTA or the menu button off the row.
           */}
          <Link href="/" aria-label="TechCadd — home" className="min-w-0 shrink">
            <Image
              src="/images/techcadd-logo-white.png"
              alt="TechCadd — Your Skill & Technology Partner"
              width={899}
              height={242}
              priority
              className={`w-auto object-contain transition-all duration-500 sm:max-w-none ${
                scrolled
                  ? "h-[30px] max-w-[112px] sm:h-[42px]"
                  : "h-[34px] max-w-[124px] sm:h-[52px]"
              }`}
            />
          </Link>

          {/* desktop navigation */}
          <ul className="hidden min-w-0 shrink-0 flex-nowrap items-center gap-x-[20px] xl:flex 2xl:gap-x-[28px]">
            {NAV_LINKS.map((link) => {
              const current = isActive(link.href);
              const opensMega = MEGA_TRIGGERS.has(link.label);
              const indicator = (
                /* blue indicator: parked under the current link, drawn in from
                   the left on hover for the others */
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] shadow-[0_0_10px_rgba(59,130,246,0.9)] transition-[width] duration-300 ease-out ${
                    current || (opensMega && mega) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              );
              const face = (
                <>
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      aria-hidden
                      className={`size-3.5 translate-y-px text-white/60 transition-transform duration-300 group-hover:text-white/90 ${
                        opensMega && mega ? "translate-y-0.5 rotate-180" : "group-hover:translate-y-0.5"
                      }`}
                    />
                  )}
                  {indicator}
                </>
              );
              const face_class = `group relative inline-flex items-center gap-1 whitespace-nowrap py-1 text-[14px] transition-colors duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.9)] 2xl:text-[15px] ${
                current || (opensMega && mega) ? "font-medium text-white" : "text-white/90"
              }`;

              return (
                <li
                  key={link.label}
                  ref={opensMega ? triggerRef : undefined}
                  onMouseEnter={opensMega ? cancelClose : undefined}
                  onMouseLeave={opensMega ? scheduleClose : undefined}
                >
                  {/*
                   * Hover and focus open the panel; the click still follows the
                   * href, so the item never becomes a dead end.
                   */}
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    aria-haspopup={opensMega ? "true" : undefined}
                    aria-expanded={opensMega ? mega : undefined}
                    aria-controls={opensMega ? "mega-menu" : undefined}
                    onMouseEnter={() => setMega(opensMega)}
                    onFocus={() => setMega(opensMega)}
                    onClick={opensMega ? () => setMega(false) : undefined}
                    className={face_class}
                  >
                    {face}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <motion.div
              className="shrink-0"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
            >
              {/* opens the enquiry modal rather than navigating */}
              <button
                type="button"
                onClick={() => demoBus.open()}
                className="inline-block whitespace-nowrap rounded-full border border-white/20 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-3.5 py-2 text-[13.5px] font-semibold text-white shadow-[0_0_30px_-4px_rgba(37,99,235,0.9)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_50px_0_rgba(59,130,246,1)] sm:px-[26px] sm:py-[11px] sm:text-[15px]"
              >
                Book Demo
              </button>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-white/85 transition-colors hover:bg-white/5 sm:size-10 xl:hidden"
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

        {/*
         * Desktop resources panel. Positioned from the measured trigger rect,
         * and the wrapper starts flush with the bar's underside — the pt-2.5
         * gap is inside the hover area, so moving the pointer down from
         * Resources never leaves both elements at once.
         */}
        <AnimatePresence>
          {mega && (
            <div
              id="mega-menu"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              style={{ left: anchor.left, top: anchor.top, width: anchor.width }}
              className="fixed hidden pt-2.5 xl:block"
            >
              <MegaMenu arrow={anchor.arrow} onNavigate={() => setMega(false)} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            /* the sheet now carries the whole catalogue, so it scrolls itself
               rather than pushing past the bottom of the screen */
            className="mx-3 mt-2 max-h-[calc(100svh-5.5rem)] max-w-full overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#020617]/95 backdrop-blur-xl xl:hidden"
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
                  {MEGA_TRIGGERS.has(link.label) ? (
                    <div className="px-1 py-2">
                      <p className="px-3 pb-1 text-[11px] uppercase tracking-[0.16em] text-white/40">
                        {link.label}
                      </p>
                      <MegaMenuMobile onNavigate={() => setOpen(false)} />
                    </div>
                  ) : (
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
                  )}
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="p-2 pt-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    demoBus.open();
                  }}
                  className="block w-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-6 py-3 text-center text-[15px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)]"
                >
                  Book Demo
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
