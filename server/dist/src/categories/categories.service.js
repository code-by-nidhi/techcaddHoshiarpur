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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("../common/utils/slugify");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.category.findMany({
            orderBy: [{ position: 'asc' }, { name: 'asc' }],
            include: {
                _count: { select: { articles: { where: { status: 'published' } } } },
            },
        });
        return rows.map((row) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description,
            articleCount: row._count.articles,
        }));
    }
    async findBySlug(slug) {
        const row = await this.prisma.category.findUnique({ where: { slug } });
        if (!row)
            throw new common_1.NotFoundException(`No category "${slug}"`);
        return { id: row.id, name: row.name, slug: row.slug, description: row.description };
    }
    async create(dto) {
        const slug = (0, slugify_1.slugify)(dto.name);
        const clash = await this.prisma.category.findUnique({ where: { slug } });
        if (clash)
            throw new common_1.ConflictException(`Category "${slug}" already exists`);
        const row = await this.prisma.category.create({
            data: {
                name: dto.name,
                slug,
                description: dto.description ?? '',
                image: dto.image ?? null,
                position: dto.position ?? 99,
            },
        });
        return { id: row.id, name: row.name, slug: row.slug, description: row.description };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map