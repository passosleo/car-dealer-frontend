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
  maxItems = 6,
  styleVariant = "square-row",
  // showSeeMoreButton = true,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
