"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { MailIcon, PhoneIcon, SaveIcon, XIcon } from "lucide-react";
import { FormContext } from "@/components/admin/form/form-context";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { FormInput } from "@/components/admin/form/form-input";
import { FormTextArea } from "@/components/admin/form/form-textarea";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { useCreateSellerService } from "../services/use-create-seller-service";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";

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

export function SellerForm(
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
      <div className="flex flex-row gap-8 w-full">
        <FormImagePicker label="Foto" name="image" disabled={isPending} />

        <div className="flex flex-col gap-2 w-full flex-wrap">
          <div className="flex gap-4 w-full">
            <FormInput label="Nome" name="firstName" disabled={isPending} />
            <FormInput label="Sobrenome" name="lastName" disabled={isPending} />
          </div>

          <div className="flex gap-4 w-full">
            <FormInput
              label="E-mail"
              name="email"
              disabled={isPending}
              leftIcon={<MailIcon size={18} />}
            />

            <FormInput
              label="Telefone"
              name="phone"
              disabled={isPending}
              leftIcon={<PhoneIcon size={18} />}
            />
          </div>

          <FormTextArea
            label="Mensagem personalizada"
            name="customMessage"
            disabled={isPending}
          />

          <FormSwitch
            label="Ativo"
            name="active"
            defaultChecked
            disabled={isPending}
          />

          <div className="flex flex-row gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              className="mt-auto w-full self-end"
              disabled={isPending}
            >
              <XIcon />
              Cancelar
            </Button>

            <Button
              type="submit"
              className="mt-auto w-full self-end"
              disabled={isPending}
            >
              {isPending ? <LoaderCircle color="secondary" /> : <SaveIcon />}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </FormContext>
  );
}
