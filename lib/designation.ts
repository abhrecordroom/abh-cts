"use client"

export type Status = "Active" | "Disable"

export type Designation = {
  id: number
  title: string
  code: string
  activeState: Status
}

export const designation: Designation[] = [
  {
    id: 1,
    title: "Medical superintendent",
    code: "MS",
    activeState: "Active",
  },
  {
    id: 2,
    title: "Administrative Officer",
    code: "AO",
    activeState: "Active",
  },
  {
    id: 3,
    title: "Accountant",
    code: "accountant",
    activeState: "Active",
  },
  {
    id: 4,
    title: "Nursing Officer",
    code: "NO",
    activeState: "Disable",
  },
]
