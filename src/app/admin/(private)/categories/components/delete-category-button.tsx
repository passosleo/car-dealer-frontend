import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { forwardRef } from "react";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Trash2Icon } from "lucide-react";
import { useDeleteCategoryService } from "@/services/private/categories/use-delete-category-service";

const DeleteCategoryButton = forwardRef<
  HTMLButtonElement,
  { categoryId: string }
>(({ categoryId }, ref) => {
  const { deleteCategory, isPending } = useDeleteCategoryService();

  function onClick() {
    deleteCategory({
      params: { categoryId },
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

DeleteCategoryButton.displayName = "DeleteCategoryButton";

export { DeleteCategoryButton };
