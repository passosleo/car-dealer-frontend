"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { BrandFormContent } from "./brand-form-content";
import { useCreateBrandService } from "@/services/private/brands/use-create-brand-service";

const messages = config.messages.validation;

const createBrandSchema = z.object({
  name: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  image: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  active: z.boolean().default(true),
});

type CreateBrandSchema = z.infer<typeof createBrandSchema>;

export function CreateBrandForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createBrand, isPending } = useCreateBrandService();

  function onSubmit(data: CreateBrandSchema) {
    createBrand({ payload: data });
  }

  return (
    <FormContext {...props} zodSchema={createBrandSchema} onSubmit={onSubmit}>
      <BrandFormContent isLoading={isPending} />
    </FormContext>
  );
}
