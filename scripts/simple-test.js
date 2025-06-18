const mysql = require("mysql2/promise")

async function testConnection() {
  // Replace these with your actual MySQL credentials
  const config = {
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "", // Replace with your MySQL password
    database: "blog_system",
    port: 3306,
  }

  try {
    console.log("🔄 Attempting to connect to MySQL...")
    console.log(`Host: ${config.host}:${config.port}`)
    console.log(`Database: ${config.database}`)
    console.log(`User: ${config.user}`)

    const connection = await mysql.createConnection(config)

    console.log("✅ Database connection successful!")

    // Test if tables exist
    const [tables] = await connection.execute("SHOW TABLES")
    console.log(
      "📋 Tables in database:",
      tables.map((t) => Object.values(t)[0]),
    )

    // Test query
    const [rows] = await connection.execute("SELECT COUNT(*) as count FROM authors")
    console.log(`👥 Found ${rows[0].count} authors in database`)

    await connection.end()
    console.log("🔌 Connection closed successfully")
  } catch (error) {
    console.error("❌ Database connection failed:", error.message)

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("💡 Solution: Check your MySQL username and password")
      console.log("   Try: mysql -u root -p")
    } else if (error.code === "ECONNREFUSED") {
      console.log("💡 Solution: Start MySQL server")
      console.log("   Windows: Start MySQL service from Services")
      console.log("   macOS: brew services start mysql")
      console.log("   Linux: sudo systemctl start mysql")
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.log("💡 Solution: Create the database first")
      console.log("   Run: mysql -u root -p")
      console.log("   Then: CREATE DATABASE blog_system;")
    }
  }
}

testConnection()
