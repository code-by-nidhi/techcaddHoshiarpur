"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
exports.toSummary = toSummary;
exports.toDetail = toDetail;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("../common/utils/slugify");
const ARTICLE_INCLUDE = {
    category: true,
    author: true,
    tags: true,
};
let BlogRepository = class BlogRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildWhere(query) {
        const where = { status: 'published' };
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
    buildOrderBy(query) {
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
    async findMany(query) {
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
    findBySlug(slug, publishedOnly = true) {
        return this.prisma.article.findFirst({
            where: publishedOnly ? { slug, status: 'published' } : { slug },
            include: ARTICLE_INCLUDE,
        });
    }
    findById(id) {
        return this.prisma.article.findUnique({ where: { id }, include: ARTICLE_INCLUDE });
    }
    findFeatured() {
        return this.prisma.article.findFirst({
            where: { status: 'published', featured: true },
            include: ARTICLE_INCLUDE,
            orderBy: { publishedAt: 'desc' },
        });
    }
    findTrending(limit) {
        return this.prisma.article.findMany({
            where: { status: 'published', trending: true },
            include: ARTICLE_INCLUDE,
            orderBy: [{ views: 'desc' }, { publishedAt: 'desc' }],
            take: limit,
        });
    }
    async findRelated(article, limit) {
        const collected = [];
        const seen = new Set([article.id]);
        const passes = [
            { categoryId: article.categoryId },
            { tags: { some: { id: { in: article.tags.map((tag) => tag.id) } } } },
            {},
        ];
        for (const pass of passes) {
            if (collected.length >= limit)
                break;
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
    slugExists(slug) {
        return this.prisma.article
            .findUnique({ where: { slug }, select: { id: true } })
            .then((row) => row !== null);
    }
    incrementViews(id) {
        return this.prisma.article.update({ where: { id }, data: { views: { increment: 1 } } });
    }
    create(data) {
        return this.prisma.article.create({ data, include: ARTICLE_INCLUDE });
    }
    update(id, data) {
        return this.prisma.article.update({ where: { id }, data, include: ARTICLE_INCLUDE });
    }
    delete(id) {
        return this.prisma.article.delete({ where: { id } });
    }
    findCategoryBySlug(slug) {
        return this.prisma.category.findUnique({ where: { slug } });
    }
    findAuthorBySlug(slug) {
        return this.prisma.author.findUnique({ where: { slug } });
    }
    async connectOrCreateTags(names) {
        return Promise.all(names.map((name) => this.prisma.tag.upsert({
            where: { slug: (0, slugify_1.slugify)(name) },
            update: {},
            create: { name: name.trim(), slug: (0, slugify_1.slugify)(name) },
            select: { id: true },
        })));
    }
};
exports.BlogRepository = BlogRepository;
exports.BlogRepository = BlogRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogRepository);
function toSummary(row) {
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
function toDetail(row) {
    return {
        ...toSummary(row),
        content: row.content,
        updatedAt: row.updatedAt.toISOString(),
        seo: {
            title: row.seoTitle ?? row.title,
            description: row.seoDescription ?? row.excerpt,
            keywords: row.seoKeywords
                ? row.seoKeywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
                : row.tags.map((tag) => tag.name),
        },
    };
}
//# sourceMappingURL=blog.repository.js.map