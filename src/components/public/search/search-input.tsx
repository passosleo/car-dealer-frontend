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
      <div className="relative w-full max-w-xl mx-auto">
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
          className={twMerge(
            "w-full pr-10 border-zinc-500 shadow-none outline-none focus:border-zinc-400 focus:ring-0 placeholder:text-zinc-500 bg-white h-10 !text-lg",
            className
          )}
        />
        {hasText ? (
          <XIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-all rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800"
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
