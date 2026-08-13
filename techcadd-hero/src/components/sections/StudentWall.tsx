"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { WALL } from "@/lib/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";
import Counter from "@/components/UI/Counter";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

/**
 * A social-proof wall rather than a testimonial carousel: one featured story
 * anchors the left, the rest flow through a CSS masonry column layout so the
 * blocks stagger naturally instead of locking to a grid.
 */
export default function StudentWall() {
  const featured = WALL.find((r) => r.featured) ?? WALL[0];
  const rest = WALL.filter((r) => r !== featured);

  return (
    <section id="stories" className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(79,70,229,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            align="left"
            eyebrow="Student success wall"
            title="Careers That Started Here"
          />

          <Reveal delay={0.1}>
            <div className="flex items-center gap-6 rounded-2xl border border-slate-200/80 bg-white px-6 py-4 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]">
              <div>
                <p className="font-[family-name:var(--font-poppins)] text-[28px] font-extrabold leading-none text-[#0F172A]">
                  <Counter to={750} suffix="+" />
                </p>
                <p className="mt-1 text-[12.5px] text-[#64748B]">Verified reviews</p>
              </div>
              <span aria-hidden className="h-10 w-px bg-slate-200" />
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="mt-1.5 text-[12.5px] text-[#64748B]">4.9 average rating</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* featured story */}
          <Reveal className="lg:col-span-5">
            <motion.figure
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[30px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] p-9 text-white shadow-[0_30px_70px_-38px_rgba(37,99,235,0.95)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
              />
              <Quote aria-hidden className="relative size-9 text-white/30" />

              <blockquote className="relative mt-6 flex-1 text-[16.5px] leading-[1.75] text-white/95">
                {featured.quote}
              </blockquote>

              <span className="relative mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-[12.5px] font-semibold ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                <BadgeCheck aria-hidden className="size-3.5" />
                {featured.badge}
              </span>

              <figcaption className="relative mt-6 flex items-center gap-3.5 border-t border-white/20 pt-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/20 font-[family-name:var(--font-poppins)] text-[16px] font-bold ring-1 ring-inset ring-white/30">
                  {initials(featured.name)}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{featured.name}</span>
                  <span className="block text-[13px] text-white/75">{featured.course}</span>
                </span>
              </figcaption>
            </motion.figure>
          </Reveal>

          {/* the wall */}
          <div className="lg:col-span-7">
            <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-5">
              {rest.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.05} className="break-inside-avoid">
                  <motion.figure
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)] transition-shadow duration-500 hover:border-transparent hover:shadow-[0_28px_60px_-32px_rgba(37,99,235,0.55)]"
                  >
                    {/* glow border on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-[#2563EB]/35 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          aria-hidden
                          className={`size-3.5 ${
                            j < r.rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      ))}
                      <span className="sr-only">{r.rating} out of 5</span>
                    </div>

                    <blockquote className="mt-3.5 text-[14.5px] leading-[1.7] text-[#334155]">
                      {r.quote}
                    </blockquote>

                    <span
                      className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${r.tone} px-3 py-1 text-[11.5px] font-semibold text-white`}
                    >
                      <BadgeCheck aria-hidden className="size-3" />
                      {r.badge}
                    </span>

                    <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${r.tone} font-[family-name:var(--font-poppins)] text-[13px] font-bold text-white`}
                      >
                        {initials(r.name)}
                      </span>
                      <span>
                        <span className="block text-[13.5px] font-semibold text-[#0F172A]">
                          {r.name}
                        </span>
                        <span className="block text-[12px] text-[#64748B]">{r.course}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
