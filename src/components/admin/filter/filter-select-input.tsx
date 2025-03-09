import { ConnectForm } from "@/components/shared/connect-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Controller } from "react-hook-form";

export type FilterSelectInputProps = React.ComponentProps<typeof Select> & {
  data: { label: string; value: string }[];
  label: string;
  name: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  defaultSelectFirst?: boolean;
};

const FilterSelectInput = ({
  name,
  label,
  disabled,
  defaultValue,
  className,
  data,
  onValueChange,
  placeholder = "Selecionar",
  icon,
  defaultSelectFirst,
  ...props
}: FilterSelectInputProps) => {
  function getSelectedOptionLabel(value: string) {
    console.log("getSelectedOptionLabel ~ value", value);
    return data.find((option) => option.value === String(value))?.label || "";
  }
  return (
    <ConnectForm>
      {(form) => (
        <div className="flex flex-col gap-1 items-start justify-between text-muted-foreground">
          <Label
            htmlFor={name}
            className="text-muted-foreground text-xs font-medium"
          >
            {label}
          </Label>
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            defaultValue={defaultValue || (defaultSelectFirst && data[0].value)}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onValueChange) onValueChange(value);
                }}
                value={field.value || props.value}
                {...props}
              >
                <SelectTrigger
                  className="w-full text-muted-foreground font-normal text-sm px-4"
                  id={name}
                >
                  {field.value ? (
                    <div className="flex gap-2 items-center text-primary">
                      {icon}
                      <span className="text-primary">
                        {getSelectedOptionLabel(field.value)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2  items-center">
                      {icon}
                      <span>{placeholder}</span>
                    </div>
                  )}
                </SelectTrigger>
                <SelectContent className={className}>
                  <SelectGroup>
                    {data.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}
    </ConnectForm>
  );
};

FilterSelectInput.displayName = "Filter.SelectInput";

export { FilterSelectInput };
