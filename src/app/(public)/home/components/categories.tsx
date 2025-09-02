"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/public/section/section";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
import { CategoriesSkeleton } from "./skeletons/categories-skeleton";

export function Categories() {
  const maxCategoriesToShow = 6;
  const { categories, isPending } = useListActiveCategoriesService({
    page: 1,
    limit: maxCategoriesToShow,
  });

  return (
    <Section
      title="Categorias"
      positionBlur="right"
      bgColor="zinc-900"
      id="categories"
    >
      {isPending ? (
        <CategoriesSkeleton count={maxCategoriesToShow} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              href={`/vehicles?categories=${category.categoryId}`}
              key={category.categoryId}
              className="
              group relative overflow-hidden rounded-xl
              bg-zinc-950 hover:bg-zinc-800
              transition-all duration-300
              w-full h-28 px-8
              flex items-center gap-6
              select-none
            "
            >
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={56}
                height={56}
                className="
                object-contain drop-shadow
                transition-transform duration-300
                group-hover:scale-[1.25]
              "
              />

              {category.name ? (
                <p
                  className="
                  text-lg font-semibold text-zinc-200
                  transition-colors group-hover:text-white
                "
                >
                  {category.name}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
