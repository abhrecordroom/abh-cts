"use client"

export type Status = "Active" | "Disable"

export type CurrentState = {
  id: number
  title: string
  sortOrder: number
  activeState: Status
}

export const currentState: CurrentState[] = [
  {
    id: 1,
    title: "Completed",
    sortOrder: 1,
    activeState: "Active",
  },
  {
    id: 2,
    title: "OnProgress",
    sortOrder: 2,
    activeState: "Active",
  },
]
