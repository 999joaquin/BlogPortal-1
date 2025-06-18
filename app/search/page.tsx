import { Suspense } from "react"
import Header from "@/components/Header"
import NavigationWithCategories from "@/components/NavigationWithCategories"
import Footer from "@/components/Footer"
import SearchResults from "@/components/SearchResults"
import SearchSidebar from "@/components/SearchSidebar"
import { getCategories } from "@/lib/data"

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
    page?: string
  }
}

function SearchResultsSkeleton() {
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

async function Sidebar() {
  try {
    const categories = await getCategories()
    return <SearchSidebar categories={categories} />
  } catch (error) {
    console.error("Error loading sidebar:", error)
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-red-600">Error loading sidebar data</p>
      </div>
    )
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const category = searchParams.category || "all"
  const page = Number.parseInt(searchParams.page || "1")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <NavigationWithCategories />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {query ? `Hasil Pencarian: "${query}"` : "Pencarian Artikel"}
          </h1>
          {query && (
            <p className="text-gray-600 mt-2">
              Menampilkan hasil pencarian untuk "{query}"{category !== "all" && ` dalam kategori "${category}"`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} category={category} page={page} />
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
