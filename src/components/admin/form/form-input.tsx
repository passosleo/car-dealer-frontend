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
              <div className="flex flex-col gap-1 w-full">
                <Label
                  htmlFor={name}
                  className="text-muted-foreground text-xs font-medium"
                >
                  {label}
                </Label>
                <div className="relative">
                  {leftIcon && (
                    <div
                      className={twMerge(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all",
                        field.value && "text-primary",
                        onLeftIconClick && "cursor-pointer"
                      )}
                      onClick={onLeftIconClick}
                    >
                      {leftIcon}
                    </div>
                  )}
                  <Input
                    {...props}
                    {...field}
                    ref={ref}
                    type={type}
                    id={props.id || name}
                    className={twMerge(
                      "w-full",
                      className,
                      leftIcon && "pl-10",
                      rightIcon && "pr-10"
                    )}
                  />
                  {rightIcon && (
                    <div
                      className={twMerge(
                        "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all",
                        field.value && "text-primary",
                        onRightIconClick && "cursor-pointer"
                      )}
                      onClick={onRightIconClick}
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
