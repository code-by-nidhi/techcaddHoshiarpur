import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Eye } from "lucide-react";
import type { Metadata } from "next";

import AuthorAvatar from "@/components/blog/AuthorAvatar";
import CareerCTA from "@/components/blog/CareerCTA";
import NewsletterSection from "@/components/blog/NewsletterSection";
import ReadingProgress from "@/components/blog/ReadingProgress";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ShareBar from "@/components/blog/ShareBar";
import TableOfContents from "@/components/blog/TableOfContents";
import { BlogApiError, getArticle, getArticles, getRelated, safely } from "@/lib/blog/api";
import { formatDate, withHeadingIds } from "@/lib/blog/format";
import type { Article, ArticleDetail } from "@/lib/blog/types";

const SITE = "https://techcadd.com";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders the published set at build time; anything new is rendered on demand. */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = await safely(getArticles({ limit: 50 }), {
    data: [] as Article[],
    meta: { page: 1, limit: 50, total: 0, totalPages: 1, hasMore: false },
  });

  return articles.data.map((article) => ({ slug: article.slug }));
}

/** Article-specific metadata: title, description, canonical, OG and Twitter cards. */
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  let article: ArticleDetail;
  try {
    article = await getArticle(slug);
  } catch {
    return { title: "Article not found" };
  }

  const url = `${SITE}/blog/${article.slug}`;
  const image = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : `${SITE}${article.featuredImage}`;

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    authors: [{ name: article.author.name }],
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      url,
      title: article.seo.title,
      description: article.seo.description,
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      section: article.category.name,
      tags: article.tags.map((tag) => tag.name),
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: ArticleDetail;
  try {
    article = await getArticle(slug);
  } catch (error) {
    // a missing slug is a 404, not a server error — anything else re-throws to
    // the route's error boundary
    if (error instanceof BlogApiError && error.status === 404) notFound();
    throw error;
  }

  const related = await safely(getRelated(article.slug, 3), [] as Article[]);
  const { html, toc } = withHeadingIds(article.content);

  const url = `${SITE}/blog/${article.slug}`;
  const image = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : `${SITE}${article.featuredImage}`;

  /* Structured data: the article itself, and the breadcrumb trail. Both are
     rendered server-side so a crawler sees them without executing anything. */
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.seo.description,
      image: [image],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.role,
        url: `${SITE}/blog/author/${article.author.slug}`,
      },
      publisher: {
        "@type": "Organization",
        name: "TechCADD Hoshiarpur",
        logo: { "@type": "ImageObject", url: `${SITE}/images/techcadd-logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: article.category.name,
      keywords: article.seo.keywords.join(", "),
      wordCount: html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        {
          "@type": "ListItem",
          position: 3,
          name: article.category.name,
          item: `${SITE}/blog?category=${article.category.slug}`,
        },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ReadingProgress targetId="article-body" />

      {/* ------------------------------- Header ------------------------------ */}
      <header className="surface-dark relative isolate overflow-hidden bg-royal-deep pt-28 pb-16 sm:pt-32 lg:pt-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50rem 30rem at 50% -10%, #14306e 0%, #0c1c56 50%, #081540 85%)",
          }}
        />

        <div className="shell">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-dim">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3" />
              <li>
                <Link href="/blog" className="transition-colors hover:text-ink">
                  Blog
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3" />
              <li>
                <Link
                  href={`/blog?category=${article.category.slug}`}
                  className="transition-colors hover:text-ink"
                >
                  {article.category.name}
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3" />
              <li aria-current="page" className="max-w-[16rem] truncate text-ink-muted">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-8 max-w-[52rem]">
            <Link
              href={`/blog?category=${article.category.slug}`}
              className="chip-border inline-flex rounded-full bg-[var(--ctx-chip-bg)] px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.14em] text-[var(--ctx-chip-fg)] uppercase transition-colors hover:bg-brand hover:text-white"
            >
              {article.category.name}
            </Link>

            <h1 className="type-h2 mt-6">{article.title}</h1>

            <p className="type-lead mt-5 text-ink-dim">{article.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href={`/blog/author/${article.author.slug}`}
                className="group flex items-center gap-3"
              >
                <AuthorAvatar author={article.author} size={36} />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-ink transition-colors group-hover:text-brand-bright">
                    {article.author.name}
                  </span>
                  <span className="text-xs text-ink-dim">{article.author.role}</span>
                </span>
              </Link>

              <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-dim">
                <time dateTime={article.publishedAt ?? undefined}>
                  {formatDate(article.publishedAt)}
                </time>
                <span className="flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="size-3.5" />
                  {article.readingTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye aria-hidden="true" className="size-3.5" />
                  {article.views.toLocaleString("en-IN")} views
                </span>
                {article.updatedAt !== article.publishedAt ? (
                  <span>Updated {formatDate(article.updatedAt)}</span>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------------------- Body ------------------------------- */}
      <div className="surface-light relative isolate bg-paper pb-20">
        <div className="shell">
          {/* the hero image straddles the header's lower edge */}
          <div className="mx-auto -mt-10 max-w-[62rem] sm:-mt-14">
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-hero)] bg-linear-to-br from-brand/20 to-accent/10 shadow-[0_40px_90px_-50px_rgb(8_21_64/0.9)]">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62rem"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:order-first">
              <TableOfContents items={toc} />
            </aside>

            <div className="min-w-0">
              {/* 52rem ≈ 800px: the comfortable measure for long-form reading */}
              <article
                id="article-body"
                className="article-prose mx-auto max-w-[52rem]"
                /* content is sanitised server-side on write, so what reaches
                   here has already been through the allow-list */
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <div className="mx-auto mt-12 max-w-[52rem]">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?search=${encodeURIComponent(tag.name)}`}
                      className="chip-border rounded-full bg-[var(--ctx-chip-bg)] px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-brand hover:text-white"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 border-t border-hairline pt-8">
                  <ShareBar title={article.title} url={url} />
                </div>

                {/* Author card */}
                <div className="glass-card mt-10 flex flex-col gap-5 rounded-[var(--radius-hero)] p-7 sm:flex-row sm:items-start">
                  <AuthorAvatar author={article.author} size={56} />
                  <div>
                    <p className="type-eyebrow text-eyebrow">Written by</p>
                    <Link
                      href={`/blog/author/${article.author.slug}`}
                      className="type-h3 mt-2 block text-ink transition-colors hover:text-brand"
                    >
                      {article.author.name}
                    </Link>
                    <p className="text-xs text-ink-dim">{article.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedArticles articles={related} />
      <NewsletterSection source="article" />
      <CareerCTA />
    </>
  );
}
