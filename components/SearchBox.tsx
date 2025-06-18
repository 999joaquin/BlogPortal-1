"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface SearchBoxProps {
  initialQuery?: string
  className?: string
}

export default function SearchBox({ initialQuery = "", className = "" }: SearchBoxProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length >= 2) {
      const params = new URLSearchParams()
      params.set("q", query.trim())
      router.push(`/search?${params.toString()}`)
    }
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <h3 className="font-bold mb-3">Pencarian</h3>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari artikel..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          minLength={2}
        />
        <button
          type="submit"
          disabled={query.trim().length < 2}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
      {query.trim().length > 0 && query.trim().length < 2 && (
        <p className="text-sm text-red-600 mt-1">Minimal 2 karakter untuk pencarian</p>
      )}
    </div>
  )
}
