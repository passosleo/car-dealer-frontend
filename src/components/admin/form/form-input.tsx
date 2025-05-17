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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
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
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
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
                  {leftIcon && (
                    <div
                      className={twMerge(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all",
                        field.value && !disabled && "text-primary",
                        disabled && "cursor-not-allowed opacity-50",
                        onLeftIconClick && "cursor-pointer"
                      )}
                      onClick={() => {
                        if (!disabled && onLeftIconClick) {
                          onLeftIconClick();
                        }
                      }}
                    >
                      {leftIcon}
                    </div>
                  )}
                  <Input
                    {...field}
                    {...props}
                    ref={ref}
                    type={type}
                    id={props.id || name}
                    disabled={disabled}
                    className={twMerge(
                      "w-full",
                      leftIcon && "pl-10",
                      rightIcon && "pr-10"
                    )}
                    onChange={(e) => {
                      field.onChange(e);
                      if (props.onChange) {
                        props.onChange(e);
                      }
                    }}
                  />
                  {rightIcon && (
                    <div
                      className={twMerge(
                        "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all",
                        field.value && !disabled && "text-primary",
                        disabled && "cursor-not-allowed opacity-50",
                        onRightIconClick && "cursor-pointer"
                      )}
                      onClick={() => {
                        if (!disabled && onRightIconClick) {
                          onRightIconClick();
                        }
                      }}
                    >
                      {rightIcon}
                    </div>
                  )}
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

FormInput.displayName = "FormInput";

export { FormInput };
