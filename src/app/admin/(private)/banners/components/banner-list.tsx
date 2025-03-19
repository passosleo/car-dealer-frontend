import { DefaultFilters } from "@/services/types";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";
import { Banner } from "./banner";

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
  return (
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
  );
}
