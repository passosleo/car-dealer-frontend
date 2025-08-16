import { ConnectForm } from "@/components/shared/form/connect-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type FormTextAreaProps = React.ComponentProps<typeof Textarea> & {
  label: string;
  name: string;
  className?: string;
  icon?: React.ReactNode;
};

const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, label, name, disabled, defaultValue = "", ...props }, ref) => {
    return (
      <ConnectForm>
        {(form) => (
          <Controller
            control={form.control}
            name={name}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
              <>
                <div className="flex flex-col gap-1 w-full">
                  <Label
                    htmlFor={name}
                    className={twMerge(
                      "text-muted-foreground text-xs font-medium",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {label}
                  </Label>
                  <div>
                    <Textarea
                      {...props}
                      {...field}
                      ref={ref}
                      disabled={disabled}
                      id={props.id || name}
                      className={twMerge("w-full", className)}
                    />
                    <div className="text-destructive text-xs min-h-5 pt-1">
                      {fieldState.error && (
                        <span>{fieldState.error.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          />
        )}
      </ConnectForm>
    );
  }
);
FormTextArea.displayName = "FormTextArea";

export { FormTextArea };
