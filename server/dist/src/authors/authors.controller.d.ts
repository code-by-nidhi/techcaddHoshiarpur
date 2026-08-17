import { AuthorsService } from './authors.service';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    findAll(): Promise<import("../blog/blog.types").AuthorSummary[]>;
    findOne(slug: string): Promise<import("../blog/blog.types").AuthorDetail>;
}
