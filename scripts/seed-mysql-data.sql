USE blog_system;

-- Insert sample authors
INSERT INTO authors (name, email, bio) VALUES
('John Doe', 'john@example.com', 'Tech writer dan software developer dengan pengalaman 10+ tahun'),
('Jane Smith', 'jane@example.com', 'Full-stack developer dan technical blogger'),
('Bob Wilson', 'bob@example.com', 'Technology enthusiast dan startup advisor');

-- Insert sample categories
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
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    1,
    2,
    'published'
),
(
    'Tutorial Lengkap Next.js 14: App Router dan Server Components',
    'tutorial-nextjs-14',
    'Panduan komprehensif untuk memahami App Router di Next.js 14, termasuk Server Components, Client Components, dan optimasi performa.',
    '<p>Next.js 14 memperkenalkan App Router yang merupakan cara baru untuk mengorganisir dan me-routing aplikasi Next.js.</p><h2>Apa itu App Router?</h2><p>App Router adalah sistem routing baru yang dibangun di atas React Server Components...</p>',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    2,
    3,
    'published'
);
