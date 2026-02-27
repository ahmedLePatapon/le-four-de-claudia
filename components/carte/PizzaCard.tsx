"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type Pizza } from "@/data/pizzas";
import { formatPrice, cn } from "@/lib/utils";

interface PizzaCardProps {
  pizza: Pizza;
  featured?: boolean;
}

const categoryImages: Record<string, string> = {
  Traditionnelles: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  Fromages: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
  Légumes: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  Poissons: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  Charcuterie: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
  Nouveauté: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400",
  "Spécialités - Viande Hachée": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
  "Spécialités - Poulet": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
  "Spécialités - Régionales": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  "Pizzas Desserts": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
  Boissons: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=400",
  Desserts: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
  "Formules Midi": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400",
  Suppléments: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
};

// Labels display for non-pizza price keys
const PRIX_LABELS: Record<string, string> = {
  "37.5cl": "37,5 cl",
  "75cl": "75 cl",
  unite: "Unité",
};

const SIZE_CONFIG = [
  { key: "bambina" as const, label: "Bambina", short: "~26 cm", dot: "#F2B138" },
  { key: "junior" as const, label: "Junior", short: "~32 cm", dot: "#D96704", highlight: true },
  { key: "senior" as const, label: "Senior", short: "~40 cm", dot: "#D92B04" },
];

export default function PizzaCard({ pizza, featured = false }: PizzaCardProps) {
  const imgSrc = categoryImages[pizza.categorie] ?? categoryImages["Traditionnelles"];
  const availableSizes = SIZE_CONFIG.filter((s) => pizza.prix[s.key] !== undefined);

  // Detect non-pizza price keys (boissons, formules, etc.)
  const genericKeys = (["37.5cl", "75cl", "unite"] as const).filter(
    (k) => pizza.prix[k] !== undefined
  );
  const isGenericPricing = genericKeys.length > 0;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="group flex flex-col rounded-xl overflow-hidden border border-white/5 bg-[#231b1a] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full"
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden shrink-0", featured ? "h-56" : "h-48")}>
        <Image
          src={imgSrc}
          alt={pizza.nom}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {pizza.categorie === "Nouveauté" && (
          <span className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-md">
            ✨ Nouveau
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">
              {pizza.nom}
            </h3>
            {availableSizes.length > 0 && (
              <span className="text-lg font-bold text-primary ml-2 shrink-0">
                {formatPrice(pizza.prix[availableSizes[0].key]!)}
              </span>
            )}
            {isGenericPricing && genericKeys[0] && (
              <span className="text-lg font-bold text-primary ml-2 shrink-0">
                {formatPrice(pizza.prix[genericKeys[0]]!)}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-2">
            {pizza.description}
          </p>
        </div>

        {/* Sizes */}
        {!isGenericPricing && availableSizes.length > 1 && (
          <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
            {SIZE_CONFIG.map((s) => {
              const price = pizza.prix[s.key];
              if (price === undefined) return null;
              return (
                <div
                  key={s.key}
                  className={cn(
                    "flex-1 flex flex-col items-center rounded-lg py-2 px-1",
                    s.highlight ? "bg-primary/10 ring-1 ring-primary/20" : "bg-white/5"
                  )}
                >
                  <span className={cn("text-[10px] font-semibold uppercase tracking-wide mb-0.5", s.highlight ? "text-primary" : "text-slate-500")}>
                    {s.label}
                  </span>
                  <span className={cn("font-bold text-sm tabular-nums", s.highlight ? "text-primary" : "text-slate-300")}>
                    {formatPrice(price)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {isGenericPricing && (
          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-white/5">
            {genericKeys.map((k) => (
              <div key={k} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                {genericKeys.length > 1 && (
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{PRIX_LABELS[k]}</span>
                )}
                <span className="font-bold text-sm text-primary">{formatPrice(pizza.prix[k]!)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
