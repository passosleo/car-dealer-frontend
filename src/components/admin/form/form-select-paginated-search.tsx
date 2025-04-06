import { ConnectForm } from "@/components/shared/connect-form";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { SelectPaginatedSearch } from "../select/select-paginated-search";

type FormSelectPaginatedSearchProps = React.ComponentProps<
  typeof SelectPaginatedSearch
> & {
  label: string;
  name: string;
  className?: string;
};

const FormSelectPaginatedSearch = React.forwardRef<
  HTMLInputElement,
  FormSelectPaginatedSearchProps
>(({ className, label, name, disabled, defaultValue = "", ...props }, ref) => {
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
                <SelectPaginatedSearch
                  {...props}
                  id={props.id || name}
                  disabled={disabled}
                  ref={ref}
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
});

FormSelectPaginatedSearch.displayName = "FormSelectPaginatedSearch";

export { FormSelectPaginatedSearch };
