"use client";
import { Pagination } from "@/components/admin/pagination";
import { Page } from "@/components/admin/page";
import { SearchBar } from "@/components/admin/search-bar";
import { OrderBar } from "@/components/admin/order-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CirclePlusIcon,
  Trash2Icon,
  UserPenIcon,
  UserPlusIcon,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { BrandFilterBar } from "./components/brand-filter-bar";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

const brands = [
  {
    id: "1",
    name: "Honda",
    imageUrl: "https://www.svgrepo.com/show/446876/honda.svg",
    active: true,
    createdAt: "2021-02-15",
    createdBy: "admin",
    updatedAt: "2021-06-12",
    updatedBy: "admin",
  },
  {
    id: "2",
    name: "Toyota",
    imageUrl: "https://www.svgrepo.com/show/306868/toyota.svg",
    active: false,
    createdAt: "2021-03-20",
    createdBy: "admin",
    updatedAt: "2021-06-08",
    updatedBy: "admin",
  },
  {
    id: "3",
    name: "Chevrolet",
    imageUrl: "https://www.svgrepo.com/show/446947/chevrolet.svg",
    active: true,
    createdAt: "2021-04-10",
    createdBy: "admin",
    updatedAt: "2021-06-11",
    updatedBy: "admin",
  },
  {
    id: "4",
    name: "Ford",
    imageUrl: "https://www.svgrepo.com/show/446869/ford.svg",
    active: true,
    createdAt: "2021-05-05",
    createdBy: "admin",
    updatedAt: "2021-07-26",
    updatedBy: "admin",
  },
  {
    id: "5",
    name: "Volkswagen",
    imageUrl: "https://www.svgrepo.com/show/446932/volkswagen.svg",
    active: false,
    createdAt: "2021-06-01",
    createdBy: "admin",
    updatedAt: "2021-07-26",
    updatedBy: "admin",
  },
  {
    id: "6",
    name: "Fiat",
    imageUrl: "https://www.svgrepo.com/show/446871/fiat.svg",
    active: true,
    createdAt: "2021-07-15",
    createdBy: "admin",
    updatedAt: "2021-07-26",
    updatedBy: "admin",
  },
  {
    id: "7",
    name: "Renault",
    imageUrl: "https://www.svgrepo.com/show/446916/renault-alt.svg",
    active: true,
    createdAt: "2021-08-01",
    createdBy: "admin",
    updatedAt: "2021-08-01",
    updatedBy: "admin",
  },
  {
    id: "8",
    name: "Hyundai",
    imageUrl: "https://www.svgrepo.com/show/446878/hyundai.svg",
    active: true,
    createdAt: "2021-08-15",
    createdBy: "admin",
    updatedAt: "2021-08-15",
    updatedBy: "admin",
  },
  {
    id: "9",
    name: "Nissan",
    imageUrl: "https://www.svgrepo.com/show/446904/nissan.svg",
    active: true,
    createdAt: "2021-09-01",
    createdBy: "admin",
    updatedAt: "2021-09-01",
    updatedBy: "admin",
  },
  {
    id: "10",
    name: "Kia",
    imageUrl: "https://www.svgrepo.com/show/446883/kia.svg",
    active: true,
    createdAt: "2021-09-15",
    createdBy: "admin",
    updatedAt: "2021-09-15",
    updatedBy: "admin",
  },
  {
    id: "11",
    name: "Mitsubishi",
    imageUrl: "https://www.svgrepo.com/show/446903/mitsubishi.svg",
    active: true,
    createdAt: "2021-10-01",
    createdBy: "admin",
    updatedAt: "2021-10-01",
    updatedBy: "admin",
  },
  {
    id: "12",
    name: "Peugeot",
    imageUrl: "https://www.svgrepo.com/show/446909/peugeot-alt.svg",
    active: true,
    createdAt: "2021-10-15",
    createdBy: "admin",
    updatedAt: "2021-10-15",
    updatedBy: "admin",
  },
  {
    id: "13",
    name: "Citroën",
    imageUrl: "https://www.svgrepo.com/show/446951/citroen.svg",
    active: true,
    createdAt: "2021-11-01",
    createdBy: "admin",
    updatedAt: "2021-11-01",
    updatedBy: "admin",
  },
  {
    id: "14",
    name: "BMW",
    imageUrl: "https://www.svgrepo.com/show/330076/bmw.svg",
    active: true,
    createdAt: "2021-11-15",
    createdBy: "admin",
    updatedAt: "2021-11-15",
    updatedBy: "admin",
  },
  {
    id: "15",
    name: "Mercedes-Benz",
    imageUrl: "https://www.svgrepo.com/show/446899/mercedes-benz.svg",
    active: true,
    createdAt: "2021-12-01",
    createdBy: "admin",
    updatedAt: "2021-12-01",
    updatedBy: "admin",
  },
  {
    id: "16",
    name: "Audi",
    imageUrl: "https://www.svgrepo.com/show/452160/audi.svg",
    active: true,
    createdAt: "2021-12-15",
    createdBy: "admin",
    updatedAt: "2021-12-15",
    updatedBy: "admin",
  },
  {
    id: "17",
    name: "Land Rover",
    imageUrl: "https://www.svgrepo.com/show/446889/land-rover.svg",
    active: true,
    createdAt: "2022-01-01",
    createdBy: "admin",
    updatedAt: "2022-01-01",
    updatedBy: "admin",
  },
  {
    id: "18",
    name: "Jeep",
    imageUrl: "https://www.svgrepo.com/show/446881/jeep-alt.svg",
    active: true,
    createdAt: "2022-01-15",
    createdBy: "admin",
    updatedAt: "2022-01-15",
    updatedBy: "admin",
  },
  {
    id: "19",
    name: "Volvo",
    imageUrl: "https://www.svgrepo.com/show/446934/volvo-alt.svg",
    active: true,
    createdAt: "2022-02-01",
    createdBy: "admin",
    updatedAt: "2022-02-01",
    updatedBy: "admin",
  },
  {
    id: "20",
    name: "Subaru",
    imageUrl: "https://www.svgrepo.com/show/446930/subaru.svg",
    active: true,
    createdAt: "2022-02-15",
    createdBy: "admin",
    updatedAt: "2022-02-15",
    updatedBy: "admin",
  },
  {
    id: "21",
    name: "Porsche",
    imageUrl: "https://www.svgrepo.com/show/303278/porsche-1-logo.svg",
    active: true,
    createdAt: "2022-03-01",
    createdBy: "admin",
    updatedAt: "2022-03-01",
    updatedBy: "admin",
  },
  {
    id: "22",
    name: "Jaguar",
    imageUrl: "https://www.svgrepo.com/show/446884/jaguar.svg",
    active: true,
    createdAt: "2022-03-15",
    createdBy: "admin",
    updatedAt: "2022-03-15",
    updatedBy: "admin",
  },
  {
    id: "23",
    name: "Dodge",
    imageUrl: "https://www.svgrepo.com/show/303429/dodge-ram-logo.svg",
    active: true,
    createdAt: "2022-04-01",
    createdBy: "admin",
    updatedAt: "2022-04-01",
    updatedBy: "admin",
  },
];

