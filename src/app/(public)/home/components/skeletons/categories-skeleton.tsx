// src/components/public/category/categories-skeleton.tsx
"use client";

import { twMerge } from "tailwind-merge";

type CategoriesSkeletonProps = React.ComponentProps<"div"> & {
  /** quantidade de cards (default 8) */
  count?: number;
};

export function CategoriesSkeleton({
  count = 8,
  className,
  ...props
}: CategoriesSkeletonProps) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "w-full h-28 px-4 rounded-xl bg-zinc-950/70 animate-pulse",
        "flex items-center gap-6",
        className
      )}
      {...props}
    >
      <div className="h-10 w-10 rounded-lg bg-zinc-700" />
      <div className="h-5 w-28 rounded bg-zinc-700" />
    </div>
  );
}
