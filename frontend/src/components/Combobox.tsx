import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

type ComboboxProps = {
  value: string;
  setValue: (value: string) => void;
  options: { value: string; label: string }[] | undefined;
};

export function Combobox({ value, setValue, options }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options?.find?.((o) => o.value === value)?.label
            : "Selecionar Diretor..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar diretor..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum diretor encontrado.</CommandEmpty>
            <CommandGroup>
              {options?.map?.((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {o.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === o.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
