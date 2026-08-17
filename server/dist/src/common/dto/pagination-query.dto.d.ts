export declare class PaginationQueryDto {
    page?: number;
    limit?: number;
}
export interface PaginatedResult<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}
export declare function paginated<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T>;
