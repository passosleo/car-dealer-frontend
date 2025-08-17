import Link from "next/link";
import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { CategoryFilterBar } from "../components/category-filter-bar";
import { CategoryGrid } from "../components/category-grid";
import { DefaultFilters } from "@/types/generic";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  return (
    <PageLayout>
      <PageHeader
        title="Categorias"
        description="Gerencie as categorias de veículos da sua loja."
      >
        <Link href="/admin/categories/new">
          <Button className="flex gap-1 items-center justify-center">
            <CirclePlusIcon />
            Adicionar
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />
          <OrderBar />
          <CategoryFilterBar />
        </div>
      </PageHeader>
      <CategoryGrid appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
