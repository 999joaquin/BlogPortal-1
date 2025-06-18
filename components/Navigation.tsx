import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="bg-blue-700 text-white">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6 py-4">
          <li>
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/kategori/teknologi" className="hover:text-blue-200 transition-colors">
              Teknologi
            </Link>
          </li>
          <li>
            <Link href="/kategori/programming" className="hover:text-blue-200 transition-colors">
              Programming
            </Link>
          </li>
          <li>
            <Link href="/kategori/tutorial" className="hover:text-blue-200 transition-colors">
              Tutorial
            </Link>
          </li>
          <li>
            <Link href="/admin" className="hover:text-blue-200 transition-colors">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
