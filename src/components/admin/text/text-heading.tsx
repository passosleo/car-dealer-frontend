import React from "react";
import { twMerge } from "tailwind-merge";

const TextHeading = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h1">
>(({ className, children, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      {...props}
      className={twMerge("flex gap-1 text-primary font-semibold", className)}
    >
      {children}
    </h1>
  );
});

TextHeading.displayName = "TextHeading";

export { TextHeading };
