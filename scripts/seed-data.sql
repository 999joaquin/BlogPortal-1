-- Insert sample data

-- Insert authors
INSERT INTO authors (name, email, bio) VALUES
('John Doe', 'john@example.com', 'Tech writer dan software developer dengan pengalaman 10+ tahun'),
('Jane Smith', 'jane@example.com', 'Full-stack developer dan technical blogger'),
('Bob Wilson', 'bob@example.com', 'Technology enthusiast dan startup advisor'),
('Alice Johnson', 'alice@example.com', 'Backend developer dan database specialist'),
('Charlie Brown', 'charlie@example.com', 'Frontend developer dan UI/UX designer');

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Teknologi', 'teknologi', 'Artikel tentang perkembangan teknologi terkini'),
('Programming', 'programming', 'Tutorial dan tips programming untuk developer'),
('Tutorial', 'tutorial', 'Panduan step-by-step untuk berbagai topik teknologi'),
('Web Development', 'web-development', 'Artikel khusus tentang pengembangan web');

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, image_url, author_id, category_id, status) VALUES
(
    'Pengenalan React 18: Fitur-Fitur Baru yang Revolusioner',
    'pengenalan-react-18',
    'React 18 membawa banyak fitur baru yang akan mengubah cara kita membangun aplikasi web. Pelajari concurrent features, automatic batching, dan Suspense yang lebih powerful.',
    '<p>React 18 adalah versi terbaru dari library JavaScript yang paling populer untuk membangun user interface. Versi ini membawa banyak fitur baru yang revolusioner.</p><h2>Fitur Utama React 18</h2><p>Beberapa fitur utama yang diperkenalkan dalam React 18 antara lain:</p><ul><li>Concurrent Features</li><li>Automatic Batching</li><li>Suspense untuk Server-Side Rendering</li><li>New Hooks</li></ul><p>Mari kita bahas satu per satu fitur-fitur tersebut...</p>',
    '/placeholder.svg?height=400&width=800',
    1,
    2,
    'published'
),
(
    'Tutorial Lengkap Next.js 14: App Router dan Server Components',
    'tutorial-nextjs-14',
    'Panduan komprehensif untuk memahami App Router di Next.js 14, termasuk Server Components, Client Components, dan optimasi performa.',
    '<p>Next.js 14 memperkenalkan App Router yang merupakan cara baru untuk mengorganisir dan me-routing aplikasi Next.js.</p><h2>Apa itu App Router?</h2><p>App Router adalah sistem routing baru yang dibangun di atas React Server Components...</p>',
    '/placeholder.svg?height=400&width=800',
    2,
    3,
    'published'
),
(
    'Tren Teknologi 2024: AI, Web3, dan Cloud Computing',
    'tren-teknologi-2024',
    'Eksplorasi tren teknologi terbaru yang akan mendominasi tahun 2024, mulai dari artificial intelligence hingga blockchain technology.',
    '<p>Tahun 2024 diprediksi akan menjadi tahun yang menarik untuk dunia teknologi. Beberapa tren yang akan mendominasi antara lain...</p>',
    '/placeholder.svg?height=400&width=800',
    3,
    1,
    'published'
),
(
    'Membangun API REST dengan Node.js dan Express',
    'api-rest-nodejs-express',
    'Tutorial step-by-step untuk membangun RESTful API menggunakan Node.js dan Express.js, termasuk authentication dan database integration.',
    '<p>Dalam tutorial ini, kita akan belajar cara membangun RESTful API menggunakan Node.js dan Express.js dari awal...</p>',
    '/placeholder.svg?height=400&width=800',
    4,
    2,
    'published'
),
(
    'Optimasi Performa Website: Tips dan Trik',
    'optimasi-performa-website',
    'Pelajari teknik-teknik optimasi website untuk meningkatkan kecepatan loading dan user experience.',
    '<p>Performa website adalah salah satu faktor terpenting dalam user experience. Berikut adalah tips dan trik untuk mengoptimalkan performa website Anda...</p>',
    '/placeholder.svg?height=400&width=800',
    5,
    3,
    'published'
);
