import React from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, XIcon } from "lucide-react";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";
import { LoaderCircle } from "@/components/admin/loader/loader-circle";
import { useRouter } from "next/navigation";
import { FormTextArea } from "@/components/admin/form/form-textarea";

type VehicleFormContentProps = {
  isLoading: boolean;
  additionalButton?: React.ReactNode;
};

export function VehicleFormContent({
  isLoading,
  additionalButton,
}: VehicleFormContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-8 w-full">
      <div className="flex flex-col gap-2 w-full flex-wrap">
        <FormInput label="Modelo" name="model" disabled={isLoading} />

        <FormInput label="Ano" name="year" disabled={isLoading} />

        <FormInput label="Placa" name="plate" disabled={isLoading} />

        <FormTextArea
          label="Descrição"
          name="description"
          disabled={isLoading}
        />

        <FormInput label="Preço" name="price" disabled={isLoading} />

        <FormInput label="Quilometragem" name="mileage" disabled={isLoading} />

        <FormInput label="Cor" name="color" disabled={isLoading} />

        <FormInput
          label="Transmissão"
          name="transmission"
          disabled={isLoading}
        />

        <FormInput label="Combustível" name="fuelType" disabled={isLoading} />

        <FormInput label="Portas" name="doors" disabled={isLoading} />

        <FormInput label="Assentos" name="seats" disabled={isLoading} />

        <FormInput label="Potência" name="horsepower" disabled={isLoading} />

        <FormInput label="Torque" name="torque" disabled={isLoading} />

        <FormInput label="Tração" name="driveTrain" disabled={isLoading} />

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
