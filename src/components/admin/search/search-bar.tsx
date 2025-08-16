import React from "react";
import { SearchInput } from "./search-input";
import { SearchButton } from "./search-button";
import { SearchForm } from "@/components/shared/search/search-form";

export function SearchBar(
  props: Omit<React.ComponentProps<typeof SearchForm>, "children">
) {
  return (
    <SearchForm {...props}>
      <SearchInput />
      <SearchButton />
    </SearchForm>
  );
}
