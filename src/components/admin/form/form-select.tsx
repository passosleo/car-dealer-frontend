import React from "react";
import { ConnectForm } from "@/components/shared/form/connect-form";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Select } from "../select/select";

type FormSelectProps = React.ComponentProps<typeof Select> & {
  label: string;
  name: string;
  className?: string;
};

export function FormSelect({
  className,
  label,
  name,
  disabled,
  defaultValue = "",
  ...props
}: FormSelectProps) {
  return (
    <ConnectForm>
      {(form) => (
        <Controller
          control={form.control}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue || ""}
          render={({ field, fieldState }) => (
            <div className={twMerge("flex flex-col gap-1 w-full", className)}>
              <Label
                htmlFor={name}
                className={twMerge(
                  "text-muted-foreground text-xs font-medium",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </Label>
              <div className="relative">
                <Select
                  {...props}
                  id={props.id || name}
                  name={name}
                  disabled={disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                />
              </div>
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
