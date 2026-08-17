"use client";

import { ChevronDown, List } from "lucide-react";
import { useEffect, useState } from "react";

import type { TocItem } from "@/lib/blog/format";
import { cn } from "@/lib/utils";

/**
 * Contents for a long article.
 *
 * Sticky beside the text on desktop, a collapsible panel on mobile. The items
 * are generated on the server (see `withHeadingIds`), so the list and its
 * anchors exist in the HTML; this component only tracks which section is in
 * view and handles the smooth scroll.
 */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    /* The top band of the viewport is what counts as "current": a heading is
       active from the moment it reaches the upper third until the next one
       does, which is how a reader experiences it. */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  function jumpTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    // offset for the fixed navbar, or the heading lands underneath it
    const top = target.getBoundingClientRect().top + window.scrollY - 104;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    setOpen(false);
  }

  const list = (
    <ol className="flex flex-col gap-1 text-sm">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
          <a
            href={`#${item.id}`}
            onClick={(event) => jumpTo(event, item.id)}
            aria-current={activeId === item.id ? "location" : undefined}
            className={cn(
              "block border-l-2 py-1.5 pl-3 leading-snug transition-colors duration-200",
              activeId === item.id
                ? "border-brand font-semibold text-brand"
                : "border-[var(--ctx-hairline)] text-ink-muted hover:text-ink",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Desktop: sticky rail */}
      <nav aria-label="Table of contents" className="hidden lg:sticky lg:top-28 lg:block">
        <p className="type-eyebrow flex items-center gap-2 text-ink-dim">
          <List aria-hidden="true" className="size-3.5" />
          On this page
        </p>
        <div className="mt-4">{list}</div>
      </nav>

      {/* Mobile: disclosure */}
      <nav aria-label="Table of contents" className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="glass-card flex w-full items-center justify-between rounded-[var(--radius-card)] px-5 py-3.5 text-sm font-semibold text-ink"
        >
          <span className="flex items-center gap-2">
            <List aria-hidden="true" className="size-4" />
            Table of contents
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          />
        </button>

        {open ? <div className="mt-4">{list}</div> : null}
      </nav>
    </>
  );
}
