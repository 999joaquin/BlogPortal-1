import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import AdminLayout from "@/components/admin/AdminLayout"
import AuthorManager from "@/components/admin/AuthorManager"

export default async function AuthorsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Kelola Penulis</h1>
        <AuthorManager />
      </div>
    </AdminLayout>
  )
}
