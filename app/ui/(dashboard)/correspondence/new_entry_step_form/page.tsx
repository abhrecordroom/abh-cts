"use client"
// =========================================================================================================
// Imports Section
// =========================================================================================================
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  Plus,
  Trash2,
  UserPlus,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Key,
} from "lucide-react"

// import React from "react"
// UI/Components import
import { useForm, Controller, useFieldArray } from "react-hook-form"
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
import { unit } from "@/lib/units"
import { category, Category } from "@/lib/category"
// Validation import
import { zodResolver } from "@hookform/resolvers/zod"
import {
  complaintSchema,
  complaintSchemaType,
  assigneeSchema,
  assigneeSchemaType,
} from "@/lib/validations"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// =========================================================================================================
// Code Section
// =========================================================================================================
const STEPS = [
  { id: 1, label: "Complaint Details" },
  { id: 2, label: "HOI Approval" },
  { id: 3, label: "Assign Responsible" },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
              current === step.id
                ? "border-primary bg-primary text-primary-foreground"
                : current > step.id
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-muted-foreground bg-background text-muted-foreground"
            )}
          >
            {current > step.id ? <CheckCircle2 className="h-4 w-4" /> : step.id}
          </div>
          <span
            className={cn(
              "hidden text-xs font-medium sm:block",
              current === step.id ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "mx-1 h-px w-8 sm:w-16",
                current > step.id ? "bg-emerald-500" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// =========================================================================================================
// UI Section
// =========================================================================================================
export default function Page() {
  // Variables
  const [step, setStep] = useState(1)

  // Validation---------------------------------------------------------------------------------------------
  const form = useForm<complaintSchemaType>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      submittedOn: undefined as unknown as Date,
      pageNo: "",
      unit: "",
      inchargeName: "",
      category: "",
      corresTitle: "",
      corresDescription: "",
    },
  })
  const formAssignee = useForm<assigneeSchemaType>({
    resolver: zodResolver(assigneeSchema),
    defaultValues: {
      assignee: [
        {
          assigneeType: "",
          assigneeName: "",
          assignOn: undefined as unknown as Date,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: formAssignee.control,
    name: "assignee",
  })

  const handleNextToStep2 = async () => {
    const ok = await form.trigger([
      "submittedOn",
      "pageNo",
      "unit",
      "inchargeName",
      "category",
      "corresTitle",
      "corresDescription",
    ])
    if (ok) setStep(2)
  }

  // ── Validate HOD date before advancing
  const handleNextToStep3 = async () => {
    const ok = await form.trigger(["approvedOn"])
    if (ok) setStep(3)
  }

  // onSubmit Function--------------------------------------------------------------------------------------
  async function onSubmit(data: complaintSchemaType) {
    // this
    const submitDate = format(data.submittedOn, "dd/MM/yyyy")
    const approvedDate = format(data.approvedOn, "dd/MM/yyyy")
    alert(
      `${submitDate},"\n" ,${data.pageNo},"\n",${data.unit},"\n ",${data.inchargeName},"\n",${data.category},"\n ",${data.corresTitle},"\n ",${data.corresDescription},"\n ",${data.responseNature},"\n ",${approvedDate}`
    )
  }

  // UI Render-----------------------------------------------------------------------------------------------
  return (
    <main className="w-full rounded-xl bg-emerald-100 p-5">
      <div className="rounded-2xl bg-emerald-50 shadow sm:w-full md:w-3/4">
        {/* Indicator Menu Header */}
        <div id="indicator" className="p-3">
          <div className="mb-3">
            <h1 className="text-2xl font-bold tracking-tight">
              Complaint Registration
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below. After HOD approval, assign one or more
              responsible persons / units.
            </p>
          </div>

          <StepIndicator current={step} />
        </div>

        {/* Form Card Section */}
        <div id="form">
          <form id="myname_form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {step === 1 && (
                <Card>
                  <div id="complainer" className="rounded-tl-xl rounded-tr-xl">
                    <div className="form-section-heading">
                      <h1 className="font-bold">Complainer Details</h1>
                    </div>

                    {/* Complaint details form */}
                    <div className="flex w-full flex-col gap-3 p-5">
                      <div className="flex gap-5">
                        {/* Submit Date */}
                        <Controller
                          name="submittedOn"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>
                                Submitted on
                                <span className="text-destructive">*</span>
                              </FieldLabel>
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
                                      <span>Pick a submitted date</span>
                                    )}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
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
                              <FieldLabel>
                                Book Page no
                                <span className="text-destructive">*</span>
                              </FieldLabel>
                              <Input
                                {...field}
                                id="pageNo"
                                placeholder="Enter the book page no"
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

                      {/* Unit */}
                      <div className="flex gap-5">
                        <Controller
                          name="unit"
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

                        {/* Name with initial */}
                        <Controller
                          name="inchargeName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>
                                Name with initial
                                <span className="text-destructive">*</span>
                              </FieldLabel>
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
                    className="rounded-tl-xl rounded-tr-xl"
                  >
                    <div className="form-section-heading">
                      <h1 className="font-bold">Correspondence Details</h1>
                    </div>

                    <div className="flex flex-col gap-3 p-5">
                      {/* Category */}
                      <Controller
                        name="category"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Category
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Combobox
                              value={field.value}
                              onValueChange={field.onChange}
                              items={category}
                            >
                              <ComboboxInput
                                className="bg-gray-100"
                                placeholder="Select a category"
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

                      {/* Subject / Title */}
                      <Controller
                        name="corresTitle"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Subject<span className="text-destructive">*</span>
                            </FieldLabel>
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
                            <FieldLabel>
                              Description
                              <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Textarea
                              {...field}
                              id="description"
                              placeholder={`Enter your description \n 1. \n 2. \n 3.`}
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
                    className="rounded-tl-xl rounded-tr-xl"
                  >
                    <div className="form-section-heading">
                      <h1 className="font-bold">Nature of Response</h1>
                    </div>

                    <div className="w-1/2 p-5">
                      {/* Nature of Response */}
                      <Controller
                        name="responseNature"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            {/* <FieldLabel>Nature of Response</FieldLabel> */}
                            <RadioGroup
                              id="responseNature"
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex justify-around"
                            >
                              <div className="flex w-40 flex-col items-center justify-center gap-3 rounded border-2 border-gray-300 p-3 text-red-800">
                                <div className="flex flex-col items-center justify-center gap-2 text-center">
                                  <Label htmlFor="emergency">
                                    🚨 Emergency
                                  </Label>
                                  <RadioGroupItem
                                    value="Emergency"
                                    id="emergency"
                                  />
                                  <p className="text-xs text-gray-400">
                                    [With in 2 days]
                                  </p>
                                </div>
                              </div>

                              <div className="flex w-40 flex-col items-center justify-center gap-3 rounded border-2 border-gray-300 p-3 text-orange-800">
                                <div className="flex flex-col items-center justify-center gap-2 text-center">
                                  <Label htmlFor="urgent">⚠️ Urgent</Label>
                                  <RadioGroupItem value="Urgent" id="urgent" />
                                  <p className="text-xs text-gray-400">
                                    [With in 3-7 days]
                                  </p>
                                </div>
                              </div>

                              <div className="flex w-40 flex-col items-center justify-center gap-3 rounded border-2 border-gray-300 p-3 text-green-800">
                                <div className="flex flex-col items-center justify-center gap-2 text-center">
                                  <Label htmlFor="not-urgent">
                                    🔰 Not Urgent
                                  </Label>
                                  <RadioGroupItem
                                    value="Not-urgent"
                                    id="not-urgent"
                                  />
                                  <p className="text-xs text-gray-400">
                                    [With in 14 days]
                                  </p>
                                </div>
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
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">
                        Head of Department Approval
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Record the date the Head of Department approved this
                      complaint
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Summary of step-1 */}
                    <div className="space-y-2 rounded-lg border bg-muted/40 p-4 text-sm">
                      <p className="mb-1 font-semibold text-foreground">
                        Complaint Summary
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                        <span>Submitted On:</span>
                        <span className="font-medium text-foreground">
                          {form.getValues("submittedOn").toLocaleDateString()}
                        </span>
                        <span>Page no:</span>
                        <span className="font-medium text-foreground">
                          {form.getValues("pageNo")}
                        </span>
                        <span>Unit:</span>
                        <span className="font-medium text-foreground">
                          {form.getValues("unit")}
                        </span>
                        <span>Incharge Name:</span>
                        <span className="font-medium text-foreground">
                          {form.getValues("inchargeName")}
                        </span>
                        <span>Cirrespondence Title:</span>
                        <span className="font-medium text-foreground">
                          {form.getValues("corresTitle")}
                        </span>
                        <span>Cirrespondence Description:</span>
                        <span className="font-medium text-foreground">
                          {form.getValues("corresDescription")}
                        </span>
                        <span>Nature:</span>
                        <span>
                          <Badge variant="secondary">
                            {form.getValues("responseNature")}
                          </Badge>
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-3 p-3">
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
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
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader className="py-4">
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">
                        Assign Responsible Persons / Units
                      </CardTitle>
                    </div>
                    <CardDescription>
                      System Administrator assigns one or more responsible
                      persons or units and sets the expected date for each.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative mt-1 mb-3 space-y-4 rounded-lg border bg-card p-4"
                      >
                        {/* Assignee badge */}
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="border border-emerald-500 text-xs font-semibold"
                          >
                            Assignee #{index + 1}
                          </Badge>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <Controller
                          control={formAssignee.control}
                          name={`assignee.${index}.assigneeType`}
                          render={({ field, fieldState }) => (
                            <Field>
                              {/* <FieldLabel>Nature of Response</FieldLabel> */}
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex"
                                defaultValue="unit"
                              >
                                <div className="flex gap-2">
                                  <RadioGroupItem value="unit" id="unit" />
                                  <div className="flex">
                                    <Label htmlFor="unit">
                                      <Building2 className="h-4 w-4" /> Unit
                                    </Label>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <RadioGroupItem value="person" id="person" />
                                  <div className="flex">
                                    <Label htmlFor="person">
                                      <UserPlus className="h-4 w-4" /> Person
                                    </Label>
                                  </div>
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            {/* Page no */}
                            {/* <Controller
                              name={`assignee.${index}.assigneeName`}
                              control={formAssignee.control}
                              render={({ field, fieldState }) => (
                                <Field>
                                  <FieldLabel>
                                    Book Page no
                                    <span className="text-destructive">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="pageNo"
                                    placeholder="Enter the book page no"
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

                            <Controller
                              name={`assignee.${index}.assigneeName`}
                              control={formAssignee.control}
                              render={({ field, fieldState }) => (
                                <Field>
                                  <FieldLabel>
                                    Unit
                                    <span className="text-destructive">*</span>
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
                                      <ComboboxEmpty>
                                        No items found.
                                      </ComboboxEmpty>
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
                          </div>
                          <div>
                            <Controller
                              name={`assignee.${index}.assignOn`}
                              control={formAssignee.control}
                              render={({ field, fieldState }) => (
                                <Field>
                                  <FieldLabel>
                                    Assigned on
                                    <span className="text-destructive">*</span>
                                  </FieldLabel>
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
                                          <span>Pick a submitted date</span>
                                        )}
                                        <ChevronDownIcon />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
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
                      </div>
                    ))}

                    {/* Add more assignees */}
                    <Button
                      type="button"
                      variant="outline"
                      className="my-5 w-full border-dashed"
                      onClick={() =>
                        append({
                          assigneeType: "unit",
                          assigneeName: "",
                          assignOn: undefined as unknown as Date,
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Responsible Person / Unit
                    </Button>

                    {/* Show root-level assignees error */}
                    {formAssignee.formState.errors.assignee?.root && (
                      <p className="text-sm text-destructive">
                        {formAssignee.formState.errors.assignee.root.message}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </FieldGroup>

            {/* ── Navigation buttons ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between p-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
                className="shadow"
              >
                Back
              </Button>

              <div className="flex gap-3">
                {step === 1 && (
                  <Button
                    type="button"
                    className="shadow"
                    onClick={handleNextToStep2}
                  >
                    Next: HOI Approval
                  </Button>
                )}
                {step === 2 && (
                  <Button
                    type="button"
                    className="shadow"
                    onClick={handleNextToStep3}
                  >
                    Next: Assign Responsible
                  </Button>
                )}
                {step === 3 && <Button type="submit">Submit Complaint</Button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
