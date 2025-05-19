import React from "react";
import { twMerge } from "tailwind-merge";

const Tag = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={twMerge(
          "px-1 rounded-md text-secondary text-xs font-medium bg-primary w-fit",
          className
        )}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
