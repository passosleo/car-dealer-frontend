import { ConnectForm } from "@/components/shared/connect-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import React, { useState } from "react";
import Image from "next/image";
import { ImageUpIcon } from "lucide-react";
import { LoaderCircle } from "../loader/loader-circle";

type FormImagePickerProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  label: string;
  name: string;
  className?: string;
  onChange?: (imageBase64: string) => void;
  isPending?: boolean;
};

const FormImagePicker = React.forwardRef<
  HTMLInputElement,
  FormImagePickerProps
>(
  (
    {
      label,
      name,
      className,
      type = "file",
      accept = "image/png, image/jpeg",
      placeholder = "Upload",
      disabled,
      isPending,
      ...props
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string | null>(null);

    function handleFileChange(
      e: React.ChangeEvent<HTMLInputElement>,
      field: ControllerRenderProps<FieldValues, string>
    ) {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const base64 = ev.target?.result as string;
          setPreview(base64);
          field.onChange(base64);
          if (props.onChange) props.onChange(base64);
        };
        reader.readAsDataURL(file);
      }
    }

    return (
      <ConnectForm>
        {(form) => (
          <Controller
            name={name}
            control={form.control}
            disabled={disabled}
            render={({ field, fieldState }) => {
              return (
                <div
                  className={twMerge(
                    "flex flex-col gap-1 max-w-sm select-none",
                    disabled && "cursor-not-allowed opacity-50",
                    className
                  )}
                >
                  <Label
                    className="text-muted-foreground text-xs font-medium w-fit"
                    htmlFor={name}
                  >
                    {label}
                  </Label>
                  <div className="flex flex-col gap-2">
                    {preview || field.value ? (
                      <div className="relative w-[365px] h-[365px]">
                        <Image
                          src={preview || field.value}
                          alt="Pré-visualização da imagem"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md border border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          className="absolute top-[-8px] right-[-8px] p-1 text-xs rounded-full h-6 w-6"
                          onClick={() => {
                            setPreview(null);
                            field.onChange("");
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <>
                        <input
                          {...props}
                          disabled={disabled}
                          ref={ref}
                          id={props.id || name}
                          type={type}
                          accept={accept}
                          onChange={(e) => handleFileChange(e, field)}
                          className="hidden"
                        />
                        <label
                          htmlFor={props.id || name}
                          className={twMerge(
                            "w-[365px] h-[365px] border border-border rounded-md flex flex-col justify-center items-center hover:bg-primary-foreground text-muted-foreground text-center",
                            disabled ? "cursor-not-allowed" : "cursor-pointer"
                          )}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {isPending ? (
                              <LoaderCircle
                                size={48}
                                color="custom"
                                className="text-muted-foreground"
                              />
                            ) : (
                              <ImageUpIcon size={48} />
                            )}
                            {placeholder}
                          </div>
                          <div className="text-destructive text-xs pt-1">
                            {fieldState.error && (
                              <span>{fieldState.error.message}</span>
                            )}
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              );
            }}
          />
        )}
      </ConnectForm>
    );
  }
);

FormImagePicker.displayName = "FormImagePicker";

export { FormImagePicker };
