import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface RelatedArticlesProps {
  articles: Array<{
    id: number
    title: string
    slug: string
    created_at: string
  }>
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-3">Artikel Terkait</h3>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/artikel/${article.slug}`} className="block text-sm hover:text-blue-600 transition-colors">
              <h4 className="font-medium line-clamp-2 mb-1">{article.title}</h4>
              <p className="text-xs text-gray-500">{formatDate(article.created_at)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
