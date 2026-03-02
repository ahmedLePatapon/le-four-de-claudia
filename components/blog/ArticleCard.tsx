"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Article } from "@/lib/mdx";

function formatDateFr(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-[#231b1a] border border-white/5 hover:border-primary/30 transition-colors duration-300"
    >
      {/* Image */}
      <Link
        href={`/blog/${article.slug}`}
        className={`relative block overflow-hidden ${featured ? "h-56" : "h-48"}`}
      >
        <Image
          src={article.image}
          alt={article.titre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white border border-white/20 bg-white/10 backdrop-blur-sm">
          {article.categorie}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <time dateTime={article.date}>{formatDateFr(article.date)}</time>
          <span>·</span>
          <span>{article.tempsLecture} min</span>
        </div>

        <Link href={`/blog/${article.slug}`}>
          <h3
            className="font-bold text-white mb-2 line-clamp-2 hover:text-primary transition-colors"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: featured ? "1.15rem" : "1rem",
              lineHeight: "1.45",
            }}
          >
            {article.titre}
          </h3>
        </Link>

        <p className="text-sm text-slate-400 line-clamp-3 flex-1 mb-4 leading-relaxed">
          {article.extrait}
        </p>

        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-white transition-colors group/link"
        >
          Lire la suite
          <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
