"use client";

import { twMerge } from "tailwind-merge";

type SellersSkeletonProps = React.ComponentProps<"div"> & {
  count?: number;
};

export function SellersSkeleton({
  count = 2,
  className,
  ...props
}: SellersSkeletonProps) {
  return (
    <div
      className={twMerge("flex flex-wrap gap-8 justify-center", className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SellerCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SellerCardSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "bg-zinc-900 rounded-lg shadow-md px-4 py-7 flex flex-col items-center animate-pulse max-w-64",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 mb-4 rounded-full bg-zinc-700" />

      <div className="h-5 w-32 rounded bg-zinc-700 mb-2" />

      <div className="h-4 w-44 rounded bg-zinc-700 mb-4" />

      <div className="h-10 w-44 rounded-lg bg-zinc-700" />
    </div>
  );
}
