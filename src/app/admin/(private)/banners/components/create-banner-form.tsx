"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { useCreateBannerService } from "../services/use-create-banner-service";
import { BannerFormContent } from "./banner-form-content";

const messages = config.messages.validation;

const createBannerSchema = z.object({
  title: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  imageDesktop: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  imageMobile: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  startAt: z.string({ required_error: messages.required_error }).nullable(),
  endAt: z.string({ required_error: messages.required_error }).nullable(),
  active: z.boolean().default(true),
});

type CreateBannerSchema = z.infer<typeof createBannerSchema>;

export function CreateBannerForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createBanner, isPending } = useCreateBannerService();

  function onSubmit(data: CreateBannerSchema) {
    createBanner({ payload: data });
  }

  return (
    <FormContext {...props} zodSchema={createBannerSchema} onSubmit={onSubmit}>
      <BannerFormContent isLoading={isPending} />
    </FormContext>
  );
}
