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
  vehicleImages: z.array(
    z.string({ required_error: messages.required_error }),
    {
      required_error: messages.required_error,
    }
  ),
  vehicleFeatures: z
    .array(z.string({ required_error: messages.required_error }))
    .default([]),
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
