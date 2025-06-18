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

export async function getLatestArticles(limit = 7) {
  const connection = await getConnection()
  try {
    // Use string interpolation for LIMIT - safe since we control the value
    const limitValue = Number.parseInt(limit.toString()) // Ensure it's a number
    const [rows] = await connection.execute(
      `
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image_url, a.created_at,
        au.name as author_name,
        c.name as category_name, c.id as category_id
      FROM articles a
      JOIN authors au ON a.author_id = au.id
      JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'published'
      ORDER BY a.created_at DESC
      LIMIT ${limitValue}
    `,
    )
    return rows
  } finally {
    await connection.end()
  }
}

export async function getArticleBySlug(slug: string) {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(
      `
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.content, a.image_url, a.created_at,
        au.name as author_name,
        c.name as category_name, c.id as category_id
      FROM articles a
      JOIN authors au ON a.author_id = au.id
      JOIN categories c ON a.category_id = c.id
      WHERE a.slug = ? AND a.status = 'published'
    `,
      [slug],
    )
    return rows[0] || null
  } finally {
    await connection.end()
  }
}

export async function getCategories() {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(`
      SELECT 
        c.id, c.name, c.slug,
        COUNT(a.id) as article_count
      FROM categories c
      LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
      GROUP BY c.id, c.name, c.slug
      ORDER BY c.name
    `)
    return rows
  } finally {
    await connection.end()
  }
}

export async function getCategoryBySlug(slug: string) {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(
      `
      SELECT id, name, slug, description
      FROM categories
      WHERE slug = ?
    `,
      [slug],
    )
    return rows[0] || null
  } finally {
    await connection.end()
  }
}

export async function getArticlesByCategory(categoryId: number) {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(
      `
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.image_url, a.created_at,
        au.name as author_name,
        c.name as category_name, c.id as category_id
      FROM articles a
      JOIN authors au ON a.author_id = au.id
      JOIN categories c ON a.category_id = c.id
      WHERE a.category_id = ? AND a.status = 'published'
      ORDER BY a.created_at DESC
    `,
      [categoryId],
    )
    return rows
  } finally {
    await connection.end()
  }
}

export async function getRelatedArticles(categoryId: number, excludeId: number) {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(
      `
      SELECT 
        a.id, a.title, a.slug, a.created_at
      FROM articles a
      WHERE a.category_id = ? AND a.id != ? AND a.status = 'published'
      ORDER BY a.created_at DESC
      LIMIT 5
    `,
      [categoryId, excludeId],
    )
    return rows
  } finally {
    await connection.end()
  }
}

export async function getStats() {
  const connection = await getConnection()
  try {
    const [articleRows] = await connection.execute("SELECT COUNT(*) as count FROM articles")
    const [categoryRows] = await connection.execute("SELECT COUNT(*) as count FROM categories")
    const [authorRows] = await connection.execute("SELECT COUNT(*) as count FROM authors")

    return {
      articles: articleRows[0].count,
      categories: categoryRows[0].count,
      authors: authorRows[0].count,
    }
  } finally {
    await connection.end()
  }
}

// Test function to check if database is working
export async function testConnection() {
  try {
    const connection = await getConnection()
    await connection.execute("SELECT 1")
    await connection.end()
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// Admin functions (keeping the same as before)
export async function getAuthors() {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(`
      SELECT id, name, email, bio, created_at
      FROM authors
      ORDER BY name
    `)
    return rows
  } finally {
    await connection.end()
  }
}

export async function createAuthor(data: { name: string; email: string; bio?: string }) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(
      `
      INSERT INTO authors (name, email, bio)
      VALUES (?, ?, ?)
    `,
      [data.name, data.email, data.bio || null],
    )
    return result
  } finally {
    await connection.end()
  }
}

export async function updateAuthor(id: number, data: { name: string; email: string; bio?: string }) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(
      `
      UPDATE authors 
      SET name = ?, email = ?, bio = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [data.name, data.email, data.bio || null, id],
    )
    return result
  } finally {
    await connection.end()
  }
}

export async function deleteAuthor(id: number) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute("DELETE FROM authors WHERE id = ?", [id])
    return result
  } finally {
    await connection.end()
  }
}

export async function getAllCategories() {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(`
      SELECT id, name, slug, description, created_at
      FROM categories
      ORDER BY name
    `)
    return rows
  } finally {
    await connection.end()
  }
}

export async function createCategory(data: { name: string; slug: string; description?: string }) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(
      `
      INSERT INTO categories (name, slug, description)
      VALUES (?, ?, ?)
    `,
      [data.name, data.slug, data.description || null],
    )
    return result
  } finally {
    await connection.end()
  }
}

export async function updateCategory(id: number, data: { name: string; slug: string; description?: string }) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(
      `
      UPDATE categories 
      SET name = ?, slug = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [data.name, data.slug, data.description || null, id],
    )
    return result
  } finally {
    await connection.end()
  }
}

export async function deleteCategory(id: number) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute("DELETE FROM categories WHERE id = ?", [id])
    return result
  } finally {
    await connection.end()
  }
}

export async function getAllArticles() {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(`
      SELECT 
        a.id, a.title, a.slug, a.excerpt, a.content, a.image_url, 
        a.status, a.created_at, a.author_id, a.category_id,
        au.name as author_name,
        c.name as category_name
      FROM articles a
      JOIN authors au ON a.author_id = au.id
      JOIN categories c ON a.category_id = c.id
      ORDER BY a.created_at DESC
    `)
    return rows
  } finally {
    await connection.end()
  }
}

export async function createArticle(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  image_url?: string
  author_id: number
  category_id: number
  status: "draft" | "published"
}) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(
      `
      INSERT INTO articles (title, slug, excerpt, content, image_url, author_id, category_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        data.title,
        data.slug,
        data.excerpt,
        data.content,
        data.image_url || null,
        data.author_id,
        data.category_id,
        data.status,
      ],
    )
    return result
  } finally {
    await connection.end()
  }
}

export async function updateArticle(
  id: number,
  data: {
    title: string
    slug: string
    excerpt: string
    content: string
    image_url?: string
    author_id: number
    category_id: number
    status: "draft" | "published"
  },
) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute(
      `
      UPDATE articles 
      SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, 
          author_id = ?, category_id = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [
        data.title,
        data.slug,
        data.excerpt,
        data.content,
        data.image_url || null,
        data.author_id,
        data.category_id,
        data.status,
        id,
      ],
    )
    return result
  } finally {
    await connection.end()
  }
}

export async function deleteArticle(id: number) {
  const connection = await getConnection()
  try {
    const [result] = await connection.execute("DELETE FROM articles WHERE id = ?", [id])
    return result
  } finally {
    await connection.end()
  }
}
