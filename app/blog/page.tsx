import type { Metadata } from "next";
import { articles } from "@/data/blog";
import BlogHero from "@/components/blog/BlogHero";
import ArticleCard from "@/components/blog/ArticleCard";

export const metadata: Metadata = {
  title: "Blog — Secrets de cuisine italienne",
  description:
    "Techniques, traditions et secrets de cuisine italienne par Claudia. Découvrez les coulisses de notre pizzeria.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />

      <section className="py-16 bg-creme dark:bg-charbon/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-charbon/50 dark:text-creme/40 mb-8">
            <span className="font-semibold text-charbon dark:text-creme">
              {articles.length}
            </span>{" "}
            articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
