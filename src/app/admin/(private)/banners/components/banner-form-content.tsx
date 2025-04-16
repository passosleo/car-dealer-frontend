"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { FormDatePicker } from "@/components/admin/form/form-date-picker";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";

type BannerFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function BannerFormContent({
  isLoading,
  additionalButton,
}: BannerFormContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-8 w-full">
      <FormImagePicker
        label="Imagem desktop"
        name="imageDesktop"
        disabled={isLoading}
        isLoading={isLoading}
      />

      <FormImagePicker
        label="Imagem mobile"
        name="imageMobile"
        disabled={isLoading}
        isLoading={isLoading}
      />

      <div className="flex flex-col gap-2 w-full flex-wrap">
        <FormInput
          label="Título"
          name="title"
          disabled={isLoading}
          leftIcon={<TypeIcon size={18} />}
        />

        <div className="flex gap-4 w-full">
          <FormDatePicker
            label="Data de início"
            name="startAt"
            disabled={isLoading}
            showTimePicker
          />
          <FormDatePicker
            label="Data de término"
            name="endAt"
            disabled={isLoading}
            showTimePicker
          />
        </div>

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
