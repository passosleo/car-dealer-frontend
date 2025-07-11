import React from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

type FilterToggleButtonProps = React.ComponentProps<typeof Button> & {
  totalActiveFilters?: number;
};

const FilterToggleButton = React.forwardRef<
  HTMLButtonElement,
  FilterToggleButtonProps
>(
  (
    {
      children,
      totalActiveFilters = 0,
      variant = "outline",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        {...props}
        ref={ref}
        variant={variant}
        className={twMerge("relative max-w-28 w-full", className)}
      >
        {children ? (
          children
        ) : (
          <>
            <SlidersHorizontalIcon size={16} />
            Filtrar
            {totalActiveFilters > 0 && (
              <span className="absolute top-[-8px] right-[-4px] w-5 h-5 text-xs text-secondary bg-destructive rounded-full flex items-center justify-center">
                {totalActiveFilters}
              </span>
            )}
          </>
        )}
      </Button>
    );
  }
);

FilterToggleButton.displayName = "Filter.ToggleButton";

export { FilterToggleButton };
