import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Seller as SellerType } from "../types/seller";
import {
  CalendarPlus2Icon,
  PencilIcon,
  Trash2Icon,
  UserPenIcon,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
      email,
      phone,
      active,
      updatedAt,
      createdAt,
      ...props
    },
    ref
  ) => {
    function getFallbackName() {
      return firstName
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("");
    }

    function formatDate(date: string) {
      return format(new Date(date), "dd MMM yyyy", { locale: ptBR });
    }

    return (
      <Card
        {...props}
        ref={ref}
        className={twMerge("flex flex-row gap-4 items-center p-4", className)}
      >
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${firstName}`}
            alt={firstName}
          />
          <AvatarFallback>{getFallbackName()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{firstName}</CardTitle>
          <CardDescription>
            <ul>
              <li>{email}</li>
              <li>{phone}</li>
            </ul>
          </CardDescription>
          <div className="text-sm flex gap-1 items-center font-semibold">
            <span
              className={twMerge(
                "rounded-full w-2 h-2",
                active ? "bg-green-700" : "bg-red-700"
              )}
            />
            <p className={active ? "text-green-700" : "text-red-700"}>
              {active ? "Ativo" : "Inativo"}
            </p>
          </div>
          <div className="ml-auto flex flex-col justify-center items-end gap-4">
            <div className="flex gap-4 flex-wrap justify-end">
              <CardDescription className="text-xs flex gap-1">
                <UserPenIcon size={14} />
                Atualizado em {formatDate(updatedAt)}
              </CardDescription>
              <CardDescription className="text-xs flex gap-1">
                <CalendarPlus2Icon size={14} />
                Criado em {formatDate(createdAt)}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/sellers/${sellerId}`}>
                <Button className="rounded-full w-9 h-9" variant="secondary">
                  <PencilIcon size={18} />
                </Button>
              </Link>
              <AlertDialog
                title="Confirmar exclusão?"
                description="Essa ação não pode ser desfeita."
                confirmText="Confirmar"
                onConfirm={() => null}
              >
                <Button
                  variant="destructive"
                  disabled={false}
                  className="rounded-full w-9 h-9"
                >
                  <Trash2Icon size={18} />
                </Button>
              </AlertDialog>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

Seller.displayName = "Seller";

export { Seller };
