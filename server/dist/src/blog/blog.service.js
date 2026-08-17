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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const reading_time_1 = require("../common/utils/reading-time");
const sanitize_1 = require("../common/utils/sanitize");
const slugify_1 = require("../common/utils/slugify");
const blog_repository_1 = require("./blog.repository");
let BlogService = class BlogService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async list(query) {
        const [rows, total] = await this.repository.findMany(query);
        return (0, pagination_query_dto_1.paginated)(rows.map(blog_repository_1.toSummary), total, query.page ?? 1, query.limit ?? 9);
    }
    async findBySlug(slug) {
        const row = await this.repository.findBySlug(slug);
        if (!row)
            throw new common_1.NotFoundException(`No published article found for "${slug}"`);
        void this.repository.incrementViews(row.id).catch(() => undefined);
        return (0, blog_repository_1.toDetail)(row);
    }
    async findFeatured() {
        const featured = await this.repository.findFeatured();
        if (featured)
            return (0, blog_repository_1.toSummary)(featured);
        const [rows] = await this.repository.findMany({ page: 1, limit: 1, sort: 'latest' });
        return rows[0] ? (0, blog_repository_1.toSummary)(rows[0]) : null;
    }
    async findTrending(limit = 5) {
        const rows = await this.repository.findTrending(limit);
        if (rows.length >= limit)
            return rows.map(blog_repository_1.toSummary);
        const [popular] = await this.repository.findMany({
            page: 1,
            limit: limit * 2,
            sort: 'popular',
        });
        const seen = new Set(rows.map((row) => row.id));
        const merged = [...rows];
        for (const row of popular) {
            if (merged.length >= limit)
                break;
            if (!seen.has(row.id))
                merged.push(row);
        }
        return merged.map(blog_repository_1.toSummary);
    }
    async findEditorsPicks(limit = 3, excludeSlug) {
        const [rows] = await this.repository.findMany({
            page: 1,
            limit,
            sort: 'popular',
            exclude: excludeSlug,
        });
        return rows.map(blog_repository_1.toSummary);
    }
    async findRelated(slug, limit = 3) {
        const article = await this.repository.findBySlug(slug);
        if (!article)
            throw new common_1.NotFoundException(`No published article found for "${slug}"`);
        const rows = await this.repository.findRelated(article, limit);
        return rows.map(blog_repository_1.toSummary);
    }
    async create(dto) {
        const { categoryId, authorId } = await this.resolveRelations(dto.category, dto.author);
        const image = (0, sanitize_1.safeImageUrl)(dto.featuredImage);
        if (!image)
            throw new common_1.BadRequestException('featuredImage must be an http(s) URL or a site path');
        const content = (0, sanitize_1.sanitizeArticleHtml)(dto.content);
        const slug = await (0, slugify_1.uniqueSlug)(dto.title, (candidate) => this.repository.slugExists(candidate));
        const status = dto.status ?? 'published';
        const data = {
            title: dto.title,
            slug,
            excerpt: dto.excerpt,
            content,
            featuredImage: image,
            category: { connect: { id: categoryId } },
            author: { connect: { id: authorId } },
            status,
            publishedAt: dto.publishedAt
                ? new Date(dto.publishedAt)
                : status === 'published'
                    ? new Date()
                    : null,
            readingTime: (0, reading_time_1.readingTimeOf)(content),
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
        return (0, blog_repository_1.toDetail)(await this.repository.create(data));
    }
    async update(id, dto) {
        const existing = await this.repository.findById(id);
        if (!existing)
            throw new common_1.NotFoundException(`No article with id "${id}"`);
        const data = {};
        if (dto.title !== undefined)
            data.title = dto.title;
        if (dto.excerpt !== undefined)
            data.excerpt = dto.excerpt;
        if (dto.featured !== undefined)
            data.featured = dto.featured;
        if (dto.trending !== undefined)
            data.trending = dto.trending;
        if (dto.seoTitle !== undefined)
            data.seoTitle = dto.seoTitle;
        if (dto.seoDescription !== undefined)
            data.seoDescription = dto.seoDescription;
        if (dto.seoKeywords !== undefined)
            data.seoKeywords = dto.seoKeywords.join(', ');
        if (dto.publishedAt !== undefined)
            data.publishedAt = new Date(dto.publishedAt);
        if (dto.content !== undefined) {
            const content = (0, sanitize_1.sanitizeArticleHtml)(dto.content);
            data.content = content;
            data.readingTime = (0, reading_time_1.readingTimeOf)(content);
        }
        if (dto.featuredImage !== undefined) {
            const image = (0, sanitize_1.safeImageUrl)(dto.featuredImage);
            if (!image)
                throw new common_1.BadRequestException('featuredImage must be an http(s) URL or a site path');
            data.featuredImage = image;
        }
        if (dto.status !== undefined) {
            data.status = dto.status;
            if (dto.status === 'published' && !existing.publishedAt)
                data.publishedAt = new Date();
        }
        if (dto.category !== undefined || dto.author !== undefined) {
            const { categoryId, authorId } = await this.resolveRelations(dto.category, dto.author);
            if (dto.category !== undefined)
                data.category = { connect: { id: categoryId } };
            if (dto.author !== undefined)
                data.author = { connect: { id: authorId } };
        }
        if (dto.tags !== undefined) {
            const tags = await this.repository.connectOrCreateTags(dto.tags);
            data.tags = { set: tags };
        }
        return (0, blog_repository_1.toDetail)(await this.repository.update(id, data));
    }
    async remove(id) {
        const existing = await this.repository.findById(id);
        if (!existing)
            throw new common_1.NotFoundException(`No article with id "${id}"`);
        await this.repository.delete(id);
    }
    async resolveRelations(categorySlug, authorSlug) {
        const [category, author] = await Promise.all([
            categorySlug ? this.repository.findCategoryBySlug(categorySlug) : null,
            authorSlug ? this.repository.findAuthorBySlug(authorSlug) : null,
        ]);
        if (categorySlug && !category) {
            throw new common_1.BadRequestException(`Unknown category "${categorySlug}"`);
        }
        if (authorSlug && !author) {
            throw new common_1.BadRequestException(`Unknown author "${authorSlug}"`);
        }
        return { categoryId: category?.id ?? '', authorId: author?.id ?? '' };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blog_repository_1.BlogRepository])
], BlogService);
//# sourceMappingURL=blog.service.js.map