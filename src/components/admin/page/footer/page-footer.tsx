import React from "react";
import { twMerge } from "tailwind-merge";

const PageFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"section">
>(({ children, className, ...props }, ref) => {
  return (
    <footer
      {...props}
      ref={ref}
      className={twMerge("py-4 shrink-0 bottom-0 mt-auto", className)}
    >
      {children}
    </footer>
  );
});

PageFooter.displayName = "Page.Footer";

export { PageFooter };
