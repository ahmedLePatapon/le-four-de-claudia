"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FireParticles from "@/components/home/FireParticles";

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
  };

  const item = {
    hidden: { opacity: 0, y: 8, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  const float = {
    animate: { y: [0, -6, 0], transition: { duration: 6, repeat: Infinity } },
  };

  return (
    <section className="relative flex items-center min-h-screen w-full overflow-hidden bg-[#181211]">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center px-8 py-16 lg:pl-16 lg:pr-12 xl:pl-32 xl:pr-16 z-20">
          <motion.div className="max-w-2xl" variants={container} initial="hidden" animate={reduce ? "show" : "show"}>
            {/* Eyebrow */}
            <motion.div className="flex items-center gap-2 mb-6" variants={item}>
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Depuis 1998</span>
            </motion.div>

            {/* Title */}
            <motion.h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8" variants={item}>
              L&apos;Art de la{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Pizza Artisanale
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed mb-10 max-w-lg border-l-2 border-slate-700 pl-6" variants={item}>
              Pâte à fermentation longue de 72h, ingrédients frais sélectionnés au marché,
              cuite au feu de bois à 400°C pour une expérience inoubliable.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-4 items-center" variants={item}>
              <motion.div whileTap={{ scale: 0.98 }} whileHover={reduce ? {} : { y: -3 }}>
                <Link
                  href="/carte"
                  className="group flex items-center justify-center gap-2 h-14 px-8 bg-primary hover:bg-red-600 text-white text-base font-bold rounded-full transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                >
                  <span>Commander Maintenant</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <Link
                href="/carte"
                className="flex items-center justify-center h-14 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 text-base font-bold rounded-full transition-all backdrop-blur-sm"
              >
                Découvrir le Menu
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div className="mt-16 flex items-center gap-8 text-slate-400 flex-wrap" variants={item}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4z" />
                </svg>
                <span className="text-sm font-medium">Cuisson au feu de bois</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm font-medium">Ingrédients Bio</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">72h Fermentation</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2 xl:w-[55%] relative h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#181211]/80 via-transparent to-[#181211] lg:bg-gradient-to-r lg:from-[#181211] lg:via-[#181211]/20 lg:to-transparent z-10 pointer-events-none" />
          <motion.div className="absolute inset-0" variants={float} animate={reduce ? undefined : "animate"}>
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920"
              alt="Pizza au feu de bois — Le Four de Claudia"
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </motion.div>
          <FireParticles className="z-30" />
          {/* Floating badge */}
          <motion.div className="absolute bottom-10 right-10 z-20 hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl" variants={float} animate={reduce ? undefined : "animate"}>
            <div className="bg-primary rounded-full p-2 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Élue Meilleure Pizza</p>
              <p className="text-slate-300 text-xs">Guide Gastronomique 2024</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
