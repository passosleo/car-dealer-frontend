import { twMerge } from "tailwind-merge";

type VehicleInfoSkeletonProps = React.ComponentProps<"aside"> & {};

export function VehicleInfoSkeleton({
  className,
  ...props
}: VehicleInfoSkeletonProps) {
  return (
    <aside
      className={twMerge(
        "w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-8 animate-pulse",
        className
      )}
      {...props}
    >
      <div>
        <div className="h-4 w-24 bg-zinc-700 rounded" />
        <div className="mt-2 h-7 w-2/3 bg-zinc-700 rounded" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-4 w-16 bg-zinc-700 rounded" />
          <div className="mt-2 h-8 w-40 bg-zinc-700 rounded" />
        </div>
        <div className="h-11 w-full sm:w-44 bg-zinc-700 rounded-lg" />
      </div>

      <div>
        <div className="h-5 w-48 bg-zinc-700 rounded mb-4" />
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
          {Array.from({ length: 10 }).map((_, i) => (
            <SpecSkeleton key={i} />
          ))}
        </dl>
      </div>
    </aside>
  );
}

function SpecSkeleton() {
  return (
    <div>
      <div className="h-3 w-20 bg-zinc-700 rounded" />
      <div className="mt-2 h-4 w-28 bg-zinc-700 rounded" />
    </div>
  );
}
