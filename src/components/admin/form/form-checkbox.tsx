import { ConnectForm } from "@/components/shared/connect-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";

type FormCheckboxProps = React.ComponentProps<typeof Checkbox> & {
  label: string;
  name: string;
  className?: string;
};

const FormCheckbox = React.forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ label, name, disabled, defaultChecked = false, ...props }, ref) => {
    return (
      <ConnectForm>
        {(form) => (
          <Controller
            control={form.control}
            name={name}
            disabled={disabled}
            defaultValue={defaultChecked}
            render={({ field, fieldState }) => (
              <>
                <div>
                  <div className="w-full flex flex-row gap-2 items-center">
                    <Checkbox
                      {...props}
                      {...field}
                      ref={ref}
                      id={props.id || name}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                    <Label
                      htmlFor={name}
                      className="text-muted-foreground text-xs font-medium"
                    >
                      {label}
                    </Label>
                  </div>
                  <div className="text-destructive text-xs min-h-5 pt-1">
                    {fieldState.error && (
                      <span>{fieldState.error.message}</span>
                    )}
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
FormCheckbox.displayName = "FormCheckbox";

export { FormCheckbox };
