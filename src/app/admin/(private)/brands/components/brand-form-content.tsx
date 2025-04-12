import React from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";

type BrandFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function BrandFormContent({
  isLoading,
  additionalButton,
}: BrandFormContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-8 w-full">
      <FormImagePicker
        label="Logotipo"
        name="image"
        accept="image/svg+xml"
        isLoading={isLoading}
        disabled={isLoading}
      />

      <div className="flex flex-col gap-2 w-full flex-wrap">
        <FormInput
          label="Nome"
          name="name"
          disabled={isLoading}
          leftIcon={<TypeIcon size={18} />}
        />

        <FormSwitch
          label="Ativo"
          name="active"
          defaultChecked
          disabled={isLoading}
        />

        <div className="flex flex-row gap-4 w-full mt-auto">
          {additionalButton ? additionalButton : <></>}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isLoading}
            onClick={() => router.back()}
          >
            <XIcon />
            Cancelar
          </Button>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <LoaderCircle color="secondary" /> : <SaveIcon />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
