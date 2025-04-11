"use client";

import Image from "next/image";
import { Category } from "./category";
import { DefaultFilters } from "@/services/types";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import { useListCategoriesService } from "../services/use-list-categories-service";

export function CategoryGrid({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const { categories, totalPages, isPending, isEmpty } =
    useListCategoriesService(appliedFilters);

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
          <TextNormal className="my-4">Nenhuma categoria encontrada</TextNormal>
        </div>
      ) : (
        <PageContentGrid
          items={categories}
          renderItem={(category) => <Category {...category} />}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
