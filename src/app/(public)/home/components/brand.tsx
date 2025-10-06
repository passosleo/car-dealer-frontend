import { StyleVariant } from "@/constants/style-variants";
import { Brand as BrandType } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type BrandProps = BrandType & {
  previewMode?: boolean;
  className?: string;
  variant: StyleVariant;
  showName?: boolean;
};

const Brand = React.forwardRef<HTMLAnchorElement, BrandProps>(
  (
    {
      brandId,
      name,
      imageUrl,
      className,
      variant = "square-row",
      previewMode = false,
      showName = false,
    },
    ref
  ) => {
    const baseClasses = previewMode
      ? "group relative overflow-hidden bg-zinc-950 select-none"
      : "group relative overflow-hidden bg-zinc-950 hover:bg-zinc-800 transition-all duration-300 select-none";

    const variants: Record<BrandProps["variant"], string> = {
      "square-row":
        "rounded-xl w-fit h-28 px-8 flex flex-row items-center gap-6",
      "square-column":
        "rounded-xl w-32 h-32 flex flex-col items-center justify-center gap-3 p-4",
      "circle-border":
        "rounded-full w-40 h-40 flex flex-col items-center justify-center gap-3 p-4 border-4 border-blue-600",
      "circle-column":
        "rounded-full w-40 h-40 flex flex-col items-center justify-center gap-3 p-4",
    };

    const content = (
      <>
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className={twMerge(
            "object-contain drop-shadow",
            previewMode
              ? ""
              : "transition-transform duration-300 group-hover:scale-[1.10]"
          )}
        />

        {showName && name ? (
          <p
            className={twMerge(
              "text-sm font-medium text-zinc-200 text-center mt-2",
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
        href={`/vehicles?brands=${brandId}`}
        className={twMerge(baseClasses, variants[variant], className)}
      >
        {content}
      </Link>
    );
  }
);

Brand.displayName = "Brand";

export { Brand };
