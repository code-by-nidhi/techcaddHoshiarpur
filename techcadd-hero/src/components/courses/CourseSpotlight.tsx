"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/effect-coverflow";

/**
 * The course rail: every programme the site can open a page for, on a curved
 * 3D carousel.
 *
 * Swiper rather than Embla, and specifically Swiper's coverflow effect. The
 * curve is not a stack of CSS transforms written by hand — it is a per-slide
 * rotation and Z translation recomputed on every frame of the drag, which is
 * what makes the fan hold together while it moves. Embla positions slides on a
 * single axis and would need all of that written from scratch.
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

/**
 * Milliseconds a card rests before the rail advances.
 *
 * With SLIDE_SPEED below, one card costs 2300 + 450 = 2750ms of wall clock,
 * against 4200ms before — a third quicker end to end, which is what makes the
 * rail read as responsive rather than as something waiting on you.
 *
 * The dwell is still comfortably longer than the transition: drop it much under
 * two seconds and the fan never settles, which reads as drift rather than as
 * steps.
 */
const AUTOPLAY_DELAY = 2300;

/**
 * How long one card takes to travel.
 *
 * 450ms is about the shortest a 3D rotation of this depth can run and still
 * arrive rather than snap — the eye needs roughly a third of a second to follow
 * a card through the curve.
 */
const SLIDE_SPEED = 450;

/** Decorative motes drifting behind the fan. Positions are fixed, not random,
    so the server and the client agree on the markup. */
const PARTICLES = [
  { left: "8%", top: "22%", size: 3, drift: 18, duration: 7.5, delay: 0 },
  { left: "21%", top: "68%", size: 2, drift: 14, duration: 9, delay: 1.1 },
  { left: "37%", top: "12%", size: 2, drift: 16, duration: 8.2, delay: 2.2 },
  { left: "54%", top: "78%", size: 3, drift: 20, duration: 10, delay: 0.6 },
  { left: "69%", top: "18%", size: 2, drift: 13, duration: 8.8, delay: 1.7 },
  { left: "83%", top: "62%", size: 3, drift: 17, duration: 9.4, delay: 2.9 },
  { left: "93%", top: "32%", size: 2, drift: 15, duration: 11, delay: 0.3 },
];

export default function CourseSpotlight({ cards }: { cards: SpotlightCard[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="coverflow-rail relative"
    >
      {/* ---------------------- light behind the fan ---------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* the pool the centred card sits in */}
        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.34)_0%,rgba(96,165,250,0.12)_45%,transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[16rem] w-[52rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.14),transparent)] blur-2xl" />

        {!reduce &&
          PARTICLES.map((m, i) => (
            <motion.span
              key={i}
              style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
              animate={{ y: [0, -m.drift, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: m.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: m.delay,
              }}
              className="absolute rounded-full bg-[#93c5fd] shadow-[0_0_8px_2px_rgba(147,197,253,0.5)]"
            />
          ))}
      </div>

      <Swiper
        modules={[EffectCoverflow, Autoplay, A11y, Keyboard]}
        effect="coverflow"
        loop
        grabCursor
        speed={SLIDE_SPEED}
        /* the whole point of the layout: the middle card is the subject */
        centeredSlides
        /*
         * The curve.
         *
         * `rotate` is the Y-axis turn each step away from centre adds, `depth`
         * how far back it pushes, and `scale` the shrink per step — together
         * they put the centred card about 25% larger than its neighbours, which
         * is the emphasis the brief asks for. `stretch` is negative so the fan
         * closes up and the cards overlap slightly rather than sitting in a row.
         *
         * `slideShadows` off: Swiper's own shadow layers are flat black panes
         * that read as grey rectangles over a navy section.
         */
        coverflowEffect={{
          rotate: 30,
          stretch: -8,
          depth: 150,
          modifier: 1,
          scale: 0.86,
          slideShadows: false,
        }}
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
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.slug} className="!h-auto">
            <article className="cf-card group h-full">
              <Link
                href={card.href}
                aria-label={`${card.title} — learn more`}
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.14] bg-[linear-gradient(160deg,rgba(30,48,120,0.72),rgba(10,20,55,0.82))] outline-none backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              >
                {/* the blue accent along the top edge, brightest on the
                    centred card — see .coverflow-rail in globals.css */}
                <span aria-hidden className="cf-accent" />

                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#0A1437]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 32vw, (min-width: 640px) 44vw, 78vw"
                    className="object-contain object-center"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1437]/60"
                  />
                </div>

                {/* ------------------------------ copy --------------------- */}
                <div className="flex flex-1 flex-col p-[15px]">
                  <span className="inline-flex w-fit items-center gap-[5px] rounded-full border border-[rgba(96,165,250,0.4)] bg-[linear-gradient(90deg,rgba(37,99,235,0.35),rgba(96,165,250,0.18))] px-[9px] py-[3px] font-[family-name:var(--font-mono-face)] text-[8px] uppercase tracking-[0.12em] text-[#DBEAFE]">
                    <span aria-hidden className="size-1 shrink-0 rounded-full bg-[#60A5FA]" />
                    {card.category}
                  </span>

                  <h3 className="mt-[10px] line-clamp-2 min-h-[40px] font-[family-name:var(--font-sora)] text-[15px] font-extrabold leading-[1.25] tracking-[-0.015em] text-white">
                    {card.title}
                  </h3>

                  <p className="mt-[6px] line-clamp-2 min-h-[34px] text-[11.5px] leading-[1.55] text-white/60">
                    {card.description}
                  </p>

                  {/* mt-auto: the call to action sits on one baseline across
                      the fan, whatever the copy above it did */}
                  <span className="mt-auto inline-flex w-fit items-center gap-[6px] rounded-full bg-[linear-gradient(90deg,#1E3A8A,#2563EB)] px-[14px] py-[7px] text-[11.5px] font-semibold text-white shadow-[0_10px_26px_-12px_rgba(37,99,235,0.95)] transition-[transform,box-shadow] duration-300 group-hover:translate-x-0.5 group-hover:shadow-[0_14px_34px_-10px_rgba(37,99,235,1)] motion-reduce:group-hover:translate-x-0">
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
