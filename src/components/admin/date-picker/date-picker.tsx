"use client";
import {
  format,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  parseISO,
  isValid,
} from "date-fns";
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
  value?: Date | string;
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
  let dateValue: Date | undefined;

  if (typeof value === "string") {
    const parsedDate = parseISO(value);
    if (isValid(parsedDate)) {
      const localOffset = new Date().getTimezoneOffset() * 60000;
      dateValue = new Date(parsedDate.getTime() + localOffset);
    } else {
      dateValue = undefined;
    }
  } else {
    dateValue = value;
  }

  const validDateValue = isValid(dateValue) ? dateValue : undefined;

  const handleHourChange = (hour: string) => {
    if (!validDateValue) return;
    const newDate = setHours(validDateValue, parseInt(hour));
    onChange?.(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    if (!validDateValue) return;
    const newDate = setMinutes(validDateValue, parseInt(minute));
    onChange?.(newDate);
  };

  const initialDate = new Date(0);
  initialDate.setHours(0, 0, 0, 0);

  const displayDate = validDateValue || initialDate;

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !validDateValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon
            className={twMerge(
              "mr-2 h-4 w-4",
              validDateValue && "text-primary"
            )}
          />
          {validDateValue ? (
            <span className="text-primary">
              {showTimePicker
                ? `${format(displayDate, "PPP", { locale })} às ${format(
                    displayDate,
                    "HH:mm"
                  )}`
                : format(displayDate, "PPP", { locale })}
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
          selected={displayDate}
          onSelect={(date) => {
            if (date) {
              const newDate = setHours(
                setMinutes(date, getMinutes(displayDate)),
                getHours(displayDate)
              );
              onChange?.(newDate);
            } else {
              onChange?.(undefined);
            }
          }}
          locale={locale}
          initialFocus={initialFocus}
        />

        {showTimePicker && validDateValue && (
          <div className="flex items-center gap-2 p-2">
            <ClockIcon className="w-14" />
            <Select
              onValueChange={handleHourChange}
              defaultValue={String(getHours(displayDate)).padStart(2, "0")}
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
              defaultValue={String(getMinutes(displayDate)).padStart(2, "0")}
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
