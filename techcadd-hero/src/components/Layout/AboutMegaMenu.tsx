"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { ABOUT_MENU_CARDS, ABOUT_MENU_PAGES } from "@/lib/about/pages";
import { whatsappLink } from "@/lib/cta";

/*
 * About Us panel: a left rail of destinations, three featured cards on the
 * right, and a counsellor CTA under the rail.
 *
 * The rail and the cards no longer hold the same list. Our Founder has its own
 * place in the navbar now, so it appears in neither, and the third card is Our
 * Team — see ABOUT_MENU_PAGES and ABOUT_MENU_CARDS.
 *
 * This one is white rather than the navy the other panels use — the rest of
 * the bar's dropdowns are dark, so if that reads as inconsistent this is the
 * single place to change it.
 */

const panelIn: Variants = {
  hidden: { opacity: 0, y: -15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutMegaMenu({
  arrow,
  onNavigate,
}: {
  arrow: number;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <motion.div variants={panelIn} initial="hidden" animate="show" exit="exit" className="relative">
      <span
        aria-hidden
        style={{ left: arrow }}
        className="absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-slate-200/80 bg-white"
      />

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35),0_0_40px_rgba(37,99,235,0.10)]">
        {/* soft blue wash so the white panel still reads as part of the brand */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_12%_0%,rgba(37,99,235,0.07),transparent_65%)]"
        />

        <div className="relative grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-8 lg:p-8">
          {/* ------------------------------ rail ------------------------------ */}
          <motion.nav variants={itemIn} aria-label="About Us" className="lg:border-r lg:border-slate-200/80 lg:pr-8">
            <span className="block font-[family-name:var(--font-mono-face)] text-[10px] font-bold uppercase tracking-[0.18em] text-[#94A3B8]">
              About Us
            </span>

            <ul className="mt-3 grid gap-1">
              {ABOUT_MENU_PAGES.map((p) => {
                const on = pathname === `/about/${p.slug}`;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/about/${p.slug}`}
                      onClick={onNavigate}
                      aria-current={on ? "page" : undefined}
                      className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors duration-300 ${
                        on
                          ? "bg-[#2563EB]/10 text-[#1D4ED8]"
                          : "text-[#334155] hover:bg-[#2563EB]/[0.07] hover:text-[#1D4ED8]"
                      }`}
                    >
                      {p.title}
                      <FiChevronRight aria-hidden size={13} className="shrink-0 opacity-50" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a
              {...whatsappLink()}
              onClick={onNavigate}
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] transition-colors duration-300 hover:text-[#1D4ED8]"
            >
              Talk to a Counsellor
              <FiArrowRight aria-hidden size={13} />
            </a>
          </motion.nav>

          {/* ----------------------------- cards ------------------------------ */}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_MENU_CARDS.map((p) => (
              <motion.li key={p.key} variants={itemIn}>
                <Link
                  href={p.href}
                  onClick={onNavigate}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-white/70 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#2563EB]/35 hover:shadow-[0_26px_54px_-28px_rgba(37,99,235,0.55)] motion-reduce:hover:translate-y-0"
                >
                  <span className="relative block aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt=""
                      aria-hidden
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 88vw, (max-width: 1023px) 42vw, 260px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                  </span>

                  <span className="flex flex-1 flex-col p-4">
                    <span className="font-[family-name:var(--font-sora)] text-[14.5px] font-bold leading-snug text-[#0F172A]">
                      {p.title}
                    </span>
                    <span className="mt-2 inline-flex w-max items-center rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#2563EB]">
                      {p.badge}
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/** Stacked list for the hamburger sheet. */
export function AboutMegaMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid gap-2 px-1">
      {ABOUT_MENU_PAGES.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/about/${p.slug}`}
            onClick={onNavigate}
            className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-[14px] text-[#081B63] transition-colors duration-300 hover:bg-[#FFD21F]/20"
          >
            <span className="relative size-11 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={p.image}
                alt=""
                aria-hidden
                fill
                loading="lazy"
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0 flex-1 truncate">{p.title}</span>
            <FiChevronRight aria-hidden size={14} className="shrink-0 text-[#60a5fa]" />
          </Link>
        </li>
      ))}

      <li>
        <a
          {...whatsappLink()}
          onClick={onNavigate}
          className="mt-1 inline-flex items-center gap-1.5 px-3 text-[13.5px] font-semibold text-[#60a5fa]"
        >
          Talk to a Counsellor
          <FiArrowRight aria-hidden size={13} />
        </a>
      </li>
    </ul>
  );
}
