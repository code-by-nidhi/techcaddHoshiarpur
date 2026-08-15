import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import GlassCard from "./GlassCard";
import ScrollReveal from "./ScrollReveal";
import Spotlight from "./Spotlight";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3;
  className?: string;
}

/** The kit's standard card grid, used wherever a section lists reasons. */
export default function FeatureGrid({
  items,
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className,
      )}
    >
      {items.map((item, index) => (
        <ScrollReveal key={item.title} as="li" delay={index * 0.07} className="h-full">
          <Spotlight className="h-full">
            <GlassCard interactive className="h-full p-7">
              <span
                aria-hidden="true"
                className="chip-border inline-flex size-12 items-center justify-center rounded-[var(--radius-card)] bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)]"
              >
                <item.icon className="size-5" strokeWidth={1.75} />
              </span>

              <h3 className="type-h3 mt-6 text-ink">{item.title}</h3>
              <p className="type-body-sm mt-3 text-ink-muted">{item.description}</p>
            </GlassCard>
          </Spotlight>
        </ScrollReveal>
      ))}
    </ul>
  );
}
