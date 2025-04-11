"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { useCreateCategoryService } from "../services/use-create-category-service";
import { CategoryFormContent } from "./category-form-content";

const messages = config.messages.validation;

const createCategorySchema = z.object({
  name: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  image: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  active: z.boolean().default(true),
});

type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export function CreateCategoryForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createCategory, isPending } = useCreateCategoryService();

  function onSubmit(data: CreateCategorySchema) {
    createCategory({ payload: data });
  }

  return (
    <FormContext
      {...props}
      zodSchema={createCategorySchema}
      onSubmit={onSubmit}
    >
      <CategoryFormContent isLoading={isPending} />
    </FormContext>
  );
}
