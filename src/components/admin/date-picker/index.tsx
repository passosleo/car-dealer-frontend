"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { twMerge } from "tailwind-merge";

export type DatePickerProps = CalendarProps & {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
};

export function DatePicker({
  value,
  onChange,
  locale = ptBR,
  initialFocus = true,
  placeholder = "Selecionar",
  ...props
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon
            className={twMerge("mr-2 h-4 w-4", value && "text-primary")}
          />
          {value ? (
            <span className="text-primary">
              {format(value, "PPP", { locale: ptBR })}
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={locale}
          initialFocus={initialFocus}
        />
      </PopoverContent>
    </Popover>
  );
}
