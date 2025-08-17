"use client";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { AlertDialog } from "@/components/admin/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { VehicleFormContent } from "./vehicle-form-content";
import { useGetVehicleByIdService } from "@/services/private/vehicles/use-get-vehicle-by-id-service";
import { useUpdateVehicleService } from "@/services/private/vehicles/use-update-vehicle-service";
import { useDeleteVehicleService } from "@/services/private/vehicles/use-delete-vehicle-service";

const messages = config.messages.validation;

const updateVehicleSchema = z.object({
  model: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error })
    .min(3, { message: messages.min_error_custom(3) })
    .max(255, { message: messages.max_error_custom(255) }),
  year: z.coerce
    .number({ required_error: messages.required_error })
    .int({ message: messages.integer_error })
    .positive({ message: messages.number_error })
    .min(1900, { message: messages.min_error_custom(1900) }),
  plate: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error })
    .regex(/^([A-Z]{3}-\d{4}|[A-Z]{3}-\d[A-Z]\d{2})$/, {
      message: messages.plate_error,
    })
    .transform((val) => val.toUpperCase()),
  description: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z
      .string({ required_error: messages.required_error })
      .max(1000, { message: messages.max_error_custom(1000) })
      .nullable()
  ),
  price: z.coerce
    .number({ required_error: messages.required_error })
    .positive({ message: messages.number_error })
    .min(1, { message: messages.min_error_custom(1) }),
  mileage: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce
      .number({ invalid_type_error: messages.number_error })
      .int({ message: messages.integer_error })
      .positive({ message: messages.min_error })
      .nullable()
  ),
  color: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z
      .string({ required_error: messages.required_error })
      .min(3, { message: messages.minLength_error })
      .max(50, { message: messages.maxLength_error })
      .nullable()
  ),
  transmission: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().nullable()
  ),
  fuelType: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().nullable()
  ),
  doors: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce
      .number({ invalid_type_error: messages.number_error })
      .int({ message: messages.integer_error })
      .positive({ message: messages.min_error })
      .min(1, { message: messages.min_error_custom(1) })
      .nullable()
  ),
  seats: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce
      .number({ invalid_type_error: messages.number_error })
      .int({ message: messages.integer_error })
      .positive({ message: messages.min_error })
      .min(1, { message: messages.min_error_custom(1) })
      .nullable()
  ),
  horsepower: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce
      .number({ invalid_type_error: messages.number_error })
      .int({ message: messages.integer_error })
      .positive({ message: messages.min_error })
      .min(1, { message: messages.min_error_custom(1) })
      .nullable()
  ),
  torque: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce
      .number({ invalid_type_error: messages.number_error })
      .positive({ message: messages.min_error })
      .min(1, { message: messages.min_error_custom(1) })
      .nullable()
  ),
  driveTrain: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().nullable()
  ),
  brandId: z
    .string({ required_error: messages.required_error })
    .uuid({ message: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  categoryId: z
    .string({ required_error: messages.required_error })
    .uuid({ message: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),

  active: z.boolean().default(true),
  vehicleImages: z
    .array(z.string(), {
      required_error: messages.required_error,
    })
    .min(1, { message: messages.required_error })
    .max(10, {
      message: messages.max_error_custom(10),
    }),
  vehicleFeatures: z
    .array(z.string({ required_error: messages.required_error }))
    .default([]),
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
          model: vehicle?.model || "",
          year: vehicle?.year || undefined,
          plate: vehicle?.plate || "",
          description: vehicle?.description || "",
          price: vehicle?.price || undefined,
          mileage: vehicle?.mileage || undefined,
          color: vehicle?.color || "",
          transmission: vehicle?.transmission || "",
          fuelType: vehicle?.fuelType || "",
          doors: vehicle?.doors || undefined,
          seats: vehicle?.seats || undefined,
          horsepower: vehicle?.horsepower || undefined,
          torque: vehicle?.torque || undefined,
          driveTrain: vehicle?.driveTrain || "",
          brandId: vehicle?.brand.brandId || "",
          categoryId: vehicle?.category.categoryId || "",
          active: vehicle?.active || false,
          vehicleImages: vehicle?.vehicleImages || [],
          vehicleFeatures: vehicle?.vehicleFeatures || [],
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
