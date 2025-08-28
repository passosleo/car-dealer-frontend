"use client";
import {
  FilterBar,
  FilterBarProps,
} from "@/components/public/filter/filter-bar";
import {
  DRIVE_TRAIN_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
} from "@/constants/filters";
import { useListActiveBrandsService } from "@/services/public/use-list-active-brands-service";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
import { formatToReal } from "@/utils/money";
import { z } from "zod";

export function VehicleFilterBar({
  className,
  ...props
}: Omit<FilterBarProps, "filterOptions" | "zodSchema">) {
  const { brands, isPending: isBrandsLoading } = useListActiveBrandsService({
    limit: 100,
  });
  const { categories, isPending: isCategoriesLoading } =
    useListActiveCategoriesService({ limit: 100 });

  return (
    <aside className="w-80 p-6 border-r border-zinc-800 bg-zinc-900/40 max-h-screen sticky top-[115px] self-start overflow-y-auto no-scrollbar">
      <FilterBar
        {...props}
        filterOptions={[
          {
            type: "multi-checkbox",
            label: "Marcas",
            name: "brands",
            data: brands.map((brand) => ({
              label: brand.name,
              value: brand.brandId,
            })),
            isLoading: isBrandsLoading,
          },
          {
            type: "multi-checkbox",
            label: "Categorias",
            name: "categories",
            data: categories.map((category) => ({
              label: category.name,
              value: category.categoryId,
            })),
            isLoading: isCategoriesLoading,
          },
          {
            type: "slider-range",
            label: "Preço",
            name: "price",
            min: 0,
            max: 500000,
            step: 1000,
            format: formatToReal,
          },
          {
            type: "range",
            label: "Ano",
            name: "year",
            placeholders: ["2000", new Date().getFullYear().toString()],
          },
          {
            type: "slider-range",
            label: "Quilometragem",
            name: "mileage",
            min: 0,
            max: 250000,
            step: 1000,
            format: (n) => `${n.toLocaleString()} km`,
          },
          {
            type: "multi-checkbox",
            label: "Transmissão",
            name: "transmission",
            data: TRANSMISSION_TYPES,
          },
          {
            type: "multi-checkbox",
            label: "Combustível",
            name: "fuel",
            data: FUEL_TYPES,
          },
          {
            type: "multi-checkbox",
            label: "Tração",
            name: "driveTrain",
            data: DRIVE_TRAIN_TYPES,
          },
        ]}
        zodSchema={z.object({
          brands: z.array(z.string()).optional(),
          categories: z.array(z.string()).optional(),
          price: z.array(z.number()).optional(),
          year: z.array(z.string()).optional(),
          mileage: z.array(z.number()).optional(),
          transmission: z.array(z.string()).optional(),
          fuel: z.array(z.string()).optional(),
          driveTrain: z.array(z.string()).optional(),
        })}
        className={className}
      />
    </aside>
  );
}
