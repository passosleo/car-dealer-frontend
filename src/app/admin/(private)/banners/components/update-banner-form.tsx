"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetBannerByIdService } from "../services/use-get-banner-by-id-service";
import { useUpdateBannerService } from "../services/use-update-banner-service";
import { useDeleteBannerService } from "../services/use-delete-banner-service";
import { BannerFormContent } from "./banner-form-content";

const messages = config.messages.validation;

const updateBannerSchema = z.object({
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

type UpdateBannerSchema = z.infer<typeof updateBannerSchema>;

export function UpdateBannerForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { bannerId } = useParams<{ bannerId: string }>();

  const { banner, isPending: isGetBannerByIdPending } =
    useGetBannerByIdService(bannerId);

  const { updateBanner, isPending: isUpdateBannerPending } =
    useUpdateBannerService();

  const { deleteBanner, isPending: isDeleteBannerPending } =
    useDeleteBannerService();

  const isPending =
    isGetBannerByIdPending || isUpdateBannerPending || isDeleteBannerPending;

  function onSubmit(data: UpdateBannerSchema) {
    updateBanner({
      params: { bannerId },
      payload: data,
    });
  }

  function onDelete() {
    deleteBanner({
      params: { bannerId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateBannerSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          title: banner?.title || "",
          imageDesktop: banner?.imageDesktopUrl || "",
          imageMobile: banner?.imageMobileUrl || "",
          startAt: banner?.startAt || "",
          endAt: banner?.endAt || "",
          active: banner?.active,
        },
      }}
    >
      <BannerFormContent
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
    </FormContext>
  );
}
