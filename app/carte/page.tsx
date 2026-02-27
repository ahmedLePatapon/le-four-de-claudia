"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { pizzas, CATEGORIES } from "@/data/pizzas";
import PizzaCard from "@/components/carte/PizzaCard";
import { cn } from "@/lib/utils";

const CATEGORY_EMOJI: Record<string, string> = {
  Traditionnelles: "🍕",
  Fromages: "🧀",
  Légumes: "🥗",
  Poissons: "🐟",
  Charcuterie: "🥩",
  Nouveauté: "✨",
  "Spécialités - Viande Hachée": "🥊",
  "Spécialités - Poulet": "🍗",
  "Spécialités - Régionales": "🗺️",
  "Pizzas Desserts": "🍰",
  Boissons: "🍷",
  Desserts: "🍨",
  "Formules Midi": "🎁",
  Suppléments: "➕",
};

const CATEGORY_SHORT: Record<string, string> = {
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

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
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
      const offset = 100; // navbar + mobile pills height
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #323E40 0%, #1a2224 100%)" }}
      >
        <div
          className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #F2B138, transparent 70%)", transform: "translate(30%,-30%)" }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(217,103,4,0.2)", border: "1px solid rgba(217,103,4,0.4)", color: "#F2B138" }}
          >
            🍕 Toutes nos créations
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-creme mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Notre Carte
          </h1>
          <p className="text-creme/60 text-lg max-w-2xl leading-relaxed">
            Chaque pizza est cuite en{" "}
            <span className="text-or font-semibold">90 secondes</span> dans notre four à bois à{" "}
            <span className="text-or font-semibold">400°C</span>. Disponibles en trois tailles :
          </p>

          {/* Size legend */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "Bambina", desc: "Petite (~26 cm)", color: "#F2B138" },
              { label: "Junior", desc: "Moyenne (~32 cm)", color: "#D96704" },
              { label: "Senior", desc: "Grande (~40 cm)", color: "#D92B04" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="font-semibold text-creme">{s.label}</span>
                <span className="text-creme/40 text-xs">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile pills ── */}
      <div className="lg:hidden sticky top-16 z-40 bg-creme/95 dark:bg-charbon/95 backdrop-blur-md border-b border-charbon/10 dark:border-creme/10 shadow-sm">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={cn(
                "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200",
                activeSection === cat
                  ? "bg-rouge-tomate text-white border-rouge-tomate shadow-sm shadow-rouge-tomate/30"
                  : "bg-transparent border-charbon/15 dark:border-creme/15 text-charbon/60 dark:text-creme/60 hover:bg-rouge-tomate/8 hover:border-rouge-tomate/30"
              )}
            >
              <span>{CATEGORY_EMOJI[cat]}</span>
              <span>{CATEGORY_SHORT[cat] ?? cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:flex lg:gap-10">

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-28 space-y-1">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-charbon/35 dark:text-creme/35 px-3 mb-3">
              Catégories
            </p>
            {/* Toutes */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200 text-charbon/65 dark:text-creme/60 hover:bg-rouge-tomate/8 hover:text-charbon dark:hover:text-creme"
            >
              <span className="text-base">🍽️</span>
              <span className="flex-1 leading-tight">Toutes</span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-charbon/8 dark:bg-creme/10 text-charbon/40 dark:text-creme/40">
                {pizzas.length}
              </span>
            </button>
            <div className="mx-3 my-1 border-t border-charbon/8 dark:border-creme/8" />
            {CATEGORIES.map((cat) => {
              const count = pizzas.filter((p) => p.categorie === cat).length;
              const isActive = activeSection === cat;
              return (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200 group",
                    isActive
                      ? "bg-rouge-tomate text-white font-semibold shadow-md shadow-rouge-tomate/20"
                      : "text-charbon/65 dark:text-creme/60 hover:bg-rouge-tomate/8 hover:text-charbon dark:hover:text-creme"
                  )}
                >
                  <span className="text-base">{CATEGORY_EMOJI[cat]}</span>
                  <span className="flex-1 leading-tight">{CATEGORY_SHORT[cat] ?? cat}</span>
                  <span
                    className={cn(
                      "text-[11px] font-bold px-1.5 py-0.5 rounded-full",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-charbon/8 dark:bg-creme/10 text-charbon/40 dark:text-creme/40"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Total */}
            <div className="mt-4 mx-3 pt-4 border-t border-charbon/10 dark:border-creme/10">
              <p className="text-xs text-charbon/40 dark:text-creme/40">
                <span className="font-bold text-charbon dark:text-creme text-sm">{pizzas.length}</span> pizzas au total
              </p>
            </div>
          </div>
        </aside>

        {/* ── Sections ── */}
        <main className="flex-1 min-w-0 space-y-16">
          {CATEGORIES.map((cat, ci) => {
            const catPizzas = pizzas.filter((p) => p.categorie === cat);
            return (
              <section
                key={cat}
                id={slugCat(cat)}
                data-category={cat}
                ref={(el) => { sectionRefs.current[cat] = el; }}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{CATEGORY_EMOJI[cat]}</span>
                  <div>
                    <h2
                      className="text-2xl font-bold text-charbon dark:text-creme leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {cat}
                    </h2>
                    <p className="text-sm text-charbon/45 dark:text-creme/45 mt-0.5">
                      {catPizzas.length} pizza{catPizzas.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  {cat === "Nouveauté" && (
                    <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold bg-orange-brule text-white animate-pulse">
                      NOUVEAU
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6 -mt-3">
                  <div className="h-px flex-1 bg-charbon/10 dark:bg-creme/10" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {catPizzas.map((pizza, i) => (
                    <motion.div
                      key={pizza.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <PizzaCard pizza={pizza} />
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
}
