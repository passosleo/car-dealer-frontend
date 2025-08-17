"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { ProfileFormContent } from "./profile-form-content";
import { useGetProfileByIdService } from "@/services/private/profiles/use-get-profile-by-id-service";
import { useUpdateProfileService } from "@/services/private/profiles/use-update-profile-service";
import { useDeleteProfileService } from "@/services/private/profiles/use-delete-profile-service";

const messages = config.messages.validation;

const updateProfileSchema = z.object({
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

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export function UpdateProfileForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { profileId } = useParams<{ profileId: string }>();

  const { profile, isPending: isGetProfileByIdPending } =
    useGetProfileByIdService(profileId);

  const { updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfileService();

  const { deleteProfile, isPending: isDeleteProfilePending } =
    useDeleteProfileService();

  const isPending =
    isGetProfileByIdPending || isUpdateProfilePending || isDeleteProfilePending;

  function onSubmit(data: UpdateProfileSchema) {
    updateProfile({
      params: { profileId },
      payload: data,
    });
  }

  function onDelete() {
    deleteProfile({
      params: { profileId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateProfileSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          name: profile?.name || "",
          roles: (profile?.roles || []).map((role) => ({
            roleId: role.roleId,
          })),
        },
      }}
    >
      {(form) => (
        <ProfileFormContent
          form={form}
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
      )}
    </FormContext>
  );
}
