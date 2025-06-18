import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "blog_system",
      port: Number.parseInt(process.env.DB_PORT || "3306"),
    })

    // Test simple query
    const [articles] = await connection.execute(`
      SELECT id, title, slug, excerpt, created_at
      FROM articles 
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT 3
    `)

    await connection.end()

    return NextResponse.json({
      success: true,
      articles: articles,
      count: articles.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: 500 },
    )
  }
}
