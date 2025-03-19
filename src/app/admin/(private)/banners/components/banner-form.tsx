"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { FormContext } from "@/components/admin/form/form-context";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { FormInput } from "@/components/admin/form/form-input";
import { FormDatePicker } from "@/components/admin/form/form-date-picker";
import { FormSwitch } from "@/components/admin/form/form-switch";

const messages = config.messages.validation;

export function BannerForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  return (
    <FormContext
      {...props}
      zodSchema={z.object({
        title: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        imageDesktop: z.string().optional(),
        imageMobile: z.string().optional(),
        startAt: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        endAt: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        active: z.boolean().default(true),
      })}
      onSubmit={(data) => console.log(data)}
    >
      <div className="flex flex-row gap-8 w-full">
        <FormImagePicker label="Imagem desktop" name="imageDesktop" />

        <FormImagePicker label="Imagem mobile" name="imageMobile" />

        <div className="flex flex-col gap-2 w-full flex-wrap">
          <FormInput
            label="Título"
            name="title"
            leftIcon={<TypeIcon size={18} />}
          />

          <div className="flex gap-4 w-full">
            <FormDatePicker label="Data de início" name="startAt" />
            <FormDatePicker label="Data de término" name="endAt" />
          </div>

          <FormSwitch label="Ativo" name="active" defaultChecked />

          <div className="flex flex-row gap-4 w-full mt-auto">
            <Button variant="outline" className="w-full">
              <XIcon />
              Cancelar
            </Button>

            <Button type="submit" className="w-full">
              <SaveIcon />
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </FormContext>
  );
}
