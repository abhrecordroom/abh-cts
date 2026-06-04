"use client"

export type Status = "Active" | "Disable"

export type HoiResponse = {
  id: number
  title: string
  description?: string
  activeState: Status
}

export const hoiResponse: HoiResponse[] = [
  {
    id: 1,
    title: "Emergency",
    description: "",
    activeState: "Active",
  },
  {
    id: 2,
    title: "Urgent",
    description: "",
    activeState: "Active",
  },
  {
    id: 3,
    title: "Not Urgent",
    description: "",
    activeState: "Active",
  },
  {
    id: 4,
    title: "Routine",
    description: "",
    activeState: "Disable",
  },
]
