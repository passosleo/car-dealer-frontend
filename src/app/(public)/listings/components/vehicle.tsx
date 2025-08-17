import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Vehicle as VehicleType } from "@/types/vehicle";

const Vehicle = React.forwardRef<HTMLDivElement, VehicleType>(
  (vehicle, ref) => {
    return (
      <Card
        ref={ref}
        key={vehicle.vehicleId}
        className="bg-zinc-800 hover:bg-zinc-700 transition-colors border border-none shadow-lg cursor-pointer h-fit"
      >
        <CardContent className="p-4">
          <Image
            src={vehicle.vehicleImages?.[0] || "/placeholder-car.jpg"}
            alt={`Imagem do veículo ${vehicle.model}`}
            width={320}
            height={180}
            className="w-full object-cover rounded-xl"
          />

          <h3 className="font-medium mt-2 text-zinc-100 truncate">
            {vehicle.model}
          </h3>
          <p className="text-zinc-400 text-sm">
            {vehicle.brand.name} - {vehicle.year} - {vehicle.category.name} -{" "}
            {vehicle.transmission}
          </p>
          <p className="text-lg font-bold text-white mt-1">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(vehicle.price)}
          </p>
        </CardContent>
      </Card>
    );
  }
);

Vehicle.displayName = "Vehicle";

export { Vehicle };
