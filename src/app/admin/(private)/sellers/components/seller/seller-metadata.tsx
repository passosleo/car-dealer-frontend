import React from "react";
import { CardDescription } from "@/components/ui/card";
import { CalendarPlus2Icon, UserPenIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

type SellerMetadataProps = React.ComponentProps<"div"> & {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

const SellerMetadata = React.forwardRef<HTMLDivElement, SellerMetadataProps>(
  (
    { createdBy, createdAt, updatedBy, updatedAt, className, ...props },
    ref
  ) => {
    function formatDate(date: string) {
      return format(new Date(date), "dd MMM yyyy", { locale: ptBR });
    }

    return (
      <div
        {...props}
        ref={ref}
        className={twMerge("flex gap-4 flex-wrap justify-end", className)}
      >
        <CardDescription className="text-xs flex gap-1">
          <UserPenIcon size={14} />
          Atualizado por <p className="font-semibold">{updatedBy}</p> em{" "}
          {formatDate(updatedAt)}
        </CardDescription>
        <CardDescription className="text-xs flex gap-1">
          <CalendarPlus2Icon size={14} />
          Criado por <p className="font-semibold">{createdBy}</p> em{" "}
          {formatDate(createdAt)}
        </CardDescription>
      </div>
    );
  }
);

SellerMetadata.displayName = "Seller.Metadata";

export { SellerMetadata };
