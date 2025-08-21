import { VehicleList } from "../components/vehicle-list";
import { Suspense } from "react";
import { DefaultFilters } from "@/types/generic";
import { VehicleSearchSection } from "../components/vehicle-search-section";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  return (
    <Suspense>
      <VehicleSearchSection />

      <div className="flex flex-1">
        <aside className="w-64 p-4 border-r border-zinc-800">
          <h2 className="font-semibold mb-4 text-white">Filtros</h2>
          <ul className="space-y-2 text-white">
            <li>Marca</li>
            <li>Modelo</li>
            <li>Ano</li>
            <li>Preço</li>
          </ul>
        </aside>

        <VehicleList appliedFilters={appliedFilters} />
      </div>
    </Suspense>
  );
}
