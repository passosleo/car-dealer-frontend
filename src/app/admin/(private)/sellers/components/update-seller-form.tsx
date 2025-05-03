"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { SellerFormContent } from "./seller-form-content";
import { useParams } from "next/navigation";
import { useGetSellerByIdService } from "../services/use-get-seller-by-id-service";
import { useUpdateSellerService } from "../services/use-update-seller-service";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useDeleteSellerService } from "../services/use-delete-seller-service";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";

const messages = config.messages.validation;

const updateSellerSchema = z.object({
  firstName: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  lastName: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  email: z
    .string()
    .email({ message: messages.email_error })
    .or(z.literal(""))
    .nullable(),
  phone: z.string().nullable(),
  image: z.string().nullable(),
  customMessage: z.string().nullable(),
  active: z.boolean().default(true),
});

type UpdateSellerSchema = z.infer<typeof updateSellerSchema>;

export function UpdateSellerForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { sellerId } = useParams<{ sellerId: string }>();

  const { seller, isPending: isGetSellerByIdPending } =
    useGetSellerByIdService(sellerId);

  const { updateSeller, isPending: isUpdateSellerPending } =
    useUpdateSellerService();

  const { deleteSeller, isPending: isDeleteSellerPending } =
    useDeleteSellerService();

  const isPending =
    isGetSellerByIdPending || isUpdateSellerPending || isDeleteSellerPending;

  function onSubmit(data: UpdateSellerSchema) {
    updateSeller({
      params: { sellerId },
      payload: data,
    });
  }

  function onDelete() {
    deleteSeller({
      params: { sellerId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateSellerSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          firstName: seller?.firstName || "",
          lastName: seller?.lastName || "",
          email: seller?.email || "",
          phone: seller?.phone || "",
          image: seller?.imageUrl || "",
          customMessage: seller?.customMessage || "",
          active: seller?.active,
        },
      }}
    >
      <SellerFormContent
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
