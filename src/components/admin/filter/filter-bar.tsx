"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "@/hooks/use-search-params";
import { PopoverProps } from "@radix-ui/react-popover";
import { Trash2Icon, UserPenIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";
import { FilterToggleButton } from "./filter-toggle-button";
import { FilterMultiSelectInput } from "./filter-multi-select-input";
import { FilterSelectInput } from "./filter-select-input";
import { FilterDatePicker } from "./filter-date-picker";
import { FormContext } from "../../shared/form/form-context";

export type FilterBarProps = Omit<PopoverProps, "children"> & {
  className?: string;
  filterOptions: (
    | {
        type: "multi-select" | "select";
        label: string;
        name: string;
        data: { label: string; value: string }[];
      }
    | {
        type: "date";
        label: string;
        name: string;
        timePicker?: boolean;
      }
  )[];
  zodSchema: ZodSchema<FieldValues>;
};

export function FilterBar({
  className,
  filterOptions = [],
  zodSchema,
  ...props
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const searchParamNames = filterOptions.map((option) => option.name);

  const { getSearchParams, addSearchParams, clearSearchParams } =
    useSearchParams();

  const searchParams = getSearchParams(searchParamNames);

  const [totalActiveFilters, setTotalActiveFilters] = useState(
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
    setIsOpen(false);
  }

  function handleClear(form: UseFormReturn<FieldValues>) {
    form.reset();
    clearSearchParams(searchParamNames);
    setTotalActiveFilters(0);
    setIsOpen(false);
  }
  return (
    <Popover {...props} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FilterToggleButton totalActiveFilters={totalActiveFilters} />
      </PopoverTrigger>
      <PopoverContent className={twMerge("p-2", className)}>
        <FormContext
          onSubmit={handleSubmit}
          useFormProps={{
            defaultValues: searchParams,
          }}
          zodSchema={zodSchema}
        >
          {(form) => (
            <>
              {filterOptions.map((filterOption, index) => {
                switch (filterOption.type) {
                  case "date":
                    return (
                      <div key={filterOption.name}>
                        <FilterDatePicker
                          label={filterOption.label}
                          name={filterOption.name}
                          showTimePicker={filterOption.timePicker}
                        />
                        {index < filterOptions.length - 1 && (
                          <Separator className="mt-3.5" />
                        )}
                      </div>
                    );

                  case "multi-select":
                    return (
                      <div key={filterOption.name}>
                        <FilterMultiSelectInput
                          label={filterOption.label}
                          name={filterOption.name}
                          data={filterOption.data}
                          icon={<UserPenIcon size={16} className="mr-2" />}
                        />
                        {index < filterOptions.length - 1 && (
                          <Separator className="mt-3.5" />
                        )}
                      </div>
                    );

                  case "select":
                    return (
                      <div key={filterOption.name}>
                        <FilterSelectInput
                          label={filterOption.label}
                          name={filterOption.name}
                          data={filterOption.data}
                        />
                        {index < filterOptions.length - 1 && (
                          <Separator className="mt-3.5" />
                        )}
                      </div>
                    );

                  default:
                    return <></>;
                }
              })}

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  type="button"
                  onClick={() => handleClear(form)}
                  variant="outline"
                  className="w-full"
                >
                  <Trash2Icon size={16} />
                  Limpar filtros
                </Button>
                <Button type="submit" className="w-full">
                  Aplicar filtros
                </Button>
              </div>
            </>
          )}
        </FormContext>
      </PopoverContent>
    </Popover>
  );
}
