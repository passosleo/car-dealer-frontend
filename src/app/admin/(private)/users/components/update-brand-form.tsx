"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/shared/form/form-context";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { UserFormContent } from "./user-form-content";
import { useGetUserByIdService } from "@/services/private/users/use-get-user-by-id-service";
import { useUpdateUserService } from "@/services/private/users/use-update-user-service";
import { useDeleteUserService } from "@/services/private/users/use-delete-user-service";

const messages = config.messages.validation;

const updateUserSchema = z.object({
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

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export function UpdateUserForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { userId } = useParams<{ userId: string }>();

  const { user, isPending: isGetUserByIdPending } =
    useGetUserByIdService(userId);

  const { updateUser, isPending: isUpdateUserPending } = useUpdateUserService();

  const { deleteUser, isPending: isDeleteUserPending } = useDeleteUserService();

  const isPending =
    isGetUserByIdPending || isUpdateUserPending || isDeleteUserPending;

  function onSubmit(data: UpdateUserSchema) {
    updateUser({
      params: { userId },
      payload: data,
    });
  }

  function onDelete() {
    deleteUser({
      params: { userId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateUserSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          profileId: user?.profile.profileId || "",
          active: user?.active,
        },
      }}
    >
      {(form) => (
        <UserFormContent
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
