import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "380px" }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
          alt="Le blog de Claudia"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(50,62,64,0.92) 0%, rgba(50,62,64,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 py-20">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(217,103,4,0.2)",
            border: "1px solid rgba(217,103,4,0.4)",
            color: "#F2B138",
          }}
        >
          🍕 Savoir-faire &amp; traditions
        </div>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-creme mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Le Blog de Claudia
        </h1>
        <p className="text-creme/65 text-lg max-w-xl mx-auto">
          Techniques, traditions et secrets de cuisine italienne
        </p>
      </div>
    </section>
  );
}
