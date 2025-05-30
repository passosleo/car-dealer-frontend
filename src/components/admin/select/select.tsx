import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type SelectProps = React.ComponentProps<typeof ShadcnSelect> & {
  id?: string;
  placeholder?: string;
  allowClear?: boolean;
  data?: {
    label: string;
    value: string;
  }[];
};

export function Select({
  id,
  data = [],
  placeholder = "Selecionar",
  allowClear = false,
  value,
  open,
  onOpenChange,
  onValueChange,
  ...props
}: SelectProps) {
  const selectedItem = useMemo(
    () => data.find((item) => item.value === value),
    [value, data]
  );

  const [isOpen, setIsOpen] = useState(open || false);

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  }

  function onClearSelection() {
    if (onValueChange) {
      onValueChange("");
    }
    setIsOpen(false);
  }

  return (
    <ShadcnSelect
      {...props}
      value={value}
      onValueChange={onValueChange}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger
        id={id}
        className={twMerge(
          "w-full text-muted-foreground select-none",
          selectedItem && "text-primary hover:text-primary"
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.length > 0 ? (
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>
              Nenhuma opção disponível
            </SelectItem>
          )}
          {allowClear && value ? (
            <div className="p-2 text-center text-xs select-none">
              <span
                className="cursor-pointer hover:underline transition-all"
                onClick={onClearSelection}
              >
                Limpar seleção
              </span>
            </div>
          ) : (
            <></>
          )}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  );
}
