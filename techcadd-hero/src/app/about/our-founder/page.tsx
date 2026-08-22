import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiAward, FiMessageCircle } from "react-icons/fi";

import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import Breadcrumbs from "@/components/courses/Breadcrumbs";
import Reveal from "@/components/UI/Reveal";
import Counter from "@/components/UI/Counter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { FOUNDER_PAGE } from "@/lib/about/founder";
import { whatsappLink } from "@/lib/cta";

/**
 * The founder profile.
 *
 * A static route sitting where /about/[slug] used to render this page. Next
 * prefers a literal segment over a dynamic one, so the URL and every link to it
 * are unchanged — `aboutSlugs()` simply stops generating the old version.
 *
 * A server component throughout: the only client code on the page is `Reveal`
 * and `Counter`, which are imported rather than making the whole route client.
 */

export const metadata: Metadata = {
  title: `${FOUNDER_PAGE.hero.name} | Founder & CEO, TechCadd`,
  description: `${FOUNDER_PAGE.hero.name}, ${FOUNDER_PAGE.hero.role} of TechCadd — the conviction the institute was started on, the decade that followed, and what still decides how it is run.`,
  alternates: { canonical: "/about/our-founder" },
};

const { hero, story, leadership, achievements, message, gallery, cta } = FOUNDER_PAGE;

