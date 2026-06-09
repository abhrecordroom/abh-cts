"use client"
import React from "react"

import {
  Controller,
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form"

import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"

interface FormControllerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  isRequired?: boolean
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode
}

export function FormController<T extends FieldValues>({
  name,
  control,
  label,
  isRequired = false,
  children,
}: FormControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </FieldLabel>

          <FieldGroup>{children(field)}</FieldGroup>

          {fieldState.invalid && (
            <FieldError className="text-xs" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
