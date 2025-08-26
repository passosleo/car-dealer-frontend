import React from "react";
import { VehicleRecentlyViewed } from "@/app/(public)/vehicles/components/vehicle-recently-viewed";
import { SearchForm } from "@/components/shared/search/search-form";
import { SearchBar } from "@/components/public/search/search-bar";

export function VehicleSearchSection(
  props: Omit<React.ComponentProps<typeof SearchForm>, "children">
) {
  return (
    <div className="w-full border-b border-zinc-800 px-6 py-6 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
      <SearchBar {...props} />
      <VehicleRecentlyViewed />
    </div>
  );
}
