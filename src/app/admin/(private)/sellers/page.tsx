import { Seller as SellerType } from "./seller.types";
import { AddSellerButton } from "./components/add-seller-button";
import { SearchBar } from "@/components/admin/search/search-bar";
import { OrderBar } from "@/components/admin/order/order-bar";
import { SellerFilterBar } from "./components/seller-filter-bar";
import { Seller } from "./components/seller";
import { PageLayout } from "@/components/admin/page/page-layout";
import { PageHeader } from "@/components/admin/page/page-header";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { DefaultFilters } from "@/services/types";

const sellers: SellerType[] = [
  {
    id: "1",
    name: "Mariana Oliveira",
    email: "mariana.oliveira@user.com",
    phone: "21 98765-4321",
    isEnabled: true,
    createdAt: "2021-02-15",
    createdBy: "admin",
    updatedAt: "2021-06-12",
    updatedBy: "admin",
  },
  {
    id: "2",
    name: "Carlos Pereira",
    email: "carlos.pereira@user.com",
    phone: "31 91234-5678",
    isEnabled: false,
    createdAt: "2021-03-20",
    createdBy: "admin",
    updatedAt: "2021-06-08",
    updatedBy: "admin",
  },
  {
    id: "3",
    name: "Ana Clara Souza",
    email: "ana.souza@user.com",
    phone: "41 99876-5432",
    isEnabled: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "4",
    name: "Felipe Andrade",
    email: "felipe.andrade@user.com",
    phone: "51 98765-6789",
    isEnabled: true,
    createdAt: "2021-05-05",
    createdBy: "admin",
    updatedAt: "2021-07-26",
    updatedBy: "admin",
  },
  {
    id: "5",
    name: "Juliana Mendes",
    email: "juliana.mendes@user.com",
    phone: "61 97654-3210",
    isEnabled: false,
    createdAt: "2021-06-12",
    createdBy: "admin",
    updatedAt: "2021-07-15",
    updatedBy: "admin",
  },
  {
    id: "6",
    name: "Rafaela Santos",
    email: "rafaela.santos@user.com",
    phone: "71 91234-5678",
    isEnabled: true,
    createdAt: "2021-07-01",
    createdBy: "admin",
    updatedAt: "2021-07-30",
    updatedBy: "admin",
  },
];

export default async function SellersPage({
  searchParams,
}: {
  searchParams: Promise<Partial<DefaultFilters>>;
}) {
  const appliedFilters = await searchParams;
  console.log(" appliedFilters", appliedFilters);
  return (
    <PageLayout withBackButton>
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

      <PageContentList
        items={sellers}
        renderItem={(seller) => (
          <Seller.Card>
            <Seller.Avatar name={seller.name} />
            <Seller.Info
              name={seller.name}
              email={seller.email}
              phone={seller.phone}
              isEnabled={seller.isEnabled}
            />
            <div className="ml-auto flex flex-col justify-center items-end gap-4">
              <Seller.Metadata
                createdBy={seller.createdBy}
                createdAt={seller.createdAt}
                updatedBy={seller.updatedBy}
                updatedAt={seller.updatedAt}
              />
              <Seller.Actions>
                <Seller.EditButton sellerId={seller.id} />
                <Seller.DeleteButton sellerId={seller.id} />
              </Seller.Actions>
            </div>
          </Seller.Card>
        )}
        totalPages={3}
      />
    </PageLayout>
  );
}
