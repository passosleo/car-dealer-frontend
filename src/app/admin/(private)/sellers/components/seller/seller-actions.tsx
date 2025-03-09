import React from "react";
import { twMerge } from "tailwind-merge";

const SellerActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={twMerge("flex gap-2", className)}>
      {children}
    </div>
  );
});

SellerActions.displayName = "Seller.Actions";

export { SellerActions };
