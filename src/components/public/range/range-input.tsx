"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";

export type RangeInputProps = {
  fromProps?: React.ComponentProps<typeof Input> & { label?: string };
  toProps?: React.ComponentProps<typeof Input> & { label?: string };
  className?: string;
};

const RangeInput = React.forwardRef<HTMLDivElement, RangeInputProps>(
  ({ fromProps, toProps, className }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "flex gap-4 text-zinc-300 text-sm select-none",
          className
        )}
      >
        <div className="flex flex-col gap-1">
          <label className="tabular-nums" htmlFor={fromProps?.id ?? "from"}>
            {fromProps?.label ?? "De"}
          </label>
          <Input
            {...fromProps}
            id={fromProps?.id ?? "from"}
            className={twMerge(
              "border-zinc-800 bg-zinc-900 placeholder:text-zinc-600",
              fromProps?.className
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={toProps?.id ?? "to"} className="tabular-nums">
            {toProps?.label ?? "Até"}
          </label>
          <Input
            {...toProps}
            id={toProps?.id ?? "to"}
            className={twMerge(
              "border-zinc-800 bg-zinc-900 placeholder:text-zinc-600",
              toProps?.className
            )}
          />
        </div>
      </div>
    );
  }
);

RangeInput.displayName = "RangeInput";

export { RangeInput };
