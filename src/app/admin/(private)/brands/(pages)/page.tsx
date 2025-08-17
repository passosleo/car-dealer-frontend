import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandGrid } from "../components/brand-grid";
import { OrderBar } from "@/components/admin/order/order-bar";
import { BrandFilterBar } from "../components/brand-filter-bar";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { SearchBar } from "@/components/admin/search/search-bar";
import { DefaultFilters } from "@/types/generic";

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
