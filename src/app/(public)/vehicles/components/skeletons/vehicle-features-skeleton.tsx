import { twMerge } from "tailwind-merge";

type VehicleFeaturesSkeletonProps = React.ComponentProps<"section"> & {
  count?: number;
};

export function VehicleFeaturesSkeleton({
  count = 6,
  className,
  ...props
}: VehicleFeaturesSkeletonProps) {
  return (
    <section className={twMerge("mt-10 animate-pulse", className)} {...props}>
      {/* Título */}
      <div className="h-5 w-40 bg-zinc-700 rounded mb-3" />

      {/* Lista de itens */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              {/* bolinha azul fake */}
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              {/* texto do recurso */}
              <div className="h-4 w-28 bg-zinc-700 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
