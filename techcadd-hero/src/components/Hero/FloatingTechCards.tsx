"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  BarChart3,
  Brain,
  Cloud,
  Layers,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { PythonMark, ReactMark } from "@/components/UI/BrandMarks";
import { COURSE_TAGS, type CourseTag } from "@/lib/content";
import { robotBus } from "@/lib/robotBus";

const LUCIDE: Record<string, LucideIcon> = {
  code: Code2,
  chart: BarChart3,
  brain: Brain,
  cloud: Cloud,
  layers: Layers,
  globe: Globe,
};

function TagIcon({ icon }: { icon: CourseTag["icon"] }) {
  if (icon === "python") return <PythonMark className="size-[var(--tag-mark)]" />;
  if (icon === "react") return <ReactMark className="size-[var(--tag-mark)]" />;
  const Icon = LUCIDE[icon];
  return (
    <span className="grid size-[var(--tag-icon)] shrink-0 place-items-center rounded-[9px] border border-[rgba(120,180,255,0.4)] bg-[rgba(70,140,255,0.18)] shadow-[0_0_14px_-2px_rgba(96,165,250,0.75)]">
      <Icon aria-hidden className="size-[var(--tag-mark)] text-[#bfdbfe]" />
    </span>
  );
}

/*
 * Lit from the hero rather than sitting on it: the fill is a translucent blue
 * rather than near-black, so the background glow reads through the glass
 * instead of being blocked by it.
 *
 * Every dimension is a variable so the same card can be printed at three sizes
 * — the ring sets them per breakpoint, and the phone grid sets its own.
 */
const CARD =
  "flex items-center gap-[var(--tag-gap)] rounded-[16px] border border-[rgba(120,180,255,0.35)] bg-[rgba(35,75,180,0.35)] px-[var(--tag-px)] py-[var(--tag-py)] text-[length:var(--tag-fs)] shadow-[0_8px_30px_rgba(0,120,255,0.25),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-[18px] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-[rgba(150,200,255,0.65)] hover:bg-[rgba(45,90,205,0.45)] hover:shadow-[0_14px_44px_rgba(0,140,255,0.45)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100";

/**
 * Card size and ring radius, per breakpoint.
 *
 * The bands are the ones the brief names, and the numbers behind them come from
 * measuring the stage rather than guessing at it:
 *
 *   viewport   stage box   layout
 *   768-991    720 x 640   one column, so the stage is wide and there is room
 *   992-1199   477 x 424   two columns — the tightest the stage ever gets
 *   1200+      575 x 511   two columns, widening from there
 *
 * The 992-1199 band is the one that sets the design. At a 1024px viewport the
 * stage is 477px across, so a tag at nine o'clock plus a 24px gap plus the
 * robot plus the same again on the right has to fit inside 477px — which is
 * why the cards step down and the robot is at its narrowest exactly there.
 *
 * Tablet gets the smallest cards and the widest ring, as the brief asks: it has
 * the room, being a single column.
 */
const RING_SIZING = [
  // tablet, 768-991 — cards 15% down, ring pushed out
  "[--tag-fs:11.5px] [--tag-icon:26px] [--tag-mark:14px] [--tag-gap:8px] [--tag-px:11px] [--tag-py:8px]",
  "[--ring-rx:41%] [--ring-ry:43%]",
  // laptop, 992-1199 — cards 10% down, ring as wide as containment allows
  "[@media(min-width:992px)]:[--tag-fs:12px] [@media(min-width:992px)]:[--tag-icon:27px] [@media(min-width:992px)]:[--tag-mark:15px] [@media(min-width:992px)]:[--tag-gap:9px] [@media(min-width:992px)]:[--tag-px:12px] [@media(min-width:992px)]:[--tag-py:9px]",
  "[@media(min-width:992px)]:[--ring-rx:37.5%] [@media(min-width:992px)]:[--ring-ry:42%]",
  // desktop, 1200+ — full size
  "[@media(min-width:1200px)]:[--tag-fs:13.5px] [@media(min-width:1200px)]:[--tag-icon:30px] [@media(min-width:1200px)]:[--tag-mark:16px] [@media(min-width:1200px)]:[--tag-gap:10px] [@media(min-width:1200px)]:[--tag-px:14px] [@media(min-width:1200px)]:[--tag-py:10px]",
  "[@media(min-width:1200px)]:[--ring-rx:38.5%] [@media(min-width:1200px)]:[--ring-ry:42%]",
].join(" ");

/**
 * Where one tag sits, as a position on the ring ellipse.
 *
 * The card is centred on the point rather than hung from its top-left corner,
 * which is the whole reason the ring comes out even: a 230px label and a 113px
 * one placed at the same radius would otherwise reach different distances from
 * the middle, and the ring would look lopsided however carefully the
 * percentages were tuned.
 */
function ringPosition(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `calc(50% + var(--ring-rx) * ${Math.sin(rad).toFixed(4)})`,
    top: `calc(50% - var(--ring-ry) * ${Math.cos(rad).toFixed(4)})`,
  };
}

/**
 * The ring.
 *
 * Below 768px the absolute ring cannot clear the robot at any radius — the
 * stage is 342px wide on a phone and one card is 187px of it — so the tags are
 * rendered as a two-column grid under the stage instead. See `TechCardsGrid`,
 * which the showcase places below the platform.
 *
 * z-5, under the robot's z-10 and over the background's z-1. Nothing here ever
 * lands on the robot, so the order is a guarantee rather than a fix: if a tag
 * ever did drift over the artwork it would pass behind it.
 */
export default function FloatingTechCards() {
  const reduced = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 z-[5] hidden md:block ${RING_SIZING}`}>
      {COURSE_TAGS.map((tag, i) => (
        /*
         * A plain element does the positioning, and the animated one sits
         * inside it. They cannot be the same node: centring needs a transform,
         * and framer writes the entrance scale to that same property — the
         * translate would be dropped the moment the animation started.
         */
        <div
          key={tag.id}
          style={ringPosition(tag.angle)}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5 + i * 0.09,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.button
              type="button"
              aria-label={tag.label}
              onHoverStart={() => robotBus.set({ effect: tag.effect, color: tag.color })}
              onHoverEnd={() => robotBus.set(null)}
              onFocus={() => robotBus.set({ effect: tag.effect, color: tag.color })}
              onBlur={() => robotBus.set(null)}
              animate={reduced ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tag.delay,
              }}
              whileHover={{ scale: 1.07 }}
              className={`pointer-events-auto ${CARD}`}
            >
              <TagIcon icon={tag.icon} />
              <span className="whitespace-nowrap font-semibold tracking-[0.01em] text-white">
                {tag.label}
              </span>
            </motion.button>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/** Same cards, same styling, laid out as a grid for phones. */
export function TechCardsGrid() {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-[12px] [--tag-fs:12px] [--tag-gap:8px] [--tag-icon:26px] [--tag-mark:14px] [--tag-px:10px] [--tag-py:9px] md:hidden">
      {COURSE_TAGS.map((tag, i) => (
        <motion.li
          key={tag.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`${CARD} justify-center`}>
            <TagIcon icon={tag.icon} />
            <span className="truncate font-semibold tracking-[0.01em] text-white">{tag.label}</span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
