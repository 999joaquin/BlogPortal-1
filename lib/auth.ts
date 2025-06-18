import { cookies } from "next/headers"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

export async function login(username: string, password: string): Promise<boolean> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return true
  }
  return false
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  return session?.value === "authenticated"
}
