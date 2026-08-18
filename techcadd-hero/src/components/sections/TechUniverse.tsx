"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Building2, Layers, Rocket, ShieldCheck } from "lucide-react";
import { UNIVERSE, type Domain } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";

/** Orbit radius and node size, both as a percentage of the square stage. */
const R = 40;
const NODE = 21;

/** Node centres, in stage percentage units. Twelve o'clock is the first. */
const SEATS = UNIVERSE.map((d, i) => {
  const angle = (-90 + (360 / UNIVERSE.length) * i) * (Math.PI / 180);
  return { id: d.id, x: 50 + R * Math.cos(angle), y: 50 + R * Math.sin(angle) };
});

/** Deterministic motes — no Math.random, so SSR and the client agree. */
const MOTES = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 43) % 100}%`,
  top: `${(i * 67) % 96}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 6 + (i % 5),
  delay: (i % 7) * 0.5,
}));

/**
 * An ecosystem rather than a grid: seven domains seated around a core, wired
 * back to it, with the detail panel reading whichever one is selected.
 */
export default function TechUniverse() {
  const [active, setActive] = useState<Domain>(UNIVERSE[0]);
  const reduced = useReducedMotion();

  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8faff_0%,#eef4ff_100%)] section-pad"
    >
      {/* particle field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
            animate={reduced ? undefined : { y: [0, -26, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
            className="absolute rounded-full bg-[#2563EB]/40"
          />
        ))}
      </div>

      {/* soft glow pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[6%] top-[12%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute -right-[8%] bottom-[6%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.09)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-sora)] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.028em] text-[#0F172A]">
            The TechCadd Technology Universe
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.85] text-[#475569]">
            Explore the technologies, tools, frameworks, and career paths taught across our
            industry-focused programs.
          </p>
        </Reveal>

        <div className="mt-10 grid items-center gap-14 lg:mt-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Ecosystem active={active} onSelect={setActive} reduced={!!reduced} />
          <DetailPanel domain={active} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- ecosystem ------------------------------- */

function Ecosystem({
  active,
  onSelect,
  reduced,
}: {
  active: Domain;
  onSelect: (d: Domain) => void;
  reduced: boolean;
}) {
  return (
    <Reveal>
      <div
        role="tablist"
        aria-label="Technology domains"
        className="relative mx-auto aspect-square w-full max-w-[540px]"
      >
        {/* orbit rings, turning slowly behind everything */}
        {[0, 1].map((ring) => (
          <motion.span
            key={ring}
            aria-hidden
            animate={reduced ? undefined : { rotate: ring ? -360 : 360 }}
            transition={
              reduced ? undefined : { duration: ring ? 90 : 70, repeat: Infinity, ease: "linear" }
            }
            style={{ inset: `${ring ? 4 : 14}%` }}
            className={`pointer-events-none absolute rounded-full border ${
              ring ? "border-dashed border-[#2563EB]/15" : "border-[#2563EB]/10"
            }`}
          />
        ))}

        {/* wires from the core out to each node */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <defs>
            <linearGradient id="wire-live" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={active.accent} stopOpacity="0.15" />
              <stop offset="100%" stopColor={active.accent} stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {SEATS.map((seat) => {
            const live = seat.id === active.id;
            return (
              <line
                key={seat.id}
                x1="50"
                y1="50"
                x2={seat.x}
                y2={seat.y}
                stroke={live ? "url(#wire-live)" : "#2563EB"}
                strokeOpacity={live ? 1 : 0.14}
                strokeWidth={live ? 0.7 : 0.35}
                strokeLinecap="round"
                className="transition-[stroke-width,stroke-opacity] duration-500"
              />
            );
          })}

          {/* a pulse travelling out along the live wire */}
          {!reduced &&
            SEATS.filter((s) => s.id === active.id).map((seat) => (
              <motion.circle
                key={`pulse-${seat.id}`}
                r="0.85"
                fill={active.accent}
                initial={{ cx: 50, cy: 50, opacity: 0 }}
                animate={{ cx: [50, seat.x], cy: [50, seat.y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
        </svg>

        {/* the core */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={reduced ? undefined : { scale: [1, 1.035, 1] }}
            transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid size-[132px] place-content-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#60A5FA_0%,#2563EB_46%,#1E3A8A_100%)] text-center shadow-[0_0_0_10px_rgba(37,99,235,0.07),0_0_0_22px_rgba(37,99,235,0.04),0_28px_60px_-24px_rgba(37,99,235,0.9)] sm:size-[164px]"
          >
            {/* specular highlight, so the sphere reads as a sphere */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.55)_0%,transparent_42%)]"
            />
            <span className="relative font-[family-name:var(--font-sora)] text-[17px] font-extrabold tracking-[-0.02em] text-white sm:text-[20px]">
              TechCadd
            </span>
            <span className="relative mt-1 px-4 text-[10.5px] font-medium leading-tight text-white/75 sm:text-[11.5px]">
              7 Technology Domains
            </span>
          </motion.div>
        </div>

        {/* the domains */}
        {UNIVERSE.map((d, i) => {
          const seat = SEATS[i];
          const live = d.id === active.id;

          return (
            <motion.button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={live}
              aria-controls="universe-panel"
              onClick={() => onSelect(d)}
              style={{
                left: `${seat.x}%`,
                top: `${seat.y}%`,
                width: `${NODE}%`,
                height: `${NODE}%`,
              }}
              animate={reduced ? undefined : { y: [0, -7, 0] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 5.5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }
              }
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.96 }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              <span
                className={`grid size-full place-content-center rounded-full border p-2 text-center backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-500 ${
                  live
                    ? "scale-[1.08] border-white/90 bg-white text-[#0F172A] shadow-[0_18px_44px_-14px_var(--tone)]"
                    : "border-white/80 bg-white/70 text-[#475569] shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)] hover:bg-white"
                }`}
                style={{ ["--tone" as string]: `${d.accent}cc` }}
              >
                <span
                  aria-hidden
                  className="mx-auto mb-1 block size-2 rounded-full transition-transform duration-500"
                  style={{
                    background: d.accent,
                    boxShadow: live ? `0 0 12px 3px ${d.accent}` : "none",
                  }}
                />
                <span className="block text-[10px] font-semibold leading-[1.25] tracking-[-0.01em] sm:text-[11.5px]">
                  {d.short}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </Reveal>
  );
}

/* --------------------------------- panel ---------------------------------- */

const GROUP_DELAY = 0.06;

function DetailPanel({ domain }: { domain: Domain }) {
  return (
    <Reveal delay={0.08}>
      <div
        id="universe-panel"
        role="tabpanel"
        aria-live="polite"
        className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/70 p-7 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.5)] backdrop-blur-[20px] sm:p-9"
      >
        {/* the panel takes a wash of the active domain's colour */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-25 blur-3xl transition-colors duration-700"
          style={{ background: domain.accent }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: GROUP_DELAY } } }}
            >
              <Group>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em]"
                  style={{ background: `${domain.accent}14`, color: domain.accent }}
                >
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full"
                    style={{ background: domain.accent }}
                  />
                  Domain
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-sora)] text-[clamp(1.4rem,2.2vw,1.85rem)] font-extrabold leading-tight tracking-[-0.025em] text-[#0F172A]">
                  {domain.label}
                </h3>
              </Group>

              <Group>
                <Label icon={Layers}>Technologies</Label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {domain.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#334155] shadow-[0_6px_16px_-12px_rgba(15,23,42,0.6)] transition-colors duration-300 hover:border-[color:var(--tone)] hover:text-[color:var(--tone)]"
                      style={{ ["--tone" as string]: domain.accent }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Group>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <Group>
                  <Label icon={Rocket}>Projects</Label>
                  <List items={domain.projects} accent={domain.accent} />
                </Group>

                <Group>
                  <Label icon={Briefcase}>Career Paths</Label>
                  <List items={domain.careers} accent={domain.accent} />
                </Group>
              </div>

              <Group>
                <Label icon={Building2}>Industry Uses</Label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {domain.industries.map((u) => (
                    <span
                      key={u}
                      className="rounded-xl px-3 py-1.5 text-[12.5px] font-medium"
                      style={{ background: `${domain.accent}12`, color: domain.accent }}
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </Group>

              <Group>
                <div
                  className="mt-7 flex items-center gap-3.5 rounded-2xl p-4"
                  style={{ background: `${domain.accent}0f` }}
                >
                  <span
                    className="grid size-11 shrink-0 place-content-center rounded-xl text-white shadow-[0_12px_26px_-12px_rgba(15,23,42,0.7)]"
                    style={{ background: domain.accent }}
                  >
                    <ShieldCheck aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em] text-[#64748B]">
                      Placement focus
                    </span>
                    <span className="mt-0.5 block font-[family-name:var(--font-poppins)] text-[16px] font-extrabold tracking-[-0.015em] text-[#0F172A]">
                      {domain.placement}
                    </span>
                  </span>
                </div>
              </Group>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

function Label({
  icon: Icon,
  children,
}: {
  icon: typeof Layers;
  children: React.ReactNode;
}) {
  return (
    <p className="mt-7 flex items-center gap-2 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em] text-[#64748B] first:mt-0">
      <Icon aria-hidden className="size-3.5 text-[#94A3B8]" />
      {children}
    </p>
  );
}

function List({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#475569]">
          <span
            aria-hidden
            className="mt-[7px] size-1.5 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
