import React from "react";
import { twMerge } from "tailwind-merge";

const PageHeaderTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={twMerge("flex items-center gap-2", className)}
    >
      <span className="h-5 w-1 bg-primary rounded-md" />
      <h1 className="text-primary text-xl font-medium">{children}</h1>
    </div>
  );
});

PageHeaderTitle.displayName = "Page.Header.Title";

export { PageHeaderTitle };
