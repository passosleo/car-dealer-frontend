import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker, DatePickerProps } from "../date-picker/date-picker";
import { format } from "date-fns";
import { ConnectForm } from "@/components/shared/connect-form";

type FormDatePickerProps = DatePickerProps & {
  label: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
};

const FormDatePicker = React.forwardRef<HTMLDivElement, FormDatePickerProps>(
  ({ label, name, disabled, defaultValue, onChange, ...props }, ref) => {
    return (
      <ConnectForm>
        {(form) => (
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
              <div ref={ref} className="flex flex-col gap-1 w-full">
                <Label
                  htmlFor={name}
                  className="text-muted-foreground text-xs font-medium"
                >
                  {label}
                </Label>
                <DatePicker
                  {...props}
                  id={props.id || name}
                  value={
                    field.value
                      ? new Date((field.value as string) + "T00:00:00")
                      : props.value
                  }
                  onChange={(date) => {
                    if (date) {
                      const value = format(date, "yyyy-MM-dd");
                      field.onChange(value);
                    } else {
                      field.onChange("");
                    }
                    if (onChange) onChange(date);
                  }}
                />
                <div className="text-destructive text-xs min-h-5 pt-1">
                  {fieldState.error && <span>{fieldState.error.message}</span>}
                </div>
              </div>
            )}
          />
        )}
      </ConnectForm>
    );
  }
);

FormDatePicker.displayName = "FormDatePicker";

export { FormDatePicker };
