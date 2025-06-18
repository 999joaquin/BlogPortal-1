const mysql = require("mysql2/promise")

async function testConnection() {
  // REPLACE THESE WITH YOUR ACTUAL MYSQL CREDENTIALS
  const config = {
    host: "localhost",
    user: "root",
    password: "YOUR_MYSQL_PASSWORD_HERE", // Put your actual password here
    database: "blog_system",
    port: 3306,
  }

  try {
    console.log("🔄 Testing MySQL connection...")
    console.log(`Connecting to: ${config.user}@${config.host}:${config.port}`)

    const connection = await mysql.createConnection(config)
    console.log("✅ MySQL connection successful!")

    // Check if database exists
    const [databases] = await connection.execute("SHOW DATABASES LIKE 'blog_system'")
    if (databases.length === 0) {
      console.log("⚠️  Database 'blog_system' does not exist. Creating it...")
      await connection.execute("CREATE DATABASE blog_system")
      console.log("✅ Database 'blog_system' created!")
    }

    // Switch to blog_system database
    await connection.execute("USE blog_system")

    // Check tables
    const [tables] = await connection.execute("SHOW TABLES")
    console.log("📋 Tables found:", tables.length)

    if (tables.length === 0) {
      console.log("⚠️  No tables found. You need to run the database scripts.")
    } else {
      console.log("📊 Tables:", tables.map((t) => Object.values(t)[0]).join(", "))
    }

    await connection.end()
    console.log("🔌 Connection closed")
  } catch (error) {
    console.error("❌ Connection failed:", error.message)
    console.log("\n🔧 Troubleshooting steps:")

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("1. Check your MySQL password")
      console.log("2. Try: mysql -u root -p")
      console.log("3. If you forgot password, reset it:")
      console.log("   - Stop MySQL service")
      console.log("   - Start MySQL with --skip-grant-tables")
      console.log("   - Reset password")
    } else if (error.code === "ECONNREFUSED") {
      console.log("1. Start MySQL service:")
      console.log("   - Windows: Services → MySQL80 → Start")
      console.log("   - Or use MySQL Workbench")
    }
  }
}

testConnection()
