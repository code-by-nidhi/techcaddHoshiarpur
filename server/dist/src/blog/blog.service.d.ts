import { type PaginatedResult } from '../common/dto/pagination-query.dto';
import { BlogRepository } from './blog.repository';
import type { ArticleDetail, ArticleSummary } from './blog.types';
import type { CreateArticleDto } from './dto/create-article.dto';
import type { QueryArticlesDto } from './dto/query-articles.dto';
import type { UpdateArticleDto } from './dto/update-article.dto';
export declare class BlogService {
    private readonly repository;
    constructor(repository: BlogRepository);
    list(query: QueryArticlesDto): Promise<PaginatedResult<ArticleSummary>>;
    findBySlug(slug: string): Promise<ArticleDetail>;
    findFeatured(): Promise<ArticleSummary | null>;
    findTrending(limit?: number): Promise<ArticleSummary[]>;
    findEditorsPicks(limit?: number, excludeSlug?: string): Promise<ArticleSummary[]>;
    findRelated(slug: string, limit?: number): Promise<ArticleSummary[]>;
    create(dto: CreateArticleDto): Promise<ArticleDetail>;
    update(id: string, dto: UpdateArticleDto): Promise<ArticleDetail>;
    remove(id: string): Promise<void>;
    private resolveRelations;
}
