import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { BannerFilterBar } from "./components/banner-filter-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { BannerList } from "./components/banner-list";
import { DefaultFilters } from "@/services/types";

export default async function BannersPage({
  searchParams,
}: {
  searchParams: Promise<
    Partial<
      DefaultFilters & {
        visible: "all" | "visible" | "hidden";
      }
    >
  >;
}) {
  const appliedFilters = await searchParams;
  return (
    <PageLayout withBackButton>
      <PageHeader
        title="Banners"
        description="Adicione, edite ou remova os banners da sua loja."
      >
        <Link href="/admin/banners/new">
          <Button className="flex gap-1 items-center justify-center">
            <CirclePlusIcon />
            Adicionar
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />
          <OrderBar />
          <BannerFilterBar />
        </div>
      </PageHeader>
      <BannerList appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
