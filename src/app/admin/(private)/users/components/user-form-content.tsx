import { Button } from "@/components/ui/button";
import { MailIcon, SaveIcon, XIcon } from "lucide-react";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/admin/avatar/avatar";
import { UseFormReturn } from "react-hook-form";

type UserFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
  form: UseFormReturn<{
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
    profileId: string;
  }>;
};

export function UserFormContent({
  form,
  isLoading,
  additionalButton,
}: UserFormContentProps) {
  const router = useRouter();

  function getNameBeingTyped() {
    const firstName = form.watch("firstName") || "";
    const lastName = form.watch("lastName") || "";
    return `${firstName} ${lastName}`;
  }

  return (
    <div className="flex flex-row w-full">
      <Avatar
        name={getNameBeingTyped()}
        className="h-40 w-40 text-6xl self-center ml-4 mr-8"
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
        </div>

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
