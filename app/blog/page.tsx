import type { Metadata } from "next";
import { articles } from "@/data/blog";
import BlogHero from "@/components/blog/BlogHero";
import ArticleCard from "@/components/blog/ArticleCard";

export const metadata: Metadata = {
  title: "Le Journal — Le Four de Claudia",
  description:
    "Techniques, traditions et secrets de cuisine italienne par Claudia. Découvrez les coulisses de notre pizzeria.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#181211]">
      <BlogHero />

      <section className="py-16 px-6 lg:px-16 xl:px-32 max-w-[1600px] mx-auto">
        <p className="text-sm text-slate-500 mb-10">
          <span className="font-semibold text-white">{articles.length}</span> articles
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-20 px-6 bg-[#231b1a]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest border border-primary/30 text-primary bg-primary/10">
            Newsletter
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Recevez nos recettes & coulisses
          </h2>
          <p className="text-slate-400 mb-8">
            Chaque semaine, Claudia partage une technique, une histoire ou un secret de sa cuisine napolitaine. Rejoignez notre communauté.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.fr"
              className="flex-1 h-12 px-5 rounded-full bg-[#181211] border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-7 rounded-full bg-primary hover:bg-red-600 text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/20"
            >
              S&apos;abonner
            </button>
          </form>
          <p className="text-slate-600 text-xs mt-4">Pas de spam. Désabonnement en 1 clic.</p>
        </div>
      </section>
    </div>
  );
}
