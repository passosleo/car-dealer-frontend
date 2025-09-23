"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LayoutTopBarConfig } from "@/types/layout-component";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type TopBarMessageProps = Required<
  Pick<LayoutTopBarConfig["layoutTopBarMessages"][number], "message" | "active">
> &
  Partial<
    Omit<
      LayoutTopBarConfig["layoutTopBarMessages"][number],
      "message" | "active"
    >
  >;

type TopBarProps = {
  previewMode?: boolean;
} & Required<
  Pick<LayoutTopBarConfig, "active" | "loop" | "delay" | "direction" | "jump">
> & {
    layoutTopBarMessages: TopBarMessageProps[];
  } & Partial<
    Omit<
      LayoutTopBarConfig,
      | "layoutTopBarConfigId"
      | "layoutComponentId"
      | "maxItems"
      | "hideOnMobile"
      | "hideOnDesktop"
      | "createdAt"
      | "updatedAt"
      | "layoutTopBarMessages"
    >
  >;

export function TopBar({
  active = true,
  previewMode = false,
  layoutTopBarMessages = [],
  delay = 3000,
  direction = "rtl",
  loop = true,
  jump = false,
}: TopBarProps & {
  previewMode?: boolean;
}) {
  const shouldShow = (layoutTopBarMessages.length > 0 && active) || previewMode;

  return shouldShow ? (
    <div className="flex justify-center items-center h-9 w-full bg-zinc-950 px-6 py-2">
      <Carousel
        dir={direction}
        plugins={[
          Autoplay({
            delay: Number(delay),
            jump,
          }),
        ]}
        opts={{
          loop,
          direction,
        }}
      >
        <CarouselContent>
          {layoutTopBarMessages.map((item, index) => (
            <CarouselItem
              key={index}
              className="text-white text-sm flex justify-center select-none"
            >
              <Link
                href={item.link || "#"}
                target={item.link ? "_blank" : "_self"}
                dir="ltr"
              >
                {item.message}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ) : null;
}
