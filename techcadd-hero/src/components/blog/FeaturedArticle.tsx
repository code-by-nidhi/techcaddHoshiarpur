import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import ScrollReveal from "@/components/about/ui/ScrollReveal";
import { coverOf, formatDate } from "@/lib/blog/format";
import { revealScale } from "@/lib/motion";
import type { Article } from "@/lib/blog/types";

import AuthorAvatar from "./AuthorAvatar";

/**
 * The page's lead story: image left, editorial right.
 *
 * Given deliberately more room than anything else on the page — the grid below
 * treats every article as equal, and without one piece breaking that rhythm the
 * blog reads as a list rather than a publication.
 */
export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section aria-labelledby="featured-heading" className="shell -mt-10 sm:-mt-16 lg:-mt-20">
      <h2 id="featured-heading" className="sr-only">
        Featured article
      </h2>

      <ScrollReveal variants={revealScale}>
        <Link
          href={`/blog/${article.slug}`}
          className="glass-card-strong group grid overflow-hidden rounded-[var(--radius-hero)] lg:grid-cols-[1.05fr_1fr]"
        >
          <span className="relative block aspect-video w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[26rem]">
            <Image
              src={coverOf(article)}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-royal-deep/60 via-transparent to-transparent"
            />
            <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.14em] text-royal-deep uppercase">
              {article.category.name}
            </span>
          </span>

          <span className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="type-eyebrow flex items-center gap-2.5 text-eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
              Featured
            </span>

            <h3 className="type-h2 mt-5 text-ink transition-colors duration-300 group-hover:text-brand">
              {article.title}
            </h3>

            <p className="type-lead mt-5 line-clamp-3 text-ink-muted">{article.excerpt}</p>

            <span className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-muted">
              <span className="flex items-center gap-2.5">
                <AuthorAvatar author={article.author} size={36} />
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold text-ink">{article.author.name}</span>
                  <span className="text-xs">{article.author.role}</span>
                </span>
              </span>

              <span className="hairline-t h-6 w-px shrink-0 bg-[var(--ctx-hairline)]" />

              <time dateTime={article.publishedAt ?? undefined}>
                {formatDate(article.publishedAt)}
              </time>

              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-3.5" />
                {article.readingTime} min read
              </span>
            </span>

            <span className="mt-9 inline-flex items-center gap-2 self-start rounded-full bg-royal-deep px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-brand">
              Read Article
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
