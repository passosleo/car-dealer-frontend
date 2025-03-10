import React from "react";
import {
  FormProvider,
  UseFormProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";
import { useCustomFormContext } from "./hooks/use-custom-form-context";

type Props<T extends FieldValues> = {
  onSubmit: (data: T, formMethods: UseFormReturn<T>) => void;
  useFormProps?: Omit<UseFormProps<Partial<T>>, "resolver">;
  children: React.ReactNode | ((form: UseFormReturn<T>) => React.ReactNode);
  zodSchema?: ZodSchema<T>;
  resetOnSubmit?: boolean;
  className?: string;
  preventEnterSubmit?: boolean;
};

export function FormContext<T extends FieldValues>({
  children,
  className,
  onSubmit: onSubmitProp,
  zodSchema,
  useFormProps,
  resetOnSubmit,
  preventEnterSubmit,
}: Props<T>) {
  const { methods, onSubmit, onKeyDown } = useCustomFormContext<T>({
    onSubmit: onSubmitProp,
    useFormProps,
    zodSchema,
    resetOnSubmit,
    preventEnterSubmit,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge(
          "flex flex-col gap-2 p-2 overflow-auto w-full",
          className
        )}
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        onKeyDown={onKeyDown}
      >
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
}
