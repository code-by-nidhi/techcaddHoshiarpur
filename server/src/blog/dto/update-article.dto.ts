import { PartialType } from '@nestjs/mapped-types';

import { CreateArticleDto } from './create-article.dto';

/**
 * Every field optional, same validation rules. Derived from the create DTO so
 * a new field can only ever be added in one place.
 */
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
