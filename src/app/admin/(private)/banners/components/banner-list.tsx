import { DefaultFilters } from "@/services/types";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";
import { Banner } from "./banner";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import Image from "next/image";
import { TextNormal } from "@/components/admin/text/text-normal";

export function BannerList({
  appliedFilters,
}: {
  appliedFilters: Partial<
    DefaultFilters & {
      visible: "all" | "visible" | "hidden";
    }
  >;
}) {
  console.log(" Brands ~ appliedFilters", appliedFilters);
  const isPending = false;
  const isEmpty = false;
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
          items={[
            {
              bannerId: "6",
              title: "Banner 3",
              visible: true,
              active: false,
              imageDesktopUrl:
                "https://assets.volkswagen.com/is/image/volkswagenag/banner_nivus_1920x1080_2?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
              imageMobileUrl: "",
              startAt: "2022-01-01",
              endAt: "2022-01-31",
              createdAt: "2022-01-01",
              updatedAt: "2022-01-01",
            },
          ]}
          renderItem={(banner) => <Banner {...banner} />}
          totalPages={3}
        />
      )}
    </>
  );
}
