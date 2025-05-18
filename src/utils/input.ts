import React from "react";
import { createMask, FactoryArg } from "imask";
import { UseFormReturn } from "react-hook-form";
import { iterateObject } from "./object";
import { ErrorHookForm, ErrorsHookForm } from "./types";

export function formatInput(
  event: React.ChangeEvent<HTMLInputElement>,
  maskOptions: FactoryArg,
  hookFormMethods?: UseFormReturn
) {
  const elementId = event.target.id;
  const value = event.target.value;

  const mask = createMask(maskOptions);
  mask.resolve(value);
  mask.value = value;

  const masked = mask.value;
  const unmasked = mask.unmaskedValue;

  if (hookFormMethods) {
    const {
      formState: { errors },
      setValue,
    } = hookFormMethods;
    const error = iterateObject<ErrorHookForm>(
      elementId.split("."),
      errors as ErrorsHookForm
    )?.message;
    const shouldValidate = !!error;

    setValue(elementId, masked, { shouldValidate });
  }

  return { masked, unmasked };
}

export function randomInputId() {
  return "input_" + Math.random().toString(36).substring(2, 11);
}
