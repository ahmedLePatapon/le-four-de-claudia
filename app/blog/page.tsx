import type { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Le Journal — Le Four de Claudia",
  description:
    "Techniques, traditions et secrets de cuisine italienne par Claudia. Découvrez les coulisses de notre pizzeria.",
};

export default function BlogPage() {
  const articles = getAllArticles();
  
  return (
    <div className="min-h-screen bg-[#181211]">
      {/* Background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-28 pb-6 px-6 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-slate-700" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Lifestyle &amp; Traditions</span>
            <span className="h-px w-12 bg-slate-700" />
          </div>
          <h1
            className="text-5xl md:text-7xl text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Le Journal de la Pizza
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Plongez dans l&apos;univers de la pizza artisanale. Découvrez nos secrets, nos traditions italiennes et l&apos;art de sélectionner les meilleurs ingrédients.
          </p>

          {/* Filter pills (via BlogGrid client component) */}
        </div>

        <main className="flex-1 pb-24">
          <BlogGrid articles={articles} />
        </main>

        {/* Newsletter */}
        <section className="border-t border-white/5 bg-black/20 py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-10 h-10 text-primary mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Restez inspiré
            </h2>
            <p className="text-slate-400 mb-8">
              Recevez nos dernières recettes, histoires et offres exclusives directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-primary/20"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
