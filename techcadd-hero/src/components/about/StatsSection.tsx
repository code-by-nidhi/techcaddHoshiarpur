"use client";

import AnimatedCounter from "@/components/about/ui/AnimatedCounter";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import { stats as fallbackStats } from "@/data/about";
import { useSite } from "@/lib/cms/site-context";
import { cn } from "@/lib/utils";

/**
 * The four headline statistics, counted up on first view.
 *
 * A circular icon badge beside the figure, with hairline rules separating the
 * columns rather than boxed cards.
 *
 * A list rather than a `<dl>`: the decorative icon badge has to sit beside the
 * figure, and `<dl>` only permits `dt`/`dd` inside its groups.
 *
 * The figures come from the CMS when an admin has entered any, and from the
 * built-in set otherwise. The icons stay here either way: they are a design
 * decision about this row, and asking an editor to pick a Lucide icon name in
 * a text field is how a stat ends up rendering nothing.
 */
export default function StatsSection() {
  const cmsStats = useSite().stats;

  /* Positional: the nth figure gets the nth icon, cycling if an editor adds
     more than the four the row was designed around. */
  const stats = cmsStats.length
    ? cmsStats.map((stat, index) => ({
        ...stat,
        icon: fallbackStats[index % fallbackStats.length].icon,
      }))
    : fallbackStats;

  /*
   * Four across only from `xl`. Between 1024 and 1280 the four columns are too
   * narrow for a badge plus a figure like "25,000+", and the number crowded the
   * divider; two columns there give each stat room to breathe.
   */
  return (
    <ul className="mt-12 grid grid-cols-2 gap-y-12 lg:mt-16 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <ScrollReveal
          key={stat.label}
          as="li"
          delay={index * 0.08}
          /*
           * Each rule needs clearance on BOTH sides, so padding is applied per
           * neighbour rather than only to the cell that draws the border: a
           * cell pads left when something is ruled against it, and right when
           * the next cell rules against this one.
           */
          className={cn(
            "group flex items-center gap-4 sm:gap-5",
            // Two columns: one rule, down the middle.
            index % 2 === 1 && "border-l border-hairline pl-5 sm:pl-8",
            index % 2 === 0 && "pr-5 sm:pr-8",
            // Four across from `xl`: every cell but the first draws a rule.
            index > 0 && "xl:border-l xl:border-hairline xl:pl-9",
            index < stats.length - 1 && "xl:pr-9",
            index === stats.length - 1 && "xl:pr-0",
          )}
        >
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand-bright/30 transition duration-500 ease-[var(--ease-out-soft)] group-hover:bg-brand/25 group-hover:ring-accent/50 sm:size-14 xl:size-16"
          >
            <stat.icon
              className="size-5 text-brand-bright transition-colors duration-500 group-hover:text-accent sm:size-6 xl:size-7"
              strokeWidth={1.75}
            />
          </span>

          {/* `min-w-0` so a long label wraps inside the cell instead of
              pushing the column wider and squeezing the rule again */}
          <span className="flex min-w-0 flex-col">
            {/* `nowrap` keeps "25,000+" on one line — the "+" wrapping to its
                own line was the other way this row broke. */}
            <span className="type-stat whitespace-nowrap text-brand-bright">
              <AnimatedCounter value={stat.value} />
            </span>
            <span className="mt-1.5 max-w-[8.5rem] text-sm leading-snug font-medium text-ink sm:text-[0.9375rem] xl:max-w-[10rem] xl:text-base">
              {stat.label}
            </span>
          </span>
        </ScrollReveal>
      ))}
    </ul>
  );
}
