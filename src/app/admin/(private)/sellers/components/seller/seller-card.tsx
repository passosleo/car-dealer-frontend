import React from "react";
import { Card } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";

const SellerCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Card>
>(({ children, className, ...props }, ref) => {
  return (
    <Card
      {...props}
      ref={ref}
      className={twMerge("flex flex-row gap-4 items-center p-4", className)}
    >
      {children}
    </Card>
  );
});

SellerCard.displayName = "Seller.Card";

export { SellerCard };
