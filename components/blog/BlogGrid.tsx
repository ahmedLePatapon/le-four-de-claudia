"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Article } from "@/data/blog";

interface BlogGridProps {
  articles: Article[];
}

function formatDateFr(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Cycle through aspect ratios for visual variety in masonry
const ASPECT_RATIOS = ["aspect-[3/4]", "aspect-video", "aspect-square", "aspect-[4/5]", "aspect-video", "aspect-square"];

export default function BlogGrid({ articles }: BlogGridProps) {
  const categories = ["Tous", ...Array.from(new Set(articles.map((a) => a.categorie)))];
  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous" ? articles : articles.filter((a) => a.categorie === active);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "border border-primary bg-primary/10 text-primary"
                : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto px-6 lg:px-16">
        {filtered.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="break-inside-avoid block group relative bg-[#231b1a] rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/5"
          >
            <div className={`${ASPECT_RATIOS[i % ASPECT_RATIOS.length]} overflow-hidden relative`}>
              <Image
                src={article.image}
                alt={article.titre}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-md border border-white/10">
                  {article.categorie}
                </span>
              </div>
            </div>
            <div className="p-6">
              {i % 3 === 2 && (
                <div className="text-slate-500 text-xs mb-2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.tempsLecture} min de lecture
                </div>
              )}
              <h3
                className="text-xl text-white mb-3 group-hover:text-primary transition-colors leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {article.titre}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{article.extrait}</p>
              <span className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-wide group-hover:underline underline-offset-4">
                Lire la suite{" "}
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
