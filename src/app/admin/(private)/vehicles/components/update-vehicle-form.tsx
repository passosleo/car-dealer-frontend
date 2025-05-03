"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetVehicleByIdService } from "../services/use-get-vehicle-by-id-service";
import { useUpdateVehicleService } from "../services/use-update-vehicle-service";
import { useDeleteVehicleService } from "../services/use-delete-vehicle-service";
import { VehicleFormContent } from "./vehicle-form-content";

const messages = config.messages.validation;

const updateVehicleSchema = z.object({
  model: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  year: z
    .number({ required_error: messages.required_error })
    .int({ message: messages.int_error })
    .positive({ message: messages.positive_error }),
  plate: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error })
    .regex(/^[A-Z]{3}-\d{4}$/, {
      message: "O formato da placa deve ser AAA-0A00",
    }),
  description: z.string().nullable(),
  price: z.number().nullable(),
  mileage: z.number().nullable(),
  color: z.string().nullable(),
  transmission: z.string().nullable(),
  fuelType: z.string().nullable(),
  doors: z.number().nullable(),
  seats: z.number().nullable(),
  horsepower: z.number().nullable(),
  torque: z.number().nullable(),
  driveTrain: z.string().nullable(),
  brandId: z
    .string({ required_error: messages.required_error })
    .uuid({ message: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  categoryId: z
    .string({ required_error: messages.required_error })
    .uuid({ message: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  active: z.boolean().default(true),
  vehicleImages: z.array(z.string()),
  vehicleFeatures: z.array(z.string()),
});

type UpdateVehicleSchema = z.infer<typeof updateVehicleSchema>;

export function UpdateVehicleForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const { vehicle, isPending: isGetVehicleByIdPending } =
    useGetVehicleByIdService(vehicleId);

  const { updateVehicle, isPending: isUpdateVehiclePending } =
    useUpdateVehicleService();

  const { deleteVehicle, isPending: isDeleteVehiclePending } =
    useDeleteVehicleService();

  const isPending =
    isGetVehicleByIdPending || isUpdateVehiclePending || isDeleteVehiclePending;

  function onSubmit(data: UpdateVehicleSchema) {
    updateVehicle({
      params: { vehicleId },
      payload: data,
    });
  }

  function onDelete() {
    deleteVehicle({
      params: { vehicleId },
    });
  }

  return (
    <FormContext
      {...props}
      zodSchema={updateVehicleSchema}
      onSubmit={onSubmit}
      useFormProps={{
        values: {
          model: vehicle?.model,
          year: vehicle?.year,
          plate: vehicle?.plate,
          description: vehicle?.description,
          price: vehicle?.price,
          mileage: vehicle?.mileage,
          color: vehicle?.color,
          transmission: vehicle?.transmission,
          fuelType: vehicle?.fuelType,
          doors: vehicle?.doors,
          seats: vehicle?.seats,
          horsepower: vehicle?.horsepower,
          torque: vehicle?.torque,
          driveTrain: vehicle?.driveTrain,
          brandId: vehicle?.brand.brandId,
          categoryId: vehicle?.category.categoryId,
          active: vehicle?.active,
          vehicleImages: vehicle?.vehicleImages,
          vehicleFeatures: vehicle?.vehicleFeatures,
        },
      }}
    >
      <VehicleFormContent
        isLoading={isPending}
        additionalButton={
          <AlertDialog
            title="Confirmar exclusão?"
            description="Essa ação não pode ser desfeita."
            confirmText="Confirmar"
            onConfirm={onDelete}
          >
            <Button
              type="button"
              variant="outline"
              className="mt-auto w-full self-end"
              disabled={isPending}
            >
              <Trash2Icon />
              Excluir
            </Button>
          </AlertDialog>
        }
      />
    </FormContext>
  );
}
