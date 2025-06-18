import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import AdminLayout from "@/components/admin/AdminLayout"
import DashboardStats from "@/components/admin/DashboardStats"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DashboardStats />
      </div>
    </AdminLayout>
  )
}
