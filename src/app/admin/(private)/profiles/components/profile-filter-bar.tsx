"use client";

import {
  FilterBar,
  FilterBarProps,
} from "@/components/admin/filter/filter-bar";
import { z } from "zod";

export function ProfileFilterBar(
  props: Omit<FilterBarProps, "filterOptions" | "zodSchema">
) {
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
        ]}
        zodSchema={z
          .object({
            createdAtStart: z.string().optional(),
            createdAtEnd: z.string().optional(),
            updatedAtStart: z.string().optional(),
            updatedAtEnd: z.string().optional(),
            status: z.enum(["all", "active", "inactive"]).optional(),
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
        className="md:max-h-full max-h-[300px] max-w-xs overflow-auto"
      />
    </>
  );
}
