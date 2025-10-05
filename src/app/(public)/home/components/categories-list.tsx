"use client";
import { Section } from "@/components/public/section/section";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
import { Category } from "./category";
import { CategoriesSkeleton } from "./skeletons/categories-skeleton";

export function CategoriesList() {
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
            <Category
              key={category.categoryId}
              variant="square-row"
              {...category}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
