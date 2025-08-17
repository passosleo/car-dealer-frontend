import React from "react";
import { SearchInput } from "./search-input";
import { SearchForm } from "@/components/shared/search/search-form";

export function SearchBar(
  props: Omit<React.ComponentProps<typeof SearchForm>, "children">
) {
  return (
    <SearchForm {...props}>
      <SearchInput
        placeholder="Busque por modelo, marca ou ano..."
        aria-label="Buscar veículos"
        autoFocus
      />
    </SearchForm>
  );
}
