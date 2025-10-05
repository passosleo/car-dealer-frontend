import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { FormContext } from "@/components/shared/form/form-context";
import { config } from "@/config";
import { useGetLayoutTopBarConfigService } from "@/services/private/layout/top-bar/use-get-layout-top-bar-config-service";
import { useUpdateLayoutTopBarConfigService } from "@/services/private/layout/top-bar/use-update-layout-top-bar-config-service";
import React from "react";
import { z } from "zod";
import { LayoutTopBarConfigFormContent } from "./featured-categories-config-form-content";

const messages = config.messages.validation;

const configureFeaturedCategoriesSchema = z.object({
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
        link: z.union([
          z.literal(""),
          z.string().url({ message: messages.url_error }),
        ]),
        active: z.boolean().default(true),
      })
    )
    .min(1, { message: "Adicione ao menos uma mensagem." }),
});

export type ConfigureFeaturedCategoriesSchema = z.infer<
  typeof configureFeaturedCategoriesSchema
>;

export function FeaturedCategoriesConfigForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { topBarConfig, isPending } = useGetLayoutTopBarConfigService();

  const { updateTopBarConfig, isPending: isUpdating } =
    useUpdateLayoutTopBarConfigService();

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

  function onSubmit(data: ConfigureFeaturedCategoriesSchema) {
    updateTopBarConfig({
      params: { layoutTopBarConfigId: topBarConfig!.layoutTopBarConfigId },
      payload: data,
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={configureFeaturedCategoriesSchema}
      onSubmit={onSubmit}
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
              link: msg.link ?? undefined,
              active: msg.active,
            })
          ) ?? [{ message: "", link: undefined, active: true }],
        },
        ...props.useFormProps,
      }}
    >
      {(form) => (
        <LayoutTopBarConfigFormContent
          form={form}
          isLoading={isPending || isUpdating}
        />
      )}
    </FormContext>
  );
}
