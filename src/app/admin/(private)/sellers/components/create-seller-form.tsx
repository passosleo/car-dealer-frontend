"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { useCreateSellerService } from "../services/use-create-seller-service";
import { SellerFormContent } from "./seller-form-content";

const messages = config.messages.validation;

const createSellerSchema = z.object({
  firstName: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  lastName: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  email: z
    .string()
    .email({ message: messages.email_error })
    .optional()
    .or(z.literal("")),
  phone: z.string({ required_error: messages.required_error }).optional(),
  image: z.string({ required_error: messages.required_error }).optional(),
  customMessage: z.string().optional(),
  active: z.boolean().default(true),
});

type CreateSellerSchema = z.infer<typeof createSellerSchema>;

export function CreateSellerForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createSeller, isPending } = useCreateSellerService();

  function onSubmit(data: CreateSellerSchema) {
    createSeller({ payload: data });
  }

  return (
    <FormContext {...props} zodSchema={createSellerSchema} onSubmit={onSubmit}>
      <SellerFormContent isPending={isPending} />
    </FormContext>
  );
}
