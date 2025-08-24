import { Vehicle } from "@/types/vehicle";
import { formatToReal } from "@/utils/money";
import { MessagesSquareIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type VehicleInfoProps = React.ComponentProps<"aside"> & {
  vehicle: Vehicle;
};

export function VehicleInfo({
  vehicle,
  className,
  ...props
}: VehicleInfoProps) {
  return (
    <aside
      className={twMerge(
        "w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-8",
        className
      )}
      {...props}
    >
      <div>
        <p className="text-sm text-zinc-400">{vehicle.brand.name}</p>
        <h2 className="text-2xl font-bold text-zinc-100">{vehicle.model}</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">Preço</p>
          <p className="text-3xl font-extrabold text-white">
            {formatToReal(vehicle.price)}
          </p>
        </div>
        <button className="flex items-center justify-center gap-3 w-full sm:w-auto h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-medium text-white shadow">
          <MessagesSquareIcon />
          Tenho interesse
        </button>
      </div>

      <div>
        <h3 className="text-base font-semibold text-zinc-200 mb-4">
          Especificações técnicas
        </h3>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
          <Spec label="Ano" value={vehicle.year ?? "-"} />
          <Spec
            label="Quilometragem"
            value={vehicle.mileage != null ? `${vehicle.mileage} km` : "-"}
          />
          <Spec label="Cor" value={vehicle.color ?? "-"} />
          <Spec label="Câmbio" value={vehicle.transmission ?? "-"} />
          <Spec label="Combustível" value={vehicle.fuelType ?? "-"} />
          <Spec label="Portas" value={vehicle.doors ?? "-"} />
          <Spec label="Lugares" value={vehicle.seats ?? "-"} />
          <Spec
            label="Potência"
            value={
              vehicle.horsepower != null ? `${vehicle.horsepower} cv` : "-"
            }
          />
          <Spec
            label="Torque"
            value={vehicle.torque != null ? `${vehicle.torque} Nm` : "-"}
          />
          <Spec label="Tração" value={vehicle.driveTrain ?? "-"} />
        </dl>
      </div>
    </aside>
  );
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs text-zinc-400">{label}</dt>
      <dd className="text-zinc-100 font-medium mt-0.5">{value}</dd>
    </div>
  );
}
