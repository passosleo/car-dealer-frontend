import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker, DatePickerProps } from "../date-picker";
import { format } from "date-fns";
import { ConnectForm } from "@/components/shared/connect-form";

type FilterDatePickerProps = DatePickerProps & {
  label: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
};

const FilterDatePicker = React.forwardRef<
  HTMLDivElement,
  FilterDatePickerProps
>(({ label, name, disabled, defaultValue, onChange, ...props }, ref) => {
  return (
    <ConnectForm>
      {(form) => (
        <div
          ref={ref}
          className="flex flex-col gap-1 items-center justify-between text-muted-foreground"
        >
          <Label htmlFor={name} className="self-start text-xs">
            {label}
          </Label>
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
              <>
                <DatePicker
                  id={props.id || name}
                  disabled={disabled}
                  value={
                    field.value
                      ? new Date((field.value as string) + "T00:00:00")
                      : props.value
                  }
                  onChange={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                    if (onChange) onChange(date);
                  }}
                  {...props}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      )}
    </ConnectForm>
  );
});

FilterDatePicker.displayName = "Filter.DatePicker";

export { FilterDatePicker };
