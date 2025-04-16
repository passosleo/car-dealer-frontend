import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Seller as SellerType } from "../types/seller";
import { Avatar } from "@/components/admin/avatar/avatar";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { DeleteSellerButton } from "./delete-seller-button";
import { formatDate } from "@/utils/date";

const Seller = React.forwardRef<HTMLDivElement, SellerType>((seller, ref) => {
  const fullName = seller.lastName
    ? `${seller.firstName} ${seller.lastName}`
    : seller.firstName;

  return (
    <div className="relative">
      <Link href={`/admin/sellers/${seller.sellerId}`}>
        <Card
          ref={ref}
          className="flex items-center p-4 gap-4 hover:bg-primary-foreground cursor-pointer transition-all"
        >
          <Avatar name={fullName} src={seller.imageUrl} />
          <div className="w-full flex justify-between">
            <div>
              <TextSubheading>{fullName}</TextSubheading>
              <TextNormal className="text-xs">{seller.email}</TextNormal>
              <TextNormal className="text-xs">{seller.phone}</TextNormal>
              <ActiveTag active={seller.active} />
            </div>

            <div className="flex flex-col justify-end items-end">
              <div className="flex flex-col items-end gap-0.5">
                <TextNormal className="text-xs">
                  Cadastrado em {formatDate(seller.createdAt)}
                </TextNormal>
                <TextNormal className="text-xs">
                  Atualizado em {formatDate(seller.updatedAt)}
                </TextNormal>
              </div>
            </div>
          </div>
        </Card>
      </Link>
      <DeleteSellerButton sellerId={seller.sellerId} />
    </div>
  );
});

Seller.displayName = "Seller";

export { Seller };
