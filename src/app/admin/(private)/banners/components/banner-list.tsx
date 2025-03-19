"use client";
import { DefaultFilters } from "@/services/types";
import Link from "next/link";
import {
  CalendarCheck2Icon,
  CalendarX2Icon,
  EyeIcon,
  EyeOffIcon,
  UserPenIcon,
  UserPlusIcon,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";

export function BannerList({
  appliedFilters,
}: {
  appliedFilters: Partial<
    DefaultFilters & {
      visible: "all" | "visible" | "hidden";
    }
  >;
}) {
  console.log(" Brands ~ appliedFilters", appliedFilters);
  return (
    <PageContentGrid
      items={[
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
      ]}
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
                    banner.visible ? "text-primary" : "text-muted-foreground"
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
                  {formatDate(new Date(banner.endAt), "d 'de' MMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </CardDescription>
            <Separator />
            <div className="flex flex-col gap-1 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <UserPlusIcon size={14} />
                <span>
                  Criado por <b className="font-semibold">{banner.createdBy}</b>{" "}
                  em{" "}
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
      totalPages={3}
    />
  );
}
