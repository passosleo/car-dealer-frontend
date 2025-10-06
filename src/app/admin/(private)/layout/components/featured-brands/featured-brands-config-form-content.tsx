import { FeaturedBrandsSection } from "@/app/(public)/home/components/featured-brands-section";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSelect } from "@/components/admin/form/form-select";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { FormTextArea } from "@/components/admin/form/form-textarea";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { LoaderCustom } from "@/components/admin/loader/loader-custom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ORDER_OPTIONS } from "@/constants/filters";
import { STYLE_VARIANTS } from "@/constants/style-variants";
import { useListActiveBrandsService } from "@/services/public/use-list-active-brands-service";
import {
  ChevronRightIcon,
  EyeIcon,
  SaveIcon,
  ShieldEllipsisIcon,
  TypeIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ConfigureFeaturedBrandsSchema } from "./featured-brands-config-form";
import { FeaturedBrandsVariantOption } from "./featured-brands-variant-option";

type FeaturedBrandsConfigFormContentProps = {
  form: UseFormReturn<ConfigureFeaturedBrandsSchema>;
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function FeaturedBrandsConfigFormContent({
  form,
  isLoading,
  additionalButton,
}: FeaturedBrandsConfigFormContentProps) {
  const router = useRouter();

  const { brands, isPending } = useListActiveBrandsService({
    page: 1,
    limit: 1,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        <LoaderCustom />
      </div>
    );
  }

  const brand = brands[0];

  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center my-auto">
        Nenhuma configuração ativa encontrada para a barra superior.
      </div>
    );
  }

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
          <FeaturedBrandsSection previewMode {...form.watch()} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full my-6">
        <div className="flex flex-col gap-2">
          <FormInput
            label="Título da seção"
            name="title"
            disabled={isLoading}
            leftIcon={<TypeIcon size={18} />}
          />

          <FormTextArea
            label="Subtítulo da seção"
            name="subtitle"
            disabled={isLoading}
          />

          <FormSelect
            label="Modo de ordenação"
            name="orderBy"
            data={ORDER_OPTIONS}
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

          <div className="flex gap-4 flex-wrap md:flex-nowrap items-center">
            <div className="flex w-full gap-20">
              <FormSwitch
                label={`Mostrar botão "Ver mais"`}
                name="showSeeMoreButton"
                defaultChecked
                disabled={isLoading}
              />

              <FormSwitch
                label="Mostrar nome da marca"
                name="showName"
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

            <Link href="/admin/categories" passHref>
              <Button type="button">
                <ShieldEllipsisIcon size={18} className="mr-2" />
                Gerenciar marcas
                <ChevronRightIcon size={16} className="ml-1 opacity-70" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Modo de exibição
          </label>
          <div className="grid grid-cols-2 gap-4 w-full">
            {STYLE_VARIANTS.map((variant) => (
              <FeaturedBrandsVariantOption
                key={variant.name}
                brand={brand}
                showName={form.watch("showName")}
                isSelected={form.watch("styleVariant") === variant.variant}
                onClick={() => form.setValue("styleVariant", variant.variant)}
                {...variant}
              />
            ))}
          </div>
        </div>
      </div>

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
