"use client";

import {
  FilterBar,
  FilterBarProps,
} from "@/components/admin/filter/filter-bar";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function VehicleFilterBar({
  className,
  ...props
}: Omit<FilterBarProps, "filterOptions" | "zodSchema">) {
  return (
    <>
      <FilterBar
        {...props}
        filterOptions={[
          {
            type: "date",
            label: "Cadastrado a partir de:",
            name: "createdAtStart",
          },
          {
            type: "date",
            label: "Cadastrado até:",
            name: "createdAtEnd",
          },
          {
            type: "date",
            label: "Atualizado a partir de:",
            name: "updatedAtStart",
          },
          {
            type: "date",
            label: "Atualizado até:",
            name: "updatedAtEnd",
          },
          {
            type: "select",
            label: "Status",
            name: "status",
            data: [
              { label: "Todos", value: "all" },
              { label: "Ativos", value: "active" },
              { label: "Inativos", value: "inactive" },
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
        zodSchema={z
          .object({
            createdAtStart: z.string().optional(),
            createdAtEnd: z.string().optional(),
            updatedAtStart: z.string().optional(),
            updatedAtEnd: z.string().optional(),
            status: z.enum(["all", "active", "inactive"]).optional(),
            priceStart: z.number().optional(),
            priceEnd: z.number().optional(),
            mileageStart: z.number().optional(),
            mileageEnd: z.number().optional(),
            yearStart: z.number().optional(),
            yearEnd: z.number().optional(),
            doors: z.number().optional(),
            seats: z.number().optional(),
            horsepowerStart: z.number().optional(),
            horsepowerEnd: z.number().optional(),
          })
          .refine(
            (data) =>
              !data.createdAtStart ||
              !data.createdAtEnd ||
              new Date(data.createdAtStart) <= new Date(data.createdAtEnd),
            {
              message: "Escolha uma data de término maior que a data de início",
              path: ["createdAtEnd"],
            }
          )
          .refine(
            (data) =>
              !data.updatedAtStart ||
              !data.updatedAtEnd ||
              new Date(data.updatedAtStart) <= new Date(data.updatedAtEnd),
            {
              message:
                "Escolha uma data de término maior que a data de início.",
              path: ["updatedAtEnd"],
            }
          )}
        className={twMerge(
          "md:max-h-full max-h-[300px] max-w-xs overflow-auto",
          className
        )}
      />
    </>
  );
}
