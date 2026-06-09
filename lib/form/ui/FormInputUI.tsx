import * as React from "react"
import { Input } from "@/components/ui/input"

interface InputProps {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  name?: string
  disabled?: boolean
  placeholder?: string
  type?: string
}

export function FormInputUI({
  value,
  onChange,
  onBlur,
  name,
  disabled,
  placeholder,
  type,
}: InputProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
    />
  )
}
