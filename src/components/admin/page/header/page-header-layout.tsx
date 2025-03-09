import React from "react";
import { twMerge } from "tailwind-merge";

const PageHeaderLayout = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"section">
>(({ children, className, ...props }, ref) => {
  return (
    <section
      {...props}
      ref={ref}
      className={twMerge("pb-4 shrink-0", className)}
    >
      {children}
    </section>
  );
});

PageHeaderLayout.displayName = "Page.Header.Layout";

export { PageHeaderLayout };
