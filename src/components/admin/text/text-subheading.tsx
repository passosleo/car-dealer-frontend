import React from "react";
import { twMerge } from "tailwind-merge";

const TextSubheading = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(({ className, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      {...props}
      className={twMerge("flex gap-1 text-primary font-medium", className)}
    >
      {children}
    </h2>
  );
});

TextSubheading.displayName = "TextSubheading";

export { TextSubheading };
