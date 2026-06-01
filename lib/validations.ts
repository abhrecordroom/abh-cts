import z from "zod"

/* 
----------------------------------------------------------------
01.UNIT
----------------------------------------------------------------
*/
export const unitSchema = z.object({
  unitName: z.string().min(1, "Unit name is required"),
  unitCode: z.string().min(1, "Unit code is required"),
  unitDescription: z.string(),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})
export type unitSchemaType = z.infer<typeof unitSchema>

/* 
----------------------------------------------------------------
02.PERSON
----------------------------------------------------------------
*/
export const personSchema = z.object({
  unitName: z.string().min(1, "Unit name is required"),
  unitCode: z.string().min(1, "Unit code is required"),
  unitDescription: z.string(),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})
export type personSchemaType = z.infer<typeof personSchema>

/* 
----------------------------------------------------------------
03.DESIGNATION
----------------------------------------------------------------
*/
export const designationSchema = z.object({
  title: z.string().min(1, "Name of designation required"),
  code: z.string().min(1, "Code of designation required"),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type designationSchemaType = z.infer<typeof designationSchema>

/* 
----------------------------------------------------------------
04.USER
----------------------------------------------------------------
*/
export const userSchema = z.object({
  name: z.string().min(1, "Name field is required"),
  email: z.string().min(1, "Email field is required"),
  role: z.string().min(1, "Role field is required"),
  unit_id: z.string().min(1, "Unit field is required"),
  designation_id: z.string().min(1, "Designation field is required"),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type userSchemaType = z.infer<typeof userSchema>

/* 
----------------------------------------------------------------
05.CATEGORY
----------------------------------------------------------------
*/
export const categorySchema = z.object({
  title: z.string().min(1, "Category is Required"),
  description: z.string(),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type categoryFormSchemaType = z.infer<typeof categorySchema>

/* 
----------------------------------------------------------------
06.RESPONSE_PERSON
----------------------------------------------------------------
*/
export const resposeNatureSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  description: z.string(),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type resposeNatureSchemaType = z.infer<typeof resposeNatureSchema>

/* 
----------------------------------------------------------------
07.STATUS
----------------------------------------------------------------
*/
export const statusSchema = z.object({
  title: z.string().min(1, "Category field is Required"),
  sortOrder: z.number().min(1, "Sort order field is Required"),
  description: z.string(),
  activeState: z.enum(["Active", "Disable"], {
    error: "Must select active state",
  }),
})

export type statusSchemaType = z.infer<typeof statusSchema>
/* 
----------------------------------------------------------------
08.COMPLAINT
----------------------------------------------------------------
*/
export const complaintSchema = z.object({
  submittedOn: z.date({ error: "Sumited date field is required" }),
  pageNo: z.string().min(1, "Page no field is required"),
  unit: z.string().min(1, "Unit field is Required"),
  inchargeName: z.string().min(1, "Incharge name field is required"),
  corresTitle: z.string().min(1, "Title field is required"),
  corresDescription: z.string().min(1, "Description field is required"),
  category: z.string().min(1, "Category field is required"),
  responseNature: z.enum(["Emergency", "Urgent", "Not-urgent"], {
    error: "Please select response nature",
  }),

  approvedOn: z.date({ error: "HOI apporved date is required" }),
})

export type complaintSchemaType = z.infer<typeof complaintSchema>

/* 
----------------------------------------------------------------
09.ASSIGNMENT
----------------------------------------------------------------
*/

/* 
----------------------------------------------------------------
10.REVIEW
----------------------------------------------------------------
*/

// Validation for Correspondence form

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
