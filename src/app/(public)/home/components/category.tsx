import { StyleVariant } from "@/constants/style-variants";
import { Category as CategoryType } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type CategoryProps = CategoryType & {
  previewMode?: boolean;
  className?: string;
  variant: StyleVariant;
};

const Category = React.forwardRef<HTMLAnchorElement, CategoryProps>(
  (
    {
      categoryId,
      name,
      imageUrl,
      className,
      variant = "square-row",
      previewMode = false,
    },
    ref
  ) => {
    const baseClasses = previewMode
      ? "group relative bg-zinc-950 select-none overflow-visible"
      : "group relative bg-zinc-950 hover:bg-zinc-800 transition-all duration-300 select-none overflow-visible";

    const hasGap = variant === "square-row";

    const variants: Record<CategoryProps["variant"], string> = {
      "square-row":
        "rounded-xl w-[280px] h-32 px-8 flex flex-row items-center justify-center gap-6 sm:w-[280px] sm:h-32",
      "square-column":
        "rounded-xl w-40 h-40 flex flex-col items-center justify-center p-4 sm:w-44 sm:h-44",
      "circle-border":
        "rounded-full w-44 h-44 flex flex-col items-center justify-center p-4 border-4 border-blue-600 sm:w-48 sm:h-48",
      "circle-column":
        "rounded-full w-44 h-44 flex flex-col items-center justify-center p-4 sm:w-48 sm:h-48",
    };

    const content = (
      <>
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className={twMerge(
            "object-contain drop-shadow max-w-[85%] max-h-[70%]",
            previewMode
              ? ""
              : "transition-transform duration-300 group-hover:scale-[1.06]"
          )}
        />

        {name ? (
          <p
            className={twMerge(
              "text-lg sm:text-xl font-semibold text-zinc-200 text-center leading-snug mt-1 break-words whitespace-normal max-w-[95%]",
              !hasGap && "-mt-1",
              previewMode ? "" : "transition-colors group-hover:text-white"
            )}
          >
            {name}
          </p>
        ) : null}
      </>
    );

    if (previewMode) {
      return (
        <div
          ref={ref as unknown as React.RefObject<HTMLDivElement>}
          className={twMerge(baseClasses, variants[variant], className)}
        >
          {content}
        </div>
      );
    }

    return (
      <Link
        ref={ref}
        href={`/vehicles?categories=${categoryId}`}
        className={twMerge(baseClasses, variants[variant], className)}
      >
        {content}
      </Link>
    );
  }
);

Category.displayName = "Category";

export { Category };
