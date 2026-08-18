"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { COURSES } from "@/lib/site";
import { COURSES as COURSES_CATALOGUE } from "@/lib/courses";
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
    alt: "AI & Machine Learning course artwork",
    tone: "from-[#1E293B] via-[#243352] to-[#0F172A]",
  },
  "Full Stack Development": {
    src: "/images/mern.webp",
    alt: "Full Stack Development course artwork",
    tone: "from-[#241E3B] via-[#2E2750] to-[#14101F]",
  },
  "Data Science": {
    src: "/images/data-science.webp",
    alt: "Data Science course artwork",
    tone: "from-[#12303A] via-[#164050] to-[#0B1F27]",
  },
  "Cyber Security": {
    src: "/images/cyber.webp",
    alt: "Cyber Security course artwork",
    tone: "from-[#1B2A4A] via-[#1F3560] to-[#0D1526]",
  },
  "Digital Marketing": {
    src: "/images/digital.webp",
    alt: "Digital Marketing course artwork",
    tone: "from-[#3A2036] via-[#4A2748] to-[#1E1020]",
  },
  "Cloud & DevOps": {
    src: "/images/cloud.webp",
    alt: "Cloud & DevOps course artwork",
    tone: "from-[#15303B] via-[#1B4150] to-[#0A1D24]",
  },
};

/**
 * Section title -> catalogue slug.
 *
 * The home list and the catalogue name some programmes differently ("Full
 * Stack Development" vs "Full Stack Web Development"), so an exact title match
 * would silently drop those cards back to the index. Aliases bridge the two,
 * and every alias is checked against the catalogue below — a typo fails the
 * build in dev rather than shipping a dead card.
 */
const TITLE_ALIASES: Record<string, string> = {
  "AI & Machine Learning": "artificial-intelligence",
  "Full Stack Development": "full-stack-web-development",
  "Digital Marketing": "digital-marketing",
};

if (process.env.NODE_ENV !== "production") {
  for (const [title, slug] of Object.entries(TITLE_ALIASES)) {
    if (!COURSES_CATALOGUE.some((c) => c.slug === slug)) {
      throw new Error(`FeaturedCourses alias "${title}" points at unknown slug "${slug}"`);
    }
  }
}

const courseHref = (title: string) => {
  const aliased = TITLE_ALIASES[title];
  if (aliased) return `/courses/${aliased}`;

  const match = COURSES_CATALOGUE.find(
    (c) => c.title.toLowerCase() === title.toLowerCase(),
  );
  /* No detail page yet: the catalogue index is a real destination, not a 404. */
  return match ? `/courses/${match.slug}` : "/courses";
};

export default function FeaturedCourses() {
  const reduced = useReducedMotion();

  return (
    <section id="programs" className="relative overflow-x-clip bg-white section-pad">
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
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:auto-rows-[300px]"
        >
          {COURSES.map(({ icon: Icon, title, duration }, i) => {
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

                  {/*
                   * Mobile: no fixed height, a 500px floor, and the image
                   * switches to object-contain below md so the whole artwork —
                   * course name included — is always visible. object-cover on a
                   * portrait-ish card was slicing up to 32% off the sides at
                   * 320px, and the name sits on the left of every image.
                   * From md up the original heights and cover behaviour return.
                   */}
                  <article
                    className={`relative isolate flex flex-col justify-end overflow-hidden md:h-full rounded-[28px] bg-slate-900 shadow-[0_2px_6px_rgba(15,23,42,0.10),0_14px_30px_-14px_rgba(15,23,42,0.40),0_44px_80px_-44px_rgba(15,23,42,0.60)] transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_4px_10px_rgba(15,23,42,0.12),0_22px_44px_-16px_rgba(15,23,42,0.45),0_60px_110px_-45px_rgba(37,99,235,0.55)] motion-reduce:group-hover:translate-y-0 ${
                      featured
                        ? "min-h-[500px] md:min-h-[340px] xl:min-h-[420px]"
                        : "min-h-[500px] md:min-h-[300px]"
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

                    {/*
                     * No title or copy on the card: the artwork already carries
                     * the course name, so repeating it read as duplicated text.
                     * Only the call to action remains.
                     */}
                    <div className="relative z-10 mt-auto m-5 sm:m-5">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.10] px-5 py-3 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-colors duration-500 group-hover:border-white/40 group-hover:bg-white/[0.18]">
                        Explore Course
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </span>
                    </div>

                    {/*
                     * The whole card is the link, and it carries the accessible
                     * name now that no heading is rendered.
                     */}
                    <Link
                      href={courseHref(title)}
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
          className={`object-contain object-center md:object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100 ${
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
