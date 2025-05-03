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

type CreateVehicleSchema = z.infer<typeof createVehicleSchema>;

export function CreateVehicleForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  const { createVehicle, isPending } = useCreateVehicleService();

  function onSubmit(data: CreateVehicleSchema) {
    createVehicle({ payload: data });
  }

  return (
    <FormContext {...props} zodSchema={createVehicleSchema} onSubmit={onSubmit}>
      <VehicleFormContent isLoading={isPending} />
    </FormContext>
  );
}
