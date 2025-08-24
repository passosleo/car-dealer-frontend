import { twMerge } from "tailwind-merge";

type VehicleBreadcrumbSkeletonProps = React.ComponentProps<"header"> & {};

export function VehicleBreadcrumbSkeleton({
  className,
  ...props
}: VehicleBreadcrumbSkeletonProps) {
  return (
    <header className={twMerge("mb-6 animate-pulse", className)} {...props}>
      <nav className="flex items-center gap-2 text-sm">
        <div className="h-4 w-16 bg-zinc-700 rounded" />

        <span className="text-zinc-600">/</span>

        <div className="h-4 w-20 bg-zinc-700 rounded" />

        <span className="text-zinc-600">/</span>

        <div className="h-4 w-24 bg-zinc-700 rounded" />
      </nav>
    </header>
  );
}
