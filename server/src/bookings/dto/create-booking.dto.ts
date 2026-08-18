import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/** Ten digits, first one 6–9: the Indian mobile range. */
const MOBILE = /^[6-9]\d{9}$/;

export class CreateBookingDto {
  @IsString()
  @MinLength(2, { message: 'Enter your name' })
  @MaxLength(120)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  /**
   * Normalised to ten digits before validation, so "+91 98765 43210",
   * "098765 43210" and "9876543210" all store identically — which is what
   * makes the phone index worth having.
   */
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\D/g, '').slice(-10) : value,
  )
  @Matches(MOBILE, { message: 'Enter a valid 10-digit mobile number' })
  phone: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' && value.trim() ? value.trim().toLowerCase() : undefined,
  )
  @IsEmail({}, { message: 'Enter a valid email address' })
  @MaxLength(254)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  course?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  preferredDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @IsOptional()
  @IsIn(['navbar', 'hero', 'blog', 'about', 'footer'])
  source?: string = 'navbar';
}
