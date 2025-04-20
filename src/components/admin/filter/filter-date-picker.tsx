import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker, DatePickerProps } from "../date-picker/date-picker";
import { ConnectForm } from "@/components/shared/connect-form";
import { isValid, parseISO, format } from "date-fns";

type FilterDatePickerProps = DatePickerProps & {
  label: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
};

const FilterDatePicker = React.forwardRef<
  HTMLDivElement,
  FilterDatePickerProps
>(
  (
    { label, name, disabled, defaultValue, onChange, showTimePicker, ...props },
    ref
  ) => {
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
              render={({ field, fieldState }) => {
                let dateValue: Date | undefined;
                if (typeof field.value === "string") {
                  const parsed = parseISO(field.value);
                  if (isValid(parsed)) dateValue = parsed;
                }

                return (
                  <>
                    <DatePicker
                      {...props}
                      id={props.id || name}
                      disabled={disabled}
                      value={dateValue}
                      onChange={(date) => {
                        if (date) {
                          const formatted = showTimePicker
                            ? format(date, "yyyy-MM-dd'T'HH:mm:ss")
                            : format(date, "yyyy-MM-dd");
                          field.onChange(formatted);
                          if (onChange) onChange(date);
                        } else {
                          field.onChange(null);
                          if (onChange) onChange(null);
                        }
                      }}
                      showTimePicker={showTimePicker}
                    />
                    {fieldState.error && (
                      <span className="text-red-500 text-xs">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </div>
        )}
      </ConnectForm>
    );
  }
);

FilterDatePicker.displayName = "Filter.DatePicker";

export { FilterDatePicker };
