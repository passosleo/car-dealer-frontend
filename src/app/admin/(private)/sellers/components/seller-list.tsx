"use client";

import { DefaultFilters } from "@/services/types";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { Seller } from "./seller";
import { useListSellersService } from "../services/use-list-sellers-service";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { TextNormal } from "@/components/admin/text/text-normal";
import Image from "next/image";

export function SellerList({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  const { sellers, total, isPending, isEmpty } =
    useListSellersService(appliedFilters);
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
          <TextNormal className="my-4">Nenhum vendedor encontrado</TextNormal>
        </div>
      ) : (
        <PageContentList
          items={sellers}
          renderItem={(seller) => <Seller {...seller} />}
          totalPages={total}
        />
      )}
    </>
  );
}
