import { PrismaService } from '../prisma/prisma.service';
import type { AuthorDetail, AuthorSummary } from '../blog/blog.types';
export declare class AuthorsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<AuthorSummary[]>;
    findBySlug(slug: string): Promise<AuthorDetail>;
    private parseSocialLinks;
}
