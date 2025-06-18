import { Suspense } from "react"
import Link from "next/link"
import CategoryDropdown from "./CategoryDropdown"
import { getCategories } from "@/lib/data"

// Loading fallback for the dropdown
function CategoryDropdownSkeleton() {
  return (
    <div className="flex items-center space-x-1 text-blue-200">
      <span>Kategori</span>
      <div className="w-4 h-4 bg-blue-200 rounded animate-pulse"></div>
    </div>
  )
}

// Server component that fetches categories
async function CategoryDropdownWithData() {
  try {
    const categories = await getCategories()
    return <CategoryDropdown categories={categories} />
  } catch (error) {
    console.error("Error loading categories for dropdown:", error)
    // Fallback to static links if categories can't be loaded
    return (
      <div className="relative group">
        <span className="flex items-center space-x-1 hover:text-blue-200 transition-colors cursor-pointer">
          <span>Kategori</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <Link href="/kategori/teknologi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
            Teknologi
          </Link>
          <Link href="/kategori/programming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
            Programming
          </Link>
          <Link href="/kategori/tutorial" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
            Tutorial
          </Link>
        </div>
      </div>
    )
  }
}

export default function NavigationWithCategories() {
  return (
    <nav className="bg-blue-700 text-white">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6 py-4">
          <li>
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Beranda
            </Link>
          </li>
          <li>
            <Suspense fallback={<CategoryDropdownSkeleton />}>
              <CategoryDropdownWithData />
            </Suspense>
          </li>
          <li>
            <Link href="/admin" className="hover:text-blue-200 transition-colors">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
