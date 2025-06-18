import type React from "react"
import Link from "next/link"
import { LogOut, Home, Users, FolderOpen, FileText } from "lucide-react"
import { logoutAction } from "@/app/actions/auth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Lihat Blog
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/penulis"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Users className="w-4 h-4" />
                <span>Penulis</span>
              </Link>
              <Link
                href="/admin/kategori"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Kategori</span>
              </Link>
              <Link
                href="/admin/artikel"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FileText className="w-4 h-4" />
                <span>Artikel</span>
              </Link>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
