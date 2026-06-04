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
    name: "S. Vithushan",
    unit_name: "Record Room",
    designation: "ICT Assistant",
    phone_no: "077 5265286",
    email: "vithushoff@gmail.com",
    activeState: "Active",
  },
  {
    id: 2,
    title: "Ms",
    name: "A. Kavitha",
    unit_name: "Administration",
    designation: "Clerk",
    phone_no: "071 2345678",
    email: "kavitha.admin@gmail.com",
    activeState: "Active",
  },
  {
    id: 3,
    title: "Mr",
    name: "R. Suresh",
    unit_name: "Accounts",
    designation: "Accountant",
    phone_no: "076 8899456",
    email: "suresh.accounts@gmail.com",
    activeState: "Disable",
  },
  {
    id: 4,
    title: "Mrs",
    name: "P. Niroshini",
    unit_name: "HR Division",
    designation: "HR Officer",
    phone_no: "075 3322114",
    email: "niroshini.hr@gmail.com",
    activeState: "Active",
  },
  {
    id: 5,
    title: "Mr",
    name: "K. Pradeep",
    unit_name: "IT Unit",
    designation: "System Administrator",
    phone_no: "072 9988776",
    email: "pradeep.it@gmail.com",
    activeState: "Active",
  },
  {
    id: 6,
    title: "Ms",
    name: "S. Tharshini",
    unit_name: "Planning Unit",
    designation: "Planning Officer",
    phone_no: "078 4455667",
    email: "tharshini.plan@gmail.com",
    activeState: "Disable",
  },
  {
    id: 7,
    title: "Mr",
    name: "M. Aravind",
    unit_name: "Stores",
    designation: "Store Keeper",
    phone_no: "070 5566778",
    email: "aravind.store@gmail.com",
    activeState: "Active",
  },
  {
    id: 8,
    title: "Mrs",
    name: "J. Malathi",
    unit_name: "Medical Records",
    designation: "Record Officer",
    phone_no: "074 2233445",
    email: "malathi.records@gmail.com",
    activeState: "Active",
  },
  {
    id: 9,
    title: "Mr",
    name: "N. Sanjeevan",
    unit_name: "Maintenance",
    designation: "Technical Officer",
    phone_no: "077 8899001",
    email: "sanjeev.maint@gmail.com",
    activeState: "Disable",
  },
  {
    id: 10,
    title: "Ms",
    name: "L. Poornima",
    unit_name: "Out Patient Dept",
    designation: "Data Entry Operator",
    phone_no: "071 6655443",
    email: "poornima.opd@gmail.com",
    activeState: "Active",
  },
]
