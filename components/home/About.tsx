"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { emoji: "🌾", label: "Farine Tipo 00", desc: "Importée d'Italie, moulue finement" },
  { emoji: "🔥", label: "Four à bois 400°C", desc: "Cuisson en 90 secondes" },
  { emoji: "🫒", label: "Produits frais du marché", desc: "Sélectionnés chaque matin" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#FDF6EC" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text — 60% */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-brule mb-2">
              <span className="w-8 h-px bg-orange-brule" />
              Notre histoire
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#8C0303",
              }}
            >
              Notre savoir-faire
              <br />
              <span style={{ color: "#323E40" }}>artisanal</span>
            </h2>

            <div className="space-y-4 text-charbon/70 leading-relaxed">
              <p>
                En 1998, Claudia quittait Naples avec sa recette familiale, ses mains habituées à la farine et une conviction inébranlable : la vraie pizza, c&apos;est une question d&apos;amour et de patience.
              </p>
              <p>
                Elle s&apos;est installée à Paris avec son four à bois — 800 briques réfractaires assemblées par son père — et a commencé à cuisiner pour son quartier. Vingt-cinq ans plus tard, rien n&apos;a changé : même four, mêmes gestes, même passion.
              </p>
              <p>
                Chaque matin, Claudia prépare ses pâtons avec une farine Tipo 00 importée d&apos;Italie et les laisse fermenter 48 à 72 heures. Elle va au marché sélectionner ses tomates, ses mozzarellas fraîches, ses herbes aromatiques. Le soir, le four monte à 400°C, et la magie opère.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  className="flex flex-col gap-1 p-4 rounded-xl"
                  style={{
                    background: "rgba(242,177,56,0.08)",
                    border: "1px solid rgba(242,177,56,0.2)",
                  }}
                >
                  <span className="text-2xl">{h.emoji}</span>
                  <span className="font-semibold text-sm text-charbon" style={{ fontFamily: "var(--font-playfair)" }}>
                    {h.label}
                  </span>
                  <span className="text-xs text-charbon/50">{h.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image — 40% */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: "rotate(-2deg)",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1571167530149-c1105da4b1c2?w=800"
                alt="Claudia travaillant la pâte à pizza"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(50,62,64,0.3) 0%, transparent 60%)" }} />
            </div>

            {/* Decorative badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl"
              style={{ background: "#D96704", color: "#FDF6EC" }}
            >
              <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>25</span>
              <span className="text-xs leading-tight">ans de<br />passion</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
