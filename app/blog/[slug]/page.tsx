import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/blog";
import RelatedArticles from "@/components/blog/RelatedArticles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
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
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  Technique: "bg-blue-100 text-blue-700",
  Tradition: "bg-orange-100 text-orange-700",
  Ingrédients: "bg-green-100 text-green-700",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug);
  const colorClass =
    categoryColors[article.categorie] ?? "bg-charbon/10 text-charbon";

  return (
    <>
      {/* Hero image */}
      <section className="relative h-72 sm:h-96 lg:h-[480px] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.titre}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(50,62,64,0.95) 0%, rgba(50,62,64,0.4) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-20 mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-creme/50 mb-4">
            <Link href="/" className="hover:text-creme transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-creme transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-creme/80 line-clamp-1">{article.titre}</span>
          </nav>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-creme leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {article.titre}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 bg-creme dark:bg-charbon/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-charbon/50 shadow-md space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-charbon/40 dark:text-creme/40 mb-1">
                      Publié le
                    </p>
                    <time
                      dateTime={article.date}
                      className="text-sm font-medium text-charbon dark:text-creme"
                    >
                      {formatDateFr(article.date)}
                    </time>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-charbon/40 dark:text-creme/40 mb-1">
                      Catégorie
                    </p>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}
                    >
                      {article.categorie}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-charbon/40 dark:text-creme/40 mb-1">
                      Temps de lecture
                    </p>
                    <p className="text-sm font-medium text-charbon dark:text-creme">
                      {article.tempsLecture} min
                    </p>
                  </div>
                  <div className="pt-2 border-t border-charbon/10 dark:border-creme/10">
                    <Link
                      href="/blog"
                      className="flex items-center gap-1.5 text-xs font-semibold text-orange-brule hover:text-rouge-tomate transition-colors"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                      Tous les articles
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <article className="lg:col-span-3">
              {/* Mobile meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6 lg:hidden">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
                  {article.categorie}
                </span>
                <time dateTime={article.date} className="text-xs text-charbon/50 dark:text-creme/40">
                  {formatDateFr(article.date)}
                </time>
                <span className="text-xs text-charbon/50 dark:text-creme/40">
                  • {article.tempsLecture} min de lecture
                </span>
              </div>

              <p className="text-lg text-charbon/70 dark:text-creme/60 leading-relaxed mb-8 border-l-4 border-orange-brule pl-5 py-1">
                {article.extrait}
              </p>

              <div
                className="prose-pizza"
                dangerouslySetInnerHTML={{ __html: article.contenu }}
              />

              {/* Back button */}
              <div className="mt-12 pt-8 border-t border-charbon/10 dark:border-creme/10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-charbon/20 dark:border-creme/20 text-sm font-medium text-charbon dark:text-creme hover:bg-charbon hover:text-creme dark:hover:bg-creme dark:hover:text-charbon transition-all duration-200"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Retour au blog
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <RelatedArticles articles={related} />
    </>
  );
}
