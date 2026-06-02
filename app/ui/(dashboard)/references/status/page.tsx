"use client"

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
import { FaCirclePlus } from "react-icons/fa6"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import { resposeNatureSchema, resposeNatureSchemaType } from "@/lib/validations"

// Import DataTable
import { currentState, CurrentState } from "@/lib/status"
import { DataTable, ColumnDef } from "@/components/table/data-table"
import { Badge } from "@/components/ui/badge"
import { ResponseBadge } from "@/components/status_badge/responseNature"
import { State } from "@/components/status_badge/state"

import { Pencil, Trash2 } from "lucide-react"

const columns: ColumnDef<CurrentState>[] = [
  { key: "id", label: "ID" },
  {
    key: "title",
    label: "TITLE",
    render: (val: unknown) => <State status={String(val)} />,
  },
  { key: "sortOrder", label: "SORT ORDER" },
  {
    key: "activeState",
    label: "STATE",
    sortable: false,
    render: (val: unknown) => <ResponseBadge status={String(val)} />,
  },
]

export default function Page() {
  const form = useForm<resposeNatureSchemaType>({
    resolver: zodResolver(resposeNatureSchema),
    defaultValues: {
      title: "",
      description: "",
      activeState: "Active",
    },
  })

  async function onSubmit(data: resposeNatureSchemaType) {
    alert(`${data.title},"\n",${data.description},"\n",${data.activeState}`)
  }

  function handleEdit(row: resposeNatureSchemaType) {
    alert(row.title)
  }
  function handleDelete(row: resposeNatureSchemaType) {
    alert(row.title)
  }

  return (
    <main id="main-div" className="w-3/4">
      <div id="form-set" className="mb-2 flex justify-end">
        <Dialog>
          <DialogTrigger>
            <span className="flex items-center gap-2 rounded-xl bg-primary px-2 py-1 text-white">
              <FaCirclePlus className="h-5 w-5" />
              Add New
            </span>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new status</DialogTitle>
              <Separator />
              <DialogDescription>
                This action will be create new response nature for system.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <form id="myname_form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* designation Section ----------------------------------------------------------- */}
                  <div id="designation" className="rounded border">
                    <div className="flex flex-col gap-5 p-3">
                      {/* Response nature title */}
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
                              placeholder="Enter the title"
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

                      {/* Response nature description */}
                      <Controller
                        name="sortOrder"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Sort Order</FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="sortOrder"
                              placeholder="Enter the sort order number"
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
                  <div className="flex justify-end">
                    <Button type="submit" form="myname_form" className="w-40">
                      Create
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </FieldGroup>
          </DialogContent>
        </Dialog>
      </div>

      <div
        id="category-content"
        className="w-full rounded-tl-xl rounded-tr-xl border"
      >
        <div className="form-section-heading">
          <h1 className="font-bold text-white shadow-2xl">Status details</h1>
        </div>

        <div className="p-3">
          <DataTable
            data={currentState}
            columns={columns}
            pageSize={10}
            searchPlaceholder="Search Response nature"
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
