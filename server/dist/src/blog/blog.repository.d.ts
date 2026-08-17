import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { QueryArticlesDto } from './dto/query-articles.dto';
import type { ArticleDetail, ArticleSummary } from './blog.types';
declare const ARTICLE_INCLUDE: {
    category: true;
    author: true;
    tags: true;
};
export type ArticleRow = Prisma.ArticleGetPayload<{
    include: typeof ARTICLE_INCLUDE;
}>;
export declare class BlogRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildWhere;
    private buildOrderBy;
    findMany(query: QueryArticlesDto): Promise<[ArticleRow[], number]>;
    findBySlug(slug: string, publishedOnly?: boolean): Promise<ArticleRow | null>;
    findById(id: string): Promise<ArticleRow | null>;
    findFeatured(): Promise<ArticleRow | null>;
    findTrending(limit: number): Promise<ArticleRow[]>;
    findRelated(article: ArticleRow, limit: number): Promise<ArticleRow[]>;
    slugExists(slug: string): Promise<boolean>;
    incrementViews(id: string): Promise<unknown>;
    create(data: Prisma.ArticleCreateInput): Promise<ArticleRow>;
    update(id: string, data: Prisma.ArticleUpdateInput): Promise<ArticleRow>;
    delete(id: string): Promise<unknown>;
    findCategoryBySlug(slug: string): Prisma.Prisma__CategoryClient<{
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        image: string | null;
        position: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAuthorBySlug(slug: string): Prisma.Prisma__AuthorClient<{
        id: string;
        name: string;
        slug: string;
        bio: string;
        avatar: string;
        role: string;
        socialLinks: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    connectOrCreateTags(names: string[]): Promise<{
        id: string;
    }[]>;
}
export declare function toSummary(row: ArticleRow): ArticleSummary;
export declare function toDetail(row: ArticleRow): ArticleDetail;
export {};
