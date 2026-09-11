"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import { NAV_LINKS } from "@/lib/content";
import { useSite } from "@/lib/cms/site-context";
import { SIMPLE_MENUS, isSimpleLabel, type SimpleLabel } from "@/lib/navMenus";
import megaStyles from "./CoursesMegaMenu.module.css";
import { openLeadCapture } from "@/lib/demoBus";

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
const AboutMegaMenu = dynamic(() => import("./AboutMegaMenu"));
const AboutMegaMenuMobile = dynamic(() =>
  import("./AboutMegaMenu").then((m) => m.AboutMegaMenuMobile),
);
const NavDropdown = dynamic(() => import("./NavDropdown"));
const NavDropdownMobile = dynamic(() =>
  import("./NavDropdown").then((m) => m.NavDropdownMobile),
);

/**
 * Nav label -> panel. Adding a mega menu to another item is one entry here;
 * every item not listed stays an ordinary link.
 */
const MEGA_PANELS = {
  "About Us": { desktop: AboutMegaMenu, mobile: AboutMegaMenuMobile, width: 1000, centred: true },
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
  const site = useSite();
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
  const matches = (href: string) =>
    !href.includes("#") &&
    (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));

  /*
   * The longest matching href wins.
   *
   * Now that Our Founder sits in the bar beside About Us, /about/our-founder
   * matches both — "/about" through the startsWith arm — and without this both
   * would light at once. Comparing against the most specific match lights only
   * Our Founder there, and still lights About Us on /about itself.
   *
   * Items that share an href, as AI, Courses and After 12th all share
   * /courses, still light together. That is existing behaviour and unrelated.
   */
  const activeHref = NAV_LINKS.map((l) => l.href)
    .filter(matches)
    .sort((a, b) => b.length - a.length)[0];

  const isActive = (href: string) => matches(href) && href === activeHref;

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
        /*
         * Two states, and the scroll position is what splits them — not the
         * breakpoint. It used to be the other way round (white below `xl`,
         * navy above), which meant the bar never changed as the page moved.
         *
         * At the top of the page it is full-bleed navy: no margin, no radius,
         * so it reaches both screen edges and reads as one surface with the
         * hero underneath it.
         *
         * Once past the fold it detaches into a centred white capsule. The
         * width is capped and `mx-auto` centres it, but a cap alone leaves it
         * flush to the edges on anything narrower than the cap — hence the
         * explicit `calc` widths, which keep a real gutter at every size and
         * hand back to `w-full` once `max-w` is doing the work.
         */
        className={`mx-auto transition-all duration-500 ${
          scrolled
            ? "mt-2 w-[calc(100%-1.5rem)] max-w-[1200px] rounded-2xl bg-white/95 shadow-[inset_0_0_0_1px_rgba(203,213,225,0.75),0_18px_50px_-24px_rgba(8,27,99,0.35)] backdrop-blur-xl sm:mt-3 sm:w-[calc(100%-3rem)] sm:rounded-[2rem] xl:w-full"
            : "w-full border-b border-white/10 bg-[#1E3078]"
        }`}
      >
        {/*
         * flex-nowrap + whitespace-nowrap throughout: without them the long
         * labels wrap at ~1280-1400px, which makes the bar grow a second row
         * and sit over the hero copy.
         */}
        <nav
          /*
           * Unscrolled the row is 1400px wide with 24px of gutter, and the gap
           * between the three groups is 16px from `lg` rather than 24px. Those
           * 16px matter: the row has 1232px to divide between a 124px logo, a
           * 137px button and a nav that needs 916px, and the arithmetic only
           * closes with the tighter gap.
           *
           * Scrolled, it takes the page's own column instead: 1200px wide, with
           * 48px of gutter from `lg` up so the logo lands on the left edge of
           * the section content below and the CTA on the right edge.
           *
           * 48px, and not the 32px that `lg:px-8` would suggest, because the
           * app loads `bootstrap-grid.min.css` alongside Tailwind and
           * Bootstrap's spacing utilities are `!important`. Every content
           * column on the site is `max-w-[1200px] px-5 sm:px-6 lg:px-8`, and
           * Bootstrap's `.px-5` (3rem, !important) beats all three of those —
           * so those columns are really 48px in at every width, whatever the
           * classes read like. The arbitrary values here are deliberate: `px-4`
           * and `px-5` are names Bootstrap also defines, so using them would
           * hand the number back to it, while `px-[16px]` is ours alone.
           *
           * That costs ~96px of row width against the old 1280/24px, which is
           * why the scrolled list drops a point of type and a couple of px of
           * gap below — see the list's own note.
           *
           * The gutter is 24 below `xl` and 48 at `xl`, because the capsule's
           * own margin makes up the difference. Under the 1200px cap the
           * capsule is inset 24px by `calc(100% - 3rem)` and the content
           * column is not, so 24 + 24 lands on the column's 48; once the cap
           * holds (`calc(100vw - 3rem) == 1200` at 1248px) the two left edges
           * coincide and the gutter has to carry all 48 itself.
           *
           * Between 1248 and 1280 the cap has engaged but `xl` has not, so the
           * logo sits 24px inside the column there. That window is 32px of
           * viewport wide and below the breakpoint where this list is shown at
           * all, and the exact switch — `min-[1248px]:` — is an arbitrary
           * variant this build does not emit, so `xl` is the honest choice.
           *
           * Phones keep 16 and give up the alignment: holding it would need
           * 36, which overflows the row on a 320px screen.
           */
          className={`mx-auto flex w-full flex-nowrap items-center justify-between gap-2.5 whitespace-nowrap transition-all duration-500 sm:gap-3 lg:gap-3 ${
            scrolled
              ? "h-[52px] max-w-[1200px] px-[16px] sm:h-[58px] sm:px-[24px] xl:px-[48px]"
              : "h-[68px] max-w-[1400px] px-4 sm:h-[86px] sm:px-6"
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
          {/*
           * `shrink-0`, where it used to be `shrink`.
           *
           * That single word was the overlap. Under `justify-between` the nav
           * list is `shrink-0` and keeps its full 988px, so the only element
           * that could give ground was this one — and its box compressed while
           * the wordmark inside it did not, because the image is `w-auto`. The
           * result was the list drawn straight over the logo, by as much as
           * 130px at 1280 and 1600. Neither may shrink now; the gaps below are
           * what create the room instead.
           */}
          {/* The optical margin is dropped in the scrolled state: there the
              whole point is that the wordmark's left edge sits exactly on the
              content column's, and a nudge of any size breaks that. */}
          <Link
            href="/"
            aria-label="TechCadd — home"
            className={`shrink-0 ${scrolled ? "ml-0" : "ml-1 sm:ml-2 lg:ml-3"}`}
          >
            {/*
             * Two files rather than a CSS filter.
             *
             * The wordmark is flat white on transparency, so the navy variant
             * is the same alpha channel with the colour swapped — every glyph
             * edge survives. A `brightness(0)` style filter would have worked
             * on the letters and destroyed the antialiasing around them.
             *
             * Both are `priority`: this sits above the fold on every route, and
             * only one of the pair is ever displayed.
             */}
            {/* Which ground the bar is drawing on is now a scroll state, so
                this pair is picked by `scrolled` rather than by breakpoint:
                the white mark over the navy bar, the blue one over the white
                capsule. Swapping these two is how you get an invisible logo. */}
            <Image
              src={site.logo("dark").src}
              alt={site.logo("dark").alt}
              width={site.logo("dark").width}
              height={site.logo("dark").height}
              priority
              className={`w-auto object-contain transition-all duration-500 sm:max-w-none ${
                scrolled ? "hidden" : "h-[34px] max-w-[124px] sm:h-[52px]"
              }`}
            />
            <Image
              src={site.logo("light").src}
              alt=""
              aria-hidden
              width={site.logo("light").width}
              height={site.logo("light").height}
              priority
              className={`w-auto object-contain transition-all duration-500 sm:max-w-none ${
                scrolled ? "h-[28px] max-w-[112px] sm:h-[34px]" : "hidden"
              }`}
            />
          </Link>

          {/* desktop navigation */}
          {/*
           * Gaps sized to what is actually left over, measured rather than
           * guessed: the ten items come to 808px of text at `xl` and 854px at
           * `2xl`, and the row can spare about 940px and 1030px respectively.
           * 12px and 16px of gap fit inside both with a little slack.
           *
           * The list stays behind `xl` (1280px) and not `lg` (1024px). At 1024
           * the row has roughly 683px to give a list that needs 916px, and no
           * gap closes a 233px gap — the labels would have to drop to about
           * 10.6px to fit. Below 1280 the hamburger is the honest answer.
           */}
          {/*
           * Scrolled, the gap is a flat 9px at every width — no `2xl` bump.
           * The bump exists because the unscrolled row gets wider as the
           * viewport does; the scrolled row is pinned to 1200px and does not,
           * so widening the gaps there would only push the list into the CTA.
           */}
          <ul
            className={`hidden min-w-0 shrink-0 flex-nowrap items-center xl:flex ${
              scrolled ? "gap-x-[9px]" : "gap-x-[10px] 2xl:gap-x-[16px]"
            }`}
          >
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
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] transition-[width] duration-300 ease-out ${
                    /* the glow is what makes it read against navy; over the
                       white capsule it just smears the underline */
                    scrolled ? "" : "shadow-[0_0_10px_rgba(59,130,246,0.9)]"
                  } ${current || thisOpen ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              );
              const isAi = link.label === "AI";
              /*
               * A `#` href means the item has nowhere to go — Branches, whose
               * campuses live on their own sites. It renders as a button so the
               * trigger opens the panel and nothing else: a link to `#` would
               * jump the page to the top on click, and would read to a screen
               * reader as a destination that does not exist. Same classes, same
               * chevron, same indicator, so the bar is unchanged to look at.
               */
              const placeholder = link.href === "#";
              const face = (
                <>
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      aria-hidden
                      className={`size-3.5 translate-y-px transition-transform duration-300 ${
                        scrolled
                          ? "text-[#64748B] group-hover:text-[#142C8E]"
                          : "text-white/60 group-hover:text-white/90"
                      } ${
                        thisOpen ? "translate-y-0.5 rotate-180" : "group-hover:translate-y-0.5"
                      }`}
                    />
                  )}
                  {indicator}
                </>
              );
              /*
               * Two palettes, one for each ground. The white-on-navy set is
               * what the bar has always used; the navy-on-white set is new,
               * and without it every label goes invisible the moment the
               * capsule turns white. The blue-glow hover only belongs to the
               * dark half — on white it reads as a blur, not a highlight.
               */
              const face_class = `group relative inline-flex items-center gap-1 whitespace-nowrap py-1 transition-colors duration-300 ${
                scrolled
                  ? `text-[12.5px] ${
                      current || thisOpen
                        ? "font-medium text-[#142C8E]"
                        : "text-[#334155] hover:text-[#142C8E]"
                    }`
                  : `text-[13.5px] 2xl:text-[15px] ${
                      current || thisOpen
                        ? "font-medium text-white"
                        : "text-white/90 hover:text-white hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.9)]"
                    }`
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
                  ) : placeholder ? (
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={thisOpen}
                      aria-controls="mega-menu"
                      onMouseEnter={() => setMega(megaKey)}
                      onFocus={() => setMega(megaKey)}
                      onClick={() => setMega(thisOpen ? null : megaKey)}
                      className={face_class}
                    >
                      {face}
                    </button>
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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <motion.div
              className="shrink-0"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
            >
              {/* raises the shared lead-capture dialog — see LeadCaptureModal */}
              <button
                type="button"
                onClick={() => openLeadCapture("navbar")}
                /* the white hairline only does anything against navy; on the
                   white capsule it eats a pixel off the gradient */
                className={`tap-44 inline-block whitespace-nowrap rounded-full border bg-gradient-to-r from-[#142C8E] to-[#2563EB] font-semibold text-white shadow-[0_0_30px_-4px_rgba(37,99,235,0.9)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_50px_0_rgba(59,130,246,1)] ${
                  scrolled
                    ? "border-transparent px-3.5 py-1.5 text-[12.5px] sm:px-5 sm:py-[7px] sm:text-[13.5px]"
                    : "border-white/20 px-3.5 py-2 text-[13.5px] sm:px-[26px] sm:py-[11px] sm:text-[15px]"
                }`}
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
              /* navy glyph on the white capsule, white on the navy bar — it
                 was navy in both, which hid it completely over the hero */
              className={`grid size-9 shrink-0 place-items-center rounded-lg transition-colors sm:size-10 xl:hidden ${
                scrolled
                  ? "text-[#081B63] hover:bg-[#081B63]/[0.07]"
                  : "text-white hover:bg-white/10"
              }`}
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
            className="mobile-nav-sheet mx-3 mt-2 max-h-[calc(100svh-5.5rem)] max-w-full overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_50px_-20px_rgba(8,27,99,0.25)] xl:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045 } } }}
              className="divide-y divide-slate-200/70 p-2"
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
                        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
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
                          ? "bg-[#FFD21F]/15 font-semibold text-[#081B63]"
                          : "text-[#081B63] hover:bg-[#081B63]/[0.05]"
                      }`}
                    >
                      {link.label}
                      {link.dropdown && <ChevronDown aria-hidden className="size-4 text-[#94A3B8]" />}
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
                    // the sheet has to go first, or the dialog opens behind it
                    setOpen(false);
                    openLeadCapture("navbar");
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
