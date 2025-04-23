import Link from "next/link";
import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { DefaultFilters } from "@/services/types";
import { UserFilterBar } from "../components/user-filter-bar";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { UserList } from "../components/user-list";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  return (
    <PageLayout>
      <PageHeader
        title="Usuários"
        description="Gerencie os usuários do seu sistema."
      >
        <Link href="/admin/users/new">
          <Button className="flex gap-1 items-center justify-center">
            <CirclePlusIcon />
            Adicionar
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />
          <OrderBar />
          <UserFilterBar />
        </div>
      </PageHeader>

      <UserList appliedFilters={appliedFilters} />
    </PageLayout>
  );
}
