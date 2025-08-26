"use client";
import { FormContext } from "@/components/shared/form/form-context";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/hooks/use-search-params";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";
import { FilterMultiCheckboxInput } from "./filter-multi-checkbox";

export type FilterBarProps = {
  className?: string;
  filterOptions: {
    type: "multi-checkbox";
    label: string;
    name: string;
    data: { label: string; value: string }[];
  }[];
  zodSchema: ZodSchema<FieldValues>;
};

export function FilterBar({
  className,
  filterOptions = [],
  zodSchema,
}: FilterBarProps) {
  const searchParamNames = filterOptions.map((option) => option.name);

  const { getSearchParams, addSearchParams, clearSearchParams } =
    useSearchParams();

  const searchParams = getSearchParams(searchParamNames);

  const [, setTotalActiveFilters] = useState(
    getTotalActiveFilters(searchParams)
  );

  function getTotalActiveFilters(
    filterObject: Record<string, string | number | boolean | undefined>
  ) {
    const activeFilters = Object.values(filterObject).filter(
      (filter) => filter
    );
    return activeFilters.length;
  }

  function handleSubmit(data: FieldValues) {
    addSearchParams(data);
    if (data && Object.keys(data).length) {
      const totalActive = getTotalActiveFilters(data);
      setTotalActiveFilters(totalActive);
    }
  }

  function handleClear(form: UseFormReturn<FieldValues>) {
    form.reset();
    clearSearchParams(searchParamNames);
    setTotalActiveFilters(0);
  }
  return (
    <FormContext
      onSubmit={handleSubmit}
      useFormProps={{
        defaultValues: searchParams,
      }}
      zodSchema={zodSchema}
      className={className}
    >
      {(form) => (
        <>
          {filterOptions.map((filterOption) => {
            switch (filterOption.type) {
              case "multi-checkbox":
                return (
                  <div key={filterOption.name}>
                    <FilterMultiCheckboxInput
                      name={filterOption.name}
                      label={filterOption.label}
                      data={filterOption.data}
                    />
                  </div>
                );

              default:
                return <></>;
            }
          })}

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={() => handleClear(form)}
              variant="outline"
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white border-none"
            >
              <Trash2Icon size={16} />
              Limpar filtros
            </Button>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            >
              Aplicar filtros
            </Button>
          </div>
        </>
      )}
    </FormContext>
  );
}
