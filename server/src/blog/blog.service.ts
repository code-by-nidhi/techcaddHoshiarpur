import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { paginated, type PaginatedResult } from '../common/dto/pagination-query.dto';
import { readingTimeOf } from '../common/utils/reading-time';
import { safeImageUrl, sanitizeArticleHtml } from '../common/utils/sanitize';
import { uniqueSlug } from '../common/utils/slugify';
import { BlogRepository, toDetail, toSummary } from './blog.repository';
import type { ArticleDetail, ArticleSummary } from './blog.types';
import type { CreateArticleDto } from './dto/create-article.dto';
import type { QueryArticlesDto } from './dto/query-articles.dto';
import type { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class BlogService {
  constructor(private readonly repository: BlogRepository) {}

  async list(query: QueryArticlesDto): Promise<PaginatedResult<ArticleSummary>> {
    const [rows, total] = await this.repository.findMany(query);
    return paginated(rows.map(toSummary), total, query.page ?? 1, query.limit ?? 9);
  }

  /**
   * A single article by slug.
   *
   * The view count is bumped as a side effect and deliberately not awaited into
   * the response path: a failed counter update must not turn a readable article
   * into a 500.
   */
  async findBySlug(slug: string): Promise<ArticleDetail> {
    const row = await this.repository.findBySlug(slug);
    if (!row) throw new NotFoundException(`No published article found for "${slug}"`);

    void this.repository.incrementViews(row.id).catch(() => undefined);

    return toDetail(row);
  }

  /** The hero article. Falls back to the most recent one so the slot is never empty. */
  async findFeatured(): Promise<ArticleSummary | null> {
    const featured = await this.repository.findFeatured();
    if (featured) return toSummary(featured);

    const [rows] = await this.repository.findMany({ page: 1, limit: 1, sort: 'latest' });
    return rows[0] ? toSummary(rows[0]) : null;
  }

  async findTrending(limit = 5): Promise<ArticleSummary[]> {
    const rows = await this.repository.findTrending(limit);
    if (rows.length >= limit) return rows.map(toSummary);

    // top up with the most-read articles so the rail always fills
    const [popular] = await this.repository.findMany({
      page: 1,
      limit: limit * 2,
      sort: 'popular',
    });

    const seen = new Set(rows.map((row) => row.id));
    const merged = [...rows];
    for (const row of popular) {
      if (merged.length >= limit) break;
      if (!seen.has(row.id)) merged.push(row);
    }

    return merged.map(toSummary);
  }

  /** Editor's picks: the most-read articles that are not already the hero. */
  async findEditorsPicks(limit = 3, excludeSlug?: string): Promise<ArticleSummary[]> {
    const [rows] = await this.repository.findMany({
      page: 1,
      limit,
      sort: 'popular',
      exclude: excludeSlug,
    });

    return rows.map(toSummary);
  }

  async findRelated(slug: string, limit = 3): Promise<ArticleSummary[]> {
    const article = await this.repository.findBySlug(slug);
    if (!article) throw new NotFoundException(`No published article found for "${slug}"`);

    const rows = await this.repository.findRelated(article, limit);
    return rows.map(toSummary);
  }

  /* ------------------------------- writes -------------------------------- */

  async create(dto: CreateArticleDto): Promise<ArticleDetail> {
    const { categoryId, authorId } = await this.resolveRelations(dto.category, dto.author);

    const image = safeImageUrl(dto.featuredImage);
    if (!image) throw new BadRequestException('featuredImage must be an http(s) URL or a site path');

    const content = sanitizeArticleHtml(dto.content);
    const slug = await uniqueSlug(dto.title, (candidate) => this.repository.slugExists(candidate));
    const status = dto.status ?? 'published';

    const data: Prisma.ArticleCreateInput = {
      title: dto.title,
      slug,
      excerpt: dto.excerpt,
      content,
      featuredImage: image,
      category: { connect: { id: categoryId } },
      author: { connect: { id: authorId } },
      status,
      // a published article always has a date, even if the caller omitted one
      publishedAt: dto.publishedAt
        ? new Date(dto.publishedAt)
        : status === 'published'
          ? new Date()
          : null,
      readingTime: readingTimeOf(content),
      featured: dto.featured ?? false,
      trending: dto.trending ?? false,
      seoTitle: dto.seoTitle ?? null,
      seoDescription: dto.seoDescription ?? null,
      seoKeywords: dto.seoKeywords?.join(', ') ?? null,
    };

    if (dto.tags?.length) {
      const tags = await this.repository.connectOrCreateTags(dto.tags);
      data.tags = { connect: tags };
    }

    return toDetail(await this.repository.create(data));
  }

  async update(id: string, dto: UpdateArticleDto): Promise<ArticleDetail> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException(`No article with id "${id}"`);

    const data: Prisma.ArticleUpdateInput = {};

    if (dto.title !== undefined) data.title = dto.title;
    if (dto.excerpt !== undefined) data.excerpt = dto.excerpt;
    if (dto.featured !== undefined) data.featured = dto.featured;
    if (dto.trending !== undefined) data.trending = dto.trending;
    if (dto.seoTitle !== undefined) data.seoTitle = dto.seoTitle;
    if (dto.seoDescription !== undefined) data.seoDescription = dto.seoDescription;
    if (dto.seoKeywords !== undefined) data.seoKeywords = dto.seoKeywords.join(', ');
    if (dto.publishedAt !== undefined) data.publishedAt = new Date(dto.publishedAt);

    if (dto.content !== undefined) {
      const content = sanitizeArticleHtml(dto.content);
      data.content = content;
      // reading time is derived, so it is recomputed rather than trusted
      data.readingTime = readingTimeOf(content);
    }

    if (dto.featuredImage !== undefined) {
      const image = safeImageUrl(dto.featuredImage);
      if (!image) throw new BadRequestException('featuredImage must be an http(s) URL or a site path');
      data.featuredImage = image;
    }

    if (dto.status !== undefined) {
      data.status = dto.status;
      // first publish stamps a date if the article never had one
      if (dto.status === 'published' && !existing.publishedAt) data.publishedAt = new Date();
    }

    if (dto.category !== undefined || dto.author !== undefined) {
      const { categoryId, authorId } = await this.resolveRelations(dto.category, dto.author);
      if (dto.category !== undefined) data.category = { connect: { id: categoryId } };
      if (dto.author !== undefined) data.author = { connect: { id: authorId } };
    }

    if (dto.tags !== undefined) {
      const tags = await this.repository.connectOrCreateTags(dto.tags);
      data.tags = { set: tags };
    }

    return toDetail(await this.repository.update(id, data));
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException(`No article with id "${id}"`);

    await this.repository.delete(id);
  }

  /**
   * Category and author are addressed by slug in the API and by id in the
   * database. Resolving both together keeps the "does it exist?" error in one
   * place instead of two near-identical checks per write path.
   */
  private async resolveRelations(
    categorySlug?: string,
    authorSlug?: string,
  ): Promise<{ categoryId: string; authorId: string }> {
    const [category, author] = await Promise.all([
      categorySlug ? this.repository.findCategoryBySlug(categorySlug) : null,
      authorSlug ? this.repository.findAuthorBySlug(authorSlug) : null,
    ]);

    if (categorySlug && !category) {
      throw new BadRequestException(`Unknown category "${categorySlug}"`);
    }
    if (authorSlug && !author) {
      throw new BadRequestException(`Unknown author "${authorSlug}"`);
    }

    return { categoryId: category?.id ?? '', authorId: author?.id ?? '' };
  }
}
