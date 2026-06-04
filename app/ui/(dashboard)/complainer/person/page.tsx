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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// utility import
import { FaCirclePlus } from "react-icons/fa6"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import { personSchema, personSchemaType } from "@/lib/validations"
import { Person, person } from "@/lib/person"
import { DataTable, ColumnDef } from "@/components/table/data-table"
import { ActiveState } from "@/components/status_badge/activeState"
import { Pencil, Trash2 } from "lucide-react"
import { unit } from "@/lib/units"
import { designation } from "@/lib/designation"
const columns: ColumnDef<Person>[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "TITLE" },
  { key: "name", label: "NAME" },
  { key: "unit_name", label: "UNIT" },
  { key: "designation", label: "DESIGNATION" },
  { key: "phone_no", label: "PHONE NO" },
  { key: "email", label: "EMAIL" },
  {
    key: "activeState",
    label: "STATE",
    sortable: false,
    render: (val: unknown) => <ActiveState status={String(val)} />,
  },
]

export default function Page() {
  const form = useForm<personSchemaType>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      title: "",
      name: "",
      unit_name: "",
      designation: "",
      phone_no: "",
      email: "",
      activeState: "Active",
    },
  })

  async function onSubmit(data: personSchemaType) {
    alert(`${data.title},"\n ",${data.name},"\n",${data.activeState}`)
  }

  function handleEdit(row: personSchemaType) {
    alert(row.name)
  }
  function handleDelete(row: personSchemaType) {
    alert(row.name)
  }

  const title = [
    {
      id: 1,
      title: "Mr",
    },
    {
      id: 2,
      title: "Miss",
    },
    {
      id: 3,
      title: "Mrs",
    },
    {
      id: 4,
      title: "Dr",
    },
  ]
  return (
    <main id="main-div" className="lg:w-full">
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
              <DialogTitle>Create New Person</DialogTitle>
              <Separator />
              <DialogDescription>
                This action will be create new person for system.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <form id="person_form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* TITLE ----------------------------------------------------------- */}
                  <div id="person" className="rounded border">
                    <div className="flex flex-col gap-5 p-3">
                      <div className="flex gap-3">
                        <Controller
                          name="title"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field className="w-30">
                              <FieldLabel>
                                Title<span className="text-destructive">*</span>
                              </FieldLabel>
                              <Combobox
                                value={field.value}
                                onValueChange={field.onChange}
                                items={title}
                              >
                                <ComboboxInput
                                  className="bg-gray-100"
                                  placeholder="Title"
                                />
                                <ComboboxContent>
                                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                                  <ComboboxList>
                                    {(item) => (
                                      <ComboboxItem
                                        key={item.id}
                                        value={item.title}
                                      >
                                        {item.title}
                                      </ComboboxItem>
                                    )}
                                  </ComboboxList>
                                </ComboboxContent>
                              </Combobox>
                              {fieldState.invalid && (
                                <FieldError
                                  className="text-xs"
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* NAME */}
                        <Controller
                          name="name"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>
                                Name<span className="text-destructive">*</span>
                              </FieldLabel>
                              <Input
                                {...field}
                                id="name"
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
                      </div>
                      {/* Unit Code */}
                      {/* <Controller
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
                      /> */}
                      {/* UNIT */}
                      <Controller
                        name="unit_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Unit<span className="text-destructive">*</span>
                            </FieldLabel>
                            <Combobox
                              value={field.value}
                              onValueChange={field.onChange}
                              items={unit}
                            >
                              <ComboboxInput
                                className="bg-gray-100"
                                placeholder="Select a Unit"
                              />
                              <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                  {(item) => (
                                    <ComboboxItem
                                      key={item.id}
                                      value={item.title}
                                    >
                                      {item.title}
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                            {fieldState.invalid && (
                              <FieldError
                                className="text-xs"
                                errors={[fieldState.error]}
                              />
                            )}
                          </Field>
                        )}
                      />
                      {/* DESIGNATIOn */}
                      <Controller
                        name="designation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Designation
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Combobox
                              value={field.value}
                              onValueChange={field.onChange}
                              items={designation}
                            >
                              <ComboboxInput
                                className="bg-gray-100"
                                placeholder="Select a Designation"
                              />
                              <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                  {(item) => (
                                    <ComboboxItem
                                      key={item.id}
                                      value={item.title}
                                    >
                                      {item.title}
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                            {fieldState.invalid && (
                              <FieldError
                                className="text-xs"
                                errors={[fieldState.error]}
                              />
                            )}
                          </Field>
                        )}
                      />
                      {/* PHONE NO */}
                      <Controller
                        name="phone_no"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Phone No
                              {/* <span className="text-destructive">*</span> */}
                            </FieldLabel>
                            <Input
                              {...field}
                              id="phone_no"
                              placeholder="Enter the phone no"
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
                      {/* EMAIL */}
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Phone No
                              {/* <span className="text-destructive">*</span> */}
                            </FieldLabel>
                            <Input
                              {...field}
                              id="email"
                              placeholder="Enter the email"
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
                      form="person_form"
                      variant="outline"
                      className="w-40"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                    <Button type="submit" form="person_form" className="w-40">
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
            data={person}
            columns={columns}
            pageSize={10}
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
