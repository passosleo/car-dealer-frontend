"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/shared/form/form-context";
import { UserFormContent } from "./user-form-content";
import { useCreateUserService } from "@/services/private/users/use-create-user-service";

const messages = config.messages.validation;

const createUserSchema = z.object({
  firstName: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  lastName: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  email: z.string().email({ message: messages.email_error }),
  active: z.boolean().default(true),
  profileId: z.string().uuid({
    message: messages.required_error,
  }),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export function CreateUserForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createUser, isPending } = useCreateUserService();

  function onSubmit(data: CreateUserSchema) {
    createUser({ payload: data });
  }

  return (
    <FormContext {...props} zodSchema={createUserSchema} onSubmit={onSubmit}>
      {(form) => <UserFormContent form={form} isLoading={isPending} />}
    </FormContext>
  );
}
