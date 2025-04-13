"use client";

import Image from "next/image";
import { Brand } from "./brand";
import { DefaultFilters } from "@/services/types";
import { TextNormal } from "@/components/admin/text/text-normal";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { useListBrandsService } from "../services/use-list-brands-service";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";

export function BrandGrid({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const { brands, totalPages, isPending, isEmpty } =
    useListBrandsService(appliedFilters);

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCustom />
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center my-auto">
          <Image
            src="/images/people-search.svg"
            alt="Ilustração de página sem dados"
            width={180}
            height={180}
          />
          <TextNormal className="my-4">Nenhuma marca encontrada</TextNormal>
        </div>
      ) : (
        <PageContentGrid
          items={brands}
          renderItem={(brand) => <Brand {...brand} />}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
