import { notFound } from "next/navigation"
import Header from "@/components/Header"
import NavigationWithCategories from "@/components/NavigationWithCategories"
import Footer from "@/components/Footer"
import ArticleList from "@/components/ArticleList"
import SimpleSearchBox from "@/components/SimpleSearchBox"
import { getArticlesByCategory, getCategoryBySlug, getCategories } from "@/lib/data"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Sidebar component for category pages
async function CategorySidebar() {
  try {
    const categories = await getCategories()

    return (
      <div className="space-y-6">
        <SimpleSearchBox />

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-3">Kategori</h3>
          <ul className="space-y-2">
            {categories.map((category: any) => (
              <li key={category.id}>
                <a
                  href={`/kategori/${category.slug}`}
                  className="flex justify-between items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500">({category.article_count})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-3">Tentang</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Portal Blog Indonesia adalah platform yang menyediakan informasi terkini seputar banyak kategori.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">© 2025 Portal Blog Indonesia</p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading sidebar:", error)
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-red-600">Error loading sidebar data</p>
      </div>
    )
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const category = await getCategoryBySlug(params.slug)

    if (!category) {
      notFound()
    }

    const articles = await getArticlesByCategory(category.id)

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <NavigationWithCategories />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Kategori: {category.name}</h1>
                {category.description && <p className="text-gray-600 mt-2">{category.description}</p>}
                <p className="text-sm text-gray-500 mt-2">Ditemukan {articles.length} artikel dalam kategori ini</p>
              </div>

              <ArticleList articles={articles} />
            </div>

            <div className="lg:col-span-1">
              <CategorySidebar />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading category page:", error)
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <NavigationWithCategories />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h3 className="font-bold">Error Loading Category</h3>
            <p>There was an error loading this category page.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
