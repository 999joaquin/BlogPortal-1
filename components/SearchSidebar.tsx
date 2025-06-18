"use client"

import { useRouter, useSearchParams } from "next/navigation"
import SearchBox from "./SearchBox"

interface Category {
  id: number
  name: string
  slug: string
  article_count?: number
}

interface SearchSidebarProps {
  categories: Category[]
}

export default function SearchSidebar({ categories }: SearchSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get("q") || ""
  const currentCategory = searchParams.get("category") || "all"

  const handleCategoryFilter = (categorySlug: string) => {
    const params = new URLSearchParams()
    if (currentQuery) {
      params.set("q", currentQuery)
    }
    if (categorySlug !== "all") {
      params.set("category", categorySlug)
    }
    params.set("page", "1") // Reset to first page

    const queryString = params.toString()
    router.push(`/search${queryString ? `?${queryString}` : ""}`)
  }

  return (
    <div className="space-y-6">
      <SearchBox initialQuery={currentQuery} />

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-3">Filter by Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`block w-full text-left px-2 py-1 rounded transition-colors ${
                currentCategory === "all"
                  ? "bg-blue-100 text-blue-800 font-medium"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryFilter(category.slug)}
                className={`flex justify-between items-center w-full text-left px-2 py-1 rounded transition-colors ${
                  currentCategory === category.slug
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span>{category.name}</span>
                {category.article_count && <span className="text-sm text-gray-500">({category.article_count})</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-3">Search Tips</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use specific keywords for better results</li>
          <li>• Try different variations of your search terms</li>
          <li>• Use category filters to narrow down results</li>
          <li>• Search terms must be at least 2 characters long</li>
        </ul>
      </div>
    </div>
  )
}
