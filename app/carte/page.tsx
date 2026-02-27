"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { pizzas, CATEGORIES } from "@/data/pizzas";
import Link from "next/link";
import PizzaCard from "@/components/carte/PizzaCard";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  "Spécialités - Viande Hachée": "Viande Hachée",
  "Spécialités - Poulet": "Poulet",
  "Spécialités - Régionales": "Régionales",
  "Pizzas Desserts": "Piz. Desserts",
  "Formules Midi": "Formules",
};

function slugCat(cat: string) {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function CartePage() {
  const [activeSection, setActiveSection] = useState(CATEGORIES[0]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("data-category");
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    CATEGORIES.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  function scrollToCategory(cat: string) {
    const el = sectionRefs.current[cat];
    if (el) {
      const offset = 130;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-[#181211]">
      {/* Background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Page header */}
        <div className="pt-32 pb-12 px-8 lg:px-16 text-center max-w-4xl mx-auto">
          <p className="text-accent-gold uppercase tracking-[0.2em] text-xs font-bold mb-3">La Carte</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Nos Créations Artisanales</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Des recettes authentiques élaborées avec passion. Chaque ingrédient est sélectionné rigoureusement auprès de producteurs italiens et locaux.
          </p>
        </div>

        {/* Category tabs — sticky */}
        <div className="sticky top-[72px] z-40 bg-[#181211]/80 backdrop-blur-md border-b border-white/5">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide px-6 lg:px-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={cn(
                  "shrink-0 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200",
                  activeSection === cat
                    ? "text-white border-primary font-bold bg-white/5"
                    : "text-slate-400 border-transparent hover:text-white hover:bg-white/5 hover:border-white/20"
                )}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pizza sections */}
        <main className="w-full max-w-7xl mx-auto px-6 py-10 lg:px-12">
          {CATEGORIES.map((cat) => {
            const catPizzas = pizzas.filter((p) => p.categorie === cat);
            return (
              <section
                key={cat}
                id={slugCat(cat)}
                data-category={cat}
                ref={(el) => { sectionRefs.current[cat] = el; }}
                className="mb-16"
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-tight">{cat}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {catPizzas.length} article{catPizzas.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  {cat === "Nouveauté" && (
                    <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold bg-primary text-white animate-pulse">NOUVEAU</span>
                  )}
                </div>

                <div className="h-px bg-white/10 mb-8" />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catPizzas.map((pizza, i) => (
                    <motion.div
                      key={pizza.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <Link href={`/carte/${pizza.id}`} className="block h-full">
                        <PizzaCard pizza={pizza} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