export default function BrandsPage({}: // searchParams,
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
          <Page.Header.Title>Marcas</Page.Header.Title>
          <Page.Header.Description>
            Gerencie as marcas de veículos da sua loja.
          </Page.Header.Description>
          <Page.Header.Content>
            <Link href="/admin/brands/new">
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
          data={brands}
          renderItem={(brand) => (
            <Link href={`/admin/brands/${brand.id}`} passHref>
              <Card className="flex flex-col p-2 hover:bg-primary-foreground cursor-pointer transition-all">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <Image
                      src={brand.imageUrl}
                      alt={brand.name}
                      width={1920}
                      height={1080}
                      objectFit="cover"
                      className="w-16 h-16 rounded-md border border-border p-2"
                    />

                    <div className="flex flex-col gap-2">
                      <CardTitle>{brand.name}</CardTitle>
                      <span
                        className={twMerge(
                          "px-1.5 rounded-md text-secondary text-xs font-medium w-fit",
                          brand.active ? "bg-green-500" : "bg-destructive"
                        )}
                      >
                        {brand.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="p-1 h-8 w-8 z-10 flex items-center justify-center hover:text-destructive text-primary rounded-md transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log("click");
                    }}
                  >
                    <Trash2Icon size={18} />
                  </button>
                </div>

                <Separator className="my-2" />

                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UserPlusIcon size={14} />
                    <span>
                      Criado por{" "}
                      <b className="font-semibold">{brand.createdBy}</b> em{" "}
                      {formatDate(
                        new Date(brand.createdAt),
                        "d 'de' MMM 'de' yyyy 'às' HH:mm",
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <UserPenIcon size={14} />
                    <span>
                      Editado por{" "}
                      <b className="font-semibold">{brand.updatedBy}</b> em{" "}
                      {formatDate(
                        new Date(brand.updatedAt),
                        "d 'de' MMM 'de' yyyy 'às' HH:mm",
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
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
