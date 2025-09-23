import { InfoBar } from "@/app/(public)/home/components/info-bar";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSelect } from "@/components/admin/form/form-select";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, LinkIcon, SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { infoBarIcons } from "./info-bar-icons";
import { ConfigureInfoBarSchema } from "./layout-info-bar-config-form";

type InfoBarConfigFormContentProps = {
  form: UseFormReturn<ConfigureInfoBarSchema>;
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function LayoutInfoBarConfigFormContent({
  form,
  isLoading,
  additionalButton,
}: InfoBarConfigFormContentProps) {
  const router = useRouter();

  const { fields: itemsFields } = useFieldArray<ConfigureInfoBarSchema>({
    name: "items",
    control: form.control,
  });

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
          <InfoBar previewMode {...form.watch()} />
        </CardContent>
      </Card>

      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {itemsFields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2">
              <FormSelect
                label={`Ícone ${index + 1}`}
                name={`items.${index}.icon`}
                data={infoBarIcons.map(({ label, value, icon: Icon }) => ({
                  label: (
                    <>
                      <Icon size={16} className="inline-block mr-2" />
                      {label}
                    </>
                  ),
                  value,
                }))}
                allowClear
                disabled={isLoading}
              />

              <FormInput
                label={`Título ${index + 1}`}
                name={`items.${index}.title`}
                disabled={isLoading}
                leftIcon={<TypeIcon size={18} />}
              />

              <FormInput
                label={`Descrição ${index + 1}`}
                name={`items.${index}.description`}
                disabled={isLoading}
                leftIcon={<TypeIcon size={18} />}
              />

              <FormInput
                label={`Link ${index + 1}`}
                name={`items.${index}.link`}
                disabled={isLoading}
                leftIcon={<LinkIcon size={18} />}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-6">
          <FormSwitch
            label="Não mostrar no mobile"
            name="hideOnMobile"
            disabled={isLoading}
          />
          <FormSwitch
            label="Não mostrar no desktop"
            name="hideOnDesktop"
            disabled={isLoading}
          />
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

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle color="secondary" />
            ) : (
              <SaveIcon className="mr-2 h-4 w-4" />
            )}
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}
