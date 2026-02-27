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
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden border transition-shadow duration-300",
        "bg-white dark:bg-charbon/50",
        "border-charbon/8 dark:border-creme/8",
        "shadow-sm hover:shadow-xl hover:shadow-charbon/10 dark:hover:shadow-black/30"
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden shrink-0", featured ? "h-44" : "h-36")}>
        <Image
          src={imgSrc}
          alt={pizza.nom}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
        {pizza.categorie === "Nouveauté" && (
          <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-orange-brule shadow">
            NOUVEAU ✨
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name + description */}
        <div>
          <h3
            className="font-bold text-charbon dark:text-creme text-[1.05rem] leading-snug mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {pizza.nom}
          </h3>
          <p className="text-xs text-charbon/55 dark:text-creme/50 line-clamp-2 leading-relaxed">
            {pizza.description}
          </p>
        </div>

        {/* Prices — pushed to bottom */}
        <div className="mt-auto">
          {isGenericPricing ? (
            // Generic pricing (boissons, formules, suppléments)
            <div className="flex flex-wrap gap-2 pt-3 border-t border-charbon/8 dark:border-creme/8">
              {genericKeys.map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-or/10 dark:bg-or/15"
                >
                  {genericKeys.length > 1 && (
                    <span className="text-[11px] font-medium text-charbon/50 dark:text-creme/50 uppercase tracking-wide">
                      {PRIX_LABELS[k]}
                    </span>
                  )}
                  <span className="font-bold text-sm text-orange-brule">
                    {formatPrice(pizza.prix[k]!)}
                  </span>
                </div>
              ))}
            </div>
          ) : availableSizes.length === 1 ? (
            // Single price (e.g. Nutella)
            <div className="flex items-center justify-between pt-3 border-t border-charbon/8 dark:border-creme/8">
              <span className="text-xs uppercase tracking-wide text-charbon/40 dark:text-creme/40 font-medium">
                {availableSizes[0].label}
              </span>
              <span className="font-bold text-rouge-tomate text-base">
                {formatPrice(pizza.prix[availableSizes[0].key]!)}
              </span>
            </div>
          ) : (
            // Multiple sizes
            <div className="flex gap-1.5 pt-3 border-t border-charbon/8 dark:border-creme/8">
              {SIZE_CONFIG.map((s) => {
                const price = pizza.prix[s.key];
                if (price === undefined) return null;
                return (
                  <div
                    key={s.key}
                    className={cn(
                      "flex-1 flex flex-col items-center rounded-xl py-2 px-1 transition-colors",
                      s.highlight
                        ? "bg-rouge-tomate/8 ring-1 ring-rouge-tomate/20 dark:bg-rouge-tomate/15"
                        : "bg-charbon/4 dark:bg-creme/5"
                    )}
                  >
                    {/* Size dot + label */}
                    <div className="flex items-center gap-1 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-wide",
                        s.highlight ? "text-rouge-tomate" : "text-charbon/45 dark:text-creme/40"
                      )}>
                        {s.label}
                      </span>
                    </div>
                    <span className={cn(
                      "font-bold text-sm tabular-nums",
                      s.highlight ? "text-rouge-tomate" : "text-charbon dark:text-creme"
                    )}>
                      {formatPrice(price)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
