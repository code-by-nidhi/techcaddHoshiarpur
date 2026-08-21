"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * The course rail: every programme the site can open a page for, in one
 * carousel.
 *
 * Embla drives it rather than Swiper, which the project also carries. Swiper's
 * autoplay only stops once the in-flight transition finishes, so pause-on-hover
 * lagged noticeably; Embla's stops on the spot and resumes where it was.
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

export default function CourseSpotlight({ cards }: { cards: SpotlightCard[] }) {
  const reduce = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [
      Autoplay({
        delay: AUTOPLAY_DELAY,
        /* A drag or an arrow press should re-time the rail, not kill it —
           otherwise one stray swipe leaves a dead carousel for the session. */
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ],
  );

  const [canScroll, setCanScroll] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /*
   * Reduced motion parks the rail. It stays a carousel — arrows, drag, swipe
   * and the arrow keys all still work, and every card is in the DOM — it simply
   * does not advance on its own.
   */
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;
    if (reduce) autoplay.stop();
    else autoplay.play();
  }, [emblaApi, reduce]);

  /* If the cards ever fit the viewport there is nowhere to scroll to, and an
     arrow that does nothing is worse than no arrow. */
  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => setCanScroll(emblaApi.canScrollNext() || emblaApi.canScrollPrev());
    sync();
    emblaApi.on("reInit", sync).on("select", sync);
    return () => {
      emblaApi.off("reInit", sync).off("select", sync);
    };
  }, [emblaApi]);

  /**
   * Arrow keys move the rail whenever the region — or anything inside it — has
   * focus. The buttons are the visible affordance; this is what keeps the
   * carousel operable once a card itself is the focused element.
   */
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      role="region"
      aria-roledescription="carousel"
      aria-label="TechCadd courses"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
    >
      {/*
       * The viewport clips the track, so it needs vertical room for the hover
       * lift and its glow — without the padding a raised card is sliced off at
       * the top. The edges fade rather than cut: a looping rail never has a
       * standing first or last card, so the ones mid-entry read as arriving
       * rather than as cropped.
       */}
      <div
        ref={emblaRef}
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        {/*
         * The gutter is left padding inside each slide, and the track carries
         * no negative margin to compensate.
         *
         * That is deliberate, and it is the whole reason the counts come out
         * right. A percentage flex-basis resolves against the track's own
         * width; pulling the track 24px left makes it 24px wider than the
         * viewport, so `20%` becomes a fifth of *that* and five slides no
         * longer fit — measured, the fifth card was 24px short of clearing the
         * edge. With the track exactly the viewport's width, five 20% slides
         * come to precisely 100%.
         *
         * The cost is a 24px inset before the first card, which the edge mask
         * fades over anyway.
         *
         * Arbitrary fractions rather than `w-1/5`, because the app loads
         * bootstrap-grid.min.css, whose same-named utilities are !important and
         * would win.
         */}
        <div className="flex cursor-grab touch-pan-y items-stretch py-[34px] active:cursor-grabbing [backface-visibility:hidden] [transform:translate3d(0,0,0)]">
          {cards.map((card, i) => (
            <div
              key={card.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${cards.length}`}
              /*
               * 1 card on a phone, 2 on a tablet, 4 on a laptop, 5 on a
               * desktop.
               *
               * The last step is a raw media query rather than `xl:`, because
               * Tailwind's xl is 1280px and a 1280px screen is a laptop — it
               * was showing five cards there. 1440 is where a desktop actually
               * starts, and Tailwind has no breakpoint at it.
               */
              className="flex min-w-0 shrink-0 grow-0 basis-full pl-[24px] sm:basis-[50%] lg:basis-[25%] [@media(min-width:1440px)]:basis-[20%]"
            >
              <Link
                href={card.href}
                aria-label={`${card.title} — explore course`}
                className="group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-[rgba(59,130,246,0.25)] bg-white/[0.05] shadow-[0_18px_44px_-30px_rgba(6,14,46,0.9)] outline-none backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-[400ms] ease-out will-change-transform hover:border-[rgba(59,130,246,0.65)] hover:shadow-[0_34px_78px_-24px_rgba(37,99,235,1),0_0_54px_-10px_rgba(96,165,250,0.85)] focus-visible:ring-2 focus-visible:ring-[#60A5FA] motion-safe:hover:-translate-y-2"
              >
                {/*
                 * The banner band.
                 *
                 * A fixed 4:3 box, so every card in the rail has the same image
                 * height whatever the source file is — and since every banner in
                 * the catalogue is itself 4:3, nothing is letterboxed either.
                 * `contain` rather than `cover` so that stays true for artwork
                 * of another shape: it is shown whole on the navy ground instead
                 * of being cropped into.
                 */}
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#0A1437]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw"
                    className="object-contain object-center drop-shadow-[0_6px_18px_rgba(37,99,235,0.45)] transition-transform duration-[600ms] ease-out motion-safe:group-hover:scale-[1.03]"
                  />

                  {/* A wash that only deepens at the very bottom, where the band
                      meets the copy, so the two do not butt together as a seam.
                      Nothing is written over the image: the banners carry their
                      own titles, and a caption on top would collide with them. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1437]/45"
                  />
                </div>

                {/* ------------------------------ copy --------------------- */}
                <div className="flex flex-1 flex-col p-4">
                  <span className="mb-[10px] inline-flex w-fit items-center gap-[6px] rounded-full border border-[rgba(59,130,246,0.35)] bg-[#0A1437]/70 px-[10px] py-[4px] font-[family-name:var(--font-mono-face)] text-[8.5px] uppercase tracking-[0.12em] text-[#BFDBFE]">
                    <span aria-hidden className="size-1 shrink-0 rounded-full bg-[#60A5FA]" />
                    {card.category}
                  </span>

                  {/* Clamped and floored at two lines each, so a one-line title
                      and a two-line one still produce the same card. */}
                  <h3 className="line-clamp-2 min-h-[42px] font-[family-name:var(--font-sora)] text-[16.5px] font-extrabold leading-[1.25] tracking-[-0.02em] text-white">
                    {card.title}
                  </h3>

                  <p className="mt-[8px] line-clamp-2 min-h-[40px] text-[12.5px] leading-[1.6] text-white/70">
                    {card.description}
                  </p>

                  {/* mt-auto: the call to action sits on the same baseline on
                      every card, whatever the copy above it did */}
                  <span className="mt-auto inline-flex items-center gap-[6px] pt-[14px] text-[12.5px] font-semibold text-[#93C5FD] transition-colors duration-[400ms] group-hover:text-white">
                    Explore Course
                    <FiArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-[400ms] group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------- controls ------------------------- */}
      {canScroll && (
        <>
          <RailButton onClick={scrollPrev} side="left" label="Previous courses" />
          <RailButton onClick={scrollNext} side="right" label="Next courses" />
        </>
      )}
    </motion.div>
  );
}

/**
 * A rail arrow.
 *
 * Sits over the mask's fade zone at the edge of the viewport, where there is
 * never a fully visible card to obscure. Hidden below `lg`, where a phone or a
 * tablet swipes instead and an arrow would land on top of a card.
 */
function RailButton({
  onClick,
  side,
  label,
}: {
  onClick: () => void;
  side: "left" | "right";
  label: string;
}) {
  const Icon = side === "left" ? FiChevronLeft : FiChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-content-center rounded-full border border-[rgba(59,130,246,0.4)] bg-[#0A1437]/85 text-white shadow-[0_10px_30px_-12px_rgba(6,14,46,1)] backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 hover:border-[#60A5FA] hover:bg-[#142C8E] focus-visible:ring-2 focus-visible:ring-[#60A5FA] motion-safe:hover:scale-110 lg:grid ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
