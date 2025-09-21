import { replaceEmptyWithNull } from "@/utils/object";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FormProvider,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z, ZodTypeAny } from "zod";

type FormContextProps<S extends ZodTypeAny> = {
  zodSchema: S;
  onSubmit: (data: z.infer<S>, formMethods: UseFormReturn<z.infer<S>>) => void;
  children:
    | React.ReactNode
    | ((form: UseFormReturn<z.infer<S>>) => React.ReactNode);
  useFormProps?: Omit<UseFormProps<z.infer<S>>, "resolver">;
  resetOnSubmit?: boolean;
  className?: string;
  preventEnterSubmit?: boolean;
};

export function FormContext<S extends ZodTypeAny>({
  children,
  className,
  onSubmit: onSubmitProp,
  zodSchema,
  useFormProps,
  resetOnSubmit,
  preventEnterSubmit,
}: FormContextProps<S>) {
  const methods = useForm<z.infer<S>>({
    reValidateMode: "onChange",
    ...useFormProps,
    resolver: zodResolver(zodSchema),
  });

  function onSubmit(
    data: z.infer<S>,
    hookFormMethods: UseFormReturn<z.infer<S>>
  ) {
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
