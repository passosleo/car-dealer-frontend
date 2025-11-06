"use client";
import { Section } from "@/components/public/section/section";
import { StyleVariant } from "@/constants/style-variants";
import { useListActiveBrandsService } from "@/services/public/use-list-active-brands-service";
import { Brand } from "./brand";
import { BrandsSkeleton } from "./skeletons/brands-skeleton";

type FeaturedBrandsSectionProps = {
  title?: string;
  subtitle?: string;
  orderBy?: "asc" | "desc";
  maxItems?: number;
  styleVariant?: StyleVariant;
  showSeeMoreButton?: boolean;
  active?: boolean;
  previewMode?: boolean;
  showName?: boolean;
};

export function FeaturedBrandsSection({
  title,
  subtitle,
  orderBy = "asc",
  maxItems = 8,
  styleVariant = "square-row",
  // showSeeMoreButton = true,
  active = true,
  previewMode = false,
  showName = false,
}: FeaturedBrandsSectionProps) {
  const shouldShow = active || previewMode;

  const { brands, isPending } = useListActiveBrandsService({
    page: 1,
    limit: maxItems,
    orderBy,
  });

  return shouldShow ? (
    <Section
      positionBlur="left"
      bgColor="zinc-900"
      title={title || "Marcas"}
      subtitle={subtitle}
      id="brands"
    >
      {isPending ? (
        <BrandsSkeleton count={maxItems} />
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {brands.map((brand) => (
            <Brand
              key={brand.brandId}
              variant={styleVariant}
              previewMode={previewMode}
              showName={showName}
              {...brand}
            />
          ))}
        </div>
      )}
    </Section>
  ) : null;
}
