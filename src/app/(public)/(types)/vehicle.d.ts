export type ListActiveVehicleFilters = {
  page?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  search?: string;
  priceStart?: number;
  priceEnd?: number;
  mileageStart?: number;
  mileageEnd?: number;
  yearStart?: number;
  yearEnd?: number;
  doors?: number;
  seats?: number;
  horsepowerStart?: number;
  horsepowerEnd?: number;
};
