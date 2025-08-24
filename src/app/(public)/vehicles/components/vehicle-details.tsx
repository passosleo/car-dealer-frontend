"use client";
import { useGetActiveVehicleByIdService } from "@/services/public/use-get-active-vehicle-by-id-service";
import { useParams } from "next/navigation";
import { VehicleImages } from "./vehicle-images";
import { VehicleInfo } from "./vehicle-info";
import { VehicleDescription } from "./vehicle-description";
import { VehicleFeatures } from "./vehicle-features";
import { VehicleRelatedCarousel } from "./vehicle-related-carousel";
import Link from "next/link";

export function VehicleDetails() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { vehicle } = useGetActiveVehicleByIdService(vehicleId);

  if (!vehicle) {
    return null;
  }

  return (
    <>
      <header className="mb-6">
        <nav className="text-sm text-zinc-400 mb-2">
          <Link
            href="/vehicles"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Veículos
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <Link
            href={`/vehicles?brand=${vehicle.brand?.brandId}`}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {vehicle.brand?.name}
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <Link
            href={`/vehicles/${vehicle.vehicleId}`}
            className="text-zinc-100"
          >
            {vehicle.model}
          </Link>
        </nav>

        {/* <h1 className="text-2xl sm:text-3xl font-bold">{vehicle.model}</h1> */}
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VehicleImages images={vehicle.vehicleImages} />
        <VehicleInfo vehicle={vehicle} />
      </section>

      <VehicleDescription description={vehicle.description} />

      <VehicleFeatures features={vehicle.vehicleFeatures} />

      <VehicleRelatedCarousel />
    </>
  );
}
