import z from "zod"

// Validation for Correspondence form
export const formSchema = z.object({
  submittedOn: z.date({ error: "Sumited date is required" }),
  pageNo: z.string().min(1, "Page no is required"),
  unit: z.string().min(1, "Please select a unit"),
  inchargeName: z.string().min(1, "Incharge name is required"),
  corresTitle: z.string().min(1, "Title is required"),
  corresDescription: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Please select category"),
  responseNature: z.enum(["Emergency", "Urgent", "Not-urgent"], {
    error: "Please select response nature",
  }),

  approvedOn: z.date({ error: "HOI apporved date is required" }),
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
  unitName: z.string().min(1, "Unit name is required"),
  unitCode: z.string().min(1, "Unit code is required"),
  unitDescription: z.string(),
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
      assigneeType: z.string().min(1, "Assigee Type is Required"),
      assigneeName: z.string().min(1, "Category is Required"),
      assignOn: z.date({ error: "Sumited Date is required" }),
    })
  ),
})

export type assigneeFormSchemaType = z.infer<typeof assigneeFormSchema>

// References/responseNature
export const resposeNatureFormSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  description: z.string(),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type resposeNatureFormSchemaType = z.infer<
  typeof resposeNatureFormSchema
>
