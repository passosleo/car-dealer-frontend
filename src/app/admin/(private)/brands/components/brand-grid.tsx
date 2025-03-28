import { DefaultFilters } from "@/services/types";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";
import { Brand } from "./brand";

export function BrandGrid({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  console.log(" Brands ~ appliedFilters", appliedFilters);
  return (
    <PageContentGrid
      items={[
        {
          brandId: "1",
          name: "Audi",
          imageUrl:
            "https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png",
          active: true,
          createdAt: "2022-01-01T12:00:00Z",
          updatedAt: "2022-01-01T12:00:00Z",
        },
      ]}
      renderItem={(brand) => <Brand {...brand} />}
      totalPages={3}
    />
  );
}
