import { Vehicle } from "@/types/vehicle";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type VehicleBreadcrumbProps = React.ComponentProps<"header"> & {
  vehicle: Vehicle;
};

export function VehicleBreadcrumb({
  vehicle,
  className,
  ...props
}: VehicleBreadcrumbProps) {
  return (
    <header className={twMerge("mb-6", className)} {...props}>
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
        <Link href={`/vehicles/${vehicle.vehicleId}`} className="text-zinc-100">
          {vehicle.model}
        </Link>
      </nav>
    </header>
  );
}
