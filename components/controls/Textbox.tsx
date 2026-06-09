import { Control, Path, FieldValues } from "react-hook-form"
import { FormController } from "@/lib/form/FormController"
import { FormInputUI } from "@/lib/form/ui/FormInputUI"

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  isRequired?: boolean
  placeholder?: string
  disabled?: boolean
  type?: string
}

export function Textbox<T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  placeholder,
  disabled,
  type,
}: FormInputProps<T>) {
  return (
    <FormController<T>
      name={name}
      control={control}
      label={label}
      isRequired={isRequired}
    >
      {(field) => (
        <FormInputUI
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
        />
      )}
    </FormController>
  )
}
