import { FormContext } from "@/components/shared/form/form-context";
import { config } from "@/config";
import React from "react";
import { z } from "zod";
import { FeaturedCategoriesConfigFormContent } from "./featured-categories-config-form-content";
import { STYLE_VARIANTS, StyleVariant } from "./style-variants";

const messages = config.messages.validation;

const configureFeaturedCategoriesSchema = z.object({
  title: z
    .string()
    .nonempty({ message: messages.required_error })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
  subtitle: z
    .string()
    .max(200, { message: "O subtítulo deve ter no máximo 200 caracteres." })
    .optional(),
  orderBy: z.enum(["asc", "desc"], {
    errorMap: () => ({ message: "Seleção de ordenação inválida." }),
  }),
  styleVariant: z.enum(
    STYLE_VARIANTS.map((v) => v.variant) as [StyleVariant, ...StyleVariant[]],
    {
      errorMap: () => ({ message: "Seleção de variante inválida." }),
    }
  ),
  maxItems: z.coerce
    .number({ required_error: messages.required_error })
    .min(1, { message: "O número mínimo de itens é 1." })
    .max(20, { message: "O número máximo de itens é 20." }),
  showSeeMoreButton: z.boolean().optional(),
  active: z.boolean().optional(),
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
  // const { topBarConfig, isPending } = useGetLayoutTopBarConfigService();

  // const { updateTopBarConfig, isPending: isUpdating } =
  //   useUpdateLayoutTopBarConfigService();

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center w-full py-8">
  //       <LoaderCustom />
  //     </div>
  //   );
  // }

  // if (!topBarConfig) {
  //   return (
  //     <div className="flex flex-col items-center justify-center my-auto">
  //       Nenhuma configuração ativa encontrada para a barra superior.
  //     </div>
  //   );
  // }

  // function onSubmit(data: ConfigureFeaturedCategoriesSchema) {
  //   updateTopBarConfig({
  //     params: { layoutTopBarConfigId: topBarConfig!.layoutTopBarConfigId },
  //     payload: data,
  //   });
  // }

  return (
    <FormContext
      {...props}
      zodSchema={configureFeaturedCategoriesSchema}
      onSubmit={(data) => console.log(data)}
      useFormProps={{
        defaultValues: {
          title: "Categorias",
          subtitle: "Explore nossas categorias",
          orderBy: "asc",
          styleVariant: "square-row",
          maxItems: 6,
          showSeeMoreButton: true,
          active: true,
        },
      }}
    >
      {(form) => (
        <FeaturedCategoriesConfigFormContent
          form={form}
          isLoading={false}
          // isLoading={isPending || isUpdating}
        />
      )}
    </FormContext>
  );
}
