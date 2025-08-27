import { ConnectForm } from "@/components/shared/form/connect-form";
import { SliderRangeInput } from "@/components/shared/range/slider-range-input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";

export type FilterSliderRangeInputProps = Omit<
  React.ComponentProps<typeof SliderRangeInput>,
  "value" | "onChange"
> & {
  name: string;
  label: string;
};

const FilterSliderRangeInput = React.forwardRef<
  HTMLDivElement,
  FilterSliderRangeInputProps
>(({ name, label, min = 0, max = 100, disabled, ...props }, ref) => {
  const defaultValue: [number, number] = [min, max];
  return (
    <ConnectForm>
      {(form) => (
        <div ref={ref} className="flex flex-col gap-4">
          <Label className="text-base font-semibold text-zinc-300 select-none">
            {label}
          </Label>
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <SliderRangeInput
                  {...field}
                  {...props}
                  name={name}
                  min={min}
                  max={max}
                  disabled={disabled}
                />
                <div className="text-destructive text-xs min-h-5 pt-1">
                  {fieldState.error && <span>{fieldState.error.message}</span>}
                </div>
              </div>
            )}
          />
        </div>
      )}
    </ConnectForm>
  );
});

FilterSliderRangeInput.displayName = "FilterSliderRangeInput";

export { FilterSliderRangeInput };
