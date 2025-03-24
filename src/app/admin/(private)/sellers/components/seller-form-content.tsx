import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, SaveIcon, XIcon } from "lucide-react";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { FormInput } from "@/components/admin/form/form-input";
import { FormTextArea } from "@/components/admin/form/form-textarea";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";

export function SellerFormContent({ isPending }: { isPending: boolean }) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-8 w-full">
      <FormImagePicker
        label="Foto"
        name="image"
        disabled={isPending}
        isPending={isPending}
      />

      <div className="flex flex-col gap-2 w-full flex-wrap">
        <div className="flex gap-4 w-full">
          <FormInput label="Nome" name="firstName" disabled={isPending} />
          <FormInput label="Sobrenome" name="lastName" disabled={isPending} />
        </div>

        <div className="flex gap-4 w-full">
          <FormInput
            label="E-mail"
            name="email"
            disabled={isPending}
            leftIcon={<MailIcon size={18} />}
          />

          <FormInput
            label="Telefone"
            name="phone"
            disabled={isPending}
            leftIcon={<PhoneIcon size={18} />}
          />
        </div>

        <FormTextArea
          label="Mensagem personalizada"
          name="customMessage"
          disabled={isPending}
        />

        <FormSwitch
          label="Ativo"
          name="active"
          defaultChecked
          disabled={isPending}
        />

        <div className="flex flex-row gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            className="mt-auto w-full self-end"
            disabled={isPending}
            onClick={() => router.back()}
          >
            <XIcon />
            Cancelar
          </Button>

          <Button
            type="submit"
            className="mt-auto w-full self-end"
            disabled={isPending}
          >
            {isPending ? <LoaderCircle color="secondary" /> : <SaveIcon />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
