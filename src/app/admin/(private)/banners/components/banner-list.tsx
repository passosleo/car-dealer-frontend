"use client";

import Image from "next/image";
import { Banner } from "./banner";
import { DefaultFilters } from "@/services/types";
import { TextNormal } from "@/components/admin/text/text-normal";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";
import { useListBannersService } from "../services/use-list-banners-service";

export function BannerList({
  appliedFilters,
}: {
  appliedFilters: Partial<
    DefaultFilters & {
      visible: "all" | "visible" | "hidden";
    }
  >;
}) {
  const { banners, totalPages, isPending, isEmpty } =
    useListBannersService(appliedFilters);

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
          <TextNormal className="my-4">Nenhum banner encontrado</TextNormal>
        </div>
      ) : (
        <PageContentGrid
          items={banners}
          renderItem={(banner) => <Banner {...banner} />}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
