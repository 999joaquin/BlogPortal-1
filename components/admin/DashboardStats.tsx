"use client"

import { useState, useEffect } from "react"

interface Stats {
  articles: number
  categories: number
  authors: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({ articles: 0, categories: 0, authors: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats")
        const result = await response.json()

        if (result.success) {
          setStats(result.data)
        } else {
          console.error("Error fetching stats:", result.error)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Artikel</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">{stats.articles}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Kategori</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">{stats.categories}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Total Penulis</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">{stats.authors}</p>
      </div>
    </div>
  )
}
