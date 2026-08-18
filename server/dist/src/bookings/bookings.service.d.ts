import { MysqlService } from '../mysql/mysql.service';
import type { CreateBookingDto } from './dto/create-booking.dto';
export interface BookingResult {
    id: number;
    status: 'received';
    message: string;
}
export declare class BookingsService {
    private readonly mysql;
    private readonly logger;
    constructor(mysql: MysqlService);
    create(dto: CreateBookingDto): Promise<BookingResult>;
    findAll(limit?: number): Promise<unknown[]>;
}
