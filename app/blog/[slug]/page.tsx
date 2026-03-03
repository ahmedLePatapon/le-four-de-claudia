import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.titre,
    description: article.extrait,
    openGraph: {
      title: article.titre,
      description: article.extrait,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.date,
    },
  };
}

function formatDateFr(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-transparent to-black/40 z-10" />
        <Image
          src={article.image}
          alt={article.titre}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 px-6 lg:px-16 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              {article.categorie}
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {article.titre}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-300 flex-wrap">
              <span>Par <span className="text-white font-medium">Claudia</span></span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <time dateTime={article.date}>{formatDateFr(article.date)}</time>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span>{article.tempsLecture} min de lecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content layout */}
      <main className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 px-6 lg:px-16 max-w-7xl mx-auto py-12">

        {/* Left sidebar — share buttons (desktop only) */}
        <aside className="hidden lg:flex flex-col gap-4 w-14 pt-2 sticky top-32 h-fit shrink-0">
          <p
            className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            Partager
          </p>
          {[
            { label: "Partager", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /> },
            { label: "Favoris", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
            { label: "Sauvegarder", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              aria-label={label}
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">{icon}</svg>
            </button>
          ))}
        </aside>

        {/* Article */}
        <article className="flex-1 max-w-3xl mx-auto lg:mx-0 min-w-0">
          {/* Lead */}
          <p
            className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {article.extrait}
          </p>

          {/* Body */}
          <div className="prose-pizza">
            {article.content}
          </div>

          {/* Tags */}
          <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">#{article.categorie}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">#CuisineItalienne</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">#SlowFood</span>
            </div>
            {/* Mobile share */}
            <div className="flex lg:hidden gap-3">
              <button className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="Partager">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="Favoris">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tous les articles
            </Link>
          </div>
        </article>

        {/* Right sidebar */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-10">

          {/* Newsletter */}
          <div className="bg-card-dark p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Rejoignez le Club</h3>
            <p className="text-sm text-slate-400 mb-6 relative z-10">Recevez nos secrets de chef et offres exclusives chaque mois.</p>
            <form className="flex flex-col gap-3 relative z-10">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full bg-bg-dark border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full bg-white text-bg-dark font-bold text-sm py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                M&apos;inscrire
              </button>
            </form>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">À lire aussi</h4>
              <div className="flex flex-col gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group flex gap-4 items-start">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-800 relative">
                      <Image
                        src={rel.image}
                        alt={rel.titre}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h5
                        className="text-white font-medium leading-snug group-hover:text-primary transition-colors text-sm"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {rel.titre}
                      </h5>
                      <span className="text-xs text-slate-500 mt-1 block">{formatDateFr(rel.date)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>
      </main>
    </div>
  );
}
