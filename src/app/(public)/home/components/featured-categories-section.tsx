"use client";
import { Section } from "@/components/public/section/section";
import { StyleVariant } from "@/constants/style-variants";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
import { Category } from "./category";
import { CategoriesSkeleton } from "./skeletons/categories-skeleton";

type FeaturedCategoriesSectionProps = {
  title?: string;
  subtitle?: string;
  orderBy?: "asc" | "desc";
  maxItems?: number;
  styleVariant?: StyleVariant;
  showSeeMoreButton?: boolean;
  active?: boolean;
  previewMode?: boolean;
};

export function FeaturedCategoriesSection({
  title,
  subtitle,
  orderBy = "asc",
  maxItems = 7,
  styleVariant = "square-row",
  active = true,
  previewMode = false,
}: FeaturedCategoriesSectionProps) {
  const shouldShow = active || previewMode;

  const { categories, isPending } = useListActiveCategoriesService({
    page: 1,
    limit: maxItems,
    orderBy,
  });

  return shouldShow ? (
    <Section
      title={title || "Categorias"}
      subtitle={subtitle}
      positionBlur="right"
      bgColor="zinc-900"
      id="categories"
    >
      {isPending ? (
        <CategoriesSkeleton count={maxItems} />
      ) : (
        <div
          className={`
            flex flex-wrap justify-start
            gap-6 sm:gap-8
            w-full
            -mx-6 px-6
          `}
        >
          {categories.map((category) => (
            <Category
              key={category.categoryId}
              variant={styleVariant}
              previewMode={previewMode}
              {...category}
            />
          ))}
        </div>
      )}
    </Section>
  ) : null;
}
