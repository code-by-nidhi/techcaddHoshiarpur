"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiAward, FiArrowRight, FiClock, FiLayers, FiMonitor, FiStar, FiTrendingUp,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Course } from "@/lib/courses/types";
import { DEFAULT_HERO } from "@/lib/courses/shared";
import Breadcrumbs from "./Breadcrumbs";
import { whatsappLink } from "@/lib/cta";

/**
 * The hero has to answer three questions before anything else on the page:
 * what this is, who it is for, and why it is worth six months.
 */
export default function CourseHero({ course }: { course: Course }) {
  const facts: { icon: IconType; label: string; value: string }[] = [
    { icon: FiLayers, label: "Category", value: course.category },
    { icon: FiTrendingUp, label: "Level", value: course.level },
    { icon: FiClock, label: "Duration", value: course.duration },
    { icon: FiMonitor, label: "Mode", value: course.mode },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1E3078] pb-16 pt-[104px] lg:pb-20 lg:pt-[128px]">
      {/* brand atmosphere, matching the rest of the site's dark surfaces */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[-10%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22)_0%,transparent_68%)] blur-3xl" />
        <div className="absolute -right-[8%] top-[10%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.26)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
            { label: course.shortTitle ?? course.title },
          ]}
        />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-[#93C5FD] backdrop-blur-xl">
                {course.category}
              </span>

              <h1 className="mt-5 font-[family-name:var(--font-sora)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                {course.title}
              </h1>

              <p className="mt-4 max-w-xl text-[15.5px] leading-[1.8] text-white/70">
                {course.shortDescription}
              </p>
              <p className="mt-3 max-w-xl text-[14px] leading-[1.85] text-white/50">
                {course.overview}
              </p>

              {course.rating && (
                <div className="mt-5 flex items-center gap-2.5">
                  <span className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`size-4 ${
                          i < Math.round(course.rating!.score)
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "text-white/25"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="text-[13.5px] text-white/70">
                    <span className="font-semibold text-white">{course.rating.score}</span> from{" "}
                    {course.rating.count} student reviews
                  </span>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  {...whatsappLink()}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_0_34px_-8px_rgba(37,99,235,0.95)]"
                >
                  Enroll Now
                  <FiArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.a>

                <motion.a
                  {...whatsappLink()}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:border-white/50"
                >
                  Talk to an Expert
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* course image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] ring-1 ring-inset ring-white/10">
              <Image
                src={course.heroImage || DEFAULT_HERO}
                alt={`${course.title} training at TechCadd`}
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 45vw"
                className="object-contain object-center drop-shadow-[0_6px_18px_rgba(37,99,235,0.45)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
              />
            </div>

            {course.certification && (
              <span className="absolute -bottom-4 left-5 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-[#1E3078]/90 px-4 py-2.5 text-[12.5px] font-semibold text-white backdrop-blur-xl">
                <FiAward aria-hidden className="size-4 text-[#93C5FD]" />
                Certificate on completion
              </span>
            )}
          </motion.div>
        </div>

        {/* fact strip */}
        <motion.dl
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl"
            >
              <dt className="flex items-center gap-2 font-[family-name:var(--font-mono-face)] text-[10px] uppercase tracking-[0.18em] text-white/45">
                <Icon aria-hidden className="size-3.5 text-[#93C5FD]" />
                {label}
              </dt>
              <dd className="mt-1.5 text-[14.5px] font-semibold text-white">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
