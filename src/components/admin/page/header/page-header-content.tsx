import React from "react";
import { twMerge } from "tailwind-merge";

const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={twMerge(
        "flex items-center justify-between flex-wrap gap-4 pt-4",
        className
      )}
    >
      {children}
    </div>
  );
});

PageHeaderContent.displayName = "Page.Header.Content";

export { PageHeaderContent };
