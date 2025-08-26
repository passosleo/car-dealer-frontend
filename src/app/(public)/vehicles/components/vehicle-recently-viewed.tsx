"use client";
import Link from "next/link";
import { useRecentlyViewedVehicles } from "../hooks/use-recently-viewed-vehicles";
import { useClientSide } from "@/hooks/use-client-side";

export function VehicleRecentlyViewed() {
  const { isClientSide } = useClientSide();
  const { recentlyViewedVehicles, saveRecentlyViewedVehicle } =
    useRecentlyViewedVehicles();
  if (!isClientSide || recentlyViewedVehicles.length === 0) return null;
  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-sm text-white font-semibold mb-2">
        Vistos recentemente
      </h2>
      <div className="flex gap-4 overflow-x-auto">
        {recentlyViewedVehicles.map((vehicle) => (
          <Link
            key={vehicle.vehicleId}
            href={`/vehicles/${vehicle.vehicleId}`}
            onClick={
              () => setTimeout(() => saveRecentlyViewedVehicle(vehicle), 500) //avoid changing state before navigation
            }
            className="min-w-[200px] bg-zinc-800 text-white rounded-md p-3 shadow-md hover:bg-zinc-700/60 transition cursor-pointer w-full max-w-xs"
          >
            <h3 className="font-semibold truncate">{vehicle.model}</h3>
            <p className="text-sm text-zinc-300">
              {vehicle.brand.name} - {vehicle.year}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
