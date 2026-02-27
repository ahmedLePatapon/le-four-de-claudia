"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Article } from "@/data/blog";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  Technique: "bg-blue-100 text-blue-700",
  Tradition: "bg-orange-100 text-orange-700",
  Ingrédients: "bg-green-100 text-green-700",
};

function formatDateFr(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const colorClass =
    categoryColors[article.categorie] ?? "bg-charbon/10 text-charbon";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-charbon/60",
        "shadow-md hover:shadow-xl transition-shadow duration-300",
        featured && "shadow-lg"
      )}
    >
      {/* Image */}
      <Link
        href={`/blog/${article.slug}`}
        className={cn("relative block overflow-hidden", featured ? "h-56" : "h-48")}
      >
        <Image
          src={article.image}
          alt={article.titre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold",
            colorClass
          )}
          style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.9)" }}
        >
          {article.categorie}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs text-charbon/50 dark:text-creme/40 mb-3">
          <time dateTime={article.date}>{formatDateFr(article.date)}</time>
          <span>•</span>
          <span>{article.tempsLecture} min de lecture</span>
        </div>

        <Link href={`/blog/${article.slug}`}>
          <h3
            className="font-bold text-charbon dark:text-creme mb-2 line-clamp-2 hover:text-rouge-tomate dark:hover:text-or transition-colors"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: featured ? "1.15rem" : "1rem",
              lineHeight: "1.4",
            }}
          >
            {article.titre}
          </h3>
        </Link>

        <p className="text-sm text-charbon/60 dark:text-creme/50 line-clamp-3 flex-1 mb-4 leading-relaxed">
          {article.extrait}
        </p>

        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-brule hover:text-rouge-tomate transition-colors"
        >
          Lire la suite
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
