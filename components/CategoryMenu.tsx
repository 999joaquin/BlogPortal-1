import Link from "next/link"

interface CategoryMenuProps {
  categories: Array<{
    id: number
    name: string
    slug: string
    article_count?: number
  }>
}

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-3">Kategori</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/kategori/${category.slug}`}
              className="flex justify-between items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span>{category.name}</span>
              {category.article_count && <span className="text-sm text-gray-500">({category.article_count})</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
