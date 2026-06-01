"use client"

export type Status = "Active" | "Disable"

export type Category = {
  id: number
  title: string
  description?: string
  activeState: Status
}

export const category: Category[] = [
  {
    id: 1,
    title: "Administrative",
    description: "",
    activeState: "Active",
  },
  {
    id: 2,
    title: "Equipments",
    description: "",
    activeState: "Active",
  },
  {
    id: 3,
    title: "Maintaianance",
    description: "",
    activeState: "Active",
  },
  {
    id: 4,
    title: "Medical",
    description: "",
    activeState: "Active",
  },
  {
    id: 5,
    title: "Others",
    description: "",
    activeState: "Active",
  },
]
