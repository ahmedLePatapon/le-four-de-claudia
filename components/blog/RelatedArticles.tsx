import { type Article } from "@/data/blog";
import ArticleCard from "@/components/blog/ArticleCard";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-16 bg-creme dark:bg-charbon/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-charbon dark:text-creme mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Articles similaires
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
