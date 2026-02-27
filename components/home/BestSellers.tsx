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
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#323E40" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#D96704" }}
          >
            <span className="w-8 h-px bg-orange-brule" />
            Les incontournables
            <span className="w-8 h-px bg-orange-brule" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "#F2B138" }}
          >
            Nos meilleures pizzas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-creme/60 max-w-xl mx-auto"
          >
            Sélectionnées par nos clients fidèles, ces pizzas reviennent semaine après semaine sur nos tables.
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #D92B04, #D96704)",
              boxShadow: "0 4px 20px rgba(217,43,4,0.3)",
            }}
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
