"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/hooks/use-search-params";
import { ArrowDownAZIcon, ArrowUpZAIcon } from "lucide-react";

const OrderBar = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ children, variant = "outline", onClick, ...props }, ref) => {
  const { getSearchParam, addSearchParam } = useSearchParams<{
    orderBy: "asc" | "desc";
  }>();

  const orderBy = getSearchParam("orderBy") || "asc";

  return (
    <Button
      {...props}
      ref={ref}
      variant={variant}
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

OrderBar.displayName = "Order.Bar";

export { OrderBar };
