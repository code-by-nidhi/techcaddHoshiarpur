import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import ScrollReveal from "@/components/about/ui/ScrollReveal";
import TechBackground from "@/components/about/ui/TechBackground";
import { formatDate } from "@/lib/blog/format";
import type { Article } from "@/lib/blog/types";

import AuthorAvatar from "./AuthorAvatar";

/**
 * "Editor's picks" — wide horizontal cards on navy.
 *
 * Its job is rhythm: three columns of equal cards for a whole page reads as a
 * list, so this band breaks the grid with a different shape and a dark surface
 * before the reader reaches the rest of the archive.
 */
export default function EditorsPicks({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="editors-picks-heading"
      className="surface-dark section-y relative isolate overflow-hidden bg-royal-deep"
    >
      <TechBackground variant="subtle" />

      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="type-eyebrow flex items-center gap-2.5 text-eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
              Editor&apos;s picks
            </p>
            <h2 id="editors-picks-heading" className="type-h2 mt-4">
              The ones our trainers keep sending to students
            </h2>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:mt-12">
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 0.08}>
              <Link
                href={`/blog/${article.slug}`}
                className="glass-card glass-card-interactive group grid gap-5 overflow-hidden rounded-[var(--radius-hero)] p-4 sm:grid-cols-[14rem_1fr] sm:items-center sm:gap-7 sm:p-5"
              >
                <span className="relative block aspect-video overflow-hidden rounded-[var(--radius-card)] bg-linear-to-br from-brand/25 to-accent/10">
                  <Image
                    src={article.featuredImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, 224px"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
                  />
                </span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2.5 text-xs text-ink-dim">
                    <span className="chip-border rounded-full bg-[var(--ctx-chip-bg)] px-2.5 py-1 font-semibold text-[var(--ctx-chip-fg)]">
                      {article.category.name}
                    </span>
                    <time dateTime={article.publishedAt ?? undefined}>
                      {formatDate(article.publishedAt)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime} min read</span>
                  </span>

                  <span className="type-h3 mt-3 block text-ink transition-colors duration-300 group-hover:text-brand-bright">
                    {article.title}
                  </span>

                  <span className="type-body-sm mt-2.5 line-clamp-2 block text-ink-muted">
                    {article.excerpt}
                  </span>

                  <span className="mt-4 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2.5 text-xs text-ink-muted">
                      <AuthorAvatar author={article.author} />
                      {article.author.name}
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-brand-bright transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
