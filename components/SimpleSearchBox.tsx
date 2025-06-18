import { Search } from "lucide-react"

export default function SimpleSearchBox() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-3">Pencarian</h3>
      <form action="/search" method="GET" className="flex">
        <input
          type="text"
          name="q"
          placeholder="Cari artikel..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          minLength={2}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
