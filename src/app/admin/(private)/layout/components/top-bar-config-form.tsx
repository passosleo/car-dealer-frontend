import { FormContext } from "@/components/shared/form/form-context";
import { config } from "@/config";
import React from "react";
import { z } from "zod";
import { TopBarConfigFormContent } from "./top-bar-config-form-content";

const messages = config.messages.validation;

const configureTopBarSchema = z.object({
  maxItems: z.coerce
    .number({ required_error: messages.required_error })
    .min(1, { message: "O número mínimo de itens é 1." })
    .max(10, { message: "O número máximo de itens é 10." }),
  loop: z.boolean().default(true),
  delay: z.coerce
    .number({ required_error: messages.required_error })
    .min(1000, { message: "O delay mínimo é 1000ms." }),
  direction: z.enum(["ltr", "rtl"]).default("ltr"),
  jump: z.boolean().default(false),
  hideOnMobile: z.boolean().default(false),
  hideOnDesktop: z.boolean().default(false),
  layoutTopBarMessages: z
    .array(
      z.object({
        message: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        link: z
          .string({ required_error: messages.required_error })
          .url({ message: messages.url_error })
          .optional(),
        active: z.boolean().default(true),
      })
    )
    .min(1, { message: "Adicione ao menos uma mensagem." }),
});

export type ConfigureTopBarSchema = z.infer<typeof configureTopBarSchema>;

type TopBarConfigFormProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function TopBarConfigForm({
  isLoading,
  additionalButton,
}: TopBarConfigFormProps) {
  return (
    <FormContext
      // {...props}
      zodSchema={configureTopBarSchema}
      onSubmit={(data) => console.log(data)}
      useFormProps={{
        defaultValues: {
          layoutTopBarMessages: [{ message: "", link: "", active: true }],
        },
      }}
    >
      {(form) => (
        <TopBarConfigFormContent
          form={form}
          isLoading={isLoading}
          additionalButton={additionalButton}
        />
      )}
    </FormContext>
  );
}
