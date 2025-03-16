"use client";

import { Form } from "@/components/admin/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { config } from "@/config";
import { SaveIcon, TypeIcon, XIcon } from "lucide-react";

const messages = config.messages.validation;

export function BannerForm(props: React.ComponentProps<typeof Form.Context>) {
  return (
    <Form.Context
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
        <Form.ImagePicker label="Imagem desktop" name="imageDesktop" />

        <Form.ImagePicker label="Imagem mobile" name="imageMobile" />

        <div className="flex flex-col gap-2 w-full flex-wrap">
          <Form.Input
            label="Título"
            name="title"
            leftIcon={<TypeIcon size={18} />}
          />

          <div className="flex gap-4 w-full">
            <Form.DatePicker label="Data de início" name="startAt" />
            <Form.DatePicker label="Data de término" name="endAt" />
          </div>

          <Form.Switch label="Ativo" name="active" defaultChecked />

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
    </Form.Context>
  );
}
