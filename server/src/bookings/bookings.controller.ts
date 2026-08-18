import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('demo-bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  /**
   * POST /api/demo-bookings
   *
   * Public and unauthenticated, so it sits behind the same rate limiter as the
   * newsletter — five submissions a minute per IP.
   */
  @Post()
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  /** GET /api/demo-bookings?limit=50 — for the counselling team / admin panel. */
  @Get()
  findAll(@Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number) {
    return this.bookingsService.findAll(limit);
  }
}
