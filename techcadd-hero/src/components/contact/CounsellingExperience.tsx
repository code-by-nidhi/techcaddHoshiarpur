"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowRight, FiAward, FiBarChart2, FiBriefcase, FiCheck, FiCloud, FiCode, FiCpu,
  FiFileText, FiLayers, FiMail, FiMap, FiMessageCircle, FiPenTool, FiPhone,
  FiTarget, FiTrendingUp, FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { useSite } from "@/lib/cms/site-context";
import { Shell, fadeUp, stagger } from "./shared";

/* ---------------------------------- data ---------------------------------- */

type CareerPath = {
  id: string;
  label: string;
  icon: IconType;
  tint: string;
  roles: string[];
  featured?: boolean;
};

const PATHS: CareerPath[] = [
  {
    id: "mern",
    label: "MERN Stack Development",
    icon: FiLayers,
    tint: "from-[#142C8E] to-[#2563EB]",
    featured: true,
    roles: [
      "Frontend Developer",
      "React Developer",
      "MERN Stack Developer",
      "Full Stack Engineer",
      "Software Engineer",
    ],
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    icon: FiCpu,
    tint: "from-[#142C8E] to-[#2563EB]",
    roles: ["ML Engineer", "AI Developer", "Computer Vision Engineer", "NLP Engineer", "Applied Researcher"],
  },
  {
    id: "data",
    label: "Data Science",
    icon: FiBarChart2,
    tint: "from-[#0891B2] to-[#60A5FA]",
    roles: ["Data Scientist", "Data Analyst", "BI Developer", "Analytics Consultant"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: FiCloud,
    tint: "from-[#0D9488] to-[#60A5FA]",
    roles: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"],
  },
  {
    id: "python",
    label: "Python Development",
    icon: FiCode,
    tint: "from-[#142C8E] to-[#2563EB]",
    roles: ["Python Developer", "Backend Developer", "Automation Engineer", "Django Developer"],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    icon: FiTrendingUp,
    tint: "from-[#1D4ED8] to-[#60A5FA]",
    roles: ["Performance Marketer", "SEO Specialist", "Growth Analyst", "Campaign Manager"],
  },
  {
    id: "cad",
    label: "AutoCAD / Civil CAD",
    icon: FiPenTool,
    tint: "from-[#0F766E] to-[#14B8A6]",
    roles: ["Design Engineer", "CAD Draughtsman", "Civil Designer", "Product Designer"],
  },
];

const STATUSES = [
  "School Student",
  "12th Pass",
  "Diploma Student",
  "College Student",
  "Graduate",
  "Working Professional",
  "Business Owner",
];

const BENEFITS: { icon: IconType; label: string }[] = [
  { icon: FiMap, label: "Career Roadmap" },
  { icon: FiTarget, label: "Technology Selection Guidance" },
  { icon: FiLayers, label: "Project Guidance" },
  { icon: FiUsers, label: "Interview Preparation" },
  { icon: FiFileText, label: "Resume Building" },
  { icon: FiBriefcase, label: "Placement Assistance" },
];

/** Floating proof over the photograph. */
const BADGES: { icon: IconType; label: string; place: string; delay: number }[] = [
  { icon: FiUsers, label: "1000+ Students Trained", place: "-left-3 top-6 sm:-left-6", delay: 0 },
  {
    icon: FiBriefcase,
    label: "Placement Assistance",
    place: "-right-2 top-1/2 -translate-y-1/2 sm:-right-6",
    delay: 1.1,
  },
  { icon: FiAward, label: "Industry Mentors", place: "-left-3 bottom-8 sm:-left-6", delay: 2.2 },
];

/* -------------------------------- component ------------------------------- */

export default function CounsellingExperience() {
  const [path, setPath] = useState<CareerPath>(PATHS[0]);
  const [status, setStatus] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { phoneDigits, email } = useSite();

  /**
   * The selections are not decorative: they are folded into the WhatsApp and
   * email deep links, so a counsellor opens the chat already knowing what the
   * student picked.
   */
  const intro = `Hi TechCadd, I'd like free career counselling for ${path.label}${
    status ? ` (${status})` : ""
  }.`;
  const whatsapp = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(intro)}`;
  const mail = `mailto:${email}?subject=${encodeURIComponent(
    `Free counselling - ${path.label}`,
  )}&body=${encodeURIComponent(intro)}`;

  return (
    <section id="book" className="relative scroll-mt-28 overflow-x-clip bg-white py-24 lg:py-32">
      {/* the faintest blue wash, so the whitespace still reads as branded */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(37,99,235,0.05),transparent_70%)]"
      />

      <Shell>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="row g-5 align-items-stretch"
        >
          {/* photograph */}
          <div className="col-12 col-lg-5">
            <motion.div
              variants={fadeUp}
              className="relative mx-auto h-full max-w-[460px] px-3 sm:px-8 lg:px-0"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[44px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.16),transparent_62%),radial-gradient(circle_at_75%_85%,rgba(96,165,250,0.14),transparent_62%)] blur-2xl"
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#EEF2FF] via-[#E0F2FE] to-[#F8FAFC] shadow-[0_30px_70px_-34px_rgba(15,23,42,0.5)] ring-1 ring-inset ring-slate-900/[0.06] lg:h-full">
                <Image
                  src="/images/form.webp"
                  alt="Students working at the machines in a TechCadd lab"
                  fill
                  sizes="(max-width: 991px) 88vw, 38vw"
                  className="object-cover object-center"
                />
              </div>

              {BADGES.map(({ icon: Icon, label, place, delay }) => (
                <motion.div
                  key={label}
                  animate={reduced ? undefined : { y: [0, -9, 0] }}
                  transition={
                    reduced ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay }
                  }
                  className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 px-3.5 py-2.5 shadow-[0_18px_44px_-22px_rgba(15,23,42,0.5)] backdrop-blur-xl ${place}`}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_10px_22px_-10px_rgba(37,99,235,0.9)]">
                    <Icon aria-hidden className="size-[15px] text-white" />
                  </span>
                  <span className="text-[12.5px] font-semibold tracking-[-0.01em] text-[#0F172A]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* guidance card */}
          <div className="col-12 col-lg-7">
            <motion.div
              variants={fadeUp}
              className="h-full rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-8 lg:p-9"
            >
              <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-tight tracking-[-0.028em] text-[#0F172A]">
                Book Your Free Career Counselling Session
              </h2>
              <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.8] text-[#475569]">
                Get personalized guidance from industry experts and choose the right technology path
                for your future.
              </p>

              {/* career paths */}
              <Legend>Choose your career path</Legend>
              <div
                role="radiogroup"
                aria-label="Career path"
                className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
              >
                {PATHS.map((p) => (
                  <PathCard
                    key={p.id}
                    path={p}
                    selected={p.id === path.id}
                    onSelect={() => setPath(p)}
                  />
                ))}
              </div>

              {/* roles for the selected path */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 rounded-[20px] border border-[#2563EB]/12 bg-[#2563EB]/[0.04] p-5"
                >
                  <p className="font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em] text-[#64748B]">
                    Roles you can target
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {path.roles.map((role, i) => (
                      <motion.li
                        key={role}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#334155] shadow-[0_6px_16px_-12px_rgba(15,23,42,0.6)]"
                      >
                        {role}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* student status */}
              <Legend>Where are you right now?</Legend>
              <div role="radiogroup" aria-label="Current status" className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((s) => {
                  const on = s === status;
                  return (
                    <motion.button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setStatus(on ? null : s)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 340, damping: 22 }}
                      className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                        on
                          ? "bg-gradient-to-r from-[#142C8E] to-[#2563EB] text-white shadow-[0_0_28px_-6px_rgba(37,99,235,0.95)]"
                          : "border border-slate-200 bg-white text-[#475569] hover:border-[#2563EB]/35 hover:text-[#2563EB]"
                      }`}
                    >
                      {s}
                    </motion.button>
                  );
                })}
              </div>

              {/* what the session covers */}
              <Legend>What your session covers</Legend>
              <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {BENEFITS.map(({ icon: Icon, label }) => (
                  <motion.li
                    key={label}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/70 px-3.5 py-3 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] backdrop-blur-xl"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB]/12 to-[#60A5FA]/12 ring-1 ring-inset ring-[#2563EB]/15">
                      <Icon aria-hidden className="size-3.5 text-[#2563EB]" />
                    </span>
                    <span className="text-[12.5px] font-medium leading-snug text-[#334155]">
                      {label}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* direct contact */}
              <Legend>Talk to us now</Legend>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <ActionButton
                  icon={FiPhone}
                  label="Call Now"
                  href={`tel:+${phoneDigits}`}
                  tint="from-[#142C8E] to-[#2563EB]"
                />
                <ActionButton
                  icon={FiMessageCircle}
                  label="WhatsApp"
                  href={whatsapp}
                  external
                  tint="from-[#22C55E] to-[#16A34A]"
                />
                <ActionButton
                  icon={FiMail}
                  label="Email Support"
                  href={mail}
                  tint="from-[#60A5FA] to-[#1D4ED8]"
                />
              </div>

              {/* closing CTA */}
              <motion.div
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative mt-7 overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#1E3A8A_0%,#2563EB_45%,#60A5FA_100%)] p-6 text-center shadow-[0_26px_60px_-28px_rgba(37,99,235,0.95)] sm:p-7"
              >
                <motion.span
                  aria-hidden
                  animate={reduced ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
                  transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.4)_0%,transparent_66%)] blur-3xl"
                />

                <p className="relative font-[family-name:var(--font-sora)] text-[19px] font-extrabold tracking-[-0.02em] text-white sm:text-[22px]">
                  Talk To A Career Expert Today
                </p>
                <p className="relative mt-2 text-[12.5px] text-white/75">
                  Free counselling • No obligations • Personalized roadmap
                </p>

                <motion.a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="group relative mt-5 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-[#0F172A] shadow-[0_16px_40px_-14px_rgba(5,11,31,0.6)]"
                >
                  Book Free Session
                  <FiArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}

/* --------------------------------- pieces --------------------------------- */

function Legend({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-7 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em] text-[#64748B]">
      {children}
    </p>
  );
}

/** A career path tile: gradient border and glow when it is the chosen one. */
function PathCard({
  path,
  selected,
  onSelect,
}: {
  path: CareerPath;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = path.icon;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative rounded-[18px] p-px text-left"
    >
      {/* the gradient border lives on the wrapper, so it can light up */}
      <span
        aria-hidden
        className={`absolute inset-0 rounded-[18px] bg-gradient-to-br ${path.tint} transition-opacity duration-300 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      />

      <span
        className={`relative flex items-center gap-3 rounded-[17px] px-3.5 py-3 backdrop-blur-xl transition-colors duration-300 ${
          selected
            ? "bg-white shadow-[0_18px_40px_-22px_rgba(37,99,235,0.85)]"
            : "border border-slate-200/90 bg-white/70 hover:border-[#2563EB]/30"
        }`}
      >
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${path.tint} ${
            selected ? "shadow-[0_10px_24px_-10px_rgba(37,99,235,0.95)]" : "opacity-90"
          }`}
        >
          <Icon aria-hidden className="size-4 text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-[13px] font-semibold tracking-[-0.01em] ${
              selected ? "text-[#0F172A]" : "text-[#334155]"
            }`}
          >
            {path.label}
          </span>
          {path.featured && (
            <span className="mt-0.5 block text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#60A5FA]">
              Most popular
            </span>
          )}
        </span>

        {selected && (
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB]">
            <FiCheck aria-hidden className="size-3 text-white" />
          </span>
        )}
      </span>
    </motion.button>
  );
}

function ActionButton({
  icon: Icon,
  label,
  href,
  tint,
  external = false,
}: {
  icon: IconType;
  label: string;
  href: string;
  tint: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r ${tint} px-4 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_16px_36px_-18px_rgba(15,23,42,0.8)] transition-shadow duration-300 hover:shadow-[0_22px_50px_-16px_rgba(37,99,235,0.75)]`}
    >
      <Icon aria-hidden className="size-4 transition-transform duration-300 group-hover:scale-110" />
      {label}
    </motion.a>
  );
}
