import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker, DatePickerProps } from "../date-picker/date-picker";
import { format, isValid } from "date-fns";
import { ConnectForm } from "@/components/shared/connect-form";
import { twMerge } from "tailwind-merge";

type FormDatePickerProps = DatePickerProps & {
  label: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
};

const FormDatePicker = React.forwardRef<HTMLDivElement, FormDatePickerProps>(
  (
    {
      label,
      name,
      disabled,
      defaultValue,
      onChange,
      showTimePicker = false,
      ...props
    },
    ref
  ) => {
    return (
      <ConnectForm>
        {(form) => (
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => {
              const dateValue =
                typeof field.value === "string"
                  ? (() => {
                      const d = new Date(field.value);
                      return isValid(d) ? d : undefined;
                    })()
                  : undefined;

              return (
                <div ref={ref} className="flex flex-col gap-1 w-full">
                  <Label
                    htmlFor={name}
                    className={twMerge(
                      "text-muted-foreground text-xs font-medium",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {label}
                  </Label>
                  <DatePicker
                    {...props}
                    id={props.id || name}
                    disabled={disabled}
                    value={dateValue}
                    onChange={(date) => {
                      if (date && isValid(date)) {
                        const formatted = showTimePicker
                          ? format(date, "yyyy-MM-dd'T'HH:mm:ss")
                          : format(date, "yyyy-MM-dd");
                        field.onChange(formatted);
                      } else {
                        field.onChange("");
                      }
                      if (onChange) onChange(date);
                    }}
                    showTimePicker={showTimePicker}
                  />
                  <div className="text-destructive text-xs min-h-5 pt-1">
                    {fieldState.error && (
                      <span>{fieldState.error.message}</span>
                    )}
                  </div>
                </div>
              );
            }}
          />
        )}
      </ConnectForm>
    );
  }
);

FormDatePicker.displayName = "FormDatePicker";

export { FormDatePicker };
