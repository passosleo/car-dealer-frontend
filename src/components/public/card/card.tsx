import React from "react";
import { twMerge } from "tailwind-merge";

type CardProps = React.ComponentProps<"div">;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "w-full rounded-xl border border-zinc-800 bg-zinc-900/30 p-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
