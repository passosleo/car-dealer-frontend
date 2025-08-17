import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { forwardRef } from "react";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Trash2Icon } from "lucide-react";
import { useDeleteProfileService } from "@/services/private/profiles/use-delete-profile-service";

const DeleteProfileButton = forwardRef<
  HTMLButtonElement,
  { profileId: string }
>(({ profileId }, ref) => {
  const { deleteProfile, isPending } = useDeleteProfileService();

  function onClick() {
    deleteProfile({
      params: { profileId },
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

DeleteProfileButton.displayName = "DeleteProfileButton";

export { DeleteProfileButton };
