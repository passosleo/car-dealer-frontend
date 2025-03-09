import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z, ZodSchema } from "zod";

export type FormContextProps<T extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "children"
> & {
  onSubmit: (data: T, formMethods: UseFormReturn<T>) => void;
  useFormProps?: Omit<UseFormProps<Partial<T>>, "resolver">;
  zodSchema: ZodSchema<T>;
  resetOnSubmit?: boolean;
  children: React.ReactNode | ((form: UseFormReturn<T>) => React.ReactNode);
};

const FormContext = React.forwardRef(
  <T extends FieldValues>(
    {
      children,
      className,
      onSubmit,
      zodSchema,
      useFormProps,
      resetOnSubmit,
      ...props
    }: FormContextProps<T>,
    ref: React.Ref<HTMLFormElement>
  ) => {
    const methods = useForm<z.infer<typeof zodSchema | any>>({
      reValidateMode: "onChange",
      ...useFormProps,
      resolver: zodResolver(zodSchema || z.object({})),
    });

    function handleSubmit(data: T, formMethods: UseFormReturn<T>) {
      onSubmit(data, formMethods);
      if (resetOnSubmit) methods.reset(undefined, { keepIsSubmitted: false });
    }

    return (
      <FormProvider {...methods}>
        <form
          {...props}
          ref={ref}
          className={twMerge(
            "flex flex-col gap-2 p-2 overflow-auto w-full",
            className
          )}
          onSubmit={methods.handleSubmit((data) => handleSubmit(data, methods))}
        >
          {typeof children === "function" ? children(methods) : children}
        </form>
      </FormProvider>
    );
  }
);

FormContext.displayName = "Form.Context";

export { FormContext };
