"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reviews = [
  {
    text: "La meilleure pizza de Paris sans hésitation ! La pâte est incroyable — croustillante dehors, moelleuse dedans. Et le saumon de la Super Claudia... on en rêve longtemps après.",
    name: "Marie L.",
    city: "Paris",
    stars: 5,
  },
  {
    text: "On est accros depuis 3 ans. Le saumon de la Super Claudia est divin, la Forestière est parfaite pour ma femme végétarienne. Le four à bois ça change vraiment tout, les autres pizzas ne se comparent pas.",
    name: "Thomas B.",
    city: "Boulogne",
    stars: 5,
  },
  {
    text: "Rien ne vaut la cuisson au feu de bois. Claudia a un talent rare — chaque pizza est une œuvre. On vient de Versailles exprès, et ce n'est jamais une déception. Trois étoiles Michelin en mérite !",
    name: "Isabelle M.",
    city: "Versailles",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-28 bg-[#181211]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-slate-700" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Avis clients</span>
            <span className="h-px w-12 bg-slate-700" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
          >
            Ce que disent nos clients
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="relative bg-[#231b1a] rounded-2xl p-7 border border-white/5 hover:border-primary/30 transition-colors flex flex-col gap-4"
            >
              <span
                className="absolute top-5 right-6 text-6xl font-serif leading-none select-none"
                style={{ color: "#ee3b2b", opacity: 0.2, fontFamily: "Georgia, serif" }}
                aria-hidden="true"
              >
                "
              </span>

              <StarRating count={review.stars} />

              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 bg-primary">
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
