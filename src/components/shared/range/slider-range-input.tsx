"use client";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

type Tuple<V1 = number, V2 = number> = [V1, V2];

export type SliderRangeInputProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  "onValueChange" | "value" | "onChange"
> & {
  value: Tuple | number[] | undefined;
  onChange: (v: Tuple) => void;
  format?: (n: number) => string;
  prefix?: string;
  suffix?: string;
  showInputs?: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function normalizeTuple(
  v: Tuple | number[] | undefined,
  min: number,
  max: number
): Tuple {
  const a =
    typeof v?.[0] === "number" || typeof v?.[0] === "string" ? v[0] : min;
  const b =
    typeof v?.[1] === "number" || typeof v?.[1] === "string" ? v[1] : max;
  const lo = clamp(Math.min(a, b), min, max);
  const hi = clamp(Math.max(a, b), min, max);
  return [lo, hi];
}

export function SliderRangeInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled,
  format,
  prefix = "",
  suffix = "",
  showInputs = false,
  ...props
}: SliderRangeInputProps) {
  const [lo, hi] = normalizeTuple(value, min, max);

  function handleSliderChange(v: number[]) {
    const [a, b] = normalizeTuple(v as Tuple, min, max);
    onChange([a, b]);
  }

  function handleInputChange(idx: 0 | 1, raw: string) {
    const num = Number(raw.replace(/\s+/g, ""));
    if (Number.isNaN(num)) return;
    const clamped = clamp(num, min, max);
    const next: Tuple = idx === 0 ? [clamped, hi] : [lo, clamped];
    onChange(normalizeTuple(next, min, max));
  }

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between text-sm text-zinc-300 select-none">
        <span className="tabular-nums">
          {prefix}
          {format ? format(lo) : lo}
          {suffix}
        </span>
        <span className="tabular-nums">
          {prefix}
          {format ? format(hi) : hi}
          {suffix}
        </span>
      </div>

      <SliderPrimitive.Root
        {...props}
        value={[lo, hi]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={twMerge(
          "relative flex w-full touch-none select-none items-center py-2",
          className
        )}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-800">
          <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
        </SliderPrimitive.Track>

        {[lo, hi].map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={i === 0 ? "Valor mínimo" : "Valor máximo"}
            className="block h-4 w-4 rounded-full border border-zinc-700 bg-white ring-offset-zinc-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>

      {showInputs && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Mín.</span>
            <input
              type="number"
              step={step}
              min={min}
              max={max}
              value={lo}
              onChange={(e) => handleInputChange(0, e.target.value)}
              disabled={disabled}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Máx.</span>
            <input
              type="number"
              step={step}
              min={min}
              max={max}
              value={hi}
              onChange={(e) => handleInputChange(1, e.target.value)}
              disabled={disabled}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700"
            />
          </div>
        </div>
      )}
    </div>
  );
}
