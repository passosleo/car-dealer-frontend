import React from "react";
import { twMerge } from "tailwind-merge";

const ActiveTag = React.forwardRef<
  HTMLSpanElement,
  Omit<React.ComponentProps<"span">, "children"> & {
    active: boolean;
  }
>(({ className, active, ...props }, ref) => {
  return (
    <span
      ref={ref}
      {...props}
      className={twMerge(
        "px-1.5 rounded-md text-secondary text-xs font-medium w-auto",
        active ? "bg-green-500" : "bg-destructive",
        className
      )}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
});

ActiveTag.displayName = "Tag";

export { ActiveTag };
