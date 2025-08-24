"use client";
import { useGetActiveVehicleByIdService } from "@/services/public/use-get-active-vehicle-by-id-service";
import { useParams } from "next/navigation";
import { VehicleImages } from "./vehicle-images";
import { VehicleInfo } from "./vehicle-info";
import { VehicleDescription } from "./vehicle-description";
import { VehicleFeatures } from "./vehicle-features";
import { VehicleRelatedCarousel } from "./vehicle-related-carousel";
import { VehicleBreadcrumb } from "./vehicle-breadcrumb";
import { VehicleImagesSkeleton } from "./skeletons/vehicle-image-skeleton";
import { VehicleInfoSkeleton } from "./skeletons/vehicle-info-skeleton";
import { VehicleBreadcrumbSkeleton } from "./skeletons/vehicle-breadcrumb-skeleton";
import { VehicleDescriptionSkeleton } from "./skeletons/vehicle-description-skeleton";
import { VehicleFeaturesSkeleton } from "./skeletons/vehicle-features-skeleton";

export function VehicleDetails() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { vehicle, isPending } = useGetActiveVehicleByIdService(vehicleId);

  if (isPending) {
    return (
      <>
        <VehicleBreadcrumbSkeleton />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VehicleImagesSkeleton />
          <VehicleInfoSkeleton />
        </section>
        <VehicleDescriptionSkeleton />
        <VehicleFeaturesSkeleton />
      </>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center text-zinc-400 min-h-screen flex items-center justify-center">
        Veículo não encontrado.
      </div>
    );
  }

  return (
    <>
      <VehicleBreadcrumb vehicle={vehicle} />
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
