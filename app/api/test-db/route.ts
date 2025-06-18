import { NextResponse } from "next/server"
import { testConnection, getLatestArticles } from "@/lib/data"

export async function GET() {
  try {
    // Test basic connection
    const isConnected = await testConnection()

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
        },
        { status: 500 },
      )
    }

    // Test data retrieval
    const articles = await getLatestArticles(3)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: {
        articlesCount: articles.length,
        sampleArticles: articles.map((article: any) => ({
          id: article.id,
          title: article.title,
          author: article.author_name,
        })),
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: "Check your database configuration in .env.local",
      },
      { status: 500 },
    )
  }
}
