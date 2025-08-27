"use client";
import {
  FilterBar,
  FilterBarProps,
} from "@/components/public/filter/filter-bar";
import { useListActiveBrandsService } from "@/services/public/use-list-active-brands-service";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
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
    <aside className="w-80 p-6 border-r border-zinc-800 bg-zinc-900/40">
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
          // {
          //   type: "number",
          //   label: "Preço a partir de:",
          //   name: "priceStart",
          // },
          // {
          //   type: "number",
          //   label: "Preço até:",
          //   name: "priceEnd",
          // },
          // {
          //   type: "number",
          //   label: "Quilometragem a partir de:",
          //   name: "mileageStart",
          // },
          // {
          //   type: "number",
          //   label: "Quilometragem até:",
          //   name: "mileageEnd",
          // },
          // {
          //   type: "number",
          //   label: "Ano a partir de:",
          //   name: "yearStart",
          // },
          // {
          //   type: "number",
          //   label: "Ano até:",
          //   name: "yearEnd",
          // },
          // {
          //   type: "number",
          //   label: "Portas",
          //   name: "doors",
          // },
          // {
          //   type: "number",
          //   label: "Assentos",
          //   name: "seats",
          // },
          // {
          //   type: "number",
          //   label: "Cavalos a partir de:",
          //   name: "horsepowerStart",
          // },
          // {
          //   type: "number",
          //   label: "Cavalos até:",
          //   name: "horsepowerEnd",
          // },
        ]}
        zodSchema={z.object({
          brands: z.array(z.string()).optional(),
          categories: z.array(z.string()).optional(),
        })}
        className={className}
      />
    </aside>
  );
}
