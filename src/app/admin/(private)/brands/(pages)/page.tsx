import Link from "next/link";
import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { BrandFilterBar } from "../components/brand-filter-bar";
import { DefaultFilters } from "@/services/types";
import { BrandGrid } from "../components/brand-grid";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  return (
    <PageLayout>
      <PageHeader
        title="Marcas"
        description="Gerencie as marcas de veículos da sua loja."
      >
        <Link href="/admin/brands/new">
          <Button className="flex gap-1 items-center justify-center">
            <CirclePlusIcon />
            Adicionar
          </Button>
        </Link>
        <div className="flex items-center gap-4 ">
          <SearchBar />
          <OrderBar />
          <BrandFilterBar />
        </div>
      </PageHeader>
      <BrandGrid appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
