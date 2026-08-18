import { Module } from '@nestjs/common';

import { MysqlService } from '../mysql/mysql.service';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, MysqlService],
})
export class BookingsModule {}
