import React from "react";
import { twMerge } from "tailwind-merge";

const TextNormal = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      {...props}
      className={twMerge("flex gap-2 text-muted-foreground", className)}
    >
      {children}
    </p>
  );
});

TextNormal.displayName = "TextNormal";

export { TextNormal };
