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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const query_articles_dto_1 = require("./dto/query-articles.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
let BlogController = class BlogController {
    blogService;
    constructor(blogService) {
        this.blogService = blogService;
    }
    list(query) {
        return this.blogService.list(query);
    }
    featured() {
        return this.blogService.findFeatured();
    }
    trending(limit) {
        return this.blogService.findTrending(Math.min(limit, 10));
    }
    editorsPicks(limit, exclude) {
        return this.blogService.findEditorsPicks(Math.min(limit, 6), exclude);
    }
    related(slug, limit) {
        return this.blogService.findRelated(slug, Math.min(limit, 6));
    }
    bySlug(slug) {
        return this.blogService.findBySlug(slug);
    }
    create(dto) {
        return this.blogService.create(dto);
    }
    update(id, dto) {
        return this.blogService.update(id, dto);
    }
    remove(id) {
        return this.blogService.remove(id);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_articles_dto_1.QueryArticlesDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "featured", null);
__decorate([
    (0, common_1.Get)('trending'),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "trending", null);
__decorate([
    (0, common_1.Get)('editors-picks'),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(3), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('exclude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "editorsPicks", null);
__decorate([
    (0, common_1.Get)('posts/:slug/related'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(3), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "related", null);
__decorate([
    (0, common_1.Get)('posts/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "bySlug", null);
__decorate([
    (0, common_1.Post)('posts'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('posts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('posts/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "remove", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map