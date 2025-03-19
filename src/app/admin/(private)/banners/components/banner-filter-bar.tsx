"use client";

import {
  FilterBar,
  FilterBarProps,
} from "@/components/admin/filter/filter-bar";
import { z } from "zod";

export function BannerFilterBar(
  props: Omit<FilterBarProps, "filterOptions" | "zodSchema">
) {
  return (
    <>
      <FilterBar
        {...props}
        filterOptions={[
          {
            type: "date",
            label: "Data de início:",
            name: "startAt",
          },
          {
            type: "date",
            label: "Data de término:",
            name: "endAt",
          },
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
            type: "multi-select",
            label: "Cadastrado por:",
            name: "createdBy",
            data: [
              { label: "Usuário 1", value: "1" },
              { label: "Usuário 2", value: "2" },
              { label: "Usuário 3", value: "3" },
            ],
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
            type: "multi-select",
            label: "Atualizado por:",
            name: "updatedBy",
            data: [
              { label: "Usuário 1", value: "1" },
              { label: "Usuário 2", value: "2" },
              { label: "Usuário 3", value: "3" },
            ],
          },
          {
            type: "select",
            label: "Visibilidade",
            name: "visible",
            data: [
              { label: "Todos", value: "all" },
              { label: "Visíveis", value: "visible" },
              { label: "Ocultos", value: "hidden" },
            ],
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
            startAt: z.string().optional(),
            endAt: z.string().optional(),
            createdAtStart: z.string().optional(),
            createdAtEnd: z.string().optional(),
            updatedAtStart: z.string().optional(),
            updatedAtEnd: z.string().optional(),
            createdBy: z.string().optional(),
            updatedBy: z.string().optional(),
            visible: z.enum(["all", "visible", "hidden"]).optional(),
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
        className="md:max-h-[640px] max-h-[300px] max-w-xs overflow-auto"
      />
    </>
  );
}
