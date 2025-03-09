import { Pagination } from "@/components/admin/pagination";
import { SearchBar } from "@/components/admin/search-bar";
import { OrderBar } from "@/components/admin/order-bar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BannerFilterBar } from "./components/banner-filter-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck2Icon,
  CalendarX2Icon,
  CirclePlusIcon,
  EyeIcon,
  EyeOffIcon,
  UserPenIcon,
  UserPlusIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Page } from "@/components/admin/page";

const banners = [
  {
    id: 1,
    title: "Banner 1",
    active: true,
    visible: true,
    imageDesktop:
      "https://assets.volkswagen.com/is/image/volkswagenag/23122024_Janeiro_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    imageMobile:
      "https://assets.volkswagen.com/is/image/volkswagenag/23122024_Janeiro_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    startAt: "2022-01-01",
    endAt: "2022-01-31",
    createdAt: "2022-01-01",
    createdBy: "Usuário 1",
    updatedAt: "2022-01-01",
    updatedBy: "Usuário 1",
  },
  {
    id: 2,
    title: "Banner 2",
    active: false,
    visible: false,
    imageDesktop:
      "https://assets.volkswagen.com/is/image/volkswagenag/amarok_banner2_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    imageMobile:
      "https://assets.volkswagen.com/is/image/volkswagenag/amarok_banner2_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    startAt: "2022-01-01",
    endAt: "2022-01-31",
    createdAt: "2022-01-01",
    createdBy: "Usuário 1",
    updatedAt: "2022-01-01",
    updatedBy: "Usuário 1",
  },
  {
    id: 3,
    title: "Banner 3",
    active: false,
    visible: false,
    imageDesktop:
      "https://assets.volkswagen.com/is/image/volkswagenag/banner_nivus_1920x1080_2?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    imageMobile: "",
    startAt: "2022-01-01",
    endAt: "2022-01-31",
    createdAt: "2022-01-01",
    createdBy: "Usuário 1",
    updatedAt: "2022-01-01",
    updatedBy: "Usuário 1",
  },
  {
    id: 4,
    title: "Banner 1",
    active: true,
    visible: false,
    imageDesktop:
      "https://assets.volkswagen.com/is/image/volkswagenag/23122024_Janeiro_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    imageMobile:
      "https://assets.volkswagen.com/is/image/volkswagenag/23122024_Janeiro_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    startAt: "2022-01-01",
    endAt: "2022-01-31",
    createdAt: "2022-01-01",
    createdBy: "Usuário 1",
    updatedAt: "2022-01-01",
    updatedBy: "Usuário 1",
  },
  {
    id: 5,
    title: "Banner 2",
    active: false,
    visible: false,
    imageDesktop:
      "https://assets.volkswagen.com/is/image/volkswagenag/amarok_banner2_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    imageMobile:
      "https://assets.volkswagen.com/is/image/volkswagenag/amarok_banner2_1920x1080?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    startAt: "2022-01-01",
    endAt: "2022-01-31",
    createdAt: "2022-01-01",
    createdBy: "Usuário 1",
    updatedAt: "2022-01-01",
    updatedBy: "Usuário 1",
  },
  {
    id: 6,
    title: "Banner 3",
    active: false,
    visible: false,
    imageDesktop:
      "https://assets.volkswagen.com/is/image/volkswagenag/banner_nivus_1920x1080_2?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
    imageMobile: "",
    startAt: "2022-01-01",
    endAt: "2022-01-31",
    createdAt: "2022-01-01",
    createdBy: "Usuário 1",
    updatedAt: "2022-01-01",
    updatedBy: "Usuário 1",
  },
];

export default async function BannersPage({
  searchParams,
}: {
  searchParams: Promise<
    Partial<{
      createdAtStart: string;
      createdAtEnd: string;
      createdBy: string;
      updatedAtStart: string;
      updatedAtEnd: string;
      updatedBy: string;
      visible: "all" | "visible" | "hidden";
      status: "all" | "active" | "inactive";
      search: string;
      order: "asc" | "desc";
      page: number;
    }>
  >;
}) {
  const filterOptions = await searchParams;
  console.log("filterOptions", filterOptions);

  return (
    <Page.Layout
      header={
        <Page.Header.Layout>
          <Page.Header.Title>Banners</Page.Header.Title>
          <Page.Header.Description>
            Adicione, edite ou remova os banners da sua loja.
          </Page.Header.Description>
          <Page.Header.Content>
            <Link href="/admin/banners/new">
              <Button className="flex gap-1 items-center justify-center">
                <CirclePlusIcon />
                Adicionar
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <SearchBar />
              <OrderBar />
              <BannerFilterBar />
            </div>
          </Page.Header.Content>
        </Page.Header.Layout>
      }
      content={
        <Page.Content.Grid
          data={banners}
          renderItem={(banner) => (
            <Link key={banner.id} href={`/admin/banners/${banner.id}`} passHref>
              <Card className="p-4 cursor-pointer hover:bg-secondary transition-all">
                <Image
                  src={banner.imageDesktop}
                  alt={banner.title}
                  width={1920}
                  height={1080}
                  objectFit="cover"
                  className="rounded-lg"
                />
                <CardTitle className="flex justify-between items-center pt-4 pb-2">
                  {banner.title}
                  <div className="flex items-center gap-2">
                    <span
                      className={twMerge(
                        " items-center text-xs font-medium",
                        banner.visible
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {banner.visible ? (
                        <span className="flex items-center gap-1">
                          Visível
                          <EyeIcon size={14} />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          Oculto
                          <EyeOffIcon size={14} />
                        </span>
                      )}
                    </span>
                    <span
                      className={twMerge(
                        "px-1.5 rounded-md text-secondary text-xs font-medium",
                        banner.active ? "bg-green-500" : "bg-destructive"
                      )}
                    >
                      {banner.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </CardTitle>
                <CardDescription className="flex flex-col gap-2 pb-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarCheck2Icon size={14} />
                    <span>
                      Início em{" "}
                      {formatDate(
                        new Date(banner.startAt),
                        "d 'de' MMM 'de' yyyy",
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarX2Icon size={14} />
                    <span>
                      Término em{" "}
                      {formatDate(
                        new Date(banner.endAt),
                        "d 'de' MMM 'de' yyyy",
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                  </div>
                </CardDescription>
                <Separator />
                <div className="flex flex-col gap-1 pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UserPlusIcon size={14} />
                    <span>
                      Criado por{" "}
                      <b className="font-semibold">{banner.createdBy}</b> em{" "}
                      {formatDate(
                        new Date(banner.createdAt),
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
                      <b className="font-semibold">{banner.updatedBy}</b> em{" "}
                      {formatDate(
                        new Date(banner.updatedAt),
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
