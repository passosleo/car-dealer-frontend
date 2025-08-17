"use client";
import { useListActiveVehiclesService } from "@/services/public/use-list-active-vehicles-service";
import { Vehicle } from "./vehicle";

export function VehicleList() {
  const { vehicles } = useListActiveVehiclesService();
  return (
    <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.vehicleId} {...vehicle} />
      ))}
    </main>
  );
}
