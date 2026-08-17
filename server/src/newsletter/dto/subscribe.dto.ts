import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsOptional, MaxLength } from 'class-validator';

export class SubscribeDto {
  /**
   * Normalised before validation: addresses arrive with stray whitespace and
   * mixed case, and storing them raw would let the same person subscribe twice
   * past the unique index.
   */
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Enter a valid email address' })
  @MaxLength(254)
  email: string;

  /** Where the form was submitted from, for attribution. */
  @IsOptional()
  @IsIn(['blog', 'article', 'footer'])
  source?: string = 'blog';
}
