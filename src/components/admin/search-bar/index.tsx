import React from "react";
import { Search } from "../search";

export function SearchBar(
  props: Omit<React.ComponentProps<typeof Search.Form>, "children">
) {
  return (
    <Search.Form {...props}>
      <Search.Input />
      <Search.Button />
    </Search.Form>
  );
}
