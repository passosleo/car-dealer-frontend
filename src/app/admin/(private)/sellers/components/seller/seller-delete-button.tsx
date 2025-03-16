"use client";
import { AlertDialog } from "@/components/admin/alert-dialog";
import { Button } from "@/components/ui/button";
import { apiClientConnection } from "@/services/api-client-connection";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type SellerDeleteButtonProps = React.ComponentProps<typeof Button> & {
  sellerId: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const SellerDeleteButton = React.forwardRef<
  HTMLButtonElement,
  SellerDeleteButtonProps
>(
  (
    {
      children = <Trash2Icon size={18} />,
      className,
      variant = "destructive",
      sellerId,
      ...props
    },
    ref
  ) => {
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    async function handleDelete() {
      setDisabled(true);
      await apiClientConnection.admin.seller.deleteSeller(sellerId, {
        onSuccess: () => {
          setDisabled(false);
          router.push("/admin/sellers");
        },
        onError: () => {
          setDisabled(false);
        },
      });

      if (props.onConfirm) props.onConfirm();
    }

    return (
      <AlertDialog
        title="Confirmar exclusão?"
        description="Essa ação não pode ser desfeita."
        confirmText="Confirmar"
        onConfirm={handleDelete}
      >
        <Button
          {...props}
          ref={ref}
          variant={variant}
          disabled={disabled}
          className={twMerge("rounded-full w-9 h-9", className)}
        >
          {children}
        </Button>
      </AlertDialog>
    );
  }
);

SellerDeleteButton.displayName = "Seller.DeleteButton";

export { SellerDeleteButton };
