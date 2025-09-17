import React from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormContext } from "@/components/shared/form/form-context";
import { config } from "@/config";
import { TopBar } from "@/layout/public/topbar";

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

type ConfigureTopBarSchema = z.infer<typeof configureTopBarSchema>;

type TopBarConfigFormProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function TopBarConfigForm({
  isLoading,
  additionalButton,
}: TopBarConfigFormProps) {
  const router = useRouter();

  const messageExample = ["Frete grátis para todo o Brasil!"];

  return (
    <FormContext
      // {...props}
      zodSchema={configureTopBarSchema}
      onSubmit={(data) => console.log(data)}
      // useFormProps={{
      //   values: {
      //     name: category?.name || "",
      //     image: category?.imageUrl || "",
      //     active: category?.active,
      //   },
      // }}
    >
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

        <div className="w-full border-t border-b py-4">
          {messageExample.map((msg, index) => (
            <div key={index} className="px-4 py-2 mb-2 bg-gray-100 rounded">
              {msg}
            </div>
          ))}
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
    </FormContext>
  );
}
