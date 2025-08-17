"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { CategoryFormContent } from "./category-form-content";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetCategoryByIdService } from "@/services/private/categories/use-get-category-by-id-service";
import { useUpdateCategoryService } from "@/services/private/categories/use-update-category-service";
import { useDeleteCategoryService } from "@/services/private/categories/use-delete-category-service";

const messages = config.messages.validation;

const updateCategorySchema = z.object({
  name: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  image: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  active: z.boolean().default(true),
});

type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;

export function UpdateCategoryForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { category, isPending: isGetCategoryByIdPending } =
    useGetCategoryByIdService(categoryId);

  const { updateCategory, isPending: isUpdateCategoryPending } =
    useUpdateCategoryService();

  const { deleteCategory, isPending: isDeleteCategoryPending } =
    useDeleteCategoryService();

  const isPending =
    isGetCategoryByIdPending ||
    isUpdateCategoryPending ||
    isDeleteCategoryPending;

  function onSubmit(data: UpdateCategorySchema) {
    updateCategory({
      params: { categoryId },
      payload: data,
    });
  }

  function onDelete() {
    deleteCategory({
      params: { categoryId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateCategorySchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          name: category?.name || "",
          image: category?.imageUrl || "",
          active: category?.active,
        },
      }}
    >
      <CategoryFormContent
        isLoading={isPending}
        additionalButton={
          <AlertDialog
            title="Confirmar exclusão?"
            description="Essa ação não pode ser desfeita."
            confirmText="Confirmar"
            onConfirm={onDelete}
          >
            <Button
              type="button"
              variant="outline"
              className="mt-auto w-full self-end"
              disabled={isPending}
            >
              <Trash2Icon />
              Excluir
            </Button>
          </AlertDialog>
        }
      />
    </FormContext>
  );
}
