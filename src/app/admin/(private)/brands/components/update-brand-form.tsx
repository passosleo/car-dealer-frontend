"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { BrandFormContent } from "./brand-form-content";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

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
  function onSubmit(data: UpdateBrandSchema) {
    console.log("d", data);
  }

  return (
    <FormContext {...props} zodSchema={updateBrandSchema} onSubmit={onSubmit}>
      <BrandFormContent
        isLoading={false}
        additionalButton={
          <AlertDialog
            title="Confirmar exclusão?"
            description="Essa ação não pode ser desfeita."
            confirmText="Confirmar"
            // onConfirm={onDelete}
          >
            <Button
              type="button"
              variant="outline"
              className="mt-auto w-full self-end"
              // disabled={isPending}
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