export default function FounderPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Our Founder", path: "/about/our-founder" },
          ]),
        )}
      />
      <Navbar />

      <main>
        {/* ============================== hero ============================= */}
        <section className="tech-dark relative overflow-hidden pb-20 pt-[104px] lg:pb-28 lg:pt-[132px]">
          <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Founder" },
              ]}
            />

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              {/* ---------------------- introduction ---------------------- */}
              <div className="order-2 lg:order-1">
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.22em] text-[#93C5FD] backdrop-blur-xl">
                    <span aria-hidden className="size-1.5 rounded-full bg-[#FFD21F]" />
                    {hero.eyebrow}
                  </span>
                </Reveal>

                <Reveal delay={0.06}>
                  <h1 className="mt-6 font-[family-name:var(--font-sora)] text-[clamp(2.1rem,4.6vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
                    {hero.name}
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] font-semibold">
                    <span className="text-[#FFD21F]">{hero.role}</span>
                    <span aria-hidden className="size-1 rounded-full bg-white/25" />
                    <span className="text-white/55">{hero.place}</span>
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  {/* separators are decorative, so the list still reads as
                      three plain items to a screen reader */}
                  <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/50">
                    {hero.credentials.map((c, i) => (
                      <li key={c} className="flex items-center gap-3">
                        {i > 0 && (
                          <span aria-hidden className="size-1 rounded-full bg-[#FFD21F]/70" />
                        )}
                        {c}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-xl text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.85] text-white/70">
                    {hero.statement}
                  </p>
                </Reveal>

                {/* years badge */}
                <Reveal delay={0.2}>
                  <div className="mt-8 inline-flex items-center gap-3.5 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 backdrop-blur-xl">
                    <span
                      aria-hidden
                      className="grid size-11 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] font-[family-name:var(--font-sora)] text-[13px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.95)]"
                    >
                      {hero.badge.value}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[14px] font-bold text-white">
                        {hero.badge.label}
                      </span>
                      <span className="block text-[12px] text-white/50">
                        Training since {hero.since}
                      </span>
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      {...whatsappLink()}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_0_34px_-8px_rgba(37,99,235,0.95)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_52px_-6px_rgba(37,99,235,1)] motion-reduce:hover:translate-y-0"
                    >
                      Talk to a Counsellor
                      <FiArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:border-white/50"
                    >
                      Explore Courses
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* ------------------------ portrait ------------------------ */}
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <div className="relative mx-auto max-w-[440px]">
                  {/* the glow the portrait sits in */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(37,99,235,0.4)_0%,transparent_72%)] blur-2xl"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-2 rounded-[34px] bg-[radial-gradient(50%_40%_at_50%_100%,rgba(255,210,31,0.18)_0%,transparent_70%)] blur-2xl"
                  />

                  <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#04103A]">
                    <Image
                      src={hero.image}
                      alt={`${hero.name}, ${hero.role} of TechCadd`}
                      width={608}
                      height={580}
                      priority
                      sizes="(max-width: 1023px) 88vw, 440px"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================= story ============================= */}
        <section className="tech-light relative overflow-hidden py-20 lg:py-28">
          <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
            <Reveal>
              <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
                {story.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-sora)] text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#081B63]">
                {story.heading}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              {/* photograph */}
              <Reveal delay={0.08}>
                <div className="relative lg:sticky lg:top-28">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(37,99,235,0.14)_0%,transparent_72%)] blur-2xl"
                  />
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-[0_30px_70px_-40px_rgba(8,27,99,0.5)]">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) 88vw, 420px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>

              {/* copy, then the timeline */}
              <div>
                {story.paragraphs.map((p, i) => (
                  <Reveal key={p.slice(0, 20)} delay={0.1 + i * 0.05}>
                    <p className="mb-5 text-[15.5px] leading-[1.9] text-[#4B5563]">{p}</p>
                  </Reveal>
                ))}

                {/*
                 * The timeline.
                 *
                 * The rail is a border on the list, not a positioned element, so
                 * it can never fall out of step with the items: it is exactly as
                 * tall as they are, at every breakpoint.
                 */}
                <ol className="mt-10 border-l border-[#2563EB]/20 pl-7">
                  {story.timeline.map((m, i) => (
                    <Reveal key={m.year} delay={i * 0.06}>
                      <li className="relative pb-9 last:pb-0">
                        <span
                          aria-hidden
                          className="absolute -left-[35px] top-1 grid size-4 place-content-center rounded-full border-2 border-white bg-gradient-to-br from-[#142C8E] to-[#2563EB] shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                        />
                        <span className="inline-flex items-center rounded-full bg-[#FFD21F]/20 px-2.5 py-1 font-[family-name:var(--font-mono-face)] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#081B63]">
                          {m.year}
                        </span>
                        <h3 className="mt-2.5 font-[family-name:var(--font-sora)] text-[17px] font-bold leading-snug tracking-[-0.015em] text-[#081B63]">
                          {m.title}
                        </h3>
                        <p className="mt-1.5 text-[14px] leading-[1.8] text-[#4B5563]">
                          {m.description}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* =========================== leadership ========================== */}
        <section className="tech-dark relative overflow-hidden py-20 lg:py-28">
          <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
            <div className="text-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.22em] text-[#93C5FD] backdrop-blur-xl">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#FFD21F]" />
                  {leadership.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-sora)] text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                  {leadership.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.09}>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.8] text-white/55">
                  {leadership.sub}
                </p>
              </Reveal>
            </div>

            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {leadership.cards.map((card, i) => (
                <Reveal key={card.key} delay={0.06 * i} className="h-full">
                  <li className="group h-full list-none rounded-[24px] border border-white/[0.12] bg-white/[0.055] p-7 shadow-[0_20px_50px_-34px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#60A5FA]/45 hover:shadow-[0_34px_70px_-30px_rgba(37,99,235,0.6)] motion-reduce:hover:translate-y-0">
                    <span
                      aria-hidden
                      className="block h-1 w-10 rounded-full bg-gradient-to-r from-[#2563EB] to-[#FFD21F]"
                    />
                    <span className="mt-5 block font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-[#93C5FD]">
                      {card.eyebrow}
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-sora)] text-[18px] font-bold leading-snug tracking-[-0.02em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3.5 text-[14px] leading-[1.85] text-white/60">{card.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ========================== achievements ========================= */}
        <section className="tech-light relative overflow-hidden py-20 lg:py-24">
          <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
            <div className="text-center">
              <Reveal>
                <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
                  {achievements.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-sora)] text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#081B63]">
                  {achievements.heading}
                </h2>
              </Reveal>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {achievements.stats.map((s, i) => (
                <Reveal key={s.key} delay={0.05 * i} className="h-full">
                  <li className="group h-full list-none rounded-[20px] border border-slate-200/70 bg-white p-6 text-center shadow-[0_16px_40px_-28px_rgba(8,27,99,0.45)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[#2563EB]/30 hover:shadow-[0_30px_60px_-28px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0">
                    <Counter
                      to={s.to}
                      suffix={s.suffix}
                      className="block font-[family-name:var(--font-sora)] text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-none tracking-[-0.03em] text-[#081B63]"
                    />
                    <span
                      aria-hidden
                      className="mx-auto mt-3 block h-[3px] w-8 rounded-full bg-gradient-to-r from-[#2563EB] to-[#FFD21F]"
                    />
                    <span className="mt-3 block text-[12.5px] font-medium leading-snug text-[#4B5563] lg:text-[13px]">
                      {s.label}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================ message ============================ */}
        <section className="tech-dark relative overflow-hidden py-20 lg:py-28">
          <div className="relative mx-auto w-full max-w-[900px] px-6 text-center lg:px-8">
            <Reveal>
              <span
                aria-hidden
                className="mx-auto grid size-14 place-content-center rounded-2xl border border-white/12 bg-white/[0.06] text-[#FFD21F] backdrop-blur-xl"
              >
                <FiMessageCircle className="size-6" />
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <blockquote className="mt-8">
                <p className="font-[family-name:var(--font-sora)] text-[clamp(1.25rem,2.6vw,1.9rem)] font-bold leading-[1.5] tracking-[-0.02em] text-white">
                  <span aria-hidden className="text-[#FFD21F]">&ldquo;</span>
                  {message.quote}
                  <span aria-hidden className="text-[#FFD21F]">&rdquo;</span>
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9 flex flex-col items-center">
                {/* the signature rule, standing in for a handwritten mark */}
                <span
                  aria-hidden
                  className="block h-px w-24 bg-gradient-to-r from-transparent via-[#FFD21F] to-transparent"
                />
                <p className="mt-5 font-[family-name:var(--font-sora)] text-[16px] font-bold text-white">
                  {message.name}
                </p>
                <p className="mt-1 text-[12.5px] uppercase tracking-[0.18em] text-[#93C5FD]">
                  {message.role}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================ gallery ============================ */}
        <section className="tech-light relative overflow-hidden py-20 lg:py-28">
          <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
            <div className="text-center">
              <Reveal>
                <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.22em] text-[#2563EB]">
                  {gallery.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-sora)] text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#081B63]">
                  {gallery.heading}
                </h2>
              </Reveal>
            </div>

            {/*
             * A grid rather than a true masonry.
             *
             * CSS columns would reflow the frames into reading order down each
             * column, which scrambles the sequence; `grid-auto-flow: dense` with
             * two frame shapes gives the same staggered look while keeping the
             * order the data is in. Every cell has a fixed ratio, so nothing
             * shifts as the images decode.
             */}
            <ul className="mt-12 grid auto-rows-auto grid-cols-2 gap-4 [grid-auto-flow:dense] sm:gap-5 lg:grid-cols-4">
              {gallery.items.map((item, i) => (
                <Reveal
                  key={item.src + i}
                  delay={0.04 * i}
                  className={item.span === "wide" ? "col-span-2" : ""}
                >
                  <li
                    className={`group relative list-none overflow-hidden rounded-[20px] shadow-[0_18px_44px_-32px_rgba(8,27,99,0.55)] ${
                      item.span === "wide" ? "aspect-[16/10]" : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      /*
                       * Two `sizes`, because the grid has two frame widths.
                       *
                       * A wide frame spans two of four columns — 48vw on a
                       * desktop and the full row on a phone — while a tall one
                       * is a single column. One shared `sizes` describing only
                       * the narrow case had the browser fetching a 384px file
                       * for a 558px slot and scaling it up by half again, which
                       * is exactly as soft as it sounds.
                       */
                      sizes={
                        item.span === "wide"
                          ? "(min-width: 1024px) 48vw, 92vw"
                          : "(min-width: 1024px) 24vw, 46vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04103A]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================== cta ============================== */}
        <section className="tech-dark relative overflow-hidden py-16 lg:py-20">
          <div className="relative mx-auto w-full max-w-[860px] px-6 text-center lg:px-8">
            <Reveal>
              <span
                aria-hidden
                className="mx-auto grid size-12 place-content-center rounded-2xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white shadow-[0_0_28px_-8px_rgba(37,99,235,0.95)]"
              >
                <FiAward className="size-5" />
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-[family-name:var(--font-sora)] text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
                {cta.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.09}>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.8] text-white/55">
                {cta.sub}
              </p>
            </Reveal>

            <Reveal delay={0.13}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_40px_-8px_rgba(37,99,235,0.95)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_62px_-6px_rgba(37,99,235,1)] motion-reduce:hover:translate-y-0"
                >
                  Explore Courses
                  <FiArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  {...whatsappLink()}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/22 bg-white/[0.05] px-8 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/[0.09] motion-reduce:hover:translate-y-0"
                >
                  Talk To Counsellor
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <MegaFooter />
    </>
  );
}
