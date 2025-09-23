import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { FormContext } from "@/components/shared/form/form-context";
import { config } from "@/config";
import { LayoutInfoBarConfig } from "@/types/layout-component";
import React from "react";
import { z } from "zod";
import { LayoutInfoBarConfigFormContent } from "./layout-info-bar-config-form-content";

const messages = config.messages.validation;

const configureInfoBarSchema = z.object({
  items: z
    .array(
      z.object({
        icon: z.string().nullable(),
        title: z.string().nullable(),
        description: z.string().nullable(),
        link: z
          .union([
            z.literal(""),
            z.string().url({ message: messages.url_error }),
          ])
          .nullable(),
      })
    )
    .max(3, { message: "No máximo 3 itens são permitidos." }),
  hideOnMobile: z.boolean().optional(),
  hideOnDesktop: z.boolean().optional(),
});

export type ConfigureInfoBarSchema = z.infer<typeof configureInfoBarSchema>;

export function LayoutInfoBarConfigForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const isPending = false;
  const isUpdating = false;
  const topBarConfig: LayoutInfoBarConfig = {
    layoutInfoBarConfigId: "1",
    layoutComponentId: "1",
    items: [
      {
        icon: "crown",
        title: "Campeão de vendas",
        description: "Somos o maior portal de carros do Brasil.",
        link: "https://example.com",
      },
      {
        icon: "instagram",
        title: "Conheça nosso Instagram",
        description: "@example",
        link: "https://example.com/contact",
      },
      {
        icon: "key-square",
        title: "Saia com seu carro novo hoje",
        description: "Financiamento na hora",
        link: "https://example.com/financing",
      },
    ],
    hideOnMobile: false,
    hideOnDesktop: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  // const { topBarConfig, isPending } = useGetLayoutTopBarConfigService();

  // const { updateTopBarConfig, isPending: isUpdating } =
  //   useUpdateLayoutTopBarConfigService();

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

  function onSubmit(data: ConfigureInfoBarSchema) {
    console.log("submit", data);
    // updateTopBarConfig({
    //   params: { layoutTopBarConfigId: topBarConfig!.layoutTopBarConfigId },
    //   payload: data,
    // });
  }

  return (
    <FormContext
      {...props}
      zodSchema={configureInfoBarSchema}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          items: (topBarConfig?.items ?? []).map((item) => ({
            icon: item.icon ?? "",
            title: item.title ?? "",
            description: item.description ?? "",
            link: item.link ?? "",
          })),
          hideOnMobile: topBarConfig?.hideOnMobile ?? false,
          hideOnDesktop: topBarConfig?.hideOnDesktop ?? false,
        },
        ...props.useFormProps,
      }}
    >
      {(form) => (
        <LayoutInfoBarConfigFormContent
          form={form}
          isLoading={isPending || isUpdating}
        />
      )}
    </FormContext>
  );
}
