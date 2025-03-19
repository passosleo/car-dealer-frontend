"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";
import { FormContext } from "@/components/admin/form/form-context";
import { FormImagePicker } from "@/components/admin/form/form-image-picker";
import { FormInput } from "@/components/admin/form/form-input";
import { FormSwitch } from "@/components/admin/form/form-switch";

const messages = config.messages.validation;

export function BrandForm(
  props: Omit<
    React.ComponentProps<typeof FormContext>,
    "zodSchema" | "onSubmit" | "children"
  >
) {
  return (
    <FormContext
      {...props}
      zodSchema={z.object({
        name: z
          .string({ required_error: messages.required_error })
          .nonempty({ message: messages.nonempty_error }),
        imageUrl: z.string().optional(),
        active: z.boolean().default(true),
      })}
      onSubmit={(data) => console.log(data)}
    >
      <div className="flex flex-row gap-8 w-full">
        <FormImagePicker
          label="Logotipo"
          name="imageUrl"
          accept="image/svg+xml"
        />

        <div className="flex flex-col gap-2 w-full flex-wrap">
          <FormInput
            label="Nome"
            name="name"
            leftIcon={<TypeIcon size={18} />}
          />

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
