import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { forwardRef } from "react";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useDeleteSellerService } from "@/services/private/sellers/use-delete-seller-service";

const DeleteSellerButton = forwardRef<HTMLButtonElement, { sellerId: string }>(
  ({ sellerId }, ref) => {
    const { deleteSeller, isPending } = useDeleteSellerService();

    function onClick() {
      deleteSeller({
        params: { sellerId },
      });
    }

    return (
      <AlertDialog
        title="Confirmar exclusão?"
        description="Essa ação não pode ser desfeita."
        confirmText="Confirmar"
        onConfirm={onClick}
      >
        <button
          ref={ref}
          className="h-8 w-8 flex items-center justify-center hover:text-destructive text-primary rounded-md transition-all absolute top-4 right-4"
          disabled={isPending}
        >
          {isPending ? <LoaderCircle size={18} /> : <Trash2Icon size={18} />}
        </button>
      </AlertDialog>
    );
  }
);

DeleteSellerButton.displayName = "DeleteSellerButton";

export { DeleteSellerButton };
