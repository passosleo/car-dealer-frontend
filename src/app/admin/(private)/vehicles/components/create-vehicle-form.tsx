"use client";

import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { FormContext } from "@/components/admin/form/form-context";
import { useCreateVehicleService } from "../services/use-create-vehicle-service";
import { VehicleFormContent } from "./vehicle-form-content";

const messages = config.messages.validation;

const createVehicleSchema = z.object({
  model: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error }),
  year: z.coerce
    .number({ required_error: messages.required_error })
    .positive({ message: messages.number_error }),
  plate: z
    .string({ required_error: messages.required_error })
    .nonempty({ message: messages.nonempty_error })
    .regex(/^([A-Z]{3}-\d{4}|[A-Z]{3}-\d[A-Z]\d{2})$/, {
      message: "O formato da placa deve ser AAA-1234 ou AAA-0A00",
    })
    .transform((val) => val.toUpperCase()),
  description: z.string().nullable(),
  price: z.coerce
    .number({ required_error: messages.required_error })
    .positive({ message: messages.number_error }),
  mileage: z.coerce.number().nullable(),
  color: z.string().nullable(),
  transmission: z.string().nullable(),
  fuelType: z.string().nullable(),
  doors: z.coerce.number().nullable(),
  seats: z.coerce.number().nullable(),
  horsepower: z.coerce.number().nullable(),
  torque: z.coerce.number().nullable(),
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
  vehicleImages: z.array(z.string(), { message: messages.required_error }),
  vehicleFeatures: z.array(z.string()).default([]),
});

type CreateVehicleSchema = z.infer<typeof createVehicleSchema>;

export function CreateVehicleForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createVehicle, isPending } = useCreateVehicleService();

  function onSubmit(data: CreateVehicleSchema) {
    console.log(" onSubmit ~ data", data);
    createVehicle({ payload: data });
  }

  return (
    <FormContext {...props} zodSchema={createVehicleSchema} onSubmit={onSubmit}>
      <VehicleFormContent isLoading={isPending} />
    </FormContext>
  );
}
