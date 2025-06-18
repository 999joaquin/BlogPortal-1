"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ArticleList from "./ArticleList"
import Pagination from "./Pagination"

interface SearchResultsProps {
  query: string
  category: string
  page: number
}

interface SearchData {
  articles: any[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  query: string
  category: string
}

export default function SearchResults({ query, category, page }: SearchResultsProps) {
  const [data, setData] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (query && query.trim().length >= 2) {
      performSearch()
    } else if (query && query.trim().length < 2) {
      setError("Search query must be at least 2 characters long")
      setData(null)
    } else {
      setData(null)
      setError(null)
    }
  }, [query, category, page])

  const performSearch = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: "10",
      })

      if (category !== "all") {
        params.append("category", category)
      }

      const response = await fetch(`/api/search?${params}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Search failed")
      }
    } catch (err) {
      console.error("Search error:", err)
      setError("An error occurred while searching")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams()
    params.set("q", query)
    params.set("page", newPage.toString())
    if (category !== "all") {
      params.set("category", category)
    }
    router.push(`/search?${params}`)
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          <p>Masukkan kata kunci untuk mencari artikel</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h3 className="font-bold">Search Error</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (!data || data.articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          <p>Tidak ada artikel yang ditemukan untuk "{query}"</p>
          <p className="text-sm mt-2">Coba gunakan kata kunci yang berbeda atau lebih umum</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">
          Ditemukan <strong>{data.pagination.total}</strong> artikel untuk "{data.query}"
          {data.category !== "all" && ` dalam kategori "${data.category}"`}
        </p>
      </div>

      <ArticleList articles={data.articles} />

      {data.pagination.totalPages > 1 && (
        <Pagination
          currentPage={data.pagination.page}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
          hasNext={data.pagination.hasNext}
          hasPrev={data.pagination.hasPrev}
        />
      )}
    </div>
  )
}
