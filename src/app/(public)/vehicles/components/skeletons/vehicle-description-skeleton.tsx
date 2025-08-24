import { twMerge } from "tailwind-merge";

type VehicleDescriptionSkeletonProps = React.ComponentProps<"section"> & {};

export function VehicleDescriptionSkeleton({
  className,
  ...props
}: VehicleDescriptionSkeletonProps) {
  return (
    <section className={twMerge("mt-10 animate-pulse", className)} {...props}>
      <div className="h-5 w-28 bg-zinc-700 rounded mb-3" />

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-3">
        <div className="h-4 w-full bg-zinc-700 rounded" />
        <div className="h-4 w-5/6 bg-zinc-700 rounded" />
        <div className="h-4 w-4/6 bg-zinc-700 rounded" />
        <div className="h-4 w-3/5 bg-zinc-700 rounded" />
      </div>
    </section>
  );
}
