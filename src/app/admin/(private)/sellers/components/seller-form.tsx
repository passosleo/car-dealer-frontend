"use client";

import { Form } from "@/components/admin/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { MailIcon, PhoneIcon, SaveIcon, XIcon } from "lucide-react";

const messages = config.messages.validation;

const SellerForm = React.forwardRef<
  HTMLDivElement,
  Omit<
    React.ComponentProps<typeof Form.Context>,
    "zodSchema" | "onSubmit" | "children"
  >
>((props, ref) => {
  return (
    <div ref={ref}>
      <Form.Context
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
          <Form.ImagePicker label="Foto" name="photo" />

          <div className="flex flex-col gap-2 w-full flex-wrap">
            <div className="flex gap-4 w-full">
              <Form.Input label="Nome" name="firstName" />
              <Form.Input label="Sobrenome" name="lastName" />
            </div>

            <div className="flex gap-4 w-full">
              <Form.Input
                label="E-mail"
                name="email"
                leftIcon={<MailIcon size={18} />}
              />

              <Form.Input
                label="Telefone"
                name="phone"
                leftIcon={<PhoneIcon size={18} />}
              />
            </div>

            <Form.TextArea
              label="Mensagem personalizada"
              name="customMessage"
            />

            <Form.Switch label="Ativo" name="active" defaultChecked />

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
      </Form.Context>
    </div>
  );
});
SellerForm.displayName = "SellerForm";

export { SellerForm };
