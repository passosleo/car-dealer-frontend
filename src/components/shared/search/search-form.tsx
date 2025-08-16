"use client";
import React, { FormEvent } from "react";
import { useSearchParams } from "@/hooks/use-search-params";
import { twMerge } from "tailwind-merge";

const SearchForm = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<"form">
>(({ children, onSubmit, className, ...props }, ref) => {
  const { addSearchParam, removeSearchParam } = useSearchParams<{
    search: string;
  }>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);

    const data = new FormData(e.currentTarget);
    const query = data.get("search") as string;

    if (query) {
      addSearchParam("search", query);
    } else {
      removeSearchParam("search");
    }
  }

  return (
    <form
      {...props}
      ref={ref}
      onSubmit={handleSubmit}
      className={twMerge("flex items-center gap-1 w-full", className)}
    >
      {children}
    </form>
  );
});

SearchForm.displayName = "SearchForm";

export { SearchForm };
