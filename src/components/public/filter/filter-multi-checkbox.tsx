import { ConnectForm } from "@/components/shared/form/connect-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FilterMultiCheckboxProps = React.ComponentProps<"div"> & {
  data: { label: string; value: string }[];
  label: string;
  name: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const FilterMultiCheckbox = React.forwardRef<
  HTMLDivElement,
  FilterMultiCheckboxProps
>(({ name, label, disabled, data, className, isLoading, ...props }, ref) => {
  if (isLoading) {
    return (
      <div
        ref={ref}
        className={twMerge("flex flex-col gap-4 animate-pulse mb-5", className)}
        {...props}
      >
        <div className="h-4 w-40 bg-zinc-700 rounded" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 w-fit">
              <div className="h-5 w-5 bg-zinc-700 rounded" />
              <div className="h-3 w-24 bg-zinc-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ConnectForm>
      {(form) => (
        <div
          ref={ref}
          className={twMerge("flex flex-col gap-4", className)}
          {...props}
        >
          <Label className="text-base font-semibold text-zinc-300 select-none">
            {label}
          </Label>
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={[]}
            render={({ field, fieldState }) => {
              const selectedValues: string[] = field.value || [];

              function handleChange(checked: boolean, value: string) {
                const newValue = checked
                  ? [...selectedValues, value]
                  : selectedValues.filter((v) => v !== value);
                field.onChange(newValue);
              }

              return (
                <div>
                  <div className="flex flex-col gap-3">
                    {data.map(({ label: itemLabel, value }) => (
                      <Label
                        key={value}
                        htmlFor={`${name}-${value}`}
                        className="group flex items-center gap-2 text-sm cursor-pointer select-none transition-colors w-fit"
                      >
                        <Checkbox
                          id={`${name}-${value}`}
                          checked={selectedValues.includes(value)}
                          onCheckedChange={(checked) =>
                            handleChange(Boolean(checked), value)
                          }
                          disabled={disabled}
                          className="border-zinc-100 data-[state=checked]:hover:border-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 group-hover:border-zinc-400 transition-colors"
                        />
                        <span className="text-zinc-100 transition-colors group-hover:text-zinc-400">
                          {itemLabel}
                        </span>
                      </Label>
                    ))}
                  </div>
                  <div className="text-destructive text-xs min-h-5 pt-1">
                    {fieldState.error && (
                      <span>{fieldState.error.message}</span>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}
    </ConnectForm>
  );
});

FilterMultiCheckbox.displayName = "Filter.MultiCheckboxInput";

export { FilterMultiCheckbox };
