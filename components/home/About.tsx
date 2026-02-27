"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { icon: "🌾", label: "Farine Tipo 00", desc: "Importée d'Italie, moulue finement" },
  { icon: "🔥", label: "Four à bois 400°C", desc: "Cuisson en 90 secondes" },
  { icon: "🫒", label: "Produits frais du marché", desc: "Sélectionnés chaque matin" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="histoire" className="py-20 lg:py-28 bg-[#181211]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              <span className="w-8 h-px bg-primary" />
              Notre histoire
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Notre savoir-faire
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">artisanal</span>
            </h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  className="flex flex-col gap-1 p-4 rounded-xl bg-[#231b1a] border border-white/5"
                >
                  <span className="text-2xl">{h.icon}</span>
                  <span className="font-semibold text-sm text-white">{h.label}</span>
                  <span className="text-xs text-slate-400">{h.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5" style={{ transform: "rotate(-2deg)", aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1571167530149-c1105da4b1c2?w=800"
                alt="Claudia travaillant la pâte à pizza"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(24,18,17,0.5) 0%, transparent 60%)" }} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl bg-primary text-white"
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
