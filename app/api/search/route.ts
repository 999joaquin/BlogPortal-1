import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blog_system",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

async function getConnection() {
  return await mysql.createConnection(dbConfig)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query must be at least 2 characters long",
        },
        { status: 400 },
      )
    }

    const connection = await getConnection()

    try {
      // Build the search query
      let searchQuery = `
        SELECT 
          a.id, a.title, a.slug, a.excerpt, a.image_url, a.created_at,
          au.name as author_name,
          c.name as category_name, c.id as category_id, c.slug as category_slug
        FROM articles a
        JOIN authors au ON a.author_id = au.id
        JOIN categories c ON a.category_id = c.id
        WHERE a.status = 'published'
        AND (
          a.title LIKE ? OR 
          a.excerpt LIKE ? OR 
          a.content LIKE ?
        )
      `

      const searchTerm = `%${query}%`
      const queryParams = [searchTerm, searchTerm, searchTerm]

      // Add category filter if specified
      if (category && category !== "all") {
        searchQuery += " AND c.slug = ?"
        queryParams.push(category)
      }

      // Add ordering and use string interpolation for LIMIT and OFFSET
      searchQuery += ` ORDER BY a.created_at DESC LIMIT ${limit} OFFSET ${offset}`

      const [articles] = await connection.execute(searchQuery, queryParams)

      // Get total count for pagination
      let countQuery = `
        SELECT COUNT(*) as total
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        WHERE a.status = 'published'
        AND (
          a.title LIKE ? OR 
          a.excerpt LIKE ? OR 
          a.content LIKE ?
        )
      `

      const countParams = [searchTerm, searchTerm, searchTerm]

      if (category && category !== "all") {
        countQuery += " AND c.slug = ?"
        countParams.push(category)
      }

      const [countResult] = await connection.execute(countQuery, countParams)
      const total = countResult[0].total

      return NextResponse.json({
        success: true,
        data: {
          articles,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
          },
          query,
          category,
        },
      })
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
      },
      { status: 500 },
    )
  }
}
