import { CategoriesList } from "@/app/(public)/home/components/categories-list";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSelect } from "@/components/admin/form/form-select";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { FormTextArea } from "@/components/admin/form/form-textarea";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListActiveCategoriesService } from "@/services/public/use-list-active-categories-service";
import { EyeIcon, SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ConfigureFeaturedCategoriesSchema } from "./featured-categories-config-form";
import { FeaturedCategoriesVariantOption } from "./featured-categories-variant-option";
import { STYLE_VARIANTS } from "./style-variants";

type TopBarConfigFormContentProps = {
  form: UseFormReturn<ConfigureFeaturedCategoriesSchema>;
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function LayoutTopBarConfigFormContent({
  form,
  isLoading,
  additionalButton,
}: TopBarConfigFormContentProps) {
  const router = useRouter();

  const { categories, isPending } = useListActiveCategoriesService({
    page: 1,
    limit: 1,
  });

  if (isPending) {
    return <div>Carregando...</div>;
  }

  const category = categories[0];

  if (!category) {
    return <div>Nenhuma categoria encontrada.</div>;
  }

  const orderOptions = [
    { label: "Ordem alfabética (A-Z)", value: "name_ASC" },
    { label: "Ordem alfabética (Z-A)", value: "name_DESC" },
    { label: "Mais populares", value: "most_popular" },
    { label: "Menos populares", value: "least_popular" },
  ];

  return (
    <>
      <Card className="border-2 border-dashed bg-muted/40 shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pré-visualizar
            <EyeIcon size={18} className="inline-block ml-2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesList previewMode {...form.watch()} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full my-6">
        {/* Coluna esquerda: inputs */}
        <div className="flex flex-col gap-2">
          <FormInput
            label="Título da seção"
            name="title"
            disabled={isLoading}
            leftIcon={<TypeIcon size={18} />}
          />

          <FormTextArea
            label="Descrição"
            name="description"
            disabled={isLoading}
          />

          <FormSelect
            label="Modo de ordenação"
            name="orderBy"
            data={orderOptions}
            allowClear
            disabled={isLoading}
          />

          <FormInput
            label="Número máximo de categorias"
            name="maxItems"
            type="number"
            disabled={isLoading}
            leftIcon={<TypeIcon size={18} />}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormSwitch
              label={`Mostrar botão "Ver mais"`}
              name="showSeeAllButton"
              defaultChecked
              disabled={isLoading}
            />

            <FormSwitch
              label="Ativo"
              name="active"
              defaultChecked
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Coluna direita: variants em grid 2x2 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Modo de exibição
          </label>
          <div className="grid grid-cols-2 gap-4 w-full">
            {STYLE_VARIANTS.map((variant, index) => (
              <FeaturedCategoriesVariantOption
                key={variant.name}
                category={category}
                isSelected={index === 0}
                className="w-full"
                {...variant}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end w-full mt-4">
        {additionalButton && additionalButton}

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          <XIcon className="mr-2 h-4 w-4" />
          Cancelar
        </Button>

        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle color="secondary" />
          ) : (
            <SaveIcon className="mr-2 h-4 w-4" />
          )}
          Salvar
        </Button>
      </div>
    </>
  );
}
