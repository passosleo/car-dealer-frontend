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

type FormImagePickerProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  label: string;
  name: string;
  className?: string;
  onChange?: (imageBase64: string) => void;
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
            render={({ field, fieldState }) => (
              <div
                className={twMerge("flex flex-col gap-1 max-w-sm", className)}
              >
                <Label
                  className="text-muted-foreground text-xs font-medium w-fit"
                  htmlFor={name}
                >
                  {label}
                </Label>
                <div className="flex flex-col gap-2">
                  {preview ? (
                    <div className="relative w-[365px] h-[365px]">
                      <Image
                        src={preview}
                        alt="Preview"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        className="absolute top-[-8] right-[-8] p-1 text-xs rounded-full h-6 w-6"
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
                        ref={ref}
                        id={props.id || name}
                        type={type}
                        accept={accept}
                        onChange={(e) => handleFileChange(e, field)}
                        className="hidden"
                      />
                      <label
                        htmlFor={props.id || name}
                        className="w-[365px] h-[365px] border border-border rounded-md flex flex-col justify-center items-center cursor-pointer hover:bg-primary-foreground text-muted-foreground text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <ImageUpIcon size={48} />
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
            )}
          />
        )}
      </ConnectForm>
    );
  }
);

FormImagePicker.displayName = "Form.ImagePicker";

export { FormImagePicker };
