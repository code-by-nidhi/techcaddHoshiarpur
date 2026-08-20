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
       * lift and its glow — without the padding a raised card is sliced off at
       * the top. The edges fade rather than cut, which is what stops the rail
       * reading as cropped where it runs past the container.
       */}
      <div
        ref={emblaRef}
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)]"
      >
        <div className="flex cursor-grab touch-pan-y py-[34px] active:cursor-grabbing [backface-visibility:hidden] [transform:translate3d(0,0,0)]">
          {passes.map((pass) =>
            cards.map((card) => (
              <div
                key={`${pass.key}-${card.slug}`}
                aria-hidden={pass.ghost || undefined}
                /* Widths as flex-basis, so how many cards a screen shows is a
                   ratio of the viewport rather than a fixed pixel guess:
                   ~1.3 on a phone, ~2.6 on a tablet, ~4.5 on a desktop. */
                className="min-w-0 shrink-0 grow-0 basis-[78%] pl-[24px] sm:basis-[46%] md:basis-[38%] lg:basis-[28%] xl:basis-[22%]"
              >
                <Link
                  href={card.href}
                  tabIndex={pass.ghost ? -1 : undefined}
                  aria-label={`${card.title} — explore course`}
                  className="group relative block h-[400px] overflow-hidden rounded-[24px] border border-[rgba(59,130,246,0.25)] shadow-[0_18px_44px_-30px_rgba(6,14,46,0.9)] outline-none transition-[transform,box-shadow,border-color] duration-[400ms] ease-out will-change-transform hover:border-[rgba(59,130,246,0.6)] hover:shadow-[0_30px_70px_-26px_rgba(37,99,235,0.95),0_0_44px_-12px_rgba(96,165,250,0.7)] focus-visible:ring-2 focus-visible:ring-[#60A5FA] motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.02] sm:h-[420px] xl:h-[440px]"
                >
                  {/* ------------------------------ artwork ------------------ */}
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 320px, (min-width: 768px) 40vw, 78vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                  />

                  {/* The catalogue artwork is landscape banner work, so a
                      portrait crop leaves half-words of its type across the
                      card. Sunk into the brand navy it reads as texture. */}
                  <div aria-hidden className="absolute inset-0 bg-[#0A1437]/45" />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#0A1437] via-[#0A1437]/70 to-[#0A1437]/25"
                  />

                  {/* ------------------------- category badge ---------------- */}
                  <span className="absolute left-5 top-5 inline-flex items-center gap-[6px] whitespace-nowrap rounded-full border border-[rgba(59,130,246,0.35)] bg-white/[0.10] px-[10px] py-[4px] font-[family-name:var(--font-mono-face)] text-[8.5px] uppercase tracking-[0.12em] text-[#BFDBFE] backdrop-blur-md">
                    <span aria-hidden className="size-1 rounded-full bg-[#60A5FA]" />
                    {card.category}
                  </span>

                  {/* --------------------------- glass panel ----------------- */}
                  <div className="absolute inset-x-3 bottom-3 rounded-[18px] border border-[rgba(59,130,246,0.25)] bg-white/[0.07] p-4 backdrop-blur-xl transition-colors duration-[400ms] ease-out group-hover:border-[rgba(59,130,246,0.5)] group-hover:bg-white/[0.11]">
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

                    {/* the whole card is the link, so this is styling only */}
                    <span className="mt-[14px] inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-[#93C5FD] transition-colors duration-[400ms] group-hover:text-white">
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
