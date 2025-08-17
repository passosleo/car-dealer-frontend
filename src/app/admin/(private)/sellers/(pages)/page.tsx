import { AddSellerButton } from "../components/add-seller-button";
import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { SellerFilterBar } from "../components/seller-filter-bar";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { SellerList } from "../components/seller-list";
import { DefaultPrivateFilters } from "@/types/generic";

export default async function SellersPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultPrivateFilters>>;
}) {
  const appliedFilters = await searchParams;
  return (
    <PageLayout>
      <PageHeader
        title="Vendedores"
        description="Adicione, edite ou remova os vendedores da sua loja."
      >
        <AddSellerButton />
        <div className="flex items-center gap-4">
          <SearchBar />
          <OrderBar />
          <SellerFilterBar />
        </div>
      </PageHeader>

      <SellerList appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
