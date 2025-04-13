import Link from "next/link";
import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { DefaultFilters } from "@/services/types";
import { ProfileFilterBar } from "../components/profile-filter-bar";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { ProfileGrid } from "../components/profile-grid";

export default async function ProfilesPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  console.log(" appliedFilters", appliedFilters);
  return (
    <PageLayout>
      <PageHeader
        title="Perfis de Acesso"
        description="Gerencie os perfis de acesso do seu sistema."
      >
        <Link href="/admin/profiles/new">
          <Button className="flex gap-1 items-center justify-center">
            <CirclePlusIcon />
            Adicionar
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />
          <OrderBar />
          <ProfileFilterBar />
        </div>
      </PageHeader>

      <ProfileGrid appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
