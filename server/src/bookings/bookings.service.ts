import { Injectable, Logger } from '@nestjs/common';

import { MysqlService } from '../mysql/mysql.service';
import type { CreateBookingDto } from './dto/create-booking.dto';

export interface BookingResult {
  id: number;
  status: 'received';
  message: string;
}

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(private readonly mysql: MysqlService) {}

  async create(dto: CreateBookingDto): Promise<BookingResult> {
    await this.mysql.ensureConnected();

    const booking = await this.mysql.demoBooking.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email ?? null,
        course: dto.course ?? null,
        preferredDate: dto.preferredDate ?? null,
        message: dto.message ?? null,
        source: dto.source ?? 'navbar',
      },
    });

    // the number itself is not logged: it is personal data, and the id is
    // enough to find the row
    this.logger.log(`Demo booking #${booking.id} received from ${booking.source}`);

    return {
      id: booking.id,
      status: 'received',
      message: "Booked. A counsellor will call you within one working day.",
    };
  }

  /**
   * The counselling team's list. Unauthenticated for now like the rest of the
   * write surface — put a guard on this before the API is public, since it
   * returns personal data.
   */
  async findAll(limit = 50): Promise<unknown[]> {
    await this.mysql.ensureConnected();

    return this.mysql.demoBooking.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 200),
    });
  }
}
