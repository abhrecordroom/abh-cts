"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, UserPlus, Building2, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// ─── Zod Schema ────────────────────────────────────────────────────────────────

const assigneeSchema = z.object({
  type: z.enum(["person", "unit"], { required_error: "Select person or unit" }),
  name: z.string().min(1, "Name / unit is required"),
  responseOnDate: z.date({ required_error: "Response-on date is required" }),
});

const complaintSchema = z.object({
  // ── Core fields
  submittedDate: z.date({ required_error: "Submitted date is required" }),
  bookPageNo: z.string().min(1, "Book / page no. is required"),
  unit: z.string().min(1, "Unit is required"),
  inChargeName: z.string().min(1, "In-charge name is required"),
  complaintTitle: z.string().min(3, "Complaint title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  natureOfResponse: z.string({ required_error: "Nature of response is required" }),

  // ── HOD approval
  hodApprovedDate: z.date({ required_error: "HOD approved date is required" }),

  // ── Assignees (added after HOD approval)
  assignees: z
    .array(assigneeSchema)
    .min(1, "At least one responsible person or unit must be assigned"),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;

// ─── Static options ────────────────────────────────────────────────────────────

const UNITS = ["Engineering", "Finance", "HR", "IT", "Legal", "Maintenance", "Operations", "Procurement"];
const INCHARGE_NAMES = ["Dr. A. Perera", "Mr. B. Silva", "Ms. C. Fernando", "Mrs. D. Jayasinghe", "Mr. E. Bandara"];
const NATURE_OPTIONS = ["Complaint", "Request", "Suggestion", "Inquiry", "Grievance"];
const ASSIGNEE_NAMES = ["Mr. F. Gunawardena", "Ms. G. Rathnayake", "Mr. H. Weerasinghe", "Mrs. I. Seneviratne", "Mr. J. Dissanayake"];

// ─── Date Picker helper ────────────────────────────────────────────────────────

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
}: {
  value?: Date;
  onChange: (d: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

// ─── Step indicator ────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Complaint Details" },
  { id: 2, label: "HOD Approval" },
  { id: 3, label: "Assign Responsible" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-8 h-8 text-sm font-semibold border-2 transition-colors",
              current === step.id
                ? "bg-primary text-primary-foreground border-primary"
                : current > step.id
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-background text-muted-foreground border-muted-foreground"
            )}
          >
            {current > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.id}
          </div>
          <span
            className={cn(
              "text-sm font-medium hidden sm:block",
              current === step.id ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "h-px w-8 sm:w-16 mx-1",
                current > step.id ? "bg-emerald-500" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ComplaintForm() {
  const [step, setStep] = useState(1);

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      bookPageNo: "",
      unit: "",
      inChargeName: "",
      complaintTitle: "",
      description: "",
      assignees: [{ type: "person", name: "", responseOnDate: undefined as unknown as Date }],
    },
    mode: "onTouched",
  });

  🔖
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "assignees",
  });

  🔖
  // ── Validate step-1 fields before advancing
  const handleNextToStep2 = async () => {
    const ok = await form.trigger([
      "submittedDate",
      "bookPageNo",
      "unit",
      "inChargeName",
      "complaintTitle",
      "description",
      "natureOfResponse",
    ]);
    if (ok) setStep(2);
  };

  // ── Validate HOD date before advancing
  const handleNextToStep3 = async () => {
    const ok = await form.trigger(["hodApprovedDate"]);
    if (ok) setStep(3);
  };

  const onSubmit = (values: ComplaintFormValues) => {
    console.log("Complaint submitted:", values);
    // TODO: send to your API
    alert("Complaint submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Complaint Registration</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in the details below. After HOD approval, assign one or more responsible persons / units.
          </p>
        </div>

        <StepIndicator current={step} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* ════════════════════════════════════════
                STEP 1 — Complaint Details
            ════════════════════════════════════════ */}
            {step === 1 && (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Complaint Details</CardTitle>
                  </div>
                  <CardDescription>Basic information about the complaint</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Row 1: Submitted Date + Book Page No */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="submittedDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Submitted Date <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <DatePicker value={field.value} onChange={field.onChange} placeholder="Select submitted date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bookPageNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Book / Page No. <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. BK-04 / P-112" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 2: Unit + In-charge Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit <span className="text-destructive">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {UNITS.map((u) => (
                                <SelectItem key={u} value={u}>{u}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inChargeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>In-charge Name <span className="text-destructive">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select in-charge" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INCHARGE_NAMES.map((n) => (
                                <SelectItem key={n} value={n}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Complaint Title */}
                  <FormField
                    control={form.control}
                    name="complaintTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complaint Title <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Short descriptive title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the complaint in detail…"
                            className="min-h-[110px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nature of Response */}
                  <FormField
                    control={form.control}
                    name="natureOfResponse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nature of Response <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nature" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {NATURE_OPTIONS.map((n) => (
                              <SelectItem key={n} value={n}>{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* ════════════════════════════════════════
                STEP 2 — HOD Approval
            ════════════════════════════════════════ */}
            {step === 2 && (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Head of Department Approval</CardTitle>
                  </div>
                  <CardDescription>
                    Record the date the Head of Department approved this complaint
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Summary of step-1 */}
                  <div className="rounded-lg border bg-muted/40 p-4 space-y-2 text-sm">
                    <p className="font-semibold text-foreground mb-1">Complaint Summary</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                      <span>Title:</span>
                      <span className="text-foreground font-medium">{form.getValues("complaintTitle")}</span>
                      <span>Unit:</span>
                      <span className="text-foreground font-medium">{form.getValues("unit")}</span>
                      <span>In-charge:</span>
                      <span className="text-foreground font-medium">{form.getValues("inChargeName")}</span>
                      <span>Book / Page:</span>
                      <span className="text-foreground font-medium">{form.getValues("bookPageNo")}</span>
                      <span>Nature:</span>
                      <span>
                        <Badge variant="secondary">{form.getValues("natureOfResponse")}</Badge>
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="hodApprovedDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HOD Approved Date <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select HOD approval date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* ════════════════════════════════════════
                STEP 3 — Assign Responsible Persons / Units
            ════════════════════════════════════════ */}
            {step === 3 && (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Assign Responsible Persons / Units</CardTitle>
                  </div>
                  <CardDescription>
                    System Administrator assigns one or more responsible persons or units and sets the
                    expected "Response On" date for each.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="rounded-lg border bg-card p-4 space-y-4 relative"
                    >
                      {/* Assignee badge */}
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-semibold">
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

                      {/* Type: Person or Unit */}
                      <FormField
                        control={form.control}
                        name={`assignees.${index}.type`}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormLabel>Assignee Type <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={f.onChange}
                                defaultValue={f.value}
                                className="flex gap-6"
                              >
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="person" id={`person-${index}`} />
                                  <Label htmlFor={`person-${index}`} className="flex items-center gap-1 cursor-pointer">
                                    <UserPlus className="w-4 h-4" /> Person
                                  </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="unit" id={`unit-${index}`} />
                                  <Label htmlFor={`unit-${index}`} className="flex items-center gap-1 cursor-pointer">
                                    <Building2 className="w-4 h-4" /> Unit
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Name / Unit selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`assignees.${index}.name`}
                          render={({ field: f }) => {
                            const isUnit = form.watch(`assignees.${index}.type`) === "unit";
                            return (
                              <FormItem>
                                <FormLabel>
                                  {isUnit ? "Unit" : "Person Name"}{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <Select onValueChange={f.onChange} defaultValue={f.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={isUnit ? "Select unit" : "Select person"} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {(isUnit ? UNITS : ASSIGNEE_NAMES).map((item) => (
                                      <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />

                        {/* Response On Date — set by System Administrator */}
                        <FormField
                          control={form.control}
                          name={`assignees.${index}.responseOnDate`}
                          render={({ field: f }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                Response On Date{" "}
                                <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <DatePicker
                                  value={f.value}
                                  onChange={f.onChange}
                                  placeholder="Set response date"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add more assignees */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() =>
                      append({ type: "person", name: "", responseOnDate: undefined as unknown as Date })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Responsible Person / Unit
                  </Button>

                  {/* Show root-level assignees error */}
                  {form.formState.errors.assignees?.root && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.assignees.root.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* ── Navigation buttons ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
              >
                Back
              </Button>

              <div className="flex gap-3">
                {step === 1 && (
                  <Button type="button" onClick={handleNextToStep2}>
                    Next: HOD Approval
                  </Button>
                )}
                {step === 2 && (
                  <Button type="button" onClick={handleNextToStep3}>
                    Next: Assign Responsible
                  </Button>
                )}
                {step === 3 && (
                  <Button type="submit">
                    Submit Complaint
                  </Button>
                )}
              </div>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}