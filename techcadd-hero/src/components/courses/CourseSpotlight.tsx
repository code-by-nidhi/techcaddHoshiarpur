"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import "swiper/css";

/**
 * The course rail: every programme the site can open a page for, as a board of
 * lightly tilted cards.
 *
 * Swiper rather than Embla, because this layout needs a *centred* active slide
 * and a class on it to style — `centeredSlides` plus `.swiper-slide-active` are
 * both built in, and reproducing them on top of Embla would mean tracking the
 * selected index in React and re-rendering the whole rail on every step.
 *
 * The cards arrive already resolved from the server component above, so this
 * file owns presentation only — and because that component maps the whole
 * catalogue, a course added to the data, or published in the CMS, appears here
 * without either file changing.
 */

export type SpotlightCard = {
  /** the course this card opens — also the React key */
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
};

/** Milliseconds a card rests before the rail advances. */
const AUTOPLAY_DELAY = 3000;

/**
 * The tilt cycle, in degrees, applied by position rather than by course.
 *
 * Five values for an arbitrarily long catalogue: the pattern repeats every
 * fifth card, which is exactly one desktop screenful, so the board looks
 * hand-pinned wherever it happens to be scrolled to and never settles into a
 * run of identically angled cards.
 */
const TILTS = [-4, 2, 0, -2, 4];

export default function CourseSpotlight({ cards }: { cards: SpotlightCard[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pin-rail relative"
    >
      <Swiper
        modules={[Autoplay, A11y, Keyboard]}
        loop
        grabCursor
        speed={650}
        /* the whole point of the layout: the middle card is the subject */
        centeredSlides
        /*
         * Reduced motion parks the rail rather than removing it. Every card is
         * still in the DOM, and swipe, drag and the arrow keys all still work —
         * it simply does not advance on its own.
         */
        autoplay={
          reduce
            ? false
            : { delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        keyboard={{ enabled: true }}
        a11y={{ prevSlideMessage: "Previous course", nextSlideMessage: "Next course" }}
        /* only the neighbours are decoded up front; a 54-card catalogue would
           otherwise cost fifty-four image requests on first paint */
        lazyPreloadPrevNext={2}
        spaceBetween={18}
        slidesPerView={1.3}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!overflow-visible"
      >
        {cards.map((card, i) => (
          <SwiperSlide key={card.slug} className="!h-auto">
            <article
              className="pin-card group h-full"
              style={{ ["--tilt" as string]: `${TILTS[i % TILTS.length]}deg` }}
            >
              <Link
                href={card.href}
                aria-label={`${card.title} — learn more`}
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[rgba(59,130,246,0.28)] bg-[#14245C]/85 outline-none backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              >
                {/*
                 * A 16:10 band, not the 4:3 the old card used.
                 *
                 * The banners are 4:3, so this does crop them — deliberately.
                 * A pinned card is mostly caption: at 4:3 the artwork was two
                 * thirds of the card and the copy an afterthought, which is the
                 * "images dominate the layout" this replaces. `contain` keeps
                 * the whole banner visible inside the shorter band instead,
                 * letterboxed on the navy rather than cut into.
                 */}
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#0A1437]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 260px, (min-width: 768px) 30vw, 72vw"
                    className="object-contain object-center"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#14245C]/70"
                  />
                </div>

                {/* ------------------------------ copy --------------------- */}
                <div className="flex flex-1 flex-col p-[14px]">
                  <h3 className="line-clamp-2 min-h-[38px] font-[family-name:var(--font-sora)] text-[14.5px] font-extrabold leading-[1.25] tracking-[-0.015em] text-white">
                    {card.title}
                  </h3>

                  <p className="mt-[6px] line-clamp-2 min-h-[34px] text-[11.5px] leading-[1.55] text-white/65">
                    {card.description}
                  </p>

                  <span className="mt-[10px] inline-flex w-fit items-center gap-[5px] rounded-full border border-[rgba(59,130,246,0.35)] bg-[#0A1437]/70 px-[9px] py-[3px] font-[family-name:var(--font-mono-face)] text-[8px] uppercase tracking-[0.12em] text-[#BFDBFE]">
                    <span aria-hidden className="size-1 shrink-0 rounded-full bg-[#60A5FA]" />
                    {card.category}
                  </span>

                  {/* mt-auto: the call to action sits on one baseline across
                      the board, whatever the copy above it did */}
                  <span className="mt-auto inline-flex items-center gap-[5px] pt-[12px] text-[11.5px] font-semibold text-[#93C5FD] transition-colors duration-300 group-hover:text-white">
                    Learn More
                    <FiArrowRight
                      aria-hidden
                      className="size-3 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
