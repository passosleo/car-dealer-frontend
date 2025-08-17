import { Vehicle } from "@/types/vehicle";
import { formatToReal } from "@/utils/money";
import Image from "next/image";
import Link from "next/link";

export function Shelf(vehicle: Vehicle) {
  const { model, brand, price, vehicleImages } = vehicle;

  return (
    <Link
      href={`/vehicles/${vehicle.vehicleId}`}
      className="w-80 h-full flex flex-col gap-1 text-white"
    >
      <div className="h-48 mb-3">
        <Image
          src={vehicleImages[0] || ""}
          alt={model}
          width={320}
          height={300}
          className="object-cover w-full h-full rounded-lg transition-transform transform hover:scale-105"
        />
      </div>
      <p className="text-2xl font-bold truncate">{model}</p>
      <div className="flex justify-between gap-4 text-gray-500">
        <p className="truncate">{brand.name}</p>
        <p>{formatToReal(price)}</p>
      </div>
    </Link>
  );
}
