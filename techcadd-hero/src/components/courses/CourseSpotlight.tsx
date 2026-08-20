"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiAward, FiClock } from "react-icons/fi";

/**
 * The homepage course rail: a continuous marquee of course cards.
 *
 * Embla drives it rather than Swiper, which the project already carries.
 * Swiper's autoplay advances one slide per `speed` and only stops once the
 * in-flight transition finishes, so pause-on-hover lagged by seconds on a
 * marquee this slow. Embla's auto-scroll moves a fixed step per frame, so a
 * hover stops it on the spot and leaving resumes at the same rate.
 *
 * The catalogue data arrives already resolved from the server component; this
 * file owns presentation only.
 */

export type SpotlightCard = {
  /** the course this card opens — also the React key */
  slug: string;
  /** display name, which may be broader than one course title (a family card) */
  title: string;
  category: string;
  description: string;
  duration: string;
  placement: string;
  image: string;
  href: string;
};

/**
 * Pixels per frame. Six cards at roughly 316px each is ~1900px of track, so at
 * 60fps one full pass of the catalogue takes about 27 seconds.
 */
const SPEED = 1.2;

export default function CourseSpotlight({ cards }: { cards: SpotlightCard[] }) {
  const reduce = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      /* free rather than snapping: a marquee that settles onto a snap point
         after every drag reads as a slideshow, not a ticker */
      dragFree: true,
      align: "start",
      containScroll: false,
      skipSnaps: true,
    },
    [
      AutoScroll({
        speed: SPEED,
        startDelay: 0,
        /* the cards travel left to right, so the track runs backwards */
        direction: "backward",
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ],
  );

  /*
   * Reduced motion parks the rail. It stays a carousel — drag and swipe still
   * work and every card is in the DOM — it simply does not move on its own.
   */
  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;
    if (reduce) autoScroll.stop();
    else autoScroll.play();
  }, [emblaApi, reduce]);

  /*
   * The list is rendered twice. Embla loops by repositioning the real slides
   * rather than cloning them, which wants a track comfortably wider than the
   * viewport — six cards is only about 1.3 viewports on a wide desktop, thin
   * enough for the wrap to show. The second pass is inert to assistive tech
   * and to the tab order, so the six courses are still announced and
   * focusable exactly once.
   */
  const passes = [
    { key: "a", ghost: false },
    { key: "b", ghost: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/*
       * The viewport clips the track, so it needs vertical room for the hover
       * scale and its glow — without the padding a raised card is sliced off
       * at the top. The edges fade rather than cut: a marquee never has a
       * standing first or last card, so the ones mid-entry read as arriving
       * instead of as cropped.
       */}
      <div
        ref={emblaRef}
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        <div className="flex cursor-grab touch-pan-y items-stretch py-[34px] active:cursor-grabbing [backface-visibility:hidden] [transform:translate3d(0,0,0)]">
          {passes.map((pass) =>
            cards.map((card) => (
              <div
                key={`${pass.key}-${card.slug}`}
                aria-hidden={pass.ghost || undefined}
                /* Widths as flex-basis, so how many cards a screen shows is a
                   ratio of the viewport rather than a fixed pixel guess:
                   ~1.3 on a phone, ~2.6 on a tablet, ~4.5 on a desktop. */
                className="flex min-w-0 shrink-0 grow-0 basis-[78%] pl-[24px] sm:basis-[46%] md:basis-[38%] lg:basis-[28%] xl:basis-[22%]"
              >
                <Link
                  href={card.href}
                  tabIndex={pass.ghost ? -1 : undefined}
                  aria-label={`${card.title} — explore course`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-[rgba(59,130,246,0.25)] bg-white/[0.05] shadow-[0_18px_44px_-30px_rgba(6,14,46,0.9)] outline-none backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-[400ms] ease-out will-change-transform hover:border-[rgba(59,130,246,0.65)] hover:shadow-[0_34px_78px_-24px_rgba(37,99,235,1),0_0_54px_-10px_rgba(96,165,250,0.85)] focus-visible:ring-2 focus-visible:ring-[#60A5FA] motion-safe:hover:scale-[1.03]"
                >
                  {/*
                   * The banner band.
                   *
                   * Every course banner in the catalogue is 4:3, so a 4:3 band
                   * shows all of them whole: no crop, no letterbox, and the
                   * same image height on every card at a given breakpoint.
                   * `object-contain` rather than cover so that stays true if a
                   * banner of another shape is ever dropped in — it would sit
                   * complete on the navy ground instead of being cut into.
                   */}
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#0A1437]">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 1024px) 26vw, (min-width: 768px) 36vw, 74vw"
                      className="object-contain object-center"
                    />

                    {/* A wash light enough to leave the banner readable — it
                        only deepens at the very bottom, where the band meets
                        the copy, so the two do not butt together as a seam. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1437]/45"
                    />
                  </div>

                  {/* ------------------------------ copy -------------------- */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Below the banner, not over it: sitting top-left of the
                        image it covered the first letter of every banner's
                        title — the Python card lost its "P". */}
                    <span className="mb-[10px] inline-flex w-fit items-center gap-[6px] whitespace-nowrap rounded-full border border-[rgba(59,130,246,0.35)] bg-[#0A1437]/70 px-[10px] py-[4px] font-[family-name:var(--font-mono-face)] text-[8.5px] uppercase tracking-[0.12em] text-[#BFDBFE]">
                      <span aria-hidden className="size-1 rounded-full bg-[#60A5FA]" />
                      {card.category}
                    </span>

                    <h3 className="font-[family-name:var(--font-sora)] text-[17px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white">
                      {card.title}
                    </h3>

                    <p className="mt-[8px] line-clamp-2 text-[12.5px] leading-[1.6] text-white/70">
                      {card.description}
                    </p>

                    <dl className="mt-[12px] flex flex-wrap gap-x-[16px] gap-y-[6px] text-[11.5px] text-white/60">
                      <div className="flex items-center gap-[6px]">
                        <dt className="sr-only">Duration</dt>
                        <FiClock aria-hidden className="size-3.5 shrink-0 text-[#60A5FA]" />
                        <dd>{card.duration}</dd>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <dt className="sr-only">Placement</dt>
                        <FiAward aria-hidden className="size-3.5 shrink-0 text-[#60A5FA]" />
                        <dd>{card.placement}</dd>
                      </div>
                    </dl>

                    {/* mt-auto: the call to action sits on the same baseline on
                        every card, however many lines the title took */}
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
            )),
          )}
        </div>
      </div>
    </motion.div>
  );
}
