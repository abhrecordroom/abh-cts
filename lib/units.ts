"use client"

export type Status = "Active" | "Disable"

export type Unit = {
  id: number
  title: string
  code: string
  description?: string
  activeState: Status
}

export const unit: Unit[] = [
  {
    id: 1,
    code: "01",
    title: "Ward 01",
    description: "",
    activeState: "Active",
  },
  {
    id: 2,
    code: "02",
    title: "Ward 02",
    description: "",
    activeState: "Active",
  },
  {
    id: 3,
    code: "03",
    title: "Ward 03",
    description: "",
    activeState: "Active",
  },
  {
    id: 4,
    code: "04",
    title: "Ward 04",
    description: "",
    activeState: "Active",
  },
  {
    id: 5,
    code: "05",
    title: "Ward 05",
    description: "",
    activeState: "Active",
  },
  {
    id: 6,
    code: "06",
    title: "Ward 06",
    description: "",
    activeState: "Active",
  },
  {
    id: 7,
    code: "07",
    title: "Ward 07",
    description: "",
    activeState: "Active",
  },
  {
    id: 8,
    code: "08",
    title: "Ward 08",
    description: "",
    activeState: "Active",
  },
  {
    id: 9,
    code: "09",
    title: "Ward 09",
    description: "",
    activeState: "Active",
  },
  {
    id: 10,
    code: "MBU",
    title: "Mother & Baby Unit",
    description: "",
    activeState: "Active",
  },
]
