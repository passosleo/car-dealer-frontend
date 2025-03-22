import React from "react";
import {
  FormProvider,
  UseFormProps,
  FieldValues,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { replaceEmptyWithNull } from "@/utils/object";

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
  const methods = useForm<z.infer<typeof zodSchema | any>>({
    reValidateMode: "onChange",
    ...useFormProps,
    resolver: zodResolver(zodSchema || z.object({})),
  });

  function onSubmit(data: T, hookFormMethods: UseFormReturn<T>) {
    const normalizedData = replaceEmptyWithNull(data);
    onSubmitProp(normalizedData, hookFormMethods);
    if (resetOnSubmit) methods.reset(undefined, { keepIsSubmitted: false });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && !preventEnterSubmit) {
      e.preventDefault();
      methods.handleSubmit((data) => onSubmit(data, methods))();
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge("flex flex-col gap-2 w-full", className)}
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        onKeyDown={onKeyDown}
      >
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
}
