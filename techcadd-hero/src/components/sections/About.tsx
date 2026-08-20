"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight, Briefcase, Building2, Phone, Play, Users,
  type LucideIcon,
} from "lucide-react";
import { ABOUT, VALUES } from "@/lib/site";
import { useSite } from "@/lib/cms/site-context";
import Reveal from "@/components/UI/Reveal";
import Counter from "@/components/UI/Counter";
import FounderVision from "@/components/sections/FounderVision";

/**
 * Editorial about page: white throughout, generous spacing, a layered
 * photographic collage opposite the opening statement, founder vision, and
 * mission values in an offset two-column rhythm.
 *
 * The milestone timeline lives on /about (JourneySection), not here.
 */

/**
 * The one credential figure still printed over the media card. The imagery
 * itself moved to SHOWCASE below when the collage became a video.
 */
const GALLERY = {
  badge: { value: "10+", label: "Years Experience" },
};

/**
 * The campus video, and what stands in for it.
 *
 * Nothing sits at `src` yet, so what renders today is `poster` behind a play
 * control. Drop an mp4 at that path and the video takes over with no code
 * change: the fallback is picked at runtime from the media element's error
 * event, not from a build-time check.
 */
const SHOWCASE = {
  src: "/videos/techcadd-campus.mp4",
  poster: "/images/team-photo.webp",
  alt: "Inside the Techcadd Hoshiarpur campus",
  chip: "Industry-Oriented Training",
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
      <div aria-hidden className="h-16 bg-gradient-to-b from-[#101E52] to-white" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        {/* opening statement, with the photo collage opposite */}
        <div className="relative section-pad">
          <AtmosphereLayer />

          <div className="grid gap-16 md:grid-cols-[0.95fr_1.05fr] md:items-start lg:gap-16 xl:gap-24">
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

              <CallToAction />
            </div>

            <AboutVideo />
          </div>
        </div>

        <TrainingFormats />

        <FounderVision />

        {/* mission and values */}
        <div className="section-pad">
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

          <ol className="mt-9 divide-y divide-slate-200 border-t border-slate-200">
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
      <div className="absolute -right-20 top-1/3 size-[30rem] rounded-full bg-[#60A5FA]/[0.09] blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-[#60A5FA]/[0.05] blur-[110px]" />
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

/**
 * Training options beside the headline numbers.
 *
 * The formats used to sit inside the intro column, where they were capped at
 * roughly 47% of the container and could only ever be two across. Given the
 * full width they breathe, and the right half carries the stats that had been
 * crowding the founder section.
 */
function TrainingFormats() {
  return (
    <div className="row g-4 g-lg-5 pb-24 lg:pb-28">
      <div className="col-12 col-lg-7">
        <Reveal>
          <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
            Training options
          </span>
          <h3 className="mt-4 max-w-md font-[family-name:var(--font-poppins)] text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-[1.12] tracking-[-0.028em] text-[#0F172A]">
            Formats that fit around your year
          </h3>
        </Reveal>
        <StatCards />
      </div>

      <div className="col-12 col-lg-5">
        <StatsPanel />
      </div>
    </div>
  );
}

/** Headline numbers, as a vertical panel. */
function StatsPanel() {
  const items: { icon: LucideIcon; value: number; suffix: string; label: string; tint: string }[] = [
    { icon: Users, value: 25000, suffix: "+", label: "Students Trained", tint: "from-[#142C8E] to-[#2563EB]" },
    { icon: Briefcase, value: 10000, suffix: "+", label: "Placements", tint: "from-[#142C8E] to-[#2563EB]" },
    { icon: Building2, value: 500, suffix: "+", label: "Hiring Partners", tint: "from-[#60A5FA] to-[#1D4ED8]" },
  ];

  return (
    <motion.ul
      variants={cardStack}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="row g-3 h-full lg:mt-12"
    >
      {items.map(({ icon: Icon, value, suffix, label, tint }) => (
        <li key={label} className="col-12 col-sm-4 col-lg-12">
          <motion.div
            variants={cardItem}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex h-full items-center gap-4 rounded-[20px] border border-white/70 bg-white/70 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_28px_56px_-30px_rgba(37,99,235,0.5)]"
          >
            <span
              className={`grid size-12 shrink-0 place-content-center rounded-full bg-gradient-to-br ${tint} shadow-[0_12px_28px_-12px_rgba(37,99,235,0.9)]`}
            >
              <Icon aria-hidden className="size-5 text-white" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block font-[family-name:var(--font-poppins)] text-[24px] font-extrabold tracking-[-0.02em] text-[#0F172A]">
                <Counter to={value} suffix={suffix} duration={1.6} />
              </span>
              <span className="mt-0.5 block truncate text-[12.5px] text-[#64748B]">{label}</span>
            </span>
          </motion.div>
        </li>
      ))}
    </motion.ul>
  );
}

/** The programme durations as glass feature cards with a blue accent rail. */
function StatCards() {
  return (
    <motion.dl
      variants={cardStack}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-4 xl:grid-cols-3"
    >
      {STATS.map((s, i) => {
        const numeric = Number(s.value);

        return (
          <motion.div
            key={s.label}
            variants={cardItem}
            className={`group relative overflow-hidden rounded-[24px] border border-white/70 bg-white/60 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.04] backdrop-blur-xl transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 ${
              i === STATS.length - 1 ? "col-span-2 xl:col-span-1" : ""
            }`}
          >
            {/* accent rail draws itself in on hover */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-[0.28] bg-gradient-to-b from-[#142C8E] to-[#2563EB] transition-transform duration-500 ease-out group-hover:scale-y-100"
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

/* ---------------------------------- cta ----------------------------------- */

/** Course CTA paired with a direct line to a counsellor. */
function CallToAction() {
  const { phone } = useSite();

  return (
    <Reveal delay={0.1} y={18}>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href="#programs"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#101E52] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.9)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_22px_48px_-18px_rgba(37,99,235,0.8)]"
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
            className="grid size-10 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15 transition-transform duration-500 group-hover:scale-105"
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

const glassIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function AboutVideo() {
  const reduce = useReducedMotion();
  /* No file at SHOWCASE.src yet, so the poster path is what renders today.
     `onError` on the media element only fires when `src` sits on the <video>
     itself — with a child <source> the event lands on the source element and
     never reaches React's handler, so the fallback would stay hidden. */
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      variants={collage}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      className="relative"
    >
      <motion.div variants={glassIn} className="group relative">
        {/* blue bloom behind the card; hover lifts it rather than moving the card */}
        <span
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[36px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(37,99,235,0.30)_0%,transparent_72%)] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-[#2563EB]/25 bg-[#101E52] shadow-[0_26px_60px_-30px_rgba(15,23,42,0.55)] transition-shadow duration-500 ease-out group-hover:shadow-[0_40px_84px_-28px_rgba(37,99,235,0.6)]">
          {failed ? (
            <>
              <Image
                src={SHOWCASE.poster}
                alt={SHOWCASE.alt}
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 48vw, 46vw"
                className={`object-cover transition-transform duration-[900ms] ease-out ${
                  reduce ? "" : "group-hover:scale-[1.06]"
                }`}
              />

              {/* the fallback needs to read as a video, hence the play control */}
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full border border-white/45 bg-white/20 shadow-[0_18px_40px_-16px_rgba(5,11,31,0.9)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100 sm:size-20">
                  <Play
                    aria-hidden
                    className="ml-[3px] size-6 fill-white text-white sm:size-7"
                  />
                </span>
                <span className="sr-only">Campus video unavailable</span>
              </span>
            </>
          ) : (
            <video
              src={SHOWCASE.src}
              poster={SHOWCASE.poster}
              /* muted is what makes autoplay legal in every browser; without it
                 the element silently refuses to start */
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="metadata"
              controls={reduce === true}
              aria-label={SHOWCASE.alt}
              onError={() => setFailed(true)}
              className={`absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out ${
                reduce ? "" : "group-hover:scale-[1.06]"
              }`}
            />
          )}

          {/* keeps the badges legible over whatever frame is playing */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101E52]/75 via-[#101E52]/15 to-transparent"
          />

          <GlassChip float className="absolute right-4 top-4 sm:right-6 sm:top-6">
            {SHOWCASE.chip}
          </GlassChip>
        </div>

        <YearsBadge />
      </motion.div>
    </motion.div>
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
        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/35 bg-white/20 px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.01em] text-white shadow-[0_10px_30px_-14px_rgba(5,11,31,0.85)] backdrop-blur-xl sm:px-3.5 sm:text-[11.5px]"
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
          className="grid size-9 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] font-[family-name:var(--font-poppins)] text-[11px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,0.9)]"
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
