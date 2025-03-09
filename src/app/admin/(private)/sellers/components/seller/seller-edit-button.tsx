import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type SellerEditButtonProps = React.ComponentProps<typeof Button> & {
  sellerId: string;
};

const SellerEditButton = React.forwardRef<
  HTMLButtonElement,
  SellerEditButtonProps
>(
  (
    {
      children = <PencilIcon size={18} />,
      className,
      variant = "secondary",
      sellerId,
      ...props
    },
    ref
  ) => {
    return (
      <Link href={`/admin/sellers/${sellerId}`}>
        <Button
          {...props}
          ref={ref}
          variant={variant}
          className={twMerge("rounded-full w-9 h-9", className)}
        >
          {children}
        </Button>
      </Link>
    );
  }
);

SellerEditButton.displayName = "Seller.EditButton";

export { SellerEditButton };
