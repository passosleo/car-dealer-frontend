import { VehicleList } from "../components/vehicle-list";
import { Suspense } from "react";
import { DefaultFilters } from "@/types/generic";
import { VehicleSearchSection } from "../components/vehicle-search-section";
import { VehicleFilterBar } from "../components/vehicle-filter-bar";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  return (
    <Suspense>
      <main className="w-full bg-zinc-950 text-white">
        <VehicleSearchSection />

        <div className="flex flex-1">
          <VehicleFilterBar />
          <VehicleList appliedFilters={appliedFilters} />
        </div>
      </main>
    </Suspense>
  );
}
