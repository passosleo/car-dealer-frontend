"use client";

import { twMerge } from "tailwind-merge";

type BrandsSkeletonProps = React.ComponentProps<"div"> & {
  count?: number;
};

export function BrandsSkeleton({
  count = 8,
  className,
  ...props
}: BrandsSkeletonProps) {
  return (
    <div
      className={twMerge("flex flex-wrap justify-center gap-6", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BrandCardSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "w-40 h-40 rounded-full bg-zinc-950/70 animate-pulse",
        "flex items-center justify-center",
        className
      )}
      {...props}
    />
  );
}
