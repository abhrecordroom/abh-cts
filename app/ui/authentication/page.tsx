"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
// import Dashboard from "@/app/ui/(dashboard)/page"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import Logo from "@/public/logo.png"
import Image from "next/image"
import { useForm } from "react-hook-form"

type FormValues = {
  username: string
  password: string
}

function Page() {
  const { register, handleSubmit } = useForm<FormValues>()
  const uname = "admin"
  const pass = "admin"
  const onSubmit = (data: FormValues) => {
    // alert(data.password)
    if (uname === data.username && pass === data.password) {
      router.push("/ui/references/category")
    } else {
      alert("Invalid Credentials")
    }
  }
  const router = useRouter()

  //   const Login = (e: React.FormEvent<HTMLFormElement>) => {
  //     const username = "test"
  //     const password = "test"

  //     router.push("/ui/references/category")
  //   }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* <Button onClick={handleNavigation}>Navigate to Dahboard</Button> */}
      <div className="h-1/2 w-1/4 rounded-2xl border-10 bg-emerald-500 p-3 shadow-2xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-bold">Login</h1>
          <Image src={Logo} alt="logo" width={100} height={100} />
          <p className="text-sm text-emerald-100">
            Correspondence Tracking System
          </p>
          <form action="">
            <Input
              {...register("username")}
              type="text"
              name="username"
              placeholder="Enter the username"
            />
            <Input
              {...register("password")}
              type="password"
              name="password"
              placeholder="enter the password"
            />
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
