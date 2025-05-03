import { DefaultFilters } from "@/services/types";
import { Brand } from "../../brands/types/brand";
import { Category } from "../../categories/types/category";

export type Vehicle = {
  vehicleId: string;
  model: string;
  year: number;
  plate: string;
  description: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  transmission: string | null;
  fuelType: string | null;
  doors: number | null;
  seats: number | null;
  horsepower: number | null;
  torque: number | null;
  driveTrain: string | null;
  brand: Brand;
  category: Category;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  vehicleImages: string[];
  vehicleFeatures: string[];
};

export type CreateVehicleRequest = {
  model: string;
  year: number;
  plate: string;
  description: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  transmission: string | null;
  fuelType: string | null;
  doors: number | null;
  seats: number | null;
  horsepower: number | null;
  torque: number | null;
  driveTrain: string | null;
  brandId: string;
  categoryId: string;
  active: boolean;
  vehicleImages: string[];
  vehicleFeatures: string[];
};

export type UpdateVehicleRequest = {
  model: string;
  year: number;
  plate: string;
  description: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  transmission: string | null;
  fuelType: string | null;
  doors: number | null;
  seats: number | null;
  horsepower: number | null;
  torque: number | null;
  driveTrain: string | null;
  brandId: string;
  categoryId: string;
  active: boolean;
  vehicleImages: string[];
  vehicleFeatures: string[];
};

export type ListVehicleFilters = DefaultFilters & {
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
