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
            label: "Início a partir de:",
            name: "startAtStart",
            timePicker: true,
          },
          {
            type: "date",
            label: "Início até:",
            name: "startAtEnd",
            timePicker: true,
          },
          {
            type: "date",
            label: "Término a partir de:",
            name: "endAtStart",
            timePicker: true,
          },
          {
            type: "date",
            label: "Término até:",
            name: "endAtEnd",
            timePicker: true,
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
            startAtStart: z.string().optional(),
            startAtEnd: z.string().optional(),
            endAtStart: z.string().optional(),
            endAtEnd: z.string().optional(),
            createdAtStart: z.string().optional(),
            createdAtEnd: z.string().optional(),
            updatedAtStart: z.string().optional(),
            updatedAtEnd: z.string().optional(),
            visible: z.enum(["all", "visible", "hidden"]).optional(),
            status: z.enum(["all", "active", "inactive"]).optional(),
          })
          .refine(
            (data) =>
              !data.startAtStart ||
              !data.startAtEnd ||
              new Date(data.startAtStart) <= new Date(data.startAtEnd),
            {
              message: "Escolha uma data de término maior que a data de início",
              path: ["startAtEnd"],
            }
          )
          .refine(
            (data) =>
              !data.endAtStart ||
              !data.endAtEnd ||
              new Date(data.endAtStart) <= new Date(data.endAtEnd),
            {
              message: "Escolha uma data de término maior que a data de início",
              path: ["endAtEnd"],
            }
          )
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
