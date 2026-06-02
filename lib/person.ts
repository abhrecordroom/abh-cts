"use client"

export type Status = "Active" | "Disable"

export type Person = {
  id: number
  title: string
  name: string
  unit_name: string
  designation: string
  phone_no: string
  email: string
  activeState: Status
}

export const person: Person[] = [
  {
    id: 1,
    title: "Mr",
    name: "S.Vithushan",
    unit_name: "Record Room",
    designation: "ICT Assistent",
    phone_no: "077 5265286",
    email: "vithushoff@gmail.com",
    activeState: "Active",
  },
]
