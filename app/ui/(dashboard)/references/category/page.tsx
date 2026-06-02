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
// import { format } from "date-fns"
import { FaCirclePlus } from "react-icons/fa6"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema, categorySchemaType } from "@/lib/validations"
import { Category, category } from "@/lib/category"

import { ActiveState } from "@/components/status_badge/activeState"
import { Pencil, Trash2 } from "lucide-react"
import { DataTable, ColumnDef } from "@/components/table/data-table"

const columns: ColumnDef<Category>[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "TITLE" },
  { key: "description", label: "DESCRIPTION" },
  {
    key: "activeState",
    label: "STATE",
    sortable: false,
    render: (val: unknown) => <ActiveState status={String(val)} />,
  },
]

export default function Page() {
  const form = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      activeState: "Active",
    },
  })

  async function onSubmit(data: categorySchemaType) {
    alert(`${data.title},"\n",${data.description}`)
  }

  function handleEdit(row: categorySchemaType) {
    alert(row.title)
  }
  function handleDelete(row: categorySchemaType) {
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
              <DialogTitle>Create New Category</DialogTitle>
              <Separator />
              <DialogDescription>
                This action will be create new category for system.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <form id="myname_form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* designation Section ----------------------------------------------------------- */}
                  <div id="designation" className="rounded border">
                    <div className="flex flex-col gap-5 p-3">
                      {/* Category Name */}
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
                              placeholder="Enter the category title"
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
                      {/* Category Name */}
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

      <div id="category-content" className="rounded-tl-xl rounded-tr-xl border">
        <div className="form-section-heading">
          <h1 className="font-bold text-white shadow-2xl">
            Correspondende Category
          </h1>
        </div>

        <div className="p-3">
          <DataTable
            data={category}
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
