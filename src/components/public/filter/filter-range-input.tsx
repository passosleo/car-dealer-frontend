import { ConnectForm } from "@/components/shared/form/connect-form";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { RangeInput } from "../range/range-input";
import { Tuple } from "@/types/generic";
import { Accordion } from "../accordion/accordion";

export type FilterRangeInputProps = Omit<
  React.ComponentProps<typeof RangeInput>,
  "value" | "onChange"
> & {
  name: string;
  label: string;
  labels?: Tuple<string, string>;
  onChange?: (v: Tuple) => void;
};

const FilterRangeInput = React.forwardRef<
  HTMLDivElement,
  FilterRangeInputProps
>(({ name, label, disabled, defaultValue, ...props }, ref) => {
  return (
    <ConnectForm>
      {(form) => (
        <Accordion
          ref={ref}
          trigger={
            <Label className="text-base font-semibold text-zinc-300 select-none cursor-pointer">
              {label}
            </Label>
          }
        >
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <RangeInput
                  {...field}
                  {...props}
                  onChange={(v) => {
                    if (props.onChange) props.onChange(v);
                    field.onChange(v);
                  }}
                  disabled={disabled}
                />
                <div className="text-destructive text-xs min-h-5 pt-1">
                  {fieldState.error && <span>{fieldState.error.message}</span>}
                </div>
              </div>
            )}
          />
        </Accordion>
      )}
    </ConnectForm>
  );
});

FilterRangeInput.displayName = "FilterRangeInput";

export { FilterRangeInput };
