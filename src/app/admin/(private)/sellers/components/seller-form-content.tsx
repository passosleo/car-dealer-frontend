import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, SaveIcon, XIcon } from "lucide-react";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { FormInput } from "@/components/admin/form/form-input";
import { FormTextArea } from "@/components/admin/form/form-textarea";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";

type SellerFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function SellerFormContent({
  isLoading,
  additionalButton,
}: SellerFormContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-8 w-full">
      <FormImagePicker
        label="Foto"
        name="image"
        disabled={isLoading}
        isLoading={isLoading}
      />

      <div className="flex flex-col gap-2 w-full flex-wrap">
        <div className="flex gap-4 w-full">
          <FormInput label="Nome" name="firstName" disabled={isLoading} />
          <FormInput label="Sobrenome" name="lastName" disabled={isLoading} />
        </div>

        <div className="flex gap-4 w-full">
          <FormInput
            label="E-mail"
            name="email"
            disabled={isLoading}
            leftIcon={<MailIcon size={18} />}
          />

          <FormInput
            label="Telefone"
            name="phone"
            disabled={isLoading}
            leftIcon={<PhoneIcon size={18} />}
          />
        </div>

        <FormTextArea
          label="Mensagem personalizada"
          name="customMessage"
          disabled={isLoading}
        />

        <FormSwitch
          label="Ativo"
          name="active"
          defaultChecked
          disabled={isLoading}
        />

        <div className="flex flex-row gap-4 w-full">
          {additionalButton ? additionalButton : <></>}

          <Button
            type="button"
            variant="outline"
            className="mt-auto w-full self-end"
            disabled={isLoading}
            onClick={() => router.back()}
          >
            <XIcon />
            Cancelar
          </Button>

          <Button
            type="submit"
            className="mt-auto w-full self-end"
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle color="secondary" /> : <SaveIcon />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
