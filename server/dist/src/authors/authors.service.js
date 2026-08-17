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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthorsService = class AuthorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.author.findMany({ orderBy: { name: 'asc' } });
        return rows.map((row) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            avatar: row.avatar,
            role: row.role,
        }));
    }
    async findBySlug(slug) {
        const row = await this.prisma.author.findUnique({
            where: { slug },
            include: {
                _count: { select: { articles: { where: { status: 'published' } } } },
            },
        });
        if (!row)
            throw new common_1.NotFoundException(`No author "${slug}"`);
        return {
            id: row.id,
            name: row.name,
            slug: row.slug,
            avatar: row.avatar,
            role: row.role,
            bio: row.bio,
            socialLinks: this.parseSocialLinks(row.socialLinks),
            articleCount: row._count.articles,
        };
    }
    parseSocialLinks(raw) {
        try {
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        }
        catch {
            return {};
        }
    }
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map