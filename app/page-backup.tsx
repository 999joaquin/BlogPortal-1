import { Suspense } from "react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import ArticleList from "@/components/ArticleList"
import { getLatestArticles, getCategories } from "@/lib/data"

export default async function HomePage() {
  const articles = await getLatestArticles(7)
  const categories = await getCategories()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">Artikel Terbaru</h2>
            <Suspense fallback={<div>Loading articles...</div>}>
              <ArticleList articles={articles} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Sidebar categories={categories} showAbout={true} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
