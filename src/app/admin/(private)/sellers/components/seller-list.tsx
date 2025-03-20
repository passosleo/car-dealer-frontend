"use client";

import { DefaultFilters } from "@/services/types";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { Seller } from "./seller";
import { useListSellersService } from "../services/use-list-sellers-service";

export function SellerList({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const { sellers, total } = useListSellersService(appliedFilters);
  return (
    <PageContentList
      items={sellers}
      renderItem={(seller) => <Seller {...seller} />}
      totalPages={total}
    />
  );
}
