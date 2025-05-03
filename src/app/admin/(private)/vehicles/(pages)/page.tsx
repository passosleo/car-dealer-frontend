import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListVehicleFilters } from "../types/vehicle";
import { VehicleList } from "../components/vehicle-list";
import { OrderBar } from "@/components/admin/order/order-bar";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageLayout } from "@/components/admin/page/page-layout";
import { SearchBar } from "@/components/admin/search/search-bar";
import { VehicleFilterBar } from "../components/vehicle-filter-bar";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<Partial<ListVehicleFilters>>;
}) {
  const appliedFilters = await searchParams;
  console.log(" appliedFilters", appliedFilters);
  return (
    <PageLayout>
      <PageHeader
        title="Veículos"
        description="Gerencie os veículos da sua loja."
      >
        <Link href="/admin/vehicles/new">
          <Button className="flex gap-1 items-center justify-center">
            <CirclePlusIcon />
            Adicionar
          </Button>
        </Link>
        <div className="flex items-center gap-4 ">
          <SearchBar />
          <OrderBar />
          <VehicleFilterBar />
        </div>
      </PageHeader>
      <VehicleList appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
