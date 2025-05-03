"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, ImageUpIcon, Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ConnectForm } from "@/components/shared/connect-form";

type FormMultiImagePickerProps = {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
};

export function FormMultiImagePicker({
  name,
  label,
  disabled,
  className,
}: FormMultiImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <ConnectForm>
      {(form) => (
        <Controller
          control={form.control}
          name={name}
          render={({ field, fieldState }) => {
            useEffect(() => {
              if (field.value?.length) {
                const lastIndex = field.value.length - 1;
                setCurrent(lastIndex + 1);
                api?.scrollTo(lastIndex);
              }
            }, [field.value]);

            function handleFiles(files: FileList | null) {
              if (!files) return;
              const fileArray = Array.from(files);
              fileArray.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const base64 = ev.target?.result as string;
                  const updated = [...(field.value || []), base64];
                  field.onChange(updated);
                };
                reader.readAsDataURL(file);
              });
            }

            function removeImage(indexToRemove: number) {
              const updated = [...(field.value || [])];
              updated.splice(indexToRemove, 1);
              field.onChange(updated);
            }

            const total = field.value?.length || 0;

            return (
              <div
                className={twMerge(
                  "flex flex-col gap-1 max-w-sm select-none",
                  disabled && "cursor-not-allowed opacity-50",
                  className
                )}
              >
                <Label className="text-muted-foreground text-xs font-medium w-fit">
                  {label}
                </Label>

                {total > 0 ? (
                  <div className="relative w-[365px]">
                    <Carousel
                      setApi={setApi}
                      className="w-[365px]"
                      opts={{
                        align: "center",
                      }}
                    >
                      <CarouselContent>
                        {field.value.map((src: string, index: number) => (
                          <CarouselItem
                            key={index}
                            className="flex justify-center"
                          >
                            <div className="relative w-[365px] h-[365px]">
                              <Image
                                src={src}
                                alt={`Imagem ${index + 1}`}
                                fill
                                className="object-contain rounded-md border border-border bg-white"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                className="absolute top-2 right-2 p-1 h-7 w-7 rounded-full"
                                onClick={() => removeImage(index)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {field.value.length > 1 ? (
                        <>
                          <CarouselPrevious type="button" />
                          <CarouselNext type="button" />
                        </>
                      ) : (
                        <></>
                      )}
                    </Carousel>

                    <div className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-1 rounded">
                      Imagem {current} de {total}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute bottom-2 right-2 rounded-full"
                      onClick={() => inputRef.current?.click()}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => !disabled && inputRef.current?.click()}
                      className="w-[365px] h-[365px] border border-border rounded-md flex flex-col justify-center items-center hover:bg-primary-foreground text-muted-foreground text-center cursor-pointer"
                    >
                      <ImageUpIcon size={48} />
                      Adicionar imagens
                      <div className="text-destructive text-xs pt-1">
                        {fieldState.error && (
                          <span>{fieldState.error.message}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  disabled={disabled}
                  ref={inputRef}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>
            );
          }}
        />
      )}
    </ConnectForm>
  );
}
