"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Enhanced embers — more visible, more glow
const embers = [
  { size: 5, x: "15%", delay: 0, duration: 3.5, blur: 8 },
  { size: 7, x: "65%", delay: 0.8, duration: 4.2, blur: 10 },
  { size: 4, x: "40%", delay: 0.3, duration: 3.8, blur: 7 },
  { size: 6, x: "80%", delay: 1.2, duration: 4.8, blur: 9 },
  { size: 5, x: "25%", delay: 1.5, duration: 4.0, blur: 8 },
  { size: 6, x: "55%", delay: 0.6, duration: 4.1, blur: 10 },
  { size: 4, x: "75%", delay: 1.8, duration: 3.7, blur: 8 },
  { size: 5, x: "35%", delay: 1.1, duration: 4.3, blur: 9 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-x-0 z-0"
        style={{ y, top: "-10%", bottom: "-10%", height: "120%" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920"
          alt="Pizza au feu de bois — Le Four de Claudia"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Radial glow overlay — fire in bottom right */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 85% 90%, rgba(217,43,4,0.4) 0%, rgba(217,103,4,0.2) 30%, transparent 70%)",
        }}
      />

      {/* Main dark overlay — left to transparent right */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(50,62,64,0.92) 0%, rgba(50,62,64,0.75) 50%, rgba(50,62,64,0.35) 100%)",
        }}
      />

      {/* Top-to-bottom gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(50,62,64,0.85) 0%, transparent 50%)",
        }}
      />

      {/* Animated glow behind content */}
      <motion.div
        className="absolute inset-0 z-15 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 400px 300px at 50% 45%, rgba(217,43,4,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Floating embers — enhanced */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {embers.map((ember, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full"
            animate={{
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 2 + Math.random() * 1, repeat: Infinity, ease: "easeInOut" }}
            style={{
              left: ember.x,
              width: ember.size,
              height: ember.size,
              backgroundColor: "#F2B138",
              boxShadow: `0 0 ${ember.blur}px #D92B04, 0 0 ${ember.blur * 1.5}px rgba(217,43,4,0.6)`,
            }}
            onAnimationStart={() => {
              const el = document.querySelector(`[style*="left: ${ember.x}"]`) as HTMLElement;
              if (el) {
                (el as any).style.animation = `float-up ${ember.duration}s ease-in ${ember.delay}s infinite`;
              }
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 sm:px-8 max-w-4xl mx-auto">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium"
          style={{
            background: "rgba(217,43,4,0.3)",
            border: "1px solid rgba(242,177,56,0.5)",
            color: "#F2B138",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🔥
          </motion.span>
          <span>Tradition depuis 1998</span>
        </motion.div>

        {/* Main headline — split with gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 80, damping: 20 }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="text-white">Pizza au</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D92B04 0%, #D96704 50%, #F2B138 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              feu de bois
            </span>
          </h1>
        </motion.div>

        {/* Highlighted stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 sm:gap-8 my-6 flex-wrap"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-lg">⏱️</span>
            <span className="text-creme/80">
              <span style={{ color: "#F2B138", fontWeight: "bold" }}>90 secondes</span>
            </span>
          </div>
          <div className="w-px h-6 bg-creme/20 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🌡️</span>
            <span className="text-creme/80">
              <span style={{ color: "#F2B138", fontWeight: "bold" }}>400°C</span>
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-creme/70 mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Tradition italienne &amp; produits frais du marché.
          <br className="hidden sm:block" />
          Cuisson à 400°C en 90 secondes.
        </motion.p>

        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-8 flex-wrap"
        >
          {[
            { icon: "🔥", text: "Tradition" },
            { icon: "🌾", text: "Farine Tipo 00" },
            { icon: "🫒", text: "Produits frais" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(242,177,56,0.1)",
                border: "1px solid rgba(242,177,56,0.3)",
                color: "#F2B138",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/carte"
            className="group relative px-8 py-3.5 rounded-full font-semibold text-white text-base transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #D92B04 0%, #D96704 100%)",
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-full"
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              }}
            />
            <span className="relative flex items-center gap-2 group-hover:scale-105 transition-transform">
              Voir la carte
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>
          <Link
            href="/#about"
            className="px-8 py-3.5 rounded-full font-semibold text-creme text-base border-2 border-creme/50 hover:border-creme hover:bg-creme/5 transition-all duration-300"
          >
            Notre histoire
          </Link>
        </motion.div>
      </div>

      {/* Scroll arrow with pulse */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs uppercase tracking-widest mb-1" style={{ color: "#F2B138" }}>
            Défiler
          </span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#F2B138" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Ember float animation */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-100vh) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
