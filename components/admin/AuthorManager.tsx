"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Author {
  id: number
  name: string
  email: string
  bio?: string
}

export default function AuthorManager() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/authors")
      const result = await response.json()

      if (result.success) {
        setAuthors(result.data)
      } else {
        throw new Error(result.error || "Unknown error")
      }
    } catch (error) {
      console.error("Error fetching authors:", error)
      alert("Error loading authors: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let response

      if (editingAuthor) {
        // Update existing author
        response = await fetch("/api/admin/authors", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingAuthor.id, ...formData }),
        })
      } else {
        // Create new author
        response = await fetch("/api/admin/authors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      const result = await response.json()

      if (result.success) {
        setShowForm(false)
        setEditingAuthor(null)
        setFormData({ name: "", email: "", bio: "" })
        fetchAuthors()
      } else {
        throw new Error(result.error || "Unknown error")
      }
    } catch (error) {
      console.error("Error saving author:", error)
      alert("Error saving author: " + error.message)
    }
  }

  const handleEdit = (author: Author) => {
    setEditingAuthor(author)
    setFormData({
      name: author.name,
      email: author.email,
      bio: author.bio || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus penulis ini?")) {
      try {
        const response = await fetch(`/api/admin/authors?id=${id}`, {
          method: "DELETE",
        })

        const result = await response.json()

        if (result.success) {
          fetchAuthors()
        } else {
          throw new Error(result.error || "Unknown error")
        }
      } catch (error) {
        console.error("Error deleting author:", error)
        alert("Error deleting author: " + error.message)
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Penulis</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Penulis</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{editingAuthor ? "Edit Penulis" : "Tambah Penulis Baru"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {editingAuthor ? "Update" : "Simpan"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingAuthor(null)
                  setFormData({ name: "", email: "", bio: "" })
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{author.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{author.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{author.bio || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(author)} className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(author.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
