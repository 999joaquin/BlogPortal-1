# Blog System - Local Setup Guide

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **MySQL** (version 8.0 or higher)
3. **npm** or **yarn**

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Setup MySQL Database

1. Make sure MySQL is running on your machine
2. Create a new database:

\`\`\`sql
CREATE DATABASE blog_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

3. Run the database creation script:

\`\`\`bash
mysql -u root -p blog_system < scripts/create-mysql-database.sql
\`\`\`

4. Run the seed data script:

\`\`\`bash
mysql -u root -p blog_system < scripts/seed-mysql-data.sql
\`\`\`

### 3. Environment Configuration

1. Copy `.env.local` and update the database credentials:

\`\`\`env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blog_system
DB_PORT=3306
\`\`\`

### 4. Run the Application

\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

## Admin Access

- URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `password123`

## Database Structure

- **authors**: Stores author information
- **categories**: Stores article categories
- **articles**: Stores blog articles with relationships to authors and categories

## Features

### Public Pages
- Homepage with latest articles
- Article detail pages
- Category-based article listing
- Search functionality
- Responsive design

### Admin Panel
- Dashboard with statistics
- CRUD operations for Authors
- CRUD operations for Categories
- CRUD operations for Articles
- Authentication system

## Troubleshooting

1. **Database Connection Issues**: 
   - Verify MySQL is running
   - Check database credentials in `.env.local`
   - Ensure database exists

2. **Permission Issues**:
   - Make sure MySQL user has proper permissions
   - Grant necessary privileges to the database user

3. **Port Conflicts**:
   - Change the port in `package.json` if 3000 is occupied
   - Update `NEXT_PUBLIC_APP_URL` in `.env.local`
