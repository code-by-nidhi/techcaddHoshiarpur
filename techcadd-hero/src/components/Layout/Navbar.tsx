"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import { NAV_LINKS } from "@/lib/content";
import { SIMPLE_MENUS, isSimpleLabel, type SimpleLabel } from "@/lib/navMenus";
import { demoBus } from "@/lib/demoBus";
import megaStyles from "./CoursesMegaMenu.module.css";

/*
 * Every panel is split out of the navbar chunk: their markup and data only
 * travel once someone actually opens one. The navbar itself ships on every
 * route, so keeping it small matters.
 */

const MegaMenu = dynamic(() => import("./MegaMenu"));
const MegaMenuMobile = dynamic(() => import("./MegaMenuMobile"));
const CoursesMegaMenu = dynamic(() => import("./CoursesColumnsMenu"));
const CoursesMegaMenuMobile = dynamic(() => import("./CoursesMegaMenuMobile"));
const AiMegaMenu = dynamic(() => import("./AiMegaMenu"));
const AiMegaMenuMobile = dynamic(() => import("./AiMegaMenu").then((m) => m.AiMegaMenuMobile));
const InternshipMegaMenu = dynamic(() => import("./InternshipMegaMenu"));
const InternshipMegaMenuMobile = dynamic(() =>
  import("./InternshipMegaMenu").then((m) => m.InternshipMegaMenuMobile),
);
const After12MegaMenu = dynamic(() => import("./After12MegaMenu"));
const After12MegaMenuMobile = dynamic(() =>
  import("./After12MegaMenu").then((m) => m.After12MegaMenuMobile),
);
/* server-rendered, not deferred: it sits above the fold on every route and
   popping in after hydration would shift the nav row */
const AiNavButton = dynamic(() => import("./AiNavButton"), { ssr: true });
const NavDropdown = dynamic(() => import("./NavDropdown"));
const NavDropdownMobile = dynamic(() =>
  import("./NavDropdown").then((m) => m.NavDropdownMobile),
);

/**
 * Nav label -> panel. Adding a mega menu to another item is one entry here;
 * every item not listed stays an ordinary link.
 */
const MEGA_PANELS = {
  Courses: { desktop: CoursesMegaMenu, mobile: CoursesMegaMenuMobile, width: 1200, centred: true },
  Resources: { desktop: MegaMenu, mobile: MegaMenuMobile, width: 1240 },
  /* centred on the viewport rather than on its trigger, which sits left of
     centre in the bar and pulled the panel to the edge */
  AI: { desktop: AiMegaMenu, mobile: AiMegaMenuMobile, width: 1150, centred: true },
  "Internship & Training": {
    desktop: InternshipMegaMenu,
    mobile: InternshipMegaMenuMobile,
    width: 1050,
    centred: true,
  },
  "After 12th": { desktop: After12MegaMenu, mobile: After12MegaMenuMobile, width: 1050, centred: true },
} as const;

type MegaLabel = keyof typeof MEGA_PANELS;

const isMegaLabel = (label: string): label is MegaLabel => label in MEGA_PANELS;

/** Anything that opens a panel — a mega menu or a short-list dropdown. */
type PanelLabel = MegaLabel | SimpleLabel;

const opensPanel = (label: string): label is PanelLabel =>
  isMegaLabel(label) || isSimpleLabel(label);

/** Short lists get a narrow panel; the mega menus keep their own widths. */
const SIMPLE_WIDTH = 340;

const panelWidth = (label: PanelLabel) =>
  isMegaLabel(label) ? MEGA_PANELS[label].width : SIMPLE_WIDTH;

/** Panels that centre on the viewport instead of on their nav item. */
const isCentred = (label: PanelLabel) =>
  isMegaLabel(label) && "centred" in MEGA_PANELS[label] && MEGA_PANELS[label].centred === true;

/** Outer margin the panel keeps from the viewport edge, in px. */
const EDGE = 16;

