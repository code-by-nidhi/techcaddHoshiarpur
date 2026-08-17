import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatDate, readingLabel } from "@/lib/blog/format";
import type { Article } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

import AuthorAvatar from "./AuthorAvatar";

interface ArticleCardProps {
  article: Article;
  /** The first cards on the page carry the LCP image and skip lazy loading. */
  priority?: boolean;
  className?: string;
}

/**
 * The grid's unit. One link wraps the whole card so the entire surface is
 * clickable and a keyboard user gets a single stop rather than three.
 */
export default function ArticleCard({ article, priority = false, className }: ArticleCardProps) {
  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/blog/${article.slug}`}
        className="glass-card glass-card-interactive flex h-full flex-col overflow-hidden rounded-[var(--radius-hero)]"
      >
        {/* 16:9 everywhere, so a row of cards never staggers */}
        <span className="relative block aspect-video w-full overflow-hidden bg-linear-to-br from-brand/20 to-accent/10">
          <Image
            src={article.featuredImage}
            alt=""
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          />

          <span className="absolute top-3 left-3 rounded-full bg-royal-deep/85 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
            {article.category.name}
          </span>
        </span>

        <span className="flex flex-1 flex-col p-6">
          <span className="flex items-center gap-2 text-xs text-ink-dim">
            <time dateTime={article.publishedAt ?? undefined}>
              {formatDate(article.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{readingLabel(article)}</span>
          </span>

          <h3 className="type-h3 mt-3 text-ink transition-colors duration-300 group-hover:text-brand">
            {article.title}
          </h3>

          <p className="type-body-sm mt-3 line-clamp-3 text-ink-muted">{article.excerpt}</p>

          {/* pushed to the foot of the card, so every card in a row lines up */}
          <span className="mt-auto flex items-center justify-between gap-3 pt-6">
            <span className="flex min-w-0 items-center gap-2.5">
              <AuthorAvatar author={article.author} />
              <span className="truncate text-xs font-medium text-ink-muted">
                {article.author.name}
              </span>
            </span>

            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand">
              Read Article
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}
