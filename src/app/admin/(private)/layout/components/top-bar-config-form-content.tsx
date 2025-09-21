import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/layout/public/topbar";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
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
      <TopBar isEnabled={true} />
      <div className="flex flex-col gap-6 w-full mt-8">
        {/* Linha 1: Inputs numéricos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Número máximo de itens"
            name="maxItems"
            type="number"
            disabled={isLoading}
            leftIcon={<TypeIcon size={18} />}
          />

          <FormInput
            label="Delay (ms)"
            name="delay"
            type="number"
            disabled={isLoading}
            leftIcon={<TypeIcon size={18} />}
          />
        </div>

        {/* Linha 2: Switches organizados em duas colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <FormSwitch label="Loop" name="loop" disabled={isLoading} />
            <FormSwitch label="Jump" name="jump" disabled={isLoading} />
          </div>

          <div className="flex flex-col gap-4">
            <FormSwitch
              label="Esconder no mobile"
              name="hideOnMobile"
              disabled={isLoading}
            />
            <FormSwitch
              label="Esconder no desktop"
              name="hideOnDesktop"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="w-full border-t py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Mensagens da Top Bar</h3>
            <Button
              type="button"
              variant="outline"
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
              Adicionar Mensagem
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {topBarMessagesFields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-lg relative bg-gray-50"
              >
                <div className="absolute top-2 right-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTopBarMessage(index)}
                    disabled={isLoading}
                  >
                    Remover
                  </Button>
                </div>
                <FormInput
                  label={`Mensagem ${index + 1}`}
                  name={`layoutTopBarMessages.${index}.message`}
                  type="text"
                  disabled={isLoading}
                />
                <FormInput
                  label={`Link ${index + 1} (opcional)`}
                  name={`layoutTopBarMessages.${index}.link`}
                  type="text"
                  disabled={isLoading}
                />
                <FormSwitch
                  label="Ativo"
                  name={`layoutTopBarMessages.${index}.active`}
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Linha 3: Botões */}
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