/**
 * Transparent over the hero (so the reference composition holds), then a
 * full-bleed glass bar once you scroll past the fold. The background spans the
 * viewport; only the content inside is capped and centred.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<PanelLabel | null>(null);
  const pathname = usePathname();

  /**
   * Hover intent: a short grace period on leave, so crossing the gap between
   * the trigger and the panel does not snap the menu shut.
   */
  const triggerRefs = useRef<Partial<Record<PanelLabel, HTMLLIElement | null>>>({});
  const [anchor, setAnchor] = useState({ left: 0, top: 0, width: 0, arrow: 0 });

  /**
   * Centre the panel under the trigger, then pull it back inside the viewport
   * if that would push it off the edge, and report where the pointer has to
   * sit so it still lands under the item.
   */
  const measure = useCallback(() => {
    // `mega` is a real dependency: with an empty array this closure would keep
    // reading null and the panel would never be given a width to render at.
    if (!mega) return;
    const el = triggerRefs.current[mega];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    // never wider than 95vw, so the panel always reads as a floating card
    const width = Math.min(panelWidth(mega), vw - EDGE * 2, vw * 0.9);
    const centre = r.left + r.width / 2;
    const left = isCentred(mega)
      ? Math.max(EDGE, (vw - width) / 2)
      : Math.min(Math.max(EDGE, centre - width / 2), vw - width - EDGE);
    setAnchor({ left, top: r.bottom, width, arrow: centre - left });
  }, [mega]);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMega(null), 160);
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
      if (e.key === "Escape") setMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  // a route change should never leave a panel hanging open
  useEffect(() => {
    setMega(null);
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[9999]"
    >
      {/*
       * The bar itself is full-bleed: no margin, no max-width, no radius, so
       * the glass background reaches both screen edges. The width cap lives on
       * the <nav> inside it, which is what actually aligns the content.
       */}
      <div
        /* Exactly the hero's ground colour, so the bar and the hero read as one
           surface at the top of the page rather than two navy bands. Kept solid
           at every scroll position so contrast holds on the light routes too. */
        className={`w-full bg-[#1E3078] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/*
         * flex-nowrap + whitespace-nowrap throughout: without them the long
         * labels wrap at ~1280-1400px, which makes the bar grow a second row
         * and sit over the hero copy.
         */}
        <nav
          className={`mx-auto flex w-full max-w-[1400px] flex-nowrap items-center justify-between gap-2.5 whitespace-nowrap px-4 transition-all duration-500 sm:gap-3 sm:px-6 lg:gap-6 lg:px-8 ${
            scrolled ? "h-[60px] sm:h-[68px]" : "h-[68px] sm:h-[86px]"
          }`}
        >
          {/*
           * The logo is the only element allowed to give ground. On phones it
           * is bounded by BOTH an explicit height and a max-width, so it
           * condenses on scroll exactly as it does on desktop and can never
           * push the CTA or the menu button off the row.
           */}
          {/* The extra left margin is optical: the wordmark's glyphs start
              tight to the image edge, so matching the nav's own padding leaves
              it looking closer to the screen edge than the links are to theirs.
              It scales back on phones, where the row has no width to spare. */}
          <Link
            href="/"
            aria-label="TechCadd — home"
            className="ml-1 min-w-0 shrink sm:ml-3 lg:ml-5"
          >
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
              const megaKey = opensPanel(link.label) ? link.label : null;
              const opensMega = megaKey !== null;
              const thisOpen = opensMega && mega === megaKey;
              const indicator = (
                /* blue indicator: parked under the current link, drawn in from
                   the left on hover for the others */
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] shadow-[0_0_10px_rgba(59,130,246,0.9)] transition-[width] duration-300 ease-out ${
                    current || thisOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              );
              const isAi = link.label === "AI";
              const face = (
                <>
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      aria-hidden
                      className={`size-3.5 translate-y-px text-white/60 transition-transform duration-300 group-hover:text-white/90 ${
                        thisOpen ? "translate-y-0.5 rotate-180" : "group-hover:translate-y-0.5"
                      }`}
                    />
                  )}
                  {indicator}
                </>
              );
              const face_class = `group relative inline-flex items-center gap-1 whitespace-nowrap py-1 text-[14px] transition-colors duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.9)] 2xl:text-[15px] ${
                current || thisOpen ? "font-medium text-white" : "text-white/90"
              }`;

              return (
                <li
                  key={link.label}
                  ref={(el) => {
                    if (megaKey) triggerRefs.current[megaKey] = el;
                  }}
                  onMouseEnter={opensMega ? cancelClose : undefined}
                  onMouseLeave={opensMega ? scheduleClose : undefined}
                >
                  {/*
                   * Hover and focus open the panel; the click still follows the
                   * href, so the item never becomes a dead end.
                   */}
                  {isAi ? (
                    <AiNavButton
                      href={link.href}
                      active={current || thisOpen}
                      onMouseEnter={() => setMega(megaKey)}
                      onFocus={() => setMega(megaKey)}
                      onClick={() => setMega(null)}
                    />
                  ) : (
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      aria-haspopup={opensMega ? "true" : undefined}
                      aria-expanded={opensMega ? thisOpen : undefined}
                      aria-controls={opensMega ? "mega-menu" : undefined}
                      onMouseEnter={() => setMega(megaKey)}
                      onFocus={() => setMega(megaKey)}
                      onClick={opensMega ? () => setMega(null) : undefined}
                      className={face_class}
                    >
                      {face}
                    </Link>
                  )}
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
                className="inline-block whitespace-nowrap rounded-full border border-white/20 bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-3.5 py-2 text-[13.5px] font-semibold text-white shadow-[0_0_30px_-4px_rgba(37,99,235,0.9)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_50px_0_rgba(59,130,246,1)] sm:px-[26px] sm:py-[11px] sm:text-[15px]"
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
        {/*
         * Page dimmer. It sits at -z-10 inside the header, which is itself
         * z-[9999] — so it covers the page but stays behind the bar and the
         * panel. Hovering it counts as leaving the menu.
         */}
        <AnimatePresence>
          {mega && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={scheduleClose}
              className={`${megaStyles.overlay} d-none d-xl-block`}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mega && anchor.width > 0 && (
            <div
              id="mega-menu"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              style={{ left: anchor.left, top: anchor.top, width: anchor.width }}
              className="fixed z-[9999] hidden pt-2.5 xl:block"
            >
              {(() => {
                if (isSimpleLabel(mega)) {
                  return (
                    <NavDropdown
                      items={SIMPLE_MENUS[mega]}
                      arrow={anchor.arrow}
                      onNavigate={() => setMega(null)}
                    />
                  );
                }
                const Panel = MEGA_PANELS[mega].desktop;
                return <Panel arrow={anchor.arrow} onNavigate={() => setMega(null)} />;
              })()}
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
            className="mx-3 mt-2 max-h-[calc(100svh-5.5rem)] max-w-full overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#050B1F]/95 backdrop-blur-xl xl:hidden"
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
                  {opensPanel(link.label) ? (
                    <div className="px-1 py-2">
                      {link.label === "AI" ? (
                        <div className="px-2 pb-2">
                          <AiNavButton
                            href={link.href}
                            active={isActive(link.href)}
                            variant="mobile"
                            onClick={() => setOpen(false)}
                          />
                        </div>
                      ) : (
                        <p className="px-3 pb-1 text-[11px] uppercase tracking-[0.16em] text-white/40">
                          {link.label}
                        </p>
                      )}
                      {(() => {
                        if (isSimpleLabel(link.label)) {
                          return (
                            <NavDropdownMobile
                              items={SIMPLE_MENUS[link.label]}
                              onNavigate={() => setOpen(false)}
                            />
                          );
                        }
                        const Panel = MEGA_PANELS[link.label].mobile;
                        return <Panel onNavigate={() => setOpen(false)} />;
                      })()}
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
                  className="block w-full rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-6 py-3 text-center text-[15px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)]"
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
