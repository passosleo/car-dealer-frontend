import React from "react";
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
import { Banner as BannerType } from "../types/banner";

const Banner = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof Card>, "children"> & BannerType
>(
  (
    {
      className,
      bannerId,
      title,
      imageDesktopUrl,
      startAt,
      endAt,
      visible,
      active,
      createdAt,
      updatedAt,
      ...props
    },
    ref
  ) => {
    return (
      <Link href={`/admin/banners/${bannerId}`} passHref>
        <Card
          {...props}
          ref={ref}
          className={twMerge(
            "p-4 cursor-pointer hover:bg-secondary transition-all",
            className
          )}
        >
          <Image
            src={imageDesktopUrl}
            alt={title}
            width={1920}
            height={1080}
            objectFit="cover"
            className="rounded-lg"
          />
          <CardTitle className="flex justify-between items-center pt-4 pb-2">
            {title}
            <div className="flex items-center gap-2">
              <span
                className={twMerge(
                  " items-center text-xs font-medium",
                  visible ? "text-primary" : "text-muted-foreground"
                )}
              >
                {visible ? (
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
                  active ? "bg-green-500" : "bg-destructive"
                )}
              >
                {active ? "Ativo" : "Inativo"}
              </span>
            </div>
          </CardTitle>
          <CardDescription className="flex flex-col gap-2 pb-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarCheck2Icon size={14} />
              <span>
                Início em{" "}
                {formatDate(new Date(startAt!), "d 'de' MMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarX2Icon size={14} />
              <span>
                Término em{" "}
                {formatDate(new Date(endAt!), "d 'de' MMM 'de' yyyy", {
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

Banner.displayName = "Banner";

export { Banner };
