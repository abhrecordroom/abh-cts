"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

export interface ComboOption {
  key: string
  value: string
}

interface ComboboxProps {
  value?: string
  onChange?: (value: string | null, eventDetails?: unknown) => void
  options: ComboOption[]
  name?: string
  disabled?: boolean
  placeholder?: string
}

export function FormComboboxUI({
  value,
  onChange,
  name,
  disabled,
  placeholder,
  options,
}: ComboboxProps) {
  return (
    <Combobox value={value} onValueChange={onChange} items={options}>
      <ComboboxInput
        className="bg-gray-100"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.key} value={item.value}>
              {item.value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
