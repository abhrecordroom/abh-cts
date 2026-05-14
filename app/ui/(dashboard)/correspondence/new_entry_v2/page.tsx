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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Icon import
import { ChevronDownIcon } from "lucide-react"

// utility import
import { format } from "date-fns"
import Units from "@/lib/units"
import Category from "@/lib/categories"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, formSchemaType } from "@/lib/validations"
import NATURE_RESPONSE from '@/lib/responseNature'

export default function Page() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageNo: "",
      unit: "",
      inchargeName: "",
      category: "",
      corresTitle: "",
      corresDescription: "",
    },
  })

  async function onSubmit(data: formSchemaType) {
    // this
    const submitDate = format(data.submittedOn, "dd/MM/yyyy")
    const approvedDate = format(data.approvedOn, "dd/MM/yyyy")
    alert(
      `${submitDate},"\n" ,${data.pageNo},"\n",${data.unit},"\n ",${data.inchargeName},"\n",${data.category},"\n ",${data.corresTitle},"\n ",${data.corresDescription},"\n ",${data.responseNature},"\n ",${approvedDate}`
    )
  }

  return (
    <main id="main-div">
      <div id="form-set" className="p-3">
        <form id="myname_form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div id="complainer" className="rounded-tl-xl rounded-tr-xl border">
              <div className="form-section-heading">
                <h1 className="font-bold">Complainer Details</h1>
              </div>

              {/* Complaint details form */}
              <div className="flex w-1/2 flex-col gap-3 p-5">
                <div className="flex gap-5">
                  {/* Submit Date */}
                  <Controller
                    name="submittedOn"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Submitted on</FieldLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              data-empty={!field.value}
                              className="w-53 justify-between bg-gray-100 text-left font-normal data-[empty=true]:text-muted-foreground"
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              defaultMonth={field.value}
                            />
                          </PopoverContent>
                        </Popover>

                        {fieldState.invalid && (
                          <FieldError
                            className="text-xs"
                            errors={[fieldState.error]}
                          />
                        )}
                      </Field>
                    )}
                  />

                  {/* Page no */}
                  <Controller
                    name="pageNo"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Book Page no</FieldLabel>
                        <Input
                          {...field}
                          id="pageNo"
                          placeholder="Enter the date"
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

                <div className="flex gap-5">
                  {/* Unit */}
                  <Controller
                    name="unit"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Unit / Ward</FieldLabel>
                        <Combobox
                          value={field.value}
                          onValueChange={field.onChange}
                          items={Units}
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
                                  key={item.unit_id}
                                  value={item.unit_name}
                                >
                                  {item.unit_name}
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

                  {/* Name with initial */}
                  <Controller
                    name="inchargeName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Name with initial</FieldLabel>
                        <Input
                          {...field}
                          id="inchargeName"
                          placeholder="Enter the incharge name"
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
            </div>
            </div>
                

            {/* Correspondence Section ----------------------------------------------------------- */}
            <div
              id="correspondence"
              className="rounded-tl-xl rounded-tr-xl border"
            >
              <div className="form-section-heading">
                <h1 className="font-bold">Correspondence Details</h1>
              </div>

              <div className="flex w-1/2 flex-col gap-3 p-5">
                {/* Category */}
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <Combobox
                        value={field.value}
                        onValueChange={field.onChange}
                        items={Category}
                      >
                        <ComboboxInput
                          className="bg-gray-100"
                          placeholder="Select a category"
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item.id} value={item.name}>
                                {item.name}
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

                {/* Subject / Title */}
                <Controller
                  name="corresTitle"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Subject / Title</FieldLabel>
                      <Input
                        {...field}
                        id="pageNo"
                        placeholder="Enter correspondence subject"
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

                {/* Description */}
                <Controller
                  name="corresDescription"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Subject</FieldLabel>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Enter correspondence description"
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
            </div>

            {/* Response Nature section ---------------------------------------------------------------------- */}
            <div
              id="responseNature"
              className="rounded-tl-xl rounded-tr-xl border"
            >
              <div className="form-section-heading">
                <h1 className="font-bold">Nature of Response</h1>
              </div>

              <div className="flex w-1/2 flex-col gap-3 p-5">
                {/* Nature of Response */}
                <Controller
                  name="responseNature"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Nature of Response</FieldLabel>
                      <RadioGroup
                        id="responseNature"
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex w-full justify-between"
                      >
                        {NATURE_RESPONSE.map((response)=>(
                        <div key={response.id} className="flex w-40 flex-col items-center justify-center gap-3 rounded border-2 border-gray-300 p-3 text-red-800">
                          <RadioGroupItem value={response.value} id={response.id} />
                          <div className="flex flex-col items-center justify-center text-center">
                            <Label htmlFor={response.id}>{response.value}</Label>
                            <p className="text-xs text-gray-400">
                              [{response.description}]
                            </p>
                          </div>
                        </div>
                        ))}
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

            {/* HOI Approvel section ---------------------------------------------------------------------- */}
            <div id="approvel" className="rounded-tl-xl rounded-tr-xl border">
              <div className="form-section-heading">
                <h1 className="font-bold">Head of the Institution Approvel</h1>
              </div>

              <div className="flex w-1/2 flex-col gap-3 p-5">
                {/* HOI Approvel */}
                <Controller
                  name="approvedOn"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Approved on</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="w-53 justify-between bg-gray-100 text-left font-normal data-[empty=true]:text-muted-foreground"
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            defaultMonth={field.value}
                          />
                        </PopoverContent>
                      </Popover>

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
            <div className="flex w-1/2 justify-end gap-5">
              <Button
                type="reset"
                variant="outline"
                form="myname_form"
                className="w-40"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="myname_form" className="w-40">
                Register
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </main>
  )
}
