"use client";
import { format, setHours, setMinutes, getHours, getMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { twMerge } from "tailwind-merge";
import { TextNormal } from "../text/text-normal";

export type DatePickerProps = CalendarProps & {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  showTimePicker?: boolean;
  disabled?: boolean;
};

export function DatePicker({
  disabled,
  value,
  onChange,
  locale = ptBR,
  initialFocus = true,
  placeholder = "Selecionar",
  showTimePicker,
  ...props
}: DatePickerProps) {
  const handleHourChange = (hour: string) => {
    if (!value) return;
    const newDate = setHours(value, parseInt(hour));
    onChange?.(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    if (!value) return;
    const newDate = setMinutes(value, parseInt(minute));
    onChange?.(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
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
              {showTimePicker
                ? `${format(value, "PPP", { locale: ptBR })} às ${format(
                    value,
                    "HH:mm"
                  )}`
                : format(value, "PPP", { locale: ptBR })}
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

        {showTimePicker && value && (
          <div className="flex items-center gap-2 p-2">
            <ClockIcon className="w-14" />
            <Select
              onValueChange={handleHourChange}
              defaultValue={String(getHours(value)).padStart(2, "0")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hora" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <TextNormal className="text-muted-foreground">:</TextNormal>

            <Select
              onValueChange={handleMinuteChange}
              defaultValue={String(getMinutes(value)).padStart(2, "0")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Minuto" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
