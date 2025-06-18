import { notFound } from "next/navigation"
import Header from "@/components/Header"
import NavigationWithCategories from "@/components/NavigationWithCategories"
import Footer from "@/components/Footer"
import SimpleSearchBox from "@/components/SimpleSearchBox"
import { getArticleBySlug, getRelatedArticles } from "@/lib/data"
import { formatDate } from "@/lib/utils"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Related articles component
function RelatedArticles({ articles }: { articles: any[] }) {
  if (!articles.length) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-3">Artikel Terkait</h3>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <a href={`/artikel/${article.slug}`} className="block text-sm hover:text-blue-600 transition-colors">
              <h4 className="font-medium line-clamp-2 mb-1">{article.title}</h4>
              <p className="text-xs text-gray-500">{formatDate(article.created_at)}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Article sidebar
function ArticleSidebar({ relatedArticles }: { relatedArticles: any[] }) {
  return (
    <div className="space-y-6">
      <SimpleSearchBox />

      <RelatedArticles articles={relatedArticles} />

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-3">Tentang</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Blog Teknologi Indonesia adalah platform yang menyediakan informasi terkini seputar dunia teknologi,
          programming, dan tutorial untuk para pengembang dan enthusiast teknologi di Indonesia.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">© 2024 Blog Teknologi Indonesia</p>
        </div>
      </div>
    </div>
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
      notFound()
    }

    const relatedArticles = await getRelatedArticles(article.category_id, article.id)

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <NavigationWithCategories />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="bg-white rounded-lg shadow p-8">
                <header className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <span>Oleh: {article.author_name}</span>
                    <span>•</span>
                    <span>{formatDate(article.created_at)}</span>
                    <span>•</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{article.category_name}</span>
                  </div>

                  {article.image_url && (
                    <img
                      src={article.image_url || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                </header>

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>
            </div>

            <div className="lg:col-span-1">
              <ArticleSidebar relatedArticles={relatedArticles} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading article:", error)
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <NavigationWithCategories />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h3 className="font-bold">Error Loading Article</h3>
            <p>There was an error loading this article.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
