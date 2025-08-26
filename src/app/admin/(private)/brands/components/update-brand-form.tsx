"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/shared/form/form-context";
import { BrandFormContent } from "./brand-form-content";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetBrandByIdService } from "@/services/private/brands/use-get-brand-by-id-service";
import { useUpdateBrandService } from "@/services/private/brands/use-update-brand-service";
import { useDeleteBrandService } from "@/services/private/brands/use-delete-brand-service";

const messages = config.messages.validation;

const updateBrandSchema = z.object({
  name: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  image: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  active: z.boolean().default(true),
});

type UpdateBrandSchema = z.infer<typeof updateBrandSchema>;

export function UpdateBrandForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { brandId } = useParams<{ brandId: string }>();

  const { brand, isPending: isGetBrandByIdPending } =
    useGetBrandByIdService(brandId);

  const { updateBrand, isPending: isUpdateBrandPending } =
    useUpdateBrandService();

  const { deleteBrand, isPending: isDeleteBrandPending } =
    useDeleteBrandService();

  const isPending =
    isGetBrandByIdPending || isUpdateBrandPending || isDeleteBrandPending;

  function onSubmit(data: UpdateBrandSchema) {
    updateBrand({
      params: { brandId },
      payload: data,
    });
  }

  function onDelete() {
    deleteBrand({
      params: { brandId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateBrandSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          name: brand?.name || "",
          image: brand?.imageUrl || "",
          active: brand?.active,
        },
      }}
    >
      <BrandFormContent
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
