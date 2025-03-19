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

const messages = config.messages.validation;

export function SellerForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  return (
    <FormContext
      {...props}
      zodSchema={z.object({
        firstName: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        lastName: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        email: z
          .string({ required_error: messages.required_error })
          .email({ message: messages.email_error }),
        phone: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        photo: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.required_error }),
        customMessage: z
          .string()
          .nonempty({ message: messages.nonempty_error })
          .optional(),
        active: z.boolean().default(true),
      })}
      onSubmit={(data) => console.log(data)}
    >
      <div className="flex flex-row gap-8 w-full">
        <FormImagePicker label="Foto" name="photo" />

        <div className="flex flex-col gap-2 w-full flex-wrap">
          <div className="flex gap-4 w-full">
            <FormInput label="Nome" name="firstName" />
            <FormInput label="Sobrenome" name="lastName" />
          </div>

          <div className="flex gap-4 w-full">
            <FormInput
              label="E-mail"
              name="email"
              leftIcon={<MailIcon size={18} />}
            />

            <FormInput
              label="Telefone"
              name="phone"
              leftIcon={<PhoneIcon size={18} />}
            />
          </div>

          <FormTextArea label="Mensagem personalizada" name="customMessage" />

          <FormSwitch label="Ativo" name="active" defaultChecked />

          <div className="flex flex-row gap-4 w-full">
            <Button variant="outline" className="mt-auto w-full self-end">
              <XIcon />
              Cancelar
            </Button>

            <Button type="submit" className="mt-auto w-full self-end">
              <SaveIcon />
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </FormContext>
  );
}
