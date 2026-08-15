"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { COURSES } from "@/lib/site";
import SectionHeading from "@/components/UI/SectionHeading";

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.97, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Image-first course cards, served from public/images. The tone is the duotone
 * a card falls back to if its file ever goes missing, so the grid degrades to
 * something branded rather than to a broken image.
 */
const IMAGERY: Record<string, { src: string; alt: string; tone: string }> = {
  "AI & Machine Learning": {
    src: "/images/ai.webp",
    alt: "A student training a model, with accuracy and loss charts on screen",
    tone: "from-[#1E293B] via-[#243352] to-[#0F172A]",
  },
  "Full Stack Development": {
    // the file on disk is named for the MERN stack it shows
    src: "/images/mern.webp",
    alt: "A developer working across React and Node source on two monitors",
    tone: "from-[#241E3B] via-[#2E2750] to-[#14101F]",
  },
  "Data Science": {
    // the file on disk carries a space in its name, hence the %20
    src: "/images/data-science.webp",
    alt: "An analyst reading a sales dashboard beside a data science process board",
    tone: "from-[#12303A] via-[#164050] to-[#0B1F27]",
  },
  "Cyber Security": {
    src: "/images/cyber.webp",
    alt: "A security analyst watching a live threat map and network monitor",
    tone: "from-[#1B2A4A] via-[#1F3560] to-[#0D1526]",
  },
  "Digital Marketing": {
    src: "/images/digital.webp",
    alt: "A campaign dashboard surrounded by SEO, content and analytics panels",
    tone: "from-[#3A2036] via-[#4A2748] to-[#1E1020]",
  },
  "Cloud & DevOps": {
    src: "/images/cloud.webp",
    alt: "An engineer reviewing a cloud architecture and deployment pipeline",
    tone: "from-[#15303B] via-[#1B4150] to-[#0A1D24]",
  },
};

export default function FeaturedCourses() {
  const reduced = useReducedMotion();

  return (
    <section id="programs" className="relative overflow-x-clip bg-white py-28 lg:py-36">
      {/* faint tint so the cards sit on something other than flat white */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(37,99,235,0.06),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <SectionHeading
          tone="light"
          eyebrow="Featured courses"
          title="Explore Professional Courses"
          sub="Full programmes with structured modules, live projects and mentor-led sessions."
        />

        {/*
         * At xl the first course takes two columns and two rows, leaving
         * exactly five cells for the remaining five cards — a deliberate
         * hierarchy with no orphan gap. Below xl every card is equal, so two
         * columns divide the six evenly.
         */}
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:auto-rows-[300px]"
        >
          {COURSES.map(({ icon: Icon, title, copy, duration }, i) => {
            const art = IMAGERY[title];
            const featured = i === 0;

            return (
              <motion.li
                key={title}
                variants={cardIn}
                className={featured ? "xl:col-span-2 xl:row-span-2" : ""}
              >
                {/*
                 * Three nested elements on purpose: the entrance variant lives
                 * on the <li>, the idle float on this div, and the hover lift
                 * on the card. One element cannot run a variant, a loop and a
                 * CSS transform on the same axis without them fighting.
                 */}
                <motion.div
                  animate={reduced ? undefined : { y: [0, -7, 0] }}
                  transition={
                    reduced
                      ? undefined
                      : {
                          duration: 6.5 + (i % 3),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.45,
                        }
                  }
                  className="group relative h-full rounded-[30px]"
                >
                  {/* gradient border glow, revealed on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-[30px] bg-gradient-to-br from-white/40 via-[#2563EB]/40 to-[#38BDF8]/50 opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <article
                    className={`relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[28px] bg-slate-900 shadow-[0_2px_6px_rgba(15,23,42,0.10),0_14px_30px_-14px_rgba(15,23,42,0.40),0_44px_80px_-44px_rgba(15,23,42,0.60)] transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_4px_10px_rgba(15,23,42,0.12),0_22px_44px_-16px_rgba(15,23,42,0.45),0_60px_110px_-45px_rgba(37,99,235,0.55)] motion-reduce:group-hover:translate-y-0 ${
                      featured ? "min-h-[340px] xl:min-h-[420px]" : "min-h-[300px]"
                    }`}
                  >
                    <CourseShot {...art} title={title} featured={featured} />

                    {/* discipline mark, and the duration floating opposite it */}
                    <span className="absolute left-5 top-5 z-10 grid size-10 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                      <Icon aria-hidden className="size-[18px] text-white" />
                    </span>
                    <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white shadow-[0_10px_26px_-12px_rgba(2,6,23,0.9)] backdrop-blur-xl">
                      <Clock aria-hidden className="size-3.5" />
                      {duration}
                    </span>

                    {/* glass panel carrying the copy */}
                    <div className="relative z-10 m-4 rounded-[22px] border border-white/15 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl transition-colors duration-500 group-hover:bg-white/[0.11] sm:m-5 sm:p-6">
                      <h3
                        className={`font-[family-name:var(--font-sora)] font-bold leading-snug tracking-[-0.02em] text-white ${
                          featured ? "text-[clamp(1.45rem,2.3vw,1.95rem)]" : "text-[19px]"
                        }`}
                      >
                        {title}
                      </h3>
                      <p
                        className={`mt-2.5 text-[13.5px] leading-relaxed text-white/75 ${
                          featured ? "max-w-xl sm:text-[15px]" : ""
                        }`}
                      >
                        {copy}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white">
                        Explore
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </span>
                    </div>

                    {/*
                     * The whole card is the link. It sits outside the glass
                     * panel because the panel is positioned, so a stretched
                     * pseudo-element inside it would only cover the panel.
                     */}
                    <a
                      href="#contact"
                      aria-label={`Explore ${title}`}
                      className="absolute inset-0 z-20 rounded-[28px] outline-none ring-offset-2 ring-offset-slate-900 focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
                    />
                  </article>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/**
 * The photograph plus the scrim that makes text on top of it legible. Falls
 * back to the course's duotone when the file has not been added yet.
 */
function CourseShot({
  src,
  alt,
  tone,
  title,
  featured,
}: {
  src: string;
  alt: string;
  tone: string;
  title: string;
  featured: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${tone}`} />

      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={featured ? "(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 62vw" : "(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 31vw"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* scrim: heavier at the foot, where the copy sits */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/15 transition-opacity duration-500 group-hover:from-slate-950/95"
      />

      {failed && (
        <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-[12.5px] font-medium text-white/45">
          {title}
          <span className="mt-1 block text-[11px] text-white/30">Add {src}</span>
        </p>
      )}
    </>
  );
}
