"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight, Bot, Briefcase, GraduationCap, Handshake, Phone, School, Sparkles,
  type LucideIcon,
} from "lucide-react";
import { ABOUT, MEGA_FOOTER, MILESTONES, VALUES } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import Counter from "@/components/UI/Counter";
import FounderVision from "@/components/sections/FounderVision";

/**
 * Editorial about page: white throughout, generous spacing, a layered
 * photographic collage opposite the opening statement, a milestone card grid,
 * founder vision, and mission values in an offset two-column rhythm.
 */

/**
 * Collage imagery, served from public/images. Any frame whose file is not in
 * place yet falls back to a branded gradient carrying its caption, so the
 * section never renders a broken image.
 */
const GALLERY = {
  featured: {
    // the file on disk carries a space in its name, hence the %20
    src: "/images/team-photo.webp",
    alt: "The Techcadd team and students outside the Hoshiarpur campus",
    caption: "Team Techcadd",
    chip: "Industry-Oriented Training",
  },
  secondary: [
    {
      src: "/images/classroom.webp",
      alt: "A full auditorium of Techcadd students during a training session",
      caption: "Classroom training",
      chip: "Live Projects",
    },
    {
      src: "/images/lab.webp",
      alt: "Students working at machines in the Techcadd computer lab",
      caption: "Lab & project floor",
      chip: "Placement Assistance",
    },
  ],
  badge: { value: "10+", label: "Years Experience" },
};

/** The five training formats, shown as glass cards under the opening copy. */
const STATS = [
  { value: "45", unit: "Days", label: "Summer & winter industrial training" },
  { value: "6", unit: "Weeks", label: "University-mandated training" },
  { value: "6", unit: "Months", label: "Industrial training with internship" },
  { value: "Weekend", unit: "", label: "Batches for working professionals" },
  { value: "1-on-1", unit: "", label: "Personal mentoring, 2-hour classes" },
];

