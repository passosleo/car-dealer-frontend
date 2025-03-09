import { Pagination } from "@/components/admin/pagination";
import { Page } from "@/components/admin/page";
import { SearchBar } from "@/components/admin/search-bar";
import { OrderBar } from "@/components/admin/order-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { BrandFilterBar } from "../brands/components/brand-filter-bar";

const categories = [
  {
    id: "1",
    name: "Sedan",
    imageUrl:
      "https://www.svgrepo.com/show/97247/commercial-car-side-view-silhouette.svg",
    active: true,
    createdAt: "2021-02-15",
    createdBy: "admin",
    updatedAt: "2021-06-12",
    updatedBy: "admin",
  },
  {
    id: "2",
    name: "Hatchback",
    imageUrl: "https://www.svgrepo.com/show/306868/toyota.svg",
    active: false,
    createdAt: "2021-03-20",
    createdBy: "admin",
    updatedAt: "2021-06-08",
    updatedBy: "admin",
  },
  {
    id: "3",
    name: "SUV",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "4",
    name: "Off-Road",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "5",
    name: "Esportivo",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "6",
    name: "Pickup",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "7",
    name: "Van",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "8",
    name: "Microcarro",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "9",
    name: "Caminhão",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "10",
    name: "Ônibus",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
];

export default function CategoriesPage({}: // searchParams,
{
  searchParams: Promise<
    Partial<{
      createdAtStart: string;
      createdAtEnd: string;
      createdBy: string;
      updatedAtStart: string;
      updatedAtEnd: string;
      updatedBy: string;
      status: "all" | "active" | "inactive";
      search: string;
      order: "asc" | "desc";
      page: number;
    }>
  >;
}) {
  // const filterOptions = await searchParams;
  // console.log("filterOptions", filterOptions);

  return (
    <Page.Layout
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Categorias</Page.Header.Title>
          <Page.Header.Description>
            Gerencie as categorias de veículos da sua loja.
          </Page.Header.Description>
          <Page.Header.Content>
            <Link href="/admin/categories/new">
              <Button className="flex gap-1 items-center justify-center">
                <CirclePlusIcon />
                Adicionar
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <SearchBar />
              <OrderBar />
              <BrandFilterBar />
            </div>
          </Page.Header.Content>
        </Page.Header.Layout>
      }
      content={
        <Page.Content.Grid
          data={categories}
          renderItem={(category) => (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="text-lg font-semibold">{category.name}</div>
                  <div className="text-sm text-gray-500">
                    Criado por {category.createdBy}
                  </div>
                </div>
              </div>
            </>
          )}
        />
      }
      footer={
        <Page.Footer>
          <Pagination totalPages={10} />
        </Page.Footer>
      }
    />
  );
}
