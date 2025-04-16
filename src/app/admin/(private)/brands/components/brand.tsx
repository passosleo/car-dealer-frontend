import React from "react";
import { Card } from "@/components/ui/card";
import { ListPlusIcon, PencilLineIcon } from "lucide-react";
import Link from "next/link";
import { Brand as BrandType } from "../types/brand";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/date";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { DeleteBrandButton } from "./delete-brand-button";

const Brand = React.forwardRef<HTMLDivElement, BrandType>((brand, ref) => {
  return (
    <div className="relative">
      <Link href={`/admin/brands/${brand.brandId}`} passHref>
        <Card
          ref={ref}
          className="flex flex-col gap-2 p-2 hover:bg-primary-foreground cursor-pointer transition-all"
        >
          <div className="flex gap-4">
            <Image
              src={brand.imageUrl}
              alt={brand.name}
              width={1920}
              height={1080}
              objectFit="cover"
              className="w-16 h-16 rounded-md border border-border p-2"
            />

            <div className="flex flex-col items-start">
              <TextSubheading>{brand.name}</TextSubheading>
              <ActiveTag active={brand.active} />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-0.5">
            <TextNormal className="text-xs">
              <ListPlusIcon size={14} />
              Cadastrado em {formatDate(brand.createdAt)}
            </TextNormal>
            <TextNormal className="text-xs">
              <PencilLineIcon size={14} />
              Atualizado em {formatDate(brand.updatedAt)}
            </TextNormal>
          </div>
        </Card>
      </Link>
      <DeleteBrandButton brandId={brand.brandId} />
    </div>
  );
});

Brand.displayName = "Brand";

export { Brand };
