import React from "react";
import { Card } from "@/components/ui/card";
import { Seller as SellerType } from "../types/seller";
import { Trash2Icon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar } from "@/components/admin/avatar/avatar";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import Link from "next/link";

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

    function formatDate(date: string) {
      return format(new Date(date), "dd MMM 'de' yy", { locale: ptBR });
    }

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
                <div className="flex flex-col items-end ">
                  <TextNormal className="text-xs gap-2">
                    Cadastrado em {formatDate(createdAt)}
                  </TextNormal>
                  <TextNormal className="text-xs gap-2">
                    Atualizado em {formatDate(updatedAt)}
                  </TextNormal>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <AlertDialog
          title="Confirmar exclusão?"
          description="Essa ação não pode ser desfeita."
          confirmText="Confirmar"
        >
          <button className="h-8 w-8 flex items-center justify-center hover:text-destructive text-primary rounded-md transition-all absolute top-4 right-4">
            <Trash2Icon size={18} />
          </button>
        </AlertDialog>
      </div>
    );
  }
);

Seller.displayName = "Seller";

export { Seller };
