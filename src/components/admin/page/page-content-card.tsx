import { Card } from "@/components/ui/card";
import React from "react";
import { twMerge } from "tailwind-merge";

const PageContentCard = React.forwardRef<
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

PageContentCard.displayName = "PageContentCard";

export { PageContentCard };
