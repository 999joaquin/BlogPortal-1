import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import AdminLayout from "@/components/admin/AdminLayout"
import ArticleManager from "@/components/admin/ArticleManager"

export default async function ArticlesPage() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Kelola Artikel</h1>
        <ArticleManager />
      </div>
    </AdminLayout>
  )
}
