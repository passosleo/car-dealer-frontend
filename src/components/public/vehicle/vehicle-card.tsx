import React from "react";
import Image from "next/image";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";
import { useRecentlyViewedVehicles } from "../../../app/(public)/vehicles/hooks/use-recently-viewed-vehicles";
import { Card } from "@/components/public/card/card";

const VehicleCard = React.forwardRef<HTMLDivElement, Vehicle>(
  (vehicle, ref) => {
    const { saveRecentlyViewedVehicle } = useRecentlyViewedVehicles();

    return (
      <Link
        href={`/vehicles/${vehicle.vehicleId}`}
        onClick={() => saveRecentlyViewedVehicle(vehicle)}
      >
        <Card
          ref={ref}
          key={vehicle.vehicleId}
          className="p-4 border-none bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer"
        >
          <div className="relative w-full h-[200px]">
            <Image
              src={vehicle.vehicleImages[0]}
              alt={`Imagem do veículo ${vehicle.model}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <h3 className="font-medium mt-2 text-zinc-100 truncate">
            {vehicle.model}
          </h3>
          <p className="text-zinc-400 text-sm">
            {vehicle.brand.name} - {vehicle.category.name} - {vehicle.year}
          </p>
          <p className="text-lg font-bold text-white mt-1">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(vehicle.price)}
          </p>
        </Card>
      </Link>
    );
  }
);

VehicleCard.displayName = "Vehicle";

export { VehicleCard };
