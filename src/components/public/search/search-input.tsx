"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams } from "@/hooks/use-search-params";
import { Search, XIcon } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<typeof Input>, "value" | "onChange">
>(
  (
    {
      id = "search",
      name = "search",
      type = "search",
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
      <div className="relative flex-1 max-w-5xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          {...props}
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={twMerge("pl-9 bg-zinc-200", className)}
        />
        {hasText && (
          <XIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-all rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"
            size={18}
            onClick={() => {
              setValue("");
              clearSearchParams(["search"]);
            }}
          />
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
