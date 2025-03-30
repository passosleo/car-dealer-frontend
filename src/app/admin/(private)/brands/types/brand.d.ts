export type Brand = {
  brandId: string;
  name: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateBrandRequest = {
  name: string;
  image: string;
  active: boolean;
};

export type UpdateBrandRequest = {
  name: string;
  image: string;
  active: boolean;
};
