"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/carte", label: "Menu" },
  { href: "/#histoire", label: "L'Histoire" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solidBg = !isHome || scrolled || mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solidBg
          ? "bg-[#181211]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between whitespace-nowrap px-8 py-5 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          <span className="text-white text-xl font-bold leading-tight tracking-tight">
            Le Four de Claudia
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white hover:underline decoration-primary underline-offset-4 decoration-2",
                pathname === link.href || (link.href !== "/" && !link.href.includes("#") && pathname.startsWith(link.href))
                  ? "text-white font-bold underline decoration-primary"
                  : "text-slate-300"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/carte"
            className="flex items-center justify-center rounded-full h-11 px-6 bg-primary hover:bg-red-600 transition-colors text-white text-sm font-bold shadow-lg shadow-primary/30"
          >
            Commander
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          className="lg:hidden p-2 text-white"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={cn("block h-0.5 bg-white rounded-full transition-all duration-300", mobileOpen && "rotate-45 translate-y-2")} />
            <span className={cn("block h-0.5 bg-white rounded-full transition-all duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block h-0.5 bg-white rounded-full transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-2")} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden border-t border-white/10 bg-[#181211]/95 backdrop-blur-md"
          >
            <div className="py-4 flex flex-col gap-1 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-white bg-white/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2">
                <Link
                  href="/carte"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center rounded-full py-3 bg-primary text-white text-sm font-bold"
                >
                  Commander
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
