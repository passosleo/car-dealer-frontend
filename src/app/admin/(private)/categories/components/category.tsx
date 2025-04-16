import React from "react";
import { Card } from "@/components/ui/card";
import { ListPlusIcon, PencilLineIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/date";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { Category as CategoryType } from "../types/category";
import { DeleteCategoryButton } from "./delete-category-button";

const Category = React.forwardRef<HTMLDivElement, CategoryType>(
  (category, ref) => {
    return (
      <div className="relative">
        <Link href={`/admin/categories/${category.categoryId}`} passHref>
          <Card
            ref={ref}
            className="flex flex-col gap-2 p-2 hover:bg-primary-foreground cursor-pointer transition-all"
          >
            <div className="flex gap-4">
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={1920}
                height={1080}
                objectFit="cover"
                className="w-16 h-16 rounded-md border border-border p-2"
              />

              <div className="flex flex-col items-start">
                <TextSubheading>{category.name}</TextSubheading>
                <ActiveTag active={category.active} />
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-0.5">
              <TextNormal className="text-xs">
                <ListPlusIcon size={14} />
                Cadastrado em {formatDate(category.createdAt)}
              </TextNormal>
              <TextNormal className="text-xs">
                <PencilLineIcon size={14} />
                Atualizado em {formatDate(category.updatedAt)}
              </TextNormal>
            </div>
          </Card>
        </Link>
        <DeleteCategoryButton categoryId={category.categoryId} />
      </div>
    );
  }
);

Category.displayName = "Category";

export { Category };
