import React from "react";
import Link from "next/link";
import {
  CalendarCheck2Icon,
  CalendarX2Icon,
  EyeIcon,
  EyeOffIcon,
  ListPlusIcon,
  PencilLineIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Separator } from "@/components/ui/separator";
import { Banner as BannerType } from "../types/banner";
import { TextHeading } from "@/components/admin/text/text-heading";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextNormal } from "@/components/admin/text/text-normal";
import { formatDate, formatDateTime } from "@/utils/date";
import { DeleteBannerButton } from "./delete-banner-button";

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
      <div className="relative">
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

            <div className="flex items-center justify-between gap-4 py-2">
              <TextHeading>{title}</TextHeading>

              <div className="flex items-center gap-2">
                <span
                  className={twMerge(
                    " items-center text-xs font-medium",
                    visible ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {visible ? (
                    <TextNormal className="items-center text-primary">
                      Visível
                      <EyeIcon size={14} />
                    </TextNormal>
                  ) : (
                    <TextNormal className="items-center text-primary">
                      Visível
                      <EyeOffIcon size={14} />
                    </TextNormal>
                  )}
                </span>
                <ActiveTag active={active} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {startAt ? (
                <TextNormal className="text-xs">
                  <CalendarCheck2Icon size={14} />
                  Início em {formatDateTime(startAt)}
                </TextNormal>
              ) : (
                <></>
              )}

              {endAt ? (
                <TextNormal className="text-xs">
                  <CalendarX2Icon size={14} />
                  Término em {formatDateTime(endAt)}
                </TextNormal>
              ) : (
                <></>
              )}
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col gap-1">
              <TextNormal className="text-xs">
                <ListPlusIcon size={14} />
                Cadastrado em {formatDate(createdAt)}
              </TextNormal>
              <TextNormal className="text-xs">
                <PencilLineIcon size={14} />
                Atualizado em {formatDate(updatedAt)}
              </TextNormal>
            </div>
          </Card>
        </Link>
        <DeleteBannerButton bannerId={bannerId} />
      </div>
    );
  }
);

Banner.displayName = "Banner";

export { Banner };
