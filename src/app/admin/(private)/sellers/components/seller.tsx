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

const Seller = React.forwardRef<HTMLDivElement, SellerType>(
  (
    {
      sellerId,
      firstName,
      lastName,
      email,
      phone,
      imageUrl,
      active,
      updatedAt,
      createdAt,
    },
    ref
  ) => {
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    return (
      <div className="relative">
        <Link href={`/admin/sellers/${sellerId}`}>
          <Card
            ref={ref}
            className="flex items-center p-4 gap-4 hover:bg-primary-foreground cursor-pointer transition-all"
          >
            <Avatar name={fullName} src={imageUrl} />
            <div className="w-full flex justify-between">
              <div>
                <TextSubheading>{fullName}</TextSubheading>
                <TextNormal className="text-xs">{email}</TextNormal>
                <TextNormal className="text-xs">{phone}</TextNormal>
                <ActiveTag active={active} />
              </div>

              <div className="flex flex-col justify-end items-end">
                <div className="flex flex-col items-end gap-0.5">
                  <TextNormal className="text-xs">
                    Cadastrado em {formatDate(createdAt)}
                  </TextNormal>
                  <TextNormal className="text-xs">
                    Atualizado em {formatDate(updatedAt)}
                  </TextNormal>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <DeleteSellerButton sellerId={sellerId} />
      </div>
    );
  }
);

Seller.displayName = "Seller";

export { Seller };
