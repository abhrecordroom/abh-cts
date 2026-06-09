import { Control, Path, FieldValues } from "react-hook-form"
import { FormController } from "@/lib/form/FormController"
import { FormComboboxUI, ComboOption } from "@/lib/form/ui/FormComboboxUI"
import { useEffect, useState } from "react"

interface FormComboboxProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  isRequired?: boolean
  placeholder?: string
  disabled?: boolean

  /** Data source */
  fetcher?: (search?: string) => Promise<ComboOption[]>
  data?: ComboOption[]
}

export function AsyncCombobox<T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  placeholder,
  disabled,
  fetcher,
  data,
}: FormComboboxProps<T>) {
  const [options, setOptions] = useState<ComboOption[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setOptions(data)
    }
  }, [data])

  const handleSearch = async (text?: string) => {
    if (!fetcher) return

    setLoading(true)
    const result = await fetcher(text)
    setOptions(result)
    setLoading(false)
  }

  return (
    <FormController<T>
      name={name}
      control={control}
      label={label}
      isRequired={isRequired}
    >
      {(field) => (
        <FormComboboxUI
          value={field.value}
          onChange={field.onChange}
          options={options}
        />
      )}
    </FormController>
  )
}
