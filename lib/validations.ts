import z from "zod"

// Validation for Correspondence form
export const formSchema = z.object({
  submittedOn: z.date({ error: "Sumited Date is required" }),

  pageNo: z.string().min(1, "Page no is required"),

  unit: z.string().min(1, "Please select a unit"),

  inchargeName: z
    .string()
    .min(3, "Name must be at least 5 characters")
    .max(32, "Name must be at most 32 characters"),

  corresTitle: z
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(100, "Name must be at most 100 characters"),

  corresDescription: z
    .string()
    .min(5, "Description must be at least 10 characters")
    .max(500, "Name must be at most 100 characters"),

  category: z.string().min(1, "Please select category"),

  responseNature: z.enum(["Emergency", "Urgent", "Not-urgent"], {
    error: "Please select response nature",
  }),

  approvedOn: z.date({
    error: "HOI Apporved Date is required",
  }),
})

export type formSchemaType = z.infer<typeof formSchema>

// Validation for Designation form
export const designationFormSchema = z.object({
  designationName: z.string().min(1, "Name of designation required"),
  designationCode: z.string().min(1, "Code of designation required"),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type designationFormSchemaType = z.infer<typeof designationFormSchema>

// Validation for unit/ward form
export const unitFormSchema = z.object({
  unitName: z.string().min(1, "Name of unit required"),
  unitCode: z.string().min(1, "Code of unit required"),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type unitFormSchemaType = z.infer<typeof unitFormSchema>

// Validation for category
export const categoryFormSchema = z.object({
  categoryName: z.string().min(1, "Category is Required"),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type categoryFormSchemaType = z.infer<typeof categoryFormSchema>

// Validation for Assignee
export const assigneeFormSchema = z.object({
  assignee: z.array(
    z.object({
      assigneeName: z.string().min(1, "Category is Required"),
      assignOn: z.date({ error: "Sumited Date is required" }),
    })
  ),
})

export type assigneeFormSchemaType = z.infer<typeof assigneeFormSchema>
