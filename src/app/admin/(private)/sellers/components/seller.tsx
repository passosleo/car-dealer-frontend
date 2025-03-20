"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Seller as SellerType } from "../types/seller";
import { CalendarPlus2Icon, Trash2Icon, UserPenIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Avatar } from "@/components/admin/avatar/avatar";
import { ActiveTag } from "@/components/admin/tag/active-tag";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { TextNormal } from "@/components/admin/text/text-normal";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";

const Seller = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof Card>, "children"> & SellerType
>(
  (
    {
      className,
      sellerId,
      firstName,
      lastName,
      email,
      phone,
      active,
      updatedAt,
      createdAt,
      ...props
    },
    ref
  ) => {
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    function formatDate(date: string) {
      return format(new Date(date), "dd MMM yyyy", { locale: ptBR });
    }

    return (
      <Link href={`/admin/sellers/${sellerId}`}>
        <Card
          {...props}
          ref={ref}
          className={twMerge(
            "flex items-center p-4 gap-4 hover:bg-primary-foreground cursor-pointer transition-all",
            className
          )}
        >
          <Avatar name={fullName} />
          <div className="w-full flex justify-between">
            <div>
              <TextSubheading>{fullName}</TextSubheading>
              <TextNormal className="text-sm">{email}</TextNormal>
              <TextNormal className="text-sm">{phone}</TextNormal>
              <ActiveTag active={active} />
            </div>

            <div className="flex flex-col justify-between items-end">
              <AlertDialog
                title="Confirmar exclusão?"
                description="Essa ação não pode ser desfeita."
                confirmText="Confirmar"
                // onConfirm={() => null}
              >
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
              </AlertDialog>

              <div className="flex flex-col items-end gap-1">
                <TextNormal className="text-xs">
                  <UserPenIcon size={14} />
                  Atualizado em {formatDate(updatedAt)}
                </TextNormal>
                <TextNormal className="text-xs">
                  <CalendarPlus2Icon size={14} />
                  Criado em {formatDate(createdAt)}
                </TextNormal>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }
);

Seller.displayName = "Seller";

export { Seller };
