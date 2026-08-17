import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

import ScrollReveal from "@/components/about/ui/ScrollReveal";
import type { Article } from "@/lib/blog/types";

/**
 * "Trending this week" — a compact numbered rail.
 *
 * Sticky on desktop so it stays with the reader down a long grid, and rendered
 * as an ordered list because the ranking is the content.
 */
export default function TrendingArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="trending-heading" className="lg:sticky lg:top-28">
      <h2
        id="trending-heading"
        className="type-eyebrow flex items-center gap-2.5 text-eyebrow"
      >
        <TrendingUp aria-hidden="true" className="size-4" />
        Trending this week
      </h2>

      <ol className="mt-6 flex flex-col">
        {articles.map((article, index) => (
          <ScrollReveal
            key={article.id}
            as="li"
            delay={index * 0.06}
            className="border-b border-hairline last:border-b-0"
          >
            <Link href={`/blog/${article.slug}`} className="group flex gap-4 py-4">
              <span
                aria-hidden="true"
                className="font-display w-6 shrink-0 text-lg font-bold text-ink-dim transition-colors duration-300 group-hover:text-brand"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm leading-snug font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
                  {article.title}
                </span>
                <span className="mt-1.5 block text-xs text-ink-dim">
                  {article.category.name} · {article.readingTime} min read
                </span>
              </span>

              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-brand/20 to-accent/10">
                <Image
                  src={article.featuredImage}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}
