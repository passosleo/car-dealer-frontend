"use client";
import { StyleVariant } from "@/app/admin/(private)/layout/components/featured-categories/style-variants";
import { Section } from "@/components/public/section/section";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
import { Category } from "./category";
import { CategoriesSkeleton } from "./skeletons/categories-skeleton";

type CategoriesSectionProps = {
  title?: string;
  subtitle?: string;
  orderBy?: "asc" | "desc";
  maxItems?: number;
  styleVariant?: StyleVariant;
  showSeeMoreButton?: boolean;
  active?: boolean;
  previewMode?: boolean;
};

export function CategoriesSection({
  title,
  subtitle,
  orderBy = "asc",
  maxItems = 6,
  styleVariant = "square-row",
  showSeeMoreButton = true,
  active = true,
  previewMode = false,
}: CategoriesSectionProps) {
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
              {...category}
            />
          ))}
        </div>
      )}
    </Section>
  ) : null;
}
