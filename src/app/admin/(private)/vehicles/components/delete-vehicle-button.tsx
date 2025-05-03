import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { forwardRef } from "react";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Trash2Icon } from "lucide-react";
import { useDeleteVehicleService } from "../services/use-delete-vehicle-service";

const DeleteVehicleButton = forwardRef<
  HTMLButtonElement,
  { vehicleId: string }
>(({ vehicleId }, ref) => {
  const { deleteVehicle, isPending } = useDeleteVehicleService();

  function onClick() {
    deleteVehicle({
      params: { vehicleId },
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
});

DeleteVehicleButton.displayName = "DeleteVehicleButton";

export { DeleteVehicleButton };
