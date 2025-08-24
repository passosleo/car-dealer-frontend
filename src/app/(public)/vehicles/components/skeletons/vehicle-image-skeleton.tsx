import { twMerge } from "tailwind-merge";

type VehicleImagesSkeletonProps = React.ComponentProps<"div"> & {
  thumbnailsCount?: number;
};

export function VehicleImagesSkeleton({
  thumbnailsCount = 6,
  className,
  ...props
}: VehicleImagesSkeletonProps) {
  return (
    <div className={twMerge("w-full animate-pulse", className)} {...props}>
      <div className="w-full h-[400px] bg-zinc-700 rounded-xl" />

      <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {Array.from({ length: thumbnailsCount }).map((_, i) => (
          <div key={i} className="h-16 w-full bg-zinc-700 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
