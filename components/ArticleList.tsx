import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  image_url?: string
  created_at: string
  author_name: string
  category_name: string
}

interface ArticleListProps {
  articles: Article[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <article key={article.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="md:flex">
            {article.image_url && (
              <div className="md:w-1/3">
                <img
                  src={article.image_url || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
            )}
            <div className={`p-6 ${article.image_url ? "md:w-2/3" : "w-full"}`}>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{article.category_name}</span>
                <span>•</span>
                <span>{formatDate(article.created_at)}</span>
              </div>

              <h2 className="text-xl font-bold mb-2">
                <Link href={`/artikel/${article.slug}`} className="hover:text-blue-600 transition-colors">
                  {article.title}
                </Link>
              </h2>

              <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Oleh: {article.author_name}</span>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
