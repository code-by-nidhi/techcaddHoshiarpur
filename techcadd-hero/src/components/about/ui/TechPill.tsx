import type { LucideIcon } from "lucide-react";

interface TechPillProps {
  name: string;
  icon: LucideIcon;
}

/** One technology, as a bordered chip. */
export default function TechPill({ name, icon: Icon }: TechPillProps) {
  return (
    <span className="chip-border inline-flex items-center gap-2 rounded-full bg-[var(--ctx-chip-bg)] px-3.5 py-2 text-[0.8125rem] font-medium text-ink transition-[transform,background-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand/20 motion-reduce:hover:transform-none">
      <Icon
        aria-hidden="true"
        className="size-3.5 text-[var(--ctx-chip-fg)]"
        strokeWidth={1.75}
      />
      {name}
    </span>
  );
}
