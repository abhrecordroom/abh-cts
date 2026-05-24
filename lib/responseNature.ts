"use client"

export type Status = "Active" | "Disable"

export type ResponseNature = {
  id: number
  title: string
  description: string
  activeState: Status
}

export const responseNatures: ResponseNature[] = [
  {
    id: 1,
    title: "Emergency",
    description: "Within 2 Days",
    activeState: "Active",
  },
  {
    id: 2,
    title: "Urgent",
    description: "Within 3-7 Days",
    activeState: "Active",
  },
  {
    id: 3,
    title: "Not Urgent",
    description: "Within 14 Days",
    activeState: "Active",
  },
  {
    id: 4,
    title: "Routine",
    description: "Within 3 Days",
    activeState: "Disable",
  },
]