/** Faint fractal grain, kept inline so the page makes no extra request. */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function About() {
  return (
    <section id="about" className="relative overflow-x-clip bg-white">
      {/* eases the dark hero into the white page */}
      <div aria-hidden className="h-28 bg-gradient-to-b from-[#020617] to-white" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        {/* opening statement, with the photo collage opposite */}
        <div className="relative pb-28 pt-10 lg:pb-36">
          <AtmosphereLayer />

          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16 xl:gap-24">
            {/* not sticky: with five cards and the CTA this column outgrows the viewport */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-[#2563EB]/15 bg-white/70 px-4 py-2 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB] shadow-[0_10px_30px_-22px_rgba(37,99,235,0.9)] backdrop-blur-xl">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#2563EB]" />
                  {ABOUT.eyebrow}
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="mt-7 font-[family-name:var(--font-poppins)] text-[clamp(2.1rem,4.2vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#0F172A]">
                  {ABOUT.title}
                </h2>
              </Reveal>

              {ABOUT.body.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={0.12 + i * 0.08}>
                  <p className="mt-6 max-w-xl text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.85] text-[#475569]">
                    {p}
                  </p>
                </Reveal>
              ))}

              <StatCards />
              <CallToAction />
            </div>

            <AboutCollage />
          </div>
        </div>

        <Milestones />

        <FounderVision />

        {/* mission and values */}
        <div className="py-24 lg:py-32">
          <Reveal>
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
              Mission &amp; values
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-poppins)] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.028em] text-[#0F172A]">
              Four rules we don&apos;t bend
            </h3>
          </Reveal>

          <ol className="mt-14 divide-y divide-slate-200 border-t border-slate-200">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <li className="group grid gap-4 py-9 transition-colors duration-500 lg:grid-cols-[80px_0.9fr_1.1fr] lg:gap-10">
                  <span className="font-[family-name:var(--font-mono-face)] text-[13px] text-[#94A3B8] transition-colors duration-500 group-hover:text-[#2563EB]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-[family-name:var(--font-poppins)] text-[20px] font-bold leading-snug tracking-[-0.015em] text-[#0F172A]">
                    {v.title}
                  </h4>
                  <p className="max-w-xl text-[14.5px] leading-[1.85] text-[#475569]">{v.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- atmosphere ------------------------------- */

/** Blue blobs, a soft radial highlight and a whisper of grain over the white. */
function AtmosphereLayer() {
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 overflow-hidden lg:-inset-x-16">
      <div className="absolute -left-24 top-10 size-[26rem] rounded-full bg-[#2563EB]/[0.07] blur-[110px]" />
      <div className="absolute -right-20 top-1/3 size-[30rem] rounded-full bg-[#38BDF8]/[0.09] blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-[#7C3AED]/[0.05] blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(37,99,235,0.06),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: NOISE, backgroundSize: "180px 180px" }}
      />
    </div>
  );
}

/* --------------------------------- stats ---------------------------------- */

const cardStack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** The programme durations as glass feature cards with a blue accent rail. */
function StatCards() {
  return (
    <motion.dl
      variants={cardStack}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-4"
    >
      {STATS.map((s, i) => {
        const numeric = Number(s.value);

        return (
          <motion.div
            key={s.label}
            variants={cardItem}
            className={`group relative overflow-hidden rounded-[24px] border border-white/70 bg-white/60 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.04] backdrop-blur-xl transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 ${
              i === STATS.length - 1 ? "col-span-2" : ""
            }`}
          >
            {/* accent rail draws itself in on hover */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-[0.28] bg-gradient-to-b from-[#2563EB] to-[#38BDF8] transition-transform duration-500 ease-out group-hover:scale-y-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-[#2563EB]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <dt className="sr-only">{s.label}</dt>
            <dd className="relative">
              <p className="font-[family-name:var(--font-poppins)] text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#0F172A]">
                {Number.isFinite(numeric) ? <Counter to={numeric} duration={1.2} /> : s.value}
                {s.unit && <span className="ml-1 text-[14px] text-[#2563EB]">{s.unit}</span>}
              </p>
              <p className="mt-2.5 text-[13px] leading-snug text-[#64748B]">{s.label}</p>
            </dd>
          </motion.div>
        );
      })}
    </motion.dl>
  );
}

/* ------------------------------- milestones ------------------------------- */

/**
 * Keyed by year rather than index, so re-ordering or inserting a milestone in
 * site.ts can never silently shift every icon by one.
 */
const MILESTONE_ICONS: Record<string, LucideIcon> = {
  "2016": School,
  "2018": Handshake,
  "2020": Briefcase,
  "2023": Bot,
  "2026": GraduationCap,
};

/** Five milestones as a card grid: three across, then two wider ones. */
function Milestones() {
  return (
    <div className="relative py-20 lg:py-24">
      {/* subtle blue accent behind the grid */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-[26rem]">
        <div className="absolute left-[12%] top-0 size-[24rem] rounded-full bg-[#2563EB]/[0.06] blur-[110px]" />
        <div className="absolute right-[8%] top-16 size-[26rem] rounded-full bg-[#38BDF8]/[0.07] blur-[120px]" />
      </div>

      <Reveal>
        <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
          <span aria-hidden className="h-px w-7 bg-[#2563EB]/50" />
          Our story
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-poppins)] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.028em] text-[#0F172A]">
          A decade, five turning points
        </h3>
      </Reveal>

      <motion.ol
        variants={cardStack}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        /* six columns so the last row holds two half-width cards rather than
           leaving an orphan gap where a fourth would sit */
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6"
      >
        {MILESTONES.map((m, i) => {
          const Icon = MILESTONE_ICONS[m.year] ?? Sparkles;
          const wide = i >= MILESTONES.length - 2;

          return (
            <motion.li
              key={m.year}
              variants={cardItem}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/70 bg-white/70 p-7 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.6)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-[#2563EB]/25 hover:shadow-[0_36px_70px_-32px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 ${
                wide ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[#2563EB]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="relative grid size-16 place-content-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] shadow-[0_14px_30px_-14px_rgba(37,99,235,0.8)] transition-shadow duration-500 group-hover:shadow-[0_18px_44px_-12px_rgba(37,99,235,1)]">
                <Icon aria-hidden className="size-7 text-white" />
              </span>

              <time
                dateTime={m.year}
                className="relative mt-6 block font-[family-name:var(--font-poppins)] text-[clamp(1.9rem,2.6vw,2.4rem)] font-extrabold leading-none tracking-[-0.03em] text-[#2563EB]"
              >
                {m.year}
              </time>

              <h4 className="relative mt-3 font-[family-name:var(--font-poppins)] text-[19px] font-bold leading-snug tracking-[-0.015em] text-[#0F172A]">
                {m.title}
              </h4>
              <p className="relative mt-2.5 text-[14.5px] leading-[1.8] text-[#475569]">{m.copy}</p>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}

/* ---------------------------------- cta ----------------------------------- */

/** Course CTA paired with a direct line to a counsellor. */
function CallToAction() {
  const { phone } = MEGA_FOOTER.contact;

  return (
    <Reveal delay={0.1} y={18}>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href="#programs"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0F172A] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.9)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_22px_48px_-18px_rgba(37,99,235,0.8)]"
        >
          Find your course
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="group inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 py-2 pl-2 pr-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.04] backdrop-blur-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_26px_54px_-30px_rgba(37,99,235,0.55)] motion-reduce:hover:translate-y-0"
        >
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#2563EB]/12 to-[#38BDF8]/12 ring-1 ring-inset ring-[#2563EB]/15 transition-transform duration-500 group-hover:scale-105"
          >
            <Phone className="size-4 text-[#2563EB]" />
          </span>
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.16em] text-[#64748B]">
              Talk to a counsellor
            </span>
            <span className="block text-[14.5px] font-semibold tracking-[-0.01em] text-[#0F172A]">
              {phone}
            </span>
          </span>
        </a>
      </div>
    </Reveal>
  );
}

/* --------------------------------- collage -------------------------------- */

const collage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const frame: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const glassIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function AboutCollage() {
  const [first, second] = GALLERY.secondary;

  return (
    <motion.div
      variants={collage}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      className="relative"
    >
      {/* featured team photograph, sitting on a tilted ghost card for depth */}
      <motion.figure variants={frame} className="relative">
        <span
          aria-hidden
          className="absolute -inset-2 -z-10 rotate-[1.4deg] rounded-[28px] bg-gradient-to-br from-[#2563EB]/12 via-[#38BDF8]/8 to-transparent"
        />
        <span
          aria-hidden
          className="absolute -inset-1 -z-10 -rotate-[0.8deg] rounded-[26px] bg-white shadow-[0_20px_50px_-34px_rgba(15,23,42,0.6)]"
        />

        <Shot
          {...GALLERY.featured}
          priority
          sizes="(max-width: 1023px) 92vw, 46vw"
          /* 4:3 matches the group photo, so no one gets cropped out of frame */
          className="aspect-[4/3]"
        >
          <figcaption className="absolute inset-x-5 bottom-5 flex items-center gap-2 sm:inset-x-6 sm:bottom-6">
            <span aria-hidden className="size-1.5 rounded-full bg-[#60A5FA]" />
            <span className="font-[family-name:var(--font-poppins)] text-[15px] font-semibold tracking-[-0.01em] text-white drop-shadow-sm sm:text-[17px]">
              {GALLERY.featured.caption}
            </span>
          </figcaption>

          <GlassChip float className="absolute right-4 top-4 sm:right-6 sm:top-6">
            {GALLERY.featured.chip}
          </GlassChip>
        </Shot>

        {/* the one credential card that floats clear of the photograph */}
        <YearsBadge />
      </motion.figure>

      {/* two supporting frames, 50/50 */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-5 sm:gap-5">
        {[first, second].map((shot) => (
          <motion.figure key={shot.src} variants={frame} className="relative">
            <Shot {...shot} sizes="(max-width: 1023px) 45vw, 23vw" className="aspect-[4/3]">
              <figcaption className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4">
                <span className="font-[family-name:var(--font-poppins)] text-[12px] font-semibold text-white drop-shadow-sm sm:text-[13.5px]">
                  {shot.caption}
                </span>
              </figcaption>
              <GlassChip float className="absolute inset-x-3.5 top-3.5 sm:inset-x-4 sm:top-4">
                {shot.chip}
              </GlassChip>
            </Shot>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * A photographic frame: 24px corners, soft shadow, gradient scrim for legible
 * overlays, zoom on hover and a lift on the whole card. Falls back to a branded
 * gradient carrying the caption when the file is not in place yet.
 */
function Shot({
  src,
  alt,
  caption,
  sizes,
  className,
  priority = false,
  scrim = true,
  children,
}: {
  src: string;
  alt: string;
  caption: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** the dark wash exists to keep overlays legible — off for bare portraits */
  scrim?: boolean;
  children?: ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EEF2FF] via-[#E0F2FE] to-[#F8FAFC] shadow-[0_18px_45px_-24px_rgba(15,23,42,0.45)] ring-1 ring-inset ring-slate-900/[0.06] transition-[transform,box-shadow] duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:shadow-[0_36px_72px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0 ${className ?? ""}`}
    >
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover transition-[transform,opacity] duration-[900ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          } ${reduce ? "" : "group-hover:scale-[1.07]"}`}
        />
      )}

      {/* scrim keeps the overlays legible, and gives the placeholder depth */}
      {scrim && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"
        />
      )}

      {failed && (
        <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-[12.5px] font-medium text-[#64748B]">
          {caption}
          <span className="mt-1 block text-[11px] text-[#94A3B8]">Add {src}</span>
        </p>
      )}

      {children}
    </div>
  );
}

/** Glassmorphism information pill laid over a photograph. */
function GlassChip({
  children,
  float = false,
  className = "",
}: {
  children: ReactNode;
  float?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const drift = float && !reduce;

  // the reveal lives on the outer span so the inner one keeps the idle float
  // to itself — one element cannot run a variant and a loop on the same axis
  return (
    <motion.span variants={glassIn} className={`block ${className}`}>
      <motion.span
        animate={drift ? { y: [0, -5, 0] } : undefined}
        transition={drift ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/35 bg-white/20 px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.01em] text-white shadow-[0_10px_30px_-14px_rgba(2,6,23,0.85)] backdrop-blur-xl sm:px-3.5 sm:text-[11.5px]"
      >
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-[#60A5FA] shadow-[0_0_10px_2px_rgba(96,165,250,0.7)]"
        />
        <span className="truncate">{children}</span>
      </motion.span>
    </motion.span>
  );
}

/** White credential card floating off the top-left corner of the hero photo. */
function YearsBadge() {
  const reduce = useReducedMotion();

  return (
    <motion.div variants={glassIn} className="absolute -left-2 -top-5 z-10 sm:-left-5 sm:-top-6">
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/80 px-3.5 py-2.5 shadow-[0_22px_50px_-24px_rgba(37,99,235,0.65)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3"
      >
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] font-[family-name:var(--font-poppins)] text-[11px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,0.9)]"
        >
          {GALLERY.badge.value.replace("+", "")}
        </span>
        <span className="leading-tight">
          <span className="block font-[family-name:var(--font-poppins)] text-[13.5px] font-extrabold tracking-[-0.01em] text-[#0F172A] sm:text-[14.5px]">
            {GALLERY.badge.value}
          </span>
          <span className="block text-[10.5px] text-[#64748B] sm:text-[11.5px]">
            {GALLERY.badge.label}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}
