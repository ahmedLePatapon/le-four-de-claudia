"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { pizzas, BEST_SELLERS } from "@/data/pizzas";
import PizzaCard from "@/components/carte/PizzaCard";

const bestSellers = BEST_SELLERS.map((id) => pizzas.find((p) => p.id === id)).filter(Boolean);

export default function BestSellers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-28 bg-[#231b1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-accent-gold uppercase tracking-[0.2em] text-xs font-bold mb-3"
          >
            La Carte
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Nos Créations Artisanales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Des recettes authentiques élaborées avec passion. Chaque ingrédient est sélectionné rigoureusement.
          </motion.p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((pizza, i) =>
            pizza ? (
              <motion.div
                key={pizza.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <PizzaCard pizza={pizza} featured />
              </motion.div>
            ) : null
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href="/carte"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-primary hover:bg-red-600 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-primary/20"
          >
            Voir toute la carte
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
