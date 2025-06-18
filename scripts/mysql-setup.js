const mysql = require("mysql2/promise")

async function setupDatabase() {
  // REPLACE 'your_password_here' WITH YOUR ACTUAL MYSQL ROOT PASSWORD
  const config = {
    host: "localhost",
    user: "root",
    password: "your_password_here", // PUT YOUR ACTUAL PASSWORD HERE
    port: 3306,
  }

  try {
    console.log("🔄 Connecting to MySQL...")
    const connection = await mysql.createConnection(config)
    console.log("✅ Connected to MySQL successfully!")

    // Create database if it doesn't exist
    console.log("🔄 Creating database...")
    await connection.execute("CREATE DATABASE IF NOT EXISTS blog_system")
    console.log("✅ Database 'blog_system' ready!")

    // Switch to the database
    await connection.execute("USE blog_system")

    // Create tables
    console.log("🔄 Creating tables...")

    // Authors table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS authors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Articles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        image_url VARCHAR(500),
        author_id INT,
        category_id INT,
        status ENUM('draft', 'published') DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `)

    console.log("✅ Tables created successfully!")

    // Insert sample data
    console.log("🔄 Inserting sample data...")

    // Insert authors
    await connection.execute(`
      INSERT IGNORE INTO authors (name, email, bio) VALUES
      ('John Doe', 'john@example.com', 'Tech writer dan software developer dengan pengalaman 10+ tahun'),
      ('Jane Smith', 'jane@example.com', 'Full-stack developer dan technical blogger'),
      ('Bob Wilson', 'bob@example.com', 'Technology enthusiast dan startup advisor')
    `)

    // Insert categories
    await connection.execute(`
      INSERT IGNORE INTO categories (name, slug, description) VALUES
      ('Teknologi', 'teknologi', 'Artikel tentang perkembangan teknologi terkini'),
      ('Programming', 'programming', 'Tutorial dan tips programming untuk developer'),
      ('Tutorial', 'tutorial', 'Panduan step-by-step untuk berbagai topik teknologi'),
      ('Web Development', 'web-development', 'Artikel khusus tentang pengembangan web')
    `)

    // Insert sample articles
    await connection.execute(`
      INSERT IGNORE INTO articles (title, slug, excerpt, content, image_url, author_id, category_id, status) VALUES
      (
        'Pengenalan React 18: Fitur-Fitur Baru yang Revolusioner',
        'pengenalan-react-18',
        'React 18 membawa banyak fitur baru yang akan mengubah cara kita membangun aplikasi web.',
        '<p>React 18 adalah versi terbaru dari library JavaScript yang paling populer untuk membangun user interface.</p><h2>Fitur Utama React 18</h2><p>Beberapa fitur utama yang diperkenalkan dalam React 18 antara lain:</p><ul><li>Concurrent Features</li><li>Automatic Batching</li><li>Suspense untuk Server-Side Rendering</li></ul>',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        1,
        2,
        'published'
      ),
      (
        'Tutorial Lengkap Next.js 14: App Router dan Server Components',
        'tutorial-nextjs-14',
        'Panduan komprehensif untuk memahami App Router di Next.js 14.',
        '<p>Next.js 14 memperkenalkan App Router yang merupakan cara baru untuk mengorganisir aplikasi Next.js.</p><h2>Apa itu App Router?</h2><p>App Router adalah sistem routing baru yang dibangun di atas React Server Components...</p>',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        2,
        3,
        'published'
      )
    `)

    console.log("✅ Sample data inserted!")

    // Verify setup
    const [authorCount] = await connection.execute("SELECT COUNT(*) as count FROM authors")
    const [categoryCount] = await connection.execute("SELECT COUNT(*) as count FROM categories")
    const [articleCount] = await connection.execute("SELECT COUNT(*) as count FROM articles")

    console.log("\n📊 Database Summary:")
    console.log(`👥 Authors: ${authorCount[0].count}`)
    console.log(`📁 Categories: ${categoryCount[0].count}`)
    console.log(`📝 Articles: ${articleCount[0].count}`)

    await connection.end()
    console.log("\n🎉 Database setup complete!")
    console.log("💡 Now update your .env.local file with the correct password")
    console.log(`💡 DB_PASSWORD=${config.password}`)
  } catch (error) {
    console.error("❌ Setup failed:", error.message)

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("\n🔧 Fix: Update the password in this script")
      console.log("Line 8: password: 'your_actual_password_here'")
    }
  }
}

setupDatabase()
