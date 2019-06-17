export interface Pagination {
  ids: number[];
  loading: boolean;
  page?: number;
  totalPages?: number;
  totalResults?: number;
  hasMore?: boolean;
}
