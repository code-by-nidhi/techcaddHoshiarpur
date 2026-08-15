import AnimatedCounter from "@/components/about/ui/AnimatedCounter";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import { stats } from "@/data/about";
import { cn } from "@/lib/utils";

/**
 * The four headline statistics, counted up on first view.
 *
 * A circular icon badge beside the figure, with hairline rules separating the
 * columns rather than boxed cards.
 *
 * A list rather than a `<dl>`: the decorative icon badge has to sit beside the
 * figure, and `<dl>` only permits `dt`/`dd` inside its groups.
 */
export default function StatsSection() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-y-10 lg:mt-16 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <ScrollReveal
          key={stat.label}
          as="li"
          delay={index * 0.08}
          className={cn(
            "group flex items-center gap-4 sm:gap-5",
            // Rule between the two mobile columns…
            index % 2 === 1 && "border-l border-hairline pl-4 sm:pl-6",
            // …and between all four once they sit on one row.
            index > 0 && "lg:border-l lg:border-hairline lg:pl-6 xl:pl-8",
          )}
        >
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand-bright/30 transition duration-500 ease-[var(--ease-out-soft)] group-hover:bg-brand/25 group-hover:ring-accent/50 sm:size-14 xl:size-[4.25rem]"
          >
            <stat.icon
              className="size-5 text-brand-bright transition-colors duration-500 group-hover:text-accent sm:size-6 xl:size-7"
              strokeWidth={1.75}
            />
          </span>

          <span className="flex flex-col">
            <span className="type-stat text-brand-bright">
              <AnimatedCounter value={stat.value} />
            </span>
            <span className="mt-1.5 max-w-[8rem] text-sm leading-snug font-medium text-ink sm:text-[0.9375rem] xl:text-base">
              {stat.label}
            </span>
          </span>
        </ScrollReveal>
      ))}
    </ul>
  );
}
