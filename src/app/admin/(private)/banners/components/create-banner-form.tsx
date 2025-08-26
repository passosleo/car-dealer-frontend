"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/shared/form/form-context";
import { BannerFormContent } from "./banner-form-content";
import { useCreateBannerService } from "@/services/private/banners/use-create-banner-service";

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
  startAt: z
    .date({ required_error: messages.required_error })
    .or(z.string())
    .nullable()
    .default(null),
  endAt: z
    .date({ required_error: messages.required_error })
    .or(z.string())
    .nullable()
    .default(null),
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
