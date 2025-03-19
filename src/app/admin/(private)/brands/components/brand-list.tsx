"use client";
import { DefaultFilters } from "@/services/types";
import Link from "next/link";
import { Trash2Icon, UserPenIcon, UserPlusIcon } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { PageContentGrid } from "@/components/admin/page/page-content-grid";

export function BrandList({
  appliedFilters,
}: {
  appliedFilters: Partial<DefaultFilters>;
}) {
  console.log(" Brands ~ appliedFilters", appliedFilters);
  return (
    <PageContentGrid
      items={[
        {
          brandId: 1,
          name: "Audi",
          imageUrl:
            "https://png.pngtree.com/png-vector/20230218/ourmid/pngtree-vector-black-car-white-sport-logo-png-image_6606376.png",
          active: true,
          createdAt: "2022-01-01T12:00:00Z",
          updatedAt: "2022-01-01T12:00:00Z",
        },
      ]}
      renderItem={(brand) => (
        <Link href={`/admin/brands/${brand.brandId}`} passHref>
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
                // onClick={(e) => {
                //   e.stopPropagation();
                //   e.preventDefault();
                //   console.log("click");
                // }}
              >
                <Trash2Icon size={18} />
              </button>
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <UserPlusIcon size={14} />
                <span>
                  Criado em{" "}
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
                  Editado em{" "}
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
      totalPages={3}
    />
  );
}
