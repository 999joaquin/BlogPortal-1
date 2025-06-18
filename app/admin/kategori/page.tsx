import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import AdminLayout from "@/components/admin/AdminLayout"
import CategoryManager from "@/components/admin/CategoryManager"

export default async function CategoriesPage() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Kelola Kategori</h1>
        <CategoryManager />
      </div>
    </AdminLayout>
  )
}
