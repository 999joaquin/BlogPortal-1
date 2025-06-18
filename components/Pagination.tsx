"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  hasNext: boolean
  hasPrev: boolean
}

export default function Pagination({ currentPage, totalPages, onPageChange, hasNext, hasPrev }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          hasPrev
            ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {currentPage > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              1
            </button>
            {currentPage > 4 && <span className="px-3 py-2 text-gray-500">...</span>}
          </>
        )}

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="px-3 py-2 text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          hasNext
            ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
}
