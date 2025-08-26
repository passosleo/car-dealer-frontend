"use client";
import {
  FilterBar,
  FilterBarProps,
} from "@/components/public/filter/filter-bar";
import { z } from "zod";

export function VehicleFilterBar({
  className,
  ...props
}: Omit<FilterBarProps, "filterOptions" | "zodSchema">) {
  return (
    <aside className="w-80 p-6 border-r border-zinc-800 bg-zinc-900/40">
      <FilterBar
        {...props}
        filterOptions={[
          {
            type: "multi-checkbox",
            label: "Marcas",
            name: "brands",
            data: [
              { label: "Ford", value: "ford" },
              { label: "Chevrolet", value: "chevrolet" },
              { label: "Toyota", value: "toyota" },
              { label: "Honda", value: "honda" },
              { label: "Volkswagen", value: "volkswagen" },
              { label: "Nissan", value: "nissan" },
              { label: "Hyundai", value: "hyundai" },
              { label: "Kia", value: "kia" },
              { label: "Jeep", value: "jeep" },
              { label: "Subaru", value: "subaru" },
            ],
          },
          {
            type: "multi-checkbox",
            label: "Categorias",
            name: "categories",
            data: [
              { label: "Hatchback", value: "hatchback" },
              { label: "Sedan", value: "sedan" },
              { label: "SUV", value: "suv" },
              { label: "Crossover", value: "crossover" },
              { label: "Pickup", value: "pickup" },
              { label: "Convertible", value: "convertible" },
              { label: "Coupe", value: "coupe" },
              { label: "Minivan", value: "minivan" },
              { label: "Wagon", value: "wagon" },
            ],
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
