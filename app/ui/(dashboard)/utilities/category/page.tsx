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
import { format } from "date-fns"
import { FaCirclePlus } from "react-icons/fa6"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import { categoryFormSchema, categoryFormSchemaType } from "@/lib/validations"

export default function Page() {
  const form = useForm<categoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName:"",
      activeState:"Active"
    },
  })

  async function onSubmit(data: categoryFormSchemaType) {
    
    alert(
      `${data.categoryName},"\n",${data.activeState}`
    )
  }

  return (
    <main id="main-div" className="w-1/2">
      <div id="form-set" className="mb-2 flex justify-end">
        <Dialog>
          <DialogTrigger>
            <span className="flex items-center gap-2 rounded-xl bg-gray-900 p-2 text-white">
              <FaCirclePlus className="h-5 w-5" />
              Add Category
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
                        name="categoryName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Category</FieldLabel>
                            <Input
                              {...field}
                              id="categoryName"
                              placeholder="Enter the category"
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

        <div className="p-3">Table</div>
      </div>
    </main>
  )
}
