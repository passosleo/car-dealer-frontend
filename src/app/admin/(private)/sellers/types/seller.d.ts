export type Seller = {
  sellerId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  customMessage: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateSellerRequest = {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  customMessage: string | null;
  active: boolean;
};
