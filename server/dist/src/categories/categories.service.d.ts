import { PrismaService } from '../prisma/prisma.service';
import type { CategorySummary } from '../blog/blog.types';
import type { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<CategorySummary[]>;
    findBySlug(slug: string): Promise<CategorySummary>;
    create(dto: CreateCategoryDto): Promise<CategorySummary>;
}
