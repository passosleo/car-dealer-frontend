"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { ProfileFormContent } from "./profile-form-content";
import { useListRolesService } from "../../roles/services/use-list-roles-service";

const messages = config.messages.validation;

const createProfileSchema = z.object({
  name: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  roles: z
    .array(
      z.object({
        roleId: z.string().nonempty({ message: messages.nonempty_error }),
      })
    )
    .refine((data) => data.length > 0, {
      message: "Selecione pelo menos um tipo de permissão",
    }),
});

type CreateProfileSchema = z.infer<typeof createProfileSchema>;

export function CreateProfileForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { roles } = useListRolesService();

  function onSubmit(data: CreateProfileSchema) {
    console.log(" onSubmit ~ data", data);
  }

  return (
    <FormContext {...props} zodSchema={createProfileSchema} onSubmit={onSubmit}>
      {(form) => (
        <ProfileFormContent form={form} roles={roles} isLoading={false} />
      )}
    </FormContext>
  );
}
