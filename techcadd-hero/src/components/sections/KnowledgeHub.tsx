"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Flame } from "lucide-react";
import { formatDate } from "@/lib/blog/format";
import type { Article, CategorySummary } from "@/lib/blog/types";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";

/**
 * Category pill colours, cycled by position.
 *
 * Not a CMS field: a gradient is a design decision an editor has no way to
 * judge, and one bad value would break a card. Cycling keeps neighbouring
 * cards distinct, which is all the variation was ever for.
 */
const TONES = [
  "from-[#142C8E] to-[#2563EB]",
  "from-[#0891B2] to-[#60A5FA]",
  "from-[#0D9488] to-[#60A5FA]",
  "from-[#60A5FA] to-[#C026D3]",
];

interface KnowledgeHubProps {
  /** Newest first. The first is given the large panel. */
  articles: Article[];
  /** The categories that actually have articles in them. */
  topics: CategorySummary[];
}

/**
 * The homepage window onto the blog.
 *
 * Articles are fetched on the server and passed in. With none — an empty blog,
 * or a CMS that could not be reached — the section removes itself rather than
 * rendering a hub with nothing in it.
 */
export default function KnowledgeHub({ articles, topics }: KnowledgeHubProps) {
  const [hero, ...others] = articles;
  const secondary = others.slice(0, 2);
  const trending = others.slice(2);

  if (!hero) return null;

  return (
    <section id="blog" className="relative overflow-x-clip bg-[#050B1F] section-pad">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <SectionHeading
          tone="light"
          eyebrow="Knowledge hub"
          title="Techcadd Knowledge Hub"
          sub="Written by the mentors who teach here — interview prep, stack decisions and career notes."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* featured hero article */}
          <Reveal className="lg:col-span-7">
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[30px] bg-gradient-to-br from-[#2563EB] to-[#2563EB] p-9 text-white shadow-[0_30px_70px_-38px_rgba(37,99,235,0.95)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-white/15 blur-3xl"
              />

              <div className="relative flex items-center gap-2.5">
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] ring-1 ring-inset ring-white/30">
                  {hero.category.name}
                </span>
                {hero.trending && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                    <Flame aria-hidden className="size-3" />
                    Trending
                  </span>
                )}
              </div>

              <h3 className="relative mt-6 max-w-xl font-[family-name:var(--font-poppins)] text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold leading-[1.18] tracking-[-0.02em]">
                {/* The whole panel is the link target — one keyboard stop, and
                    the heading stays the accessible name for it. */}
                <Link href={`/blog/${hero.slug}`} className="after:absolute after:inset-0">
                  {hero.title}
                </Link>
              </h3>
              <p className="relative mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
                {hero.excerpt}
              </p>

              <div className="relative mt-8 flex flex-wrap items-center gap-4 border-t border-white/20 pt-6">
                <span className="grid size-11 place-items-center rounded-full bg-white/20 font-[family-name:var(--font-poppins)] text-[14px] font-bold ring-1 ring-inset ring-white/30">
                  {hero.author.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="mr-auto">
                  <span className="block text-[14px] font-semibold">{hero.author.name}</span>
                  <span className="block text-[12.5px] text-white/70">{hero.author.role}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-white/80">
                  <Clock aria-hidden className="size-3.5" />
                  {hero.readingTime} min read
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </motion.article>
          </Reveal>

          {/* secondary articles */}
          <div className="grid gap-6 lg:col-span-5">
            {secondary.map((p, i) => (
              <Reveal key={p.id} delay={0.08 + i * 0.06}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
<<<<<<< HEAD
                  className="group relative h-full rounded-[26px] border border-slate-200/80 bg-white p-7 shadow-[0_14px_40px_-32px_rgba(15,23,42,0.8)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-34px_rgba(37,99,235,0.55)]"
=======
                  className="group h-full rounded-[26px] border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-7 shadow-[0_14px_40px_-32px_rgba(15,23,42,0.8)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-34px_rgba(37,99,235,0.55)]"
>>>>>>> 846a78cb9390a2bc067ce316d489cb2e71af6a80
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`rounded-full bg-gradient-to-r ${
                        TONES[i % TONES.length]
                      } px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white`}
                    >
                      {p.category.name}
                    </span>
                    {p.trending && (
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#F59E0B]">
                        <Flame aria-hidden className="size-3.5" />
                        Trending
                      </span>
                    )}
                  </div>

<<<<<<< HEAD
                  <h3 className="mt-4 font-[family-name:var(--font-poppins)] text-[18px] font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#2563EB]">
                    <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
=======
                  <h3 className="mt-4 font-[family-name:var(--font-poppins)] text-[18px] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#2563EB]">
                    {p.title}
>>>>>>> 846a78cb9390a2bc067ce316d489cb2e71af6a80
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/65">{p.excerpt}</p>

<<<<<<< HEAD
                  <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 text-[12.5px] text-[#64748B]">
                    <span className="font-medium text-[#0F172A]">{p.author.name}</span>
=======
                  <div className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4 text-[12.5px] text-white/50">
                    <span className="font-medium text-white">{p.author}</span>
>>>>>>> 846a78cb9390a2bc067ce316d489cb2e71af6a80
                    <span aria-hidden>·</span>
                    <span>{formatDate(p.publishedAt)}</span>
                    <span className="ml-auto inline-flex items-center gap-1.5">
                      <Clock aria-hidden className="size-3.5" />
                      {p.readingTime} min
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>

          {/* trending list */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-full rounded-[26px] border border-[rgba(80,130,255,0.2)] bg-[#F8FAFC] p-7">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/40">
                <Flame aria-hidden className="size-3.5 text-[#F59E0B]" />
                Trending this month
              </p>

              <ol className="mt-5 divide-y divide-slate-200">
                {trending.map((p, i) => (
                  <li key={p.id}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex items-start gap-5 py-4 transition-colors"
                    >
                      <span className="font-[family-name:var(--font-poppins)] text-[20px] font-extrabold text-slate-300 transition-colors duration-300 group-hover:text-[#2563EB]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#2563EB]">
                          {p.title}
                        </span>
<<<<<<< HEAD
                        <span className="mt-1 block text-[12.5px] text-[#64748B]">
                          {p.category.name} · {p.author.name} · {p.readingTime} min read
=======
                        <span className="mt-1 block text-[12.5px] text-white/50">
                          {p.category} · {p.author} · {p.minutes} min read
>>>>>>> 846a78cb9390a2bc067ce316d489cb2e71af6a80
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2563EB]"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* popular topics */}
          <Reveal delay={0.16} className="lg:col-span-5">
            <div className="h-full rounded-[26px] border border-[rgba(80,130,255,0.2)] bg-[rgba(10,15,35,0.75)] backdrop-blur-[20px] p-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                Popular topics
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
<<<<<<< HEAD
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <Link
                      href={`/blog?category=${topic.slug}`}
                      className="inline-block rounded-full border border-slate-200 px-4 py-2 text-[13.5px] font-medium text-[#334155] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_10px_24px_-16px_rgba(37,99,235,0.9)]"
=======
                {TOPICS.map((t) => (
                  <li key={t}>
                    <a
                      href="#blog"
                      className="inline-block rounded-full border border-[rgba(80,130,255,0.2)] px-4 py-2 text-[13.5px] font-medium text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_10px_24px_-16px_rgba(37,99,235,0.9)]"
>>>>>>> 846a78cb9390a2bc067ce316d489cb2e71af6a80
                    >
                      {topic.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/blog"
                className="group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2563EB]"
              >
                Browse the full hub
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
