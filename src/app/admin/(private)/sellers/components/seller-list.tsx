"use client";

import { DefaultFilters } from "@/services/types";
import { PageContentList } from "@/components/admin/page/page-content-list";
import { Seller } from "./seller";

const sellers = [
  {
    sellerId: "1",
    firstName: "Mariana",
    lastName: "Oliveira",
    email: "mariana.oliveira@user.com",
    phone: "21 98765-4321",
    customMessage: "Vendedora ativa",
    imageUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Mariana",
    active: true,
    createdAt: "2021-02-15",
    updatedAt: "2021-06-12",
  },
  {
    sellerId: "2",
    firstName: "Carlos",
    lastName: "Pereira",
    email: "carlos.pereira@user.com",
    phone: "31 91234-5678",
    customMessage: "Vendedora ativa",
    imageUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Mariana",
    active: false,
    createdAt: "2021-03-20",
    updatedAt: "2021-06-08",
  },
  {
    sellerId: "3",
    firstName: "Ana",
    lastName: "Souza",
    email: "ana.souza@user.com",
    phone: "41 99876-5432",
    customMessage: "Vendedora ativa",
    imageUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Mariana",
    active: true,
    createdAt: "2021-04-10",
    updatedAt: "2021-06-11",
  },
  {
    sellerId: "4",
    firstName: "Felipe",
    lastName: "Andrade",
    email: "felipe.andrade@user.com",
    phone: "51 98765-6789",
    customMessage: "Vendedora ativa",
    imageUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Mariana",
    active: true,
    createdAt: "2021-05-05",
    updatedAt: "2021-07-26",
  },
  {
    sellerId: "5",
    firstName: "Juliana",
    lastName: "Mendes",
    email: "juliana.mendes@user.com",
    phone: "61 97654-3210",
    customMessage: "Vendedora ativa",
    imageUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Mariana",
    active: false,
    createdAt: "2021-06-12",
    updatedAt: "2021-07-15",
  },
  {
    sellerId: "6",
    firstName: "Rafaela",
    lastName: "Santos",
    email: "rafaela.santos@user.com",
    phone: "71 91234-5678",
    customMessage: "Vendedora ativa",
    imageUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Mariana",
    active: true,
    createdAt: "2021-07-01",
    updatedAt: "2021-07-30",
  },
];

export function SellerList({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  console.log(" Brands ~ appliedFilters", appliedFilters);
  return (
    <PageContentList
      items={sellers}
      renderItem={(seller) => <Seller {...seller} />}
      totalPages={3}
    />
  );
}
