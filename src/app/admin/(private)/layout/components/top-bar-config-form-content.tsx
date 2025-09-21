import { FormInput } from "@/components/admin/form/form-input";
import { FormSelect } from "@/components/admin/form/form-select";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { TextSubheading } from "@/components/admin/text/text-subheading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopBar } from "@/layout/public/topbar";
import {
  EyeIcon,
  PlusCircleIcon,
  SaveIcon,
  Trash2Icon,
  TypeIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ConfigureTopBarSchema } from "./top-bar-config-form";

type TopBarConfigFormContentProps = {
  form: UseFormReturn<ConfigureTopBarSchema>;
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function TopBarConfigFormContent({
  form,
  isLoading,
  additionalButton,
}: TopBarConfigFormContentProps) {
  const router = useRouter();

  const {
    fields: topBarMessagesFields,
    append: appendTopBarMessage,
    remove: removeTopBarMessage,
  } = useFieldArray<ConfigureTopBarSchema>({
    name: "layoutTopBarMessages",
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
          <TopBar isEnabled={true} />
        </CardContent>
      </Card>

      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <div className="flex flex-col md:col-span-2 gap-2">
            <FormInput
              label="Número máximo de mensagens"
              name="maxItems"
              type="number"
              disabled={isLoading}
              leftIcon={<TypeIcon size={18} />}
            />

            <FormInput
              label="Tempo de exibição de cada mensagem (ms)"
              name="delay"
              type="number"
              disabled={isLoading}
              leftIcon={<TypeIcon size={18} />}
            />

            <FormSelect
              label="Direção das mensagens"
              name="direction"
              data={[
                { label: "Esquerda para direita", value: "ltr" },
                { label: "Direita para esquerda", value: "rtl" },
              ]}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-8 md:col-span-1">
            <FormSwitch
              label="Repetir infinitamente"
              name="loop"
              disabled={isLoading}
            />
            <FormSwitch
              label="Pular animação de transição"
              name="jump"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-8 md:col-span-1">
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
        </div>

        <div className="w-full border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <TextSubheading className="text-muted-foreground">
              Mensagens
            </TextSubheading>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                appendTopBarMessage({
                  message: "",
                  link: "",
                  active: true,
                })
              }
              disabled={isLoading}
            >
              <PlusCircleIcon />
              Adicionar Mensagem
            </Button>
          </div>
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-2">
            {topBarMessagesFields.map((field, index) => (
              <Card key={field.id} className="p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FormInput
                    label={`Mensagem ${index + 1}`}
                    name={`layoutTopBarMessages.${index}.message`}
                    type="text"
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeTopBarMessage(index)}
                    className="h-8 w-8 flex items-center justify-center text-destructive rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:text-primary disabled:hover:text-primary"
                    disabled={index === 0 || isLoading}
                  >
                    <Trash2Icon size={20} />
                  </button>
                </div>

                <FormInput
                  label={`Link ${index + 1}`}
                  name={`layoutTopBarMessages.${index}.link`}
                  type="text"
                  disabled={isLoading}
                />
                <FormSwitch
                  label="Ativo"
                  name={`layoutTopBarMessages.${index}.active`}
                  disabled={isLoading}
                />
              </Card>
            ))}
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
