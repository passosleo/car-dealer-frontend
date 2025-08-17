import { ConnectForm } from "@/components/shared/form/connect-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

export type FilterMultiSelectInputProps = {
  data: { label: string; value: string }[];
  label: string;
  name: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onValueChange?: (value: string | null) => void;
};

const FilterMultiSelectInput = ({
  name,
  label,
  disabled,
  defaultValue,
  data,
  onValueChange,
  placeholder = "Selecionar",
  icon,
}: FilterMultiSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedOptionLabels = (values: string) => {
    const selectedValues = values ? String(values).split(",") : [];
    const completeString = data
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(", ");

    if (completeString.length > 25) {
      const slicedString = completeString.slice(0, 25);
      if (slicedString.includes(",")) {
        return slicedString
          .slice(0, slicedString.lastIndexOf(","))
          .concat("...");
      }
      return slicedString.concat("...");
    }

    return completeString;
  };

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
            defaultValue={defaultValue && String(defaultValue)}
            render={({ field }) => {
              const selectedValues = field.value
                ? String(field.value).split(",")
                : [];

              function handleCheckboxChange(value: string) {
                let newSelectedValues = [...selectedValues];
                if (newSelectedValues.includes(value)) {
                  newSelectedValues = newSelectedValues.filter(
                    (v) => v !== value
                  );
                } else {
                  newSelectedValues.push(value);
                }
                const newValue = String(newSelectedValues.join(","));
                field.onChange(newValue);
                if (onValueChange) onValueChange(newValue);
              }

              return (
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-muted-foreground font-normal text-sm px-4 flex justify-between"
                      disabled={disabled}
                    >
                      {field.value ? (
                        <div className="flex gap-2 items-center text-primary">
                          {icon}
                          <span className="text-primary">
                            {getSelectedOptionLabels(field.value)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          {icon}
                          <span>{placeholder}</span>
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={"flex flex-col p-1 text-primary text-sm"}
                    align="start"
                  >
                    {data.map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex w-full items-center gap-2 hover:bg-accent p-1.5 rounded-md select-none"
                      >
                        <Checkbox
                          id={option.value}
                          checked={selectedValues.includes(option.value)}
                          onCheckedChange={() =>
                            handleCheckboxChange(option.value)
                          }
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        </div>
      )}
    </ConnectForm>
  );
};

FilterMultiSelectInput.displayName = "Filter.MultiSelectInput";

export { FilterMultiSelectInput };
