"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import { Tuple } from "@/types/generic";

type RangeInputProps = {
  value: Tuple | undefined;
  defaultValue?: Tuple | undefined;
  onChange: (v: Tuple<string, string>) => void;
  labels?: Tuple<string, string>;
  names?: Tuple<string, string>;
  placeholders?: Tuple<string, string>;
  className?: string;
  leftInputProps?: Omit<
    React.ComponentProps<typeof Input>,
    "value" | "defaultValue" | "onChange"
  >;
  rightInputProps?: Omit<
    React.ComponentProps<typeof Input>,
    "value" | "defaultValue" | "onChange"
  >;
  disabled?: boolean;
  normalizeOnBlur?: (raw: string) => string;
};

function toStr(v: string | number | undefined): string {
  return typeof v === "number" ? String(v) : v ?? "";
}

export const RangeInput = React.forwardRef<HTMLDivElement, RangeInputProps>(
  (
    {
      value,
      onChange,
      labels = ["De", "Até"],
      names,
      className,
      leftInputProps,
      rightInputProps,
      disabled,
      normalizeOnBlur,
      defaultValue,
      placeholders,
    },
    ref
  ) => {
    const lo = toStr(value?.[0]);
    const hi = toStr(value?.[1]);

    function handleChange(idx: 0 | 1, raw: string) {
      const next: Tuple<string, string> = idx === 0 ? [raw, hi] : [lo, raw];
      onChange(next);
    }

    function handleBlur(idx: 0 | 1, raw: string) {
      if (!normalizeOnBlur) return;
      const normalized = normalizeOnBlur(raw);
      const next: Tuple<string, string> =
        idx === 0 ? [normalized, hi] : [lo, normalized];
      onChange(next);
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          "flex gap-4 text-zinc-300 text-xs select-none",
          className
        )}
      >
        <div className="flex flex-col flex-1">
          <label className="w-fit" htmlFor={names?.[0] ?? "min"}>
            {labels[0]}
          </label>
          <Input
            {...leftInputProps}
            disabled={disabled ?? leftInputProps?.disabled}
            value={lo}
            defaultValue={defaultValue?.[0]}
            onChange={(e) => handleChange(0, e.target.value)}
            onBlur={(e) => handleBlur(0, e.target.value)}
            name={names?.[0]}
            id={names?.[0] ?? "min"}
            placeholder={placeholders?.[0]}
            className={twMerge(
              "border-zinc-800 bg-zinc-900 placeholder:text-zinc-600",
              leftInputProps?.className
            )}
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="w-fit" htmlFor={names?.[1] ?? "max"}>
            {labels[1]}
          </label>
          <Input
            {...rightInputProps}
            disabled={disabled ?? rightInputProps?.disabled}
            value={hi}
            defaultValue={defaultValue?.[1]}
            onChange={(e) => handleChange(1, e.target.value)}
            onBlur={(e) => handleBlur(1, e.target.value)}
            name={names?.[1]}
            id={names?.[1] ?? "max"}
            placeholder={placeholders?.[1]}
            className={twMerge(
              "border-zinc-800 bg-zinc-900 placeholder:text-zinc-600",
              rightInputProps?.className
            )}
          />
        </div>
      </div>
    );
  }
);

RangeInput.displayName = "RangeInput";
