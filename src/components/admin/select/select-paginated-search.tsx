import { forwardRef, useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

type SelectPaginatedSearchProps = {
  id?: string;
  isLoading?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  onLoadMore?: () => void;
  data?: {
    label: string;
    value: string;
  }[];
  totalPages?: number;
  currentPage?: number;
  width?: number;
  emptyText?: string;
  className?: string;
};

const SelectPaginatedSearch = forwardRef(
  (
    {
      placeholder = "Selecionar",
      searchPlaceholder = "Buscar...",
      emptyText = "Nenhum resultado",
      defaultValue = "",
      onValueChange,
      value,
      width = 250,
      data = [],
      onSearch,
      disabled,
      isLoading,
      onLoadMore,
      currentPage,
      totalPages,
      className,
      id,
    }: SelectPaginatedSearchProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);

    const currentValue = value !== undefined ? value : internalValue;

    const selectedItem = useMemo(
      () => data.find((item) => item.value === currentValue),
      [currentValue, data]
    );

    const canLoadMore =
      !!onLoadMore &&
      !!totalPages &&
      totalPages > 1 &&
      !!currentPage &&
      currentPage < totalPages;

    const shouldShowLoadMore = !!onLoadMore && (isLoading || canLoadMore);

    function onSelect(selectedValue: string) {
      const isSameValue = selectedValue === currentValue;
      const newValue = isSameValue ? "" : selectedValue;

      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }

      setOpen(false);
    }

    return (
      <div
        className={twMerge(disabled && "cursor-not-allowed")}
        style={{ width }}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              style={{ width }}
              className={twMerge(
                `w-[${width}px] text-muted-foreground hover:bg-transparent hover:text-muted-foreground justify-between border-input font-normal text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground select-none`,
                selectedItem && "text-primary hover:text-primary",
                className
              )}
            >
              {selectedItem?.label || placeholder}
              <ChevronDownIcon className="text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" style={{ width }}>
            <Command>
              <CommandInput
                ref={ref}
                placeholder={searchPlaceholder}
                onValueChange={(data) => onSearch?.(data)}
              />

              <CommandList>
                {!isLoading ? <CommandEmpty>{emptyText}</CommandEmpty> : <></>}
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => onSelect(item.value)}
                      className="flex justify-between"
                    >
                      <span>{item.label}</span>
                      {currentValue === item.value && <CheckIcon />}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {shouldShowLoadMore && (
                  <div className="p-2 text-center text-xs select-none">
                    {isLoading ? (
                      <div className="text-muted-foreground">Carregando...</div>
                    ) : (
                      <span
                        className="cursor-pointer hover:underline transition-all"
                        onClick={onLoadMore}
                      >
                        Ver mais
                      </span>
                    )}
                  </div>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

SelectPaginatedSearch.displayName = "SelectPaginatedSearch";

export { SelectPaginatedSearch };
