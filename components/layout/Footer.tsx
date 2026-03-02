import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#181211] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Le Four de Claudia</h3>
          </div>
          <p className="text-slate-500 text-sm">
            L'art de la pizza artisanale depuis 1998.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/carte" className="text-slate-400 hover:text-white transition-colors text-sm">
              Menu
            </Link>
            <Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">
              Blog
            </Link>
            <Link href="/mentions-legales" className="text-slate-400 hover:text-white transition-colors text-sm">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-slate-400 hover:text-white transition-colors text-sm">
              Confidentialité
            </Link>
          </nav>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Facebook</a>
            <a href="tel:0123456789" className="text-slate-400 hover:text-white transition-colors text-sm">01 23 45 67 89</a>
          </div>
          <p className="text-slate-600 text-xs mt-4">
            © 2024 Le Four de Claudia. Tous droits réservés.
          </p>
          <p className="text-slate-500 text-xxs mt-2">
            Photos: <a className="text-slate-400 hover:text-white underline" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
