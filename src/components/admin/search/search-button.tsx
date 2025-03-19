import React from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const SearchButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(
  (
    {
      type = "submit",
      variant = "secondary",
      className,
      children = <SearchIcon />,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        {...props}
        ref={ref}
        className={twMerge(
          "flex gap-1 items-center justify-center px-2",
          className
        )}
        variant={variant}
        type={type}
      >
        {children}
      </Button>
    );
  }
);

SearchButton.displayName = "SearchButton";

export { SearchButton };
