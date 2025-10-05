import { STYLE_VARIANT } from "@/app/admin/(private)/layout/components/featured-categories/style-variants";
import { Category as CategoryType } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type CategoryProps = CategoryType & {
  previewMode?: boolean;
  className?: string;
  variant: STYLE_VARIANT;
};

const Category = React.forwardRef<HTMLAnchorElement, CategoryProps>(
  ({ categoryId, name, imageUrl, className, variant = "square-row" }, ref) => {
    const baseClasses =
      "group relative overflow-hidden bg-zinc-950 hover:bg-zinc-800 transition-all duration-300 select-none";

    const variants: Record<CategoryProps["variant"], string> = {
      "square-row":
        "rounded-xl w-fit h-28 px-8 flex flex-row items-center gap-6",
      "square-column":
        "rounded-xl w-32 h-32 flex flex-col items-center justify-center gap-3 p-4",
      "circle-border":
        "rounded-full w-32 h-32 flex flex-col items-center justify-center gap-3 p-4 border-4 border-blue-600",
      "circle-column":
        "rounded-full w-32 h-32 flex flex-col items-center justify-center gap-3 p-4",
    };

    return (
      <Link
        ref={ref}
        href={`/vehicles?categories=${categoryId}`}
        className={twMerge(baseClasses, variants[variant], className)}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={56}
          height={56}
          className="
            object-contain drop-shadow
            transition-transform duration-300
            group-hover:scale-[1.25]
          "
        />

        {name ? (
          <p
            className="
              text-lg font-semibold text-zinc-200
              transition-colors group-hover:text-white text-center
            "
          >
            {name}
          </p>
        ) : null}
      </Link>
    );
  }
);

Category.displayName = "Category";

export { Category };
