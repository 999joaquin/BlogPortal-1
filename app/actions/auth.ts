"use server"

import { redirect } from "next/navigation"
import { login, logout } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const success = await login(username, password)

  if (success) {
    redirect("/admin/dashboard")
  } else {
    return { error: "Username atau password salah" }
  }
}

export async function logoutAction() {
  await logout()
  redirect("/admin/login")
}
