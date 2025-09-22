import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { FormContext } from "@/components/shared/form/form-context";
import { config } from "@/config";
import { useGetActiveLayoutComponentTopBarConfigService } from "@/services/private/layout/use-get-active-layout-component-top-bar-config-service";
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
  active: z.boolean().default(true),
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

export function TopBarConfigForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { topBarConfig, isPending } =
    useGetActiveLayoutComponentTopBarConfigService();

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        <LoaderCustom />
      </div>
    );
  }

  if (!topBarConfig) {
    return (
      <div className="flex flex-col items-center justify-center my-auto">
        Nenhuma configuração ativa encontrada para a barra superior.
      </div>
    );
  }

  return (
    <FormContext
      {...props}
      zodSchema={configureTopBarSchema}
      onSubmit={(data) => console.log(data)}
      useFormProps={{
        defaultValues: {
          maxItems: topBarConfig?.maxItems ?? 1,
          loop: topBarConfig?.loop ?? true,
          delay: topBarConfig?.delay ?? 3000,
          direction: topBarConfig?.direction ?? "rtl",
          jump: topBarConfig?.jump ?? false,
          hideOnMobile: topBarConfig?.hideOnMobile ?? false,
          hideOnDesktop: topBarConfig?.hideOnDesktop ?? false,
          layoutTopBarMessages: topBarConfig?.layoutTopBarMessages.map(
            (msg) => ({
              message: msg.message,
              link: msg.link ?? "",
              active: msg.active,
            })
          ) ?? [{ message: "", link: "", active: true }],
        },
        ...props.useFormProps,
      }}
    >
      {(form) => <TopBarConfigFormContent form={form} isLoading={isPending} />}
    </FormContext>
  );
}
