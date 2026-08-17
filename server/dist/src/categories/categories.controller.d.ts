import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("../blog/blog.types").CategorySummary[]>;
    findOne(slug: string): Promise<import("../blog/blog.types").CategorySummary>;
    create(dto: CreateCategoryDto): Promise<import("../blog/blog.types").CategorySummary>;
}
