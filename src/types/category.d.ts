export type Category = {
  categoryId: string;
  name: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryRequest = {
  name: string;
  image: string;
  active: boolean;
};

export type UpdateCategoryRequest = {
  name: string;
  image: string;
  active: boolean;
};

export type ListActiveCategoryFilters = {
  page?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  search?: string;
};
