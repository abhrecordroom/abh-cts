"use client"

import React from "react"
// UI/Components import
import { useForm, Controller } from "react-hook-form"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// utility import
import { format } from "date-fns"
import { FaCirclePlus } from "react-icons/fa6"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import { unitSchema, unitSchemaType } from "@/lib/validations"
import { Unit, unit } from "@/lib/units"
import { DataTable, ColumnDef } from "@/components/table/data-table"
import { ActiveState } from "@/components/status_badge/activeState"
import { Pencil, Trash2 } from "lucide-react"

const columns: ColumnDef<Unit>[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "TITLE" },
  { key: "code", label: "CODE" },
  { key: "description", label: "DESCRIPTION" },
  {
    key: "activeState",
    label: "STATE",
    sortable: false,
    render: (val: unknown) => <ActiveState status={String(val)} />,
  },
]

export default function Page() {
  const form = useForm<unitSchemaType>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      title: "",
      code: "",
      description: "",
      activeState: "Active",
    },
  })

  async function onSubmit(data: unitSchemaType) {
    alert(`${data.title},"\n ",${data.code},"\n",${data.activeState}`)
  }

  function handleEdit(row: unitSchemaType) {
    alert(row.title)
  }
  function handleDelete(row: unitSchemaType) {
    alert(row.title)
  }

  return (
    <main id="main-div" className="w-3/4">
      <div id="form-set" className="flex justify-end p-3">
        <Dialog>
          <DialogTrigger>
            <span className="flex items-center gap-2 rounded-xl bg-primary px-2 py-1 text-white">
              <FaCirclePlus className="h-5 w-5" />
              Add New
            </span>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Unit</DialogTitle>
              <Separator />
              <DialogDescription>
                This action will be create new unit for system.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <form id="unit_form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* Unit Section ----------------------------------------------------------- */}
                  <div id="unit" className="rounded border">
                    <div className="flex flex-col gap-5 p-3">
                      {/* Unit Title */}
                      <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Title<span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              {...field}
                              id="title"
                              placeholder="Enter the name"
                              value={field.value}
                            />
                            {fieldState.invalid && (
                              <FieldError
                                className="text-xs"
                                errors={[fieldState.error]}
                              />
                            )}
                          </Field>
                        )}
                      />
                      {/* Unit Code */}
                      <Controller
                        name="code"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Short Code
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                              {...field}
                              id="code"
                              placeholder="Enter the short code"
                              value={field.value}
                            />
                            {fieldState.invalid && (
                              <FieldError
                                className="text-xs"
                                errors={[fieldState.error]}
                              />
                            )}
                          </Field>
                        )}
                      />

                      {/* Designation code */}
                      <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Input
                              {...field}
                              id="description"
                              placeholder="Enter the description"
                              value={field.value}
                            />
                            {fieldState.invalid && (
                              <FieldError
                                className="text-xs"
                                errors={[fieldState.error]}
                              />
                            )}
                          </Field>
                        )}
                      />

                      {/* Active state */}
                      <Controller
                        name="activeState"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Active State</FieldLabel>
                            <RadioGroup
                              id="activeState"
                              value={field.value}
                              onValueChange={field.onChange}
                              defaultValue="Active"
                              className="flex"
                            >
                              <div className="flex gap-2">
                                <RadioGroupItem value="Active" id="active" />
                                <Label htmlFor="active">Active</Label>
                              </div>
                              <div className="flex gap-2">
                                <RadioGroupItem value="Disable" id="disable" />
                                <Label htmlFor="disable">Disable</Label>
                              </div>
                            </RadioGroup>
                            {fieldState.invalid && (
                              <FieldError
                                className="text-xs"
                                errors={[fieldState.error]}
                              />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button
                      type="reset"
                      form="unit_form"
                      variant="outline"
                      className="w-40"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                    <Button type="submit" form="unit_form" className="w-40">
                      Create
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </FieldGroup>
          </DialogContent>
        </Dialog>
      </div>

      <div id="form-set" className="rounded-tl-xl rounded-tr-xl border">
        <div className="form-section-heading">
          <h1 className="font-bold text-white shadow-2xl">Unit Details</h1>
        </div>

        <div className="p-3">
          <DataTable
            data={unit}
            columns={columns}
            pageSize={15}
            searchPlaceholder="Search unit"
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(row)}
                  className="h-7 px-2 text-xs"
                >
                  <Pencil className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(row)}
                  className="h-7 border-red-200 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </main>
  )
}
