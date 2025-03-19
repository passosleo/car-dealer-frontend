"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/hooks/use-search-params";
import { ArrowDownAZIcon, ArrowUpZAIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const OrderBar = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ children, variant = "outline", onClick, className, ...props }, ref) => {
  const { getSearchParam, addSearchParam } = useSearchParams<{
    orderBy: "asc" | "desc";
  }>();

  const orderBy = getSearchParam("orderBy") || "asc";

  return (
    <Button
      {...props}
      ref={ref}
      variant={variant}
      className={twMerge("max-w-28 w-full", className)}
      onClick={(e) => {
        const newValue = orderBy === "desc" ? "asc" : "desc";
        addSearchParam("orderBy", newValue);
        if (onClick) onClick(e);
      }}
    >
      {children ? (
        children
      ) : (
        <>
          {
            {
              asc: <ArrowDownAZIcon size={16} />,
              desc: <ArrowUpZAIcon size={16} />,
            }[orderBy]
          }
          Ordenar
        </>
      )}
    </Button>
  );
});

OrderBar.displayName = "OrderBar";

export { OrderBar };
