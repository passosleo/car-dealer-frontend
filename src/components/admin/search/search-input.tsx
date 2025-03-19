"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams } from "@/hooks/use-search-params";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(
  (
    {
      id = "search",
      name = "search",
      type = "search",
      size = 30,
      placeholder = "Buscar",
      className,
      ...props
    },
    ref
  ) => {
    const { getSearchParam, clearSearchParams } = useSearchParams<{
      search: string;
    }>();
    const searchParam = getSearchParam("search");
    const [value, setValue] = useState(searchParam || "");
    const hasText = !!(value && value.length);

    return (
      <div className="relative w-full">
        <Input
          {...props}
          ref={ref}
          id={id}
          name={name}
          type={type}
          size={size}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={twMerge("w-full pr-10", className)}
        />
        {hasText ? (
          <XIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:bg-accent transition-all rounded-md"
            size={18}
            onClick={() => {
              setValue("");
              clearSearchParams(["search"]);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
