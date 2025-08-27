"use client";
import { FormContext } from "@/components/shared/form/form-context";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";
import { FilterMultiCheckbox } from "./filter-multi-checkbox";
import { useArraySearchParams } from "@/hooks/use-array-search-params";

export type FilterBarProps = {
  className?: string;
  filterOptions: {
    type: "multi-checkbox";
    label: string;
    name: string;
    data: { label: string; value: string }[];
    isLoading?: boolean;
  }[];
  zodSchema: ZodSchema<FieldValues>;
};

export function FilterBar({
  className,
  filterOptions = [],
  zodSchema,
}: FilterBarProps) {
  const searchParamNames = filterOptions.map((option) => option.name);

  const {
    getSearchParams,
    addSearchParams,
    clearSearchParams,
    isUrlParamsEmpty,
  } = useArraySearchParams();

  const searchParams = getSearchParams(searchParamNames);

  // const totalActiveFilters = useMemo(() => {
  //   return Object.values(searchParams).reduce((total, value) => {
  //     if (Array.isArray(value)) {
  //       return total + value.length;
  //     }
  //     return total + 1;
  //   }, 0);
  // }, [searchParams]);

  function handleSubmit(data: FieldValues) {
    addSearchParams(data);
  }

  function handleClear(form: UseFormReturn<FieldValues>) {
    if (isUrlParamsEmpty) return;
    searchParamNames.forEach((param) => {
      form.setValue(param, []);
    });
    clearSearchParams(searchParamNames);
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
                    <FilterMultiCheckbox
                      name={filterOption.name}
                      label={filterOption.label}
                      data={filterOption.data}
                      isLoading={filterOption.isLoading}
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
