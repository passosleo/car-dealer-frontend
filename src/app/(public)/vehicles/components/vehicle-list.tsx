"use client";

import { useState } from "react";
import { useListActiveVehiclesService } from "@/services/public/use-list-active-vehicles-service";
import { Vehicle as VehicleType } from "@/types/vehicle";
import { Vehicle } from "./vehicle";
import { useObserverCallback } from "@/hooks/use-observer-callback";
import { VehicleSkeleton } from "@/app/(public)/vehicles/components/vehicle-skeleton";
import { DefaultFilters } from "@/types/generic";

export function VehicleList({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const vehiclesPerPage = 12;
  const [page, setPage] = useState(1);
  const [vehiclesState, setVehiclesState] = useState<VehicleType[]>([]);

  const { isPending, totalPages } = useListActiveVehiclesService(
    { page, limit: vehiclesPerPage, ...appliedFilters },
    {
      onSuccess: (res) => {
        setVehiclesState((prev) => {
          const existingIds = new Set(prev.map((v) => v.vehicleId));
          const newVehicles = res.items.filter(
            (v) => !existingIds.has(v.vehicleId)
          );
          return [...prev, ...newVehicles];
        });
      },
    }
  );

  const { observerRef } = useObserverCallback(
    () => setPage((prev) => prev + 1),
    {
      enabled: !isPending && page < totalPages,
      reobserveOn: [page, totalPages, isPending],
    }
  );

  return (
    <section className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isPending && vehiclesState.length === 0 ? (
        <VehicleSkeleton count={vehiclesPerPage} />
      ) : vehiclesState.length > 0 ? (
        <>
          {vehiclesState.map((vehicle, i) => (
            <div
              key={vehicle.vehicleId}
              ref={i === vehiclesState.length - 1 ? observerRef : null}
            >
              <Vehicle {...vehicle} />
            </div>
          ))}
          {isPending && <VehicleSkeleton count={8} />}
        </>
      ) : (
        <div className="col-span-full text-center text-zinc-400">
          Nenhum veículo encontrado.
        </div>
      )}
    </section>
  );
}
