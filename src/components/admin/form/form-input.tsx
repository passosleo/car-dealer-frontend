import { ConnectForm } from "@/components/shared/connect-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type FormInputProps = React.ComponentProps<typeof Input> & {
  label: string;
  name: string;
  className?: string;
  icon?: React.ReactNode;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      label,
      name,
      disabled,
      defaultValue = "",
      type = "text",
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <ConnectForm>
        {(form) => (
          <Controller
            control={form.control}
            name={name}
            disabled={disabled}
            defaultValue={defaultValue || ""}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1 w-full">
                <Label
                  htmlFor={name}
                  className="text-muted-foreground text-xs font-medium"
                >
                  {label}
                </Label>
                <div className="relative">
                  {icon && (
                    <div
                      className={twMerge(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all",
                        field.value && "text-primary"
                      )}
                    >
                      {icon}
                    </div>
                  )}
                  <Input
                    {...props}
                    {...field}
                    ref={ref}
                    type={type}
                    id={props.id || name}
                    className={twMerge("w-full", className, icon && "pl-10")}
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
);

FormInput.displayName = "Form.Input";

export { FormInput };
