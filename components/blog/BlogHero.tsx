export default function BlogHero() {
  return (
    <section className="relative bg-[#181211] pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[35%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-[-5%] w-[25%] h-[40%] bg-orange-700/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest border border-primary/30 text-primary bg-primary/10">
          ✍️ Savoir-faire &amp; traditions
        </div>
        <h1
          className="text-5xl sm:text-6xl font-black text-white mb-5 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Le Journal
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Techniques, traditions et secrets de cuisine italienne partagés par Claudia.
        </p>
      </div>
    </section>
  );
}
