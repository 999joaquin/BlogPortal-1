import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blog_system",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

export async function testSimpleConnection() {
  let connection
  try {
    console.log("Attempting to connect with config:", {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      port: dbConfig.port,
      // Don't log password
    })

    connection = await mysql.createConnection(dbConfig)
    console.log("✅ Connection established")

    // Test simple query without parameters
    const [result] = await connection.execute("SELECT 1 as test")
    console.log("✅ Simple query works:", result)

    // Test table existence
    const [tables] = await connection.execute("SHOW TABLES")
    console.log("📋 Tables found:", tables)

    // Test authors table
    const [authors] = await connection.execute("SELECT COUNT(*) as count FROM authors")
    console.log("👥 Authors count:", authors[0])

    // Test articles table
    const [articles] = await connection.execute("SELECT COUNT(*) as count FROM articles")
    console.log("📝 Articles count:", articles[0])

    return {
      success: true,
      tables: tables.length,
      authors: authors[0].count,
      articles: articles[0].count,
    }
  } catch (error) {
    console.error("❌ Database error:", error)
    return {
      success: false,
      error: error.message,
      code: error.code,
    }
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

export async function getSimpleArticles() {
  let connection
  try {
    connection = await mysql.createConnection(dbConfig)

    // Simple query without JOINs first
    const [articles] = await connection.execute(`
      SELECT id, title, slug, excerpt, created_at, status
      FROM articles 
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT 5
    `)

    console.log("📝 Found articles:", articles.length)
    return articles
  } catch (error) {
    console.error("❌ Error getting articles:", error)
    throw error
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

export async function getArticlesWithAuthors() {
  let connection
  try {
    connection = await mysql.createConnection(dbConfig)

    // Query with JOINs
    const [articles] = await connection.execute(`
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image_url, a.created_at,
        au.name as author_name,
        c.name as category_name
      FROM articles a
      LEFT JOIN authors au ON a.author_id = au.id
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'published'
      ORDER BY a.created_at DESC
      LIMIT 5
    `)

    console.log("📝 Found articles with authors:", articles.length)
    return articles
  } catch (error) {
    console.error("❌ Error getting articles with authors:", error)
    throw error
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}
