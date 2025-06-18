const mysql = require("mysql2/promise")
require("dotenv").config({ path: ".env.local" })

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "blog_system",
      port: Number.parseInt(process.env.DB_PORT || "3306"),
    })

    console.log("✅ Database connection successful!")

    // Test query
    const [rows] = await connection.execute("SELECT COUNT(*) as count FROM authors")
    console.log(`📊 Found ${rows[0].count} authors in database`)

    await connection.end()
    console.log("🔌 Connection closed")
  } catch (error) {
    console.error("❌ Database connection failed:", error.message)

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("💡 Check your username and password in .env.local")
    } else if (error.code === "ECONNREFUSED") {
      console.log("💡 Make sure MySQL server is running")
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.log("💡 Database does not exist. Run the creation script first.")
    }
  }
}

testConnection()
