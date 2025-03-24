"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { SellerFormContent } from "./seller-form-content";
import { useParams } from "next/navigation";
import { useGetSellerByIdService } from "../services/use-get-seller-by-id-service";
import { useUpdateSellerService } from "../services/use-update-seller-service";

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
  phone: z.string({ required_error: messages.required_error }).nullable(),
  image: z.string({ required_error: messages.required_error }).nullable(),
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

  function onSubmit(data: UpdateSellerSchema) {
    updateSeller({
      params: { sellerId },
      payload: data,
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
        isPending={isGetSellerByIdPending || isUpdateSellerPending}
      />
    </FormContext>
  );
}
