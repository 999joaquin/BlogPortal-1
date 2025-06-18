import SearchBox from "./SearchBox"
import CategoryMenu from "./CategoryMenu"
import AboutSection from "./AboutSection"
import RelatedArticles from "./RelatedArticles"

interface SidebarProps {
  categories?: any[]
  relatedArticles?: any[]
  showAbout?: boolean
}

export default function Sidebar({ categories, relatedArticles, showAbout }: SidebarProps) {
  return (
    <aside className="space-y-6">
      <SearchBox />

      {categories && <CategoryMenu categories={categories} />}

      {relatedArticles && <RelatedArticles articles={relatedArticles} />}

      {showAbout && <AboutSection />}
    </aside>
  )
}
