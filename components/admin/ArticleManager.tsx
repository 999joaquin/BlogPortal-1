"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image_url?: string
  author_id: number
  author_name: string
  category_id: number
  category_name: string
  status: "draft" | "published"
  created_at: string
}

interface Author {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    author_id: 1,
    category_id: 1,
    status: "draft" as "draft" | "published",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch articles
      const articlesRes = await fetch("/api/admin/articles")
      const articlesData = await articlesRes.json()

      // Fetch authors
      const authorsRes = await fetch("/api/admin/authors")
      const authorsData = await authorsRes.json()

      // Fetch categories
      const categoriesRes = await fetch("/api/admin/categories")
      const categoriesData = await categoriesRes.json()

      if (articlesData.success && authorsData.success && categoriesData.success) {
        setArticles(articlesData.data)
        setAuthors(authorsData.data)
        setCategories(categoriesData.data)

        // Set default author and category if available
        if (authorsData.data.length > 0) {
          setFormData((prev) => ({ ...prev, author_id: authorsData.data[0].id }))
        }
        if (categoriesData.data.length > 0) {
          setFormData((prev) => ({ ...prev, category_id: categoriesData.data[0].id }))
        }
      } else {
        console.error("Error fetching data")
        alert("Error loading data")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      alert("Error loading data")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let response

      if (editingArticle) {
        // Update existing article
        response = await fetch("/api/admin/articles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingArticle.id, ...formData }),
        })
      } else {
        // Create new article
        response = await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      const result = await response.json()

      if (result.success) {
        setShowForm(false)
        setEditingArticle(null)
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          image_url: "",
          author_id: authors[0]?.id || 1,
          category_id: categories[0]?.id || 1,
          status: "draft",
        })
        fetchData()
      } else {
        throw new Error(result.error || "Unknown error")
      }
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Error saving article: " + error.message)
    }
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      image_url: article.image_url || "",
      author_id: article.author_id,
      category_id: article.category_id,
      status: article.status,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus artikel ini?")) {
      try {
        const response = await fetch(`/api/admin/articles?id=${id}`, {
          method: "DELETE",
        })

        const result = await response.json()

        if (result.success) {
          fetchData()
        } else {
          throw new Error(result.error || "Unknown error")
        }
      } catch (error) {
        console.error("Error deleting article:", error)
        alert("Error deleting article: " + error.message)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Artikel</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Artikel</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kutipan</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Konten</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={10}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Penulis</label>
                <select
                  value={formData.author_id}
                  onChange={(e) => setFormData({ ...formData, author_id: Number.parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: Number.parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {editingArticle ? "Update" : "Simpan"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingArticle(null)
                  setFormData({
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    image_url: "",
                    author_id: authors[0]?.id || 1,
                    category_id: categories[0]?.id || 1,
                    status: "draft",
                  })
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penulis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="max-w-xs truncate">{article.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.category_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      article.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(article.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <a
                      href={`/artikel/${article.slug}`}
                      target="_blank"
                      className="text-green-600 hover:text-green-900"
                      rel="noreferrer"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button onClick={() => handleEdit(article)} className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900">
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
