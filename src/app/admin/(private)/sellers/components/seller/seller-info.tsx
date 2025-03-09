import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";

type SellerInfoProps = React.ComponentProps<"div"> & {
  name: string;
  email: string;
  phone: string;
  isEnabled: boolean;
};

const SellerInfo = React.forwardRef<HTMLDivElement, SellerInfoProps>(
  ({ name, email, phone, isEnabled, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <CardTitle>{name}</CardTitle>
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
              isEnabled ? "bg-green-700" : "bg-red-700"
            )}
          />
          <p className={isEnabled ? "text-green-700" : "text-red-700"}>
            {isEnabled ? "Ativo" : "Inativo"}
          </p>
        </div>
      </div>
    );
  }
);

SellerInfo.displayName = "Seller.Info";

export { SellerInfo };
