import { ConnectForm } from "@/components/shared/connect-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { Controller } from "react-hook-form";

type FormSwitchProps = React.ComponentProps<typeof Switch> & {
  label: string;
  name: string;
  className?: string;
};

const FormSwitch = React.forwardRef<HTMLButtonElement, FormSwitchProps>(
  ({ label, name, defaultChecked = false, disabled, ...props }, ref) => {
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
                <div className="flex flex-col gap-1 w-full">
                  <Label
                    htmlFor={name}
                    className="text-muted-foreground text-xs font-medium"
                  >
                    {label}
                  </Label>
                  <div className="flex flex-row items-center gap-2 mb-4">
                    <Switch
                      {...props}
                      {...field}
                      ref={ref}
                      id={props.id || name}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
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
FormSwitch.displayName = "FormSwitch";

export { FormSwitch };
