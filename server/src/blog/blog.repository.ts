import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../common/utils/slugify';
import type { QueryArticlesDto } from './dto/query-articles.dto';
import type { ArticleDetail, ArticleSummary } from './blog.types';

/** Every article read pulls the same three relations, so the shape is fixed once. */
const ARTICLE_INCLUDE = {
  category: true,
  author: true,
  tags: true,
} satisfies Prisma.ArticleInclude;

export type ArticleRow = Prisma.ArticleGetPayload<{ include: typeof ARTICLE_INCLUDE }>;

/**
 * All Prisma knowledge for articles lives here.
 *
 * The service above it composes behaviour and never writes a query, which is
 * what keeps a change of data store — SQLite to Postgres today, something else
 * later — confined to this file.
 */
@Injectable()
export class BlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Published-only, plus whatever filters the caller asked for. */
  private buildWhere(query: QueryArticlesDto): Prisma.ArticleWhereInput {
    const where: Prisma.ArticleWhereInput = { status: 'published' };

    if (query.category && query.category !== 'all') {
      where.category = { slug: query.category };
    }

    if (query.tag) {
      where.tags = { some: { slug: query.tag } };
    }

    if (query.author) {
      where.author = { slug: query.author };
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.exclude) {
      where.slug = { not: query.exclude };
    }

    /*
     * SQLite's LIKE is case-insensitive for ASCII, so `contains` needs no mode
     * hint here. On Postgres each clause below wants `mode: 'insensitive'` —
     * the one line of this file that is dialect-specific.
     */
    if (query.search) {
      const term = query.search;
      where.OR = [
        { title: { contains: term } },
        { excerpt: { contains: term } },
        { content: { contains: term } },
        { category: { name: { contains: term } } },
        { author: { name: { contains: term } } },
        { tags: { some: { name: { contains: term } } } },
      ];
    }

    return where;
  }

  private buildOrderBy(query: QueryArticlesDto): Prisma.ArticleOrderByWithRelationInput[] {
    switch (query.sort) {
      case 'oldest':
        return [{ publishedAt: 'asc' }];
      case 'popular':
        return [{ views: 'desc' }, { publishedAt: 'desc' }];
      case 'trending':
        return [{ trending: 'desc' }, { views: 'desc' }, { publishedAt: 'desc' }];
      default:
        return [{ publishedAt: 'desc' }];
    }
  }

  /** One round trip for the page, one for the count — inside a transaction so
      the total can never describe a different result set than the rows. */
  async findMany(query: QueryArticlesDto): Promise<[ArticleRow[], number]> {
    const where = this.buildWhere(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 9;

    return this.prisma.$transaction([
      this.prisma.article.findMany({
        where,
        include: ARTICLE_INCLUDE,
        orderBy: this.buildOrderBy(query),
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.article.count({ where }),
    ]);
  }

  findBySlug(slug: string, publishedOnly = true): Promise<ArticleRow | null> {
    return this.prisma.article.findFirst({
      where: publishedOnly ? { slug, status: 'published' } : { slug },
      include: ARTICLE_INCLUDE,
    });
  }

  findById(id: string): Promise<ArticleRow | null> {
    return this.prisma.article.findUnique({ where: { id }, include: ARTICLE_INCLUDE });
  }

  findFeatured(): Promise<ArticleRow | null> {
    return this.prisma.article.findFirst({
      where: { status: 'published', featured: true },
      include: ARTICLE_INCLUDE,
      orderBy: { publishedAt: 'desc' },
    });
  }

  findTrending(limit: number): Promise<ArticleRow[]> {
    return this.prisma.article.findMany({
      where: { status: 'published', trending: true },
      include: ARTICLE_INCLUDE,
      orderBy: [{ views: 'desc' }, { publishedAt: 'desc' }],
      take: limit,
    });
  }

  /**
   * Related articles, best match first: same category, then shared tags, then
   * simply recent. Each pass excludes what the previous one already found, so
   * the list is always `limit` long and never repeats an article.
   */
  async findRelated(article: ArticleRow, limit: number): Promise<ArticleRow[]> {
    const collected: ArticleRow[] = [];
    const seen = new Set<string>([article.id]);

    const passes: Prisma.ArticleWhereInput[] = [
      { categoryId: article.categoryId },
      { tags: { some: { id: { in: article.tags.map((tag) => tag.id) } } } },
      {},
    ];

    for (const pass of passes) {
      if (collected.length >= limit) break;

      const rows = await this.prisma.article.findMany({
        where: { ...pass, status: 'published', id: { notIn: [...seen] } },
        include: ARTICLE_INCLUDE,
        orderBy: { publishedAt: 'desc' },
        take: limit - collected.length,
      });

      for (const row of rows) {
        collected.push(row);
        seen.add(row.id);
      }
    }

    return collected;
  }

  slugExists(slug: string): Promise<boolean> {
    return this.prisma.article
      .findUnique({ where: { slug }, select: { id: true } })
      .then((row) => row !== null);
  }

  incrementViews(id: string): Promise<unknown> {
    return this.prisma.article.update({ where: { id }, data: { views: { increment: 1 } } });
  }

  create(data: Prisma.ArticleCreateInput): Promise<ArticleRow> {
    return this.prisma.article.create({ data, include: ARTICLE_INCLUDE });
  }

  update(id: string, data: Prisma.ArticleUpdateInput): Promise<ArticleRow> {
    return this.prisma.article.update({ where: { id }, data, include: ARTICLE_INCLUDE });
  }

  delete(id: string): Promise<unknown> {
    return this.prisma.article.delete({ where: { id } });
  }

  /* ----------------------------- relations ------------------------------ */

  findCategoryBySlug(slug: string) {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  findAuthorBySlug(slug: string) {
    return this.prisma.author.findUnique({ where: { slug } });
  }

  /** Tags arrive as names; existing ones are reused and new ones created. */
  async connectOrCreateTags(names: string[]): Promise<{ id: string }[]> {
    return Promise.all(
      names.map((name) =>
        this.prisma.tag.upsert({
          where: { slug: slugify(name) },
          update: {},
          create: { name: name.trim(), slug: slugify(name) },
          select: { id: true },
        }),
      ),
    );
  }
}

/* ------------------------------- mapping -------------------------------- */

export function toSummary(row: ArticleRow): ArticleSummary {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    featuredImage: row.featuredImage,
    readingTime: row.readingTime,
    views: row.views,
    featured: row.featured,
    trending: row.trending,
    publishedAt: row.publishedAt?.toISOString() ?? null,
    category: {
      id: row.category.id,
      name: row.category.name,
      slug: row.category.slug,
      description: row.category.description,
    },
    author: {
      id: row.author.id,
      name: row.author.name,
      slug: row.author.slug,
      avatar: row.author.avatar,
      role: row.author.role,
    },
    tags: row.tags.map((tag) => ({ id: tag.id, name: tag.name, slug: tag.slug })),
  };
}

export function toDetail(row: ArticleRow): ArticleDetail {
  return {
    ...toSummary(row),
    content: row.content,
    updatedAt: row.updatedAt.toISOString(),
    seo: {
      // falling back to the editorial copy means every article has usable
      // metadata even when nobody filled the SEO fields in
      title: row.seoTitle ?? row.title,
      description: row.seoDescription ?? row.excerpt,
      keywords: row.seoKeywords
        ? row.seoKeywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
        : row.tags.map((tag) => tag.name),
    },
  };
}
