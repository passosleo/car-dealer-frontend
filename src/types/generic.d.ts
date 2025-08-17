export type DefaultResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type DefaultFilters = {
  page?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  search?: string;
};

export type DefaultPrivateFilters = DefaultFilters & {
  status?: "all" | "active" | "inactive";
  createdAtStart?: string;
  createdAtEnd?: string;
  updatedAtStart?: string;
  updatedAtEnd?: string;
};

export type Paginated<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: T[];
};
