import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Vehicle as VehicleType } from "@/types/vehicle";
import Link from "next/link";
import { useRecentlyViewedVehicles } from "../hooks/use-recently-viewed-vehicles";

const Vehicle = React.forwardRef<HTMLDivElement, VehicleType>(
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
          className="bg-zinc-800 hover:bg-zinc-700 transition-colors border border-none shadow-lg cursor-pointer h-fit"
        >
          <CardContent className="p-4">
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
          </CardContent>
        </Card>
      </Link>
    );
  }
);

Vehicle.displayName = "Vehicle";

export { Vehicle };
