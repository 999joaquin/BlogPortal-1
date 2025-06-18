"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface Category {
  id: number
  name: string
  slug: string
  article_count?: number
}

interface CategoryDropdownProps {
  categories: Category[]
}

export default function CategoryDropdown({ categories }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 hover:text-blue-200 transition-colors focus:outline-none focus:text-blue-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Kategori</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.slug}`}
                className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>{category.name}</span>
                {category.article_count && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.article_count}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">Tidak ada kategori tersedia</div>
          )}
        </div>
      )}
    </div>
  )
}
