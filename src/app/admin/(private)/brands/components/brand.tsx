"use client";

import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Trash2Icon, UserPenIcon, UserPlusIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Brand as BrandType } from "../types/brand";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "date-fns";

const Brand = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof Card>, "children"> & BrandType
>(
  (
    {
      className,
      brandId,
      name,
      imageUrl,
      active,
      createdAt,
      updatedAt,
      ...props
    },
    ref
  ) => {
    return (
      <Link href={`/admin/brands/${brandId}`} passHref>
        <Card
          {...props}
          ref={ref}
          className={twMerge(
            "flex flex-col p-2 hover:bg-primary-foreground cursor-pointer transition-all",
            className
          )}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <Image
                src={imageUrl}
                alt={name}
                width={1920}
                height={1080}
                objectFit="cover"
                className="w-16 h-16 rounded-md border border-border p-2"
              />

              <div className="flex flex-col gap-2">
                <CardTitle>{name}</CardTitle>
                <span
                  className={twMerge(
                    "px-1.5 rounded-md text-secondary text-xs font-medium w-fit",
                    active ? "bg-green-500" : "bg-destructive"
                  )}
                >
                  {active ? "Ativo" : "Inativo"}
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
                Criado em{" "}
                {formatDate(
                  new Date(createdAt),
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
                  new Date(updatedAt),
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
    );
  }
);

Brand.displayName = "Brand";

export { Brand };
