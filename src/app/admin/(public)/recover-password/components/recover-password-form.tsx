"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { MailIcon, SendIcon } from "lucide-react";
import { FormContext } from "@/components/shared/form/form-context";
import { FormInput } from "@/components/admin/form/form-input";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useSendRecoverPasswordEmailService } from "@/services/private/session/use-send-recover-password-email-service";

const messages = config.messages.validation;

const recoverPasswordSchema = z.object({
  email: z
    .string({ required_error: messages.required_error })
    .email({ message: messages.email_error }),
});

type RecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>;

export function RecoverPasswordForm({
  onSent,
  ...props
}: Omit<
  React.ComponentProps<typeof FormContext>,
  "zodSchema" | "onSubmit" | "children"
> & {
  onSent?: () => void;
}) {
  const { sendRecoverPasswordEmail, isPending } =
    useSendRecoverPasswordEmailService();

  function onSubmit(data: RecoverPasswordSchema) {
    sendRecoverPasswordEmail(
      {
        payload: data,
      },
      {
        onSuccess: () => {
          if (onSent) onSent();
        },
        onError: () => {
          if (onSent) onSent();
        },
      }
    );
  }

  return (
    <FormContext
      {...props}
      zodSchema={recoverPasswordSchema}
      onSubmit={onSubmit}
    >
      <FormInput
        label="E-mail"
        name="email"
        disabled={isPending}
        autoFocus
        leftIcon={<MailIcon size={18} />}
        className="mb-4"
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <LoaderCircle color="secondary" /> : <SendIcon />}
        Enviar
      </Button>
    </FormContext>
  );
}
