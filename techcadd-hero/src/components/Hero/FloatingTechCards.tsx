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
 * The bands are Tailwind's own md/lg/xl, because those are where this layout
 * actually changes: the hero goes from one column to two at 1024, which is what
 * makes the stage collapse. Measured:
 *
 *   viewport    stage box    layout
 *   768-1023    720 x 640    one column, so the stage is wide and there is room
 *   1024-1279   477 x 424    two columns - the tightest the stage ever gets
 *   1280+       620 x 551    two columns, widening from there
 *
 * The 1024 case sets the whole design. The stage is 477px across there, so a
 * tag at nine o'clock, a 24px gap, the robot, and the same again on the right
 * all have to fit inside it - which is why the cards step *down* on laptop
 * rather than up, and why the robot is at its narrowest exactly there.
 *
 * Tablet gets the smallest cards and the widest ring, as the brief asks. It can
 * afford both: it is a single column, so the stage is half as wide again.
 */
const RING_SIZING = [
  // tablet, 768-1023 - cards 15% down, ring pushed well out
  "[--tag-fs:11.5px] [--tag-icon:26px] [--tag-mark:14px] [--tag-gap:8px] [--tag-px:11px] [--tag-py:8px]",
  "[--ring-rx:41%] [--ring-ry:46%]",
  // laptop, 1024-1279 - cards 20% down, which is what buys the robot its width
  "lg:[--tag-fs:11px] lg:[--tag-icon:25px] lg:[--tag-mark:13px] lg:[--tag-gap:8px] lg:[--tag-px:10px] lg:[--tag-py:8px]",
  "lg:[--ring-rx:39.5%] lg:[--ring-ry:44.8%]",
  // desktop, 1280+ - full size
  "xl:[--tag-fs:13.5px] xl:[--tag-icon:30px] xl:[--tag-mark:16px] xl:[--tag-gap:10px] xl:[--tag-px:14px] xl:[--tag-py:10px]",
  "xl:[--ring-rx:39.5%] xl:[--ring-ry:41.7%]",
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
