import { Suspense } from "react"
import Header from "@/components/Header"
import NavigationWithCategories from "@/components/NavigationWithCategories"
import Footer from "@/components/Footer"
import ArticleList from "@/components/ArticleList"
import SimpleSearchBox from "@/components/SimpleSearchBox"
import { getLatestArticles, getCategories, testConnection } from "@/lib/data"

// Loading component
function ArticleListSkeleton() {
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

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// Sidebar component with categories
async function Sidebar() {
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

// Main articles component
async function MainContent() {
  try {
    // Test database connection first
    const isConnected = await testConnection()
    if (!isConnected) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold">Database Connection Error</h3>
          <p>Unable to connect to the database. Please check your configuration.</p>
        </div>
      )
    }

    const articles = await getLatestArticles(7)

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Artikel Terbaru</h2>
        <ArticleList articles={articles} />
      </div>
    )
  } catch (error) {
    console.error("Error loading articles:", error)
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <h3 className="font-bold">Error Loading Articles</h3>
        <p>There was an error loading the articles. Please try again later.</p>
        <details className="mt-2">
          <summary className="cursor-pointer">Error Details</summary>
          <pre className="text-xs mt-2 bg-yellow-50 p-2 rounded">{error.message}</pre>
        </details>
      </div>
    )
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <NavigationWithCategories />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<ArticleListSkeleton />}>
              <MainContent />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Suspense fallback={<SidebarSkeleton />}>
              <Sidebar />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
