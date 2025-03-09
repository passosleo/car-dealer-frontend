import React from "react";
import { twMerge } from "tailwind-merge";

const PageHeaderDescription = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(({ children, className, ...props }, ref) => {
  return (
    <h2
      {...props}
      ref={ref}
      className={twMerge("text-muted-foreground my-2", className)}
    >
      {children}
    </h2>
  );
});

PageHeaderDescription.displayName = "Page.Header.Description";

export { PageHeaderDescription };
