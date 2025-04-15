import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { forwardRef } from "react";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Trash2Icon } from "lucide-react";
import { useDeleteBannerService } from "../services/use-delete-banner-service";

const DeleteBannerButton = forwardRef<HTMLButtonElement, { bannerId: string }>(
  ({ bannerId }, ref) => {
    const { deleteBanner, isPending } = useDeleteBannerService();

    function onClick() {
      deleteBanner({
        params: { bannerId },
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
          className="h-8 w-8 flex items-center justify-center hover:text-destructive text-primary rounded-md transition-all absolute bottom-4 right-4"
          disabled={isPending}
        >
          {isPending ? <LoaderCircle size={18} /> : <Trash2Icon size={18} />}
        </button>
      </AlertDialog>
    );
  }
);

DeleteBannerButton.displayName = "DeleteBannerButton";

export { DeleteBannerButton };
