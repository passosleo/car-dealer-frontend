import React from "react";
import { SearchForm } from "./search-form";
import { SearchInput } from "./search-input";

export function SearchBar(
  props: Omit<React.ComponentProps<typeof SearchForm>, "children">
) {
  return (
    <SearchForm {...props}>
      <SearchInput />
    </SearchForm>
  );
}
