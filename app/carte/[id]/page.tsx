import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { pizzas } from "@/data/pizzas";
import { formatPrice } from "@/lib/utils";
import PizzaCard from "@/components/carte/PizzaCard";

interface Props {
  params: Promise<{ id: string }>;
}

// ── Category images (same as PizzaCard) ──────────────────────────────────────
const categoryImages: Record<string, string> = {
  Traditionnelles: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200",
  Fromages: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=1200",
  Légumes: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
  Poissons: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
  Charcuterie: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=1200",
  Nouveauté: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1200",
  "Spécialités - Viande Hachée": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=1200",
  "Spécialités - Poulet": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200",
  "Spécialités - Régionales": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200",
  "Pizzas Desserts": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200",
  Boissons: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=1200",
  Desserts: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200",
  "Formules Midi": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200",
  Suppléments: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
};

const SIZES = [
  { key: "bambina" as const, label: "Bambina", dim: "~26 cm", color: "#F2B138", desc: "Parfaite pour une entrée ou un appétit modéré" },
  { key: "junior" as const, label: "Junior", dim: "~32 cm", color: "#D96704", desc: "La taille idéale pour un repas complet" },
  { key: "senior" as const, label: "Senior", dim: "~40 cm", color: "#D92B04", desc: "Généreuse, pour les grands appétits" },
];

// ── Enriched descriptions ────────────────────────────────────────────────────
function getEnrichedDescription(pizza: { nom: string; description: string; categorie: string }): string {
  const base = pizza.description;
  const enrichments: Record<string, string> = {
    Traditionnelles: `Notre pâte est préparée chaque matin avec de la farine Tipo 00, fermentée 48h au froid pour une légèreté incomparable. La ${pizza.nom} est l'une de nos créations les plus appréciées depuis l'ouverture du Four de Claudia en 1998. Chaque ingrédient est sélectionné avec soin : tomates San Marzano DOP, mozzarella fior di latte livrée fraîche deux fois par semaine, herbes aromatiques du marché. Cuite en 90 secondes dans notre four à bois atteignant 400°C, elle développe ce léger leopardage doré qui est la signature d'une vraie pizza napolitaine.`,
    Fromages: `Les amateurs de fromages trouveront dans cette pizza une harmonie rare entre les différentes textures et saveurs lactées. Claudia sélectionne personnellement chaque fromage auprès de producteurs artisanaux français et italiens. La magie opère dans le four à bois : à 400°C, les fromages fondent en créant des poches crémeuses et des traces dorées irrésistibles. Une pizza généreuse, riche, qui révèle toute sa complexité à chaque bouchée.`,
    Légumes: `Cette pizza est une célébration des légumes de saison. Tous nos légumes sont sélectionnés au marché par Claudia elle-même, deux fois par semaine. Qu'ils soient grillés, marinés ou posés crus, ils gardent leur croquant et leur saveur grâce à la rapidité de cuisson au feu de bois. Une option généreuse, colorée, parfumée — la preuve qu'une pizza végétarienne peut être aussi satisfaisante qu'une pizza carnée.`,
    Poissons: `Les fruits de la mer et les poissons se marient merveilleusement bien avec la légèreté de notre pâte fermentée. Claudia s'approvisionne auprès d'un poissonnier de confiance qui livre chaque matin. La cuisson ultra-rapide à 400°C préserve la délicatesse des saveurs marines sans les surcuire. Un équilibre entre la richesse de la pâte croustillante et la fraîcheur des produits de la mer.`,
    Charcuterie: `Notre charcuterie est rigoureusement sélectionnée auprès de producteurs artisanaux français et italiens. Jambons affinés, lardons fumés au bois de hêtre, chorizos d'Espagne, saucisses artisanales — chaque référence est choisie pour sa qualité et son authenticité. Dans le four à bois, la charcuterie se caramélise légèrement, intensifiant ses arômes et créant cette alliance parfaite entre le gras fondant et le croustillant de la pâte.`,
    Nouveauté: `Découvrez l'une de nos dernières créations, née de l'imagination et de l'expérience de Claudia. Cette pizza sort des sentiers battus pour vous proposer de nouvelles combinaisons d'ingrédients soigneusement testées et ajustées jusqu'à atteindre la perfection. Une invitation à l'aventure gustative, dans le respect de notre engagement envers la qualité artisanale.`,
    "Spécialités - Viande Hachée": `La viande hachée que nous utilisons est une viande de bœuf 100% française, hachée quotidiennement par notre boucher partenaire. Sur la pizza, elle cuit en quelques secondes dans la chaleur intense du four à bois, restant juteuse à l'intérieur et légèrement croustillante en surface. Cette pizza copieuse et généreuse est l'une des préférées de nos habitués les plus réguliers.`,
    "Spécialités - Poulet": `Notre poulet est découpé et mariné maison chaque matin — jamais de préparation industrielle. La marinade varie selon les recettes, mais elle intègre toujours des herbes fraîches et une touche d'huile d'olive extra vierge. Dans le four à bois, le poulet caramélise délicatement tout en restant tendre. Une pizza généreuse qui conjugue douceur et caractère.`,
    "Spécialités - Régionales": `Cette pizza s'inspire des saveurs régionales françaises, réinterprétées selon la tradition napolitaine. Claudia a à cœur de rendre hommage aux terroirs français tout en restant fidèle à l'esprit pizza : une pâte légère, des ingrédients de qualité, une cuisson au feu de bois. Un mariage inattendu entre l'Italie et la France qui ne manquera pas de vous surprendre.`,
    "Pizzas Desserts": `Une pizza sucrée ? Oui — et vous ne vous en remettrez pas. Claudia a mis des années à perfectionner ces recettes desserts, utilisant la même pâte légèrement moins salée comme base. La cuisson au feu de bois caramélise les fruits, fait fondre le chocolat, et crée une base croustillante qui contraste merveilleusement avec les garnitures sucrées. Le dessert idéal pour clore un repas en beauté.`,
    Boissons: `Sélectionnée avec soin pour accompagner notre carte, cette boisson a été choisie pour son accord parfait avec nos pizzas. Que vous optiez pour un vin italien d'appellation, une bière fraîche ou une boisson sans alcool pétillante, l'objectif est toujours le même : sublimer votre expérience gustative au Four de Claudia.`,
    Desserts: `Le dessert idéal pour clore votre repas en douceur. Une touche de gourmandise pour prolonger le plaisir d'être attablé chez Claudia.`,
    "Formules Midi": `Profitez de notre formule déjeuner pour un repas complet à prix doux. Toutes les pizzas sont disponibles en taille "assiette" — pensée pour une personne, généreuse, savoureuse. La pause déjeuner idéale : rapide, copieuse, artisanale.`,
    Suppléments: `Personnalisez votre pizza selon vos envies. Nos ingrédients supplémentaires sont de la même qualité que ceux utilisés dans nos recettes — fraîcheur et authenticité garanties.`,
  };
  const enrichment = enrichments[pizza.categorie] ?? "";
  return enrichment;
}

// ── Parse ingredients from description ──────────────────────────────────────
function parseIngredients(description: string): string[] {
  return description
    .split(",")
    .map((s) => s.trim().replace(/^(et |ou )/i, "").trim())
    .filter((s) => s.length > 0 && s.length < 40);
}

// ── SSG ─────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return pizzas.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pizza = pizzas.find((p) => p.id === id);
  if (!pizza) return { title: "Pizza introuvable" };
  return {
    title: pizza.nom,
    description: `${pizza.nom} — ${pizza.description}. Cuite au feu de bois à 400°C au Four de Claudia.`,
    openGraph: {
      title: `${pizza.nom} | Le Four de Claudia`,
      description: pizza.description,
      images: [{ url: categoryImages[pizza.categorie] ?? categoryImages["Traditionnelles"] }],
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function PizzaDetailPage({ params }: Props) {
  const { id } = await params;
  const pizza = pizzas.find((p) => p.id === id);
  if (!pizza) notFound();

  const image = categoryImages[pizza.categorie] ?? categoryImages["Traditionnelles"];
  const ingredients = parseIngredients(pizza.description);
  const enrichedDesc = getEnrichedDescription(pizza);
  // Supplement ingredients list for the 'Ingrédient supplémentaire' product (excluding œuf & olives)
  const supplementIngredients = pizza.id === 'supplement_ingredient' ? [
    'Jambon',
    'Champignons',
    'Poivrons',
    'Oignons',
    'Basilic',
    'Parmesan',
    'Chorizo',
  ] : [];
  const availableSizes = SIZES.filter((s) => pizza.prix[s.key] !== undefined);

  // Similar pizzas (same category, excluding current)
  const similar = pizzas
    .filter((p) => p.categorie === pizza.categorie && p.id !== pizza.id)
    .slice(0, 3);

  // Category anchor for back link
  const catSlug = pizza.categorie.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-h-screen bg-[#181211]">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-600/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col pt-28 pb-16">
        <div className="px-6 lg:px-16 xl:px-32 w-full max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/carte" className="hover:text-white transition-colors">Menu</Link>
            <span>/</span>
            <span className="text-slate-300">{pizza.nom}</span>
          </nav>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
            {/* Left: Image */}
            <div className="relative w-full h-fit">
              <div className="relative aspect-[4/5] lg:aspect-square w-full rounded-2xl overflow-hidden bg-[#231a19] shadow-2xl border border-white/5">
                <Image
                  src={image}
                  alt={pizza.nom}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {pizza.categorie === "Nouveauté" && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">Nouveauté</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-start pt-4">
              <div className="mb-2 flex items-center gap-2">
                {[1,2,3,4].map((i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/>
                </svg>
                <span className="text-slate-400 text-sm ml-2">(avis clients)</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                {pizza.nom}
              </h1>

              {availableSizes.length > 0 && (
                <p className="text-2xl font-bold text-primary mb-6">
                  {formatPrice(pizza.prix[availableSizes[0].key]!)}
                </p>
              )}

              <div className="text-slate-300 mb-8 border-l-2 border-primary/50 pl-6">
                <p>{pizza.description}</p>
                {supplementIngredients.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Ingrédients disponibles</h3>
                    <ul className="flex flex-wrap gap-3">
                      {supplementIngredients.map((ing) => (
                        <li key={ing} className="px-3 py-2 bg-[#231a19] border border-white/10 rounded-lg text-slate-300">{ing}</li>
                      ))}
                    </ul>
                    <p className="text-sm mt-2 text-slate-400">Hors œuf et olives.</p>
                  </div>
                )}
                {enrichedDesc && (
                  <p className="text-sm mt-4 text-slate-400">
                    <strong className="text-slate-200">Le secret :</strong>{" "}
                    Notre pâte au levain naturel fermente pendant 72 heures avant d&apos;être cuite à 450°C dans notre four à bois.
                  </p>
                )}
              </div>

              {/* Size selection */}
              {availableSizes.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Votre Taille</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableSizes.map((size, i) => (
                      <div
                        key={size.key}
                        className={`px-5 py-3 rounded-xl bg-[#231a19] border text-slate-300 flex items-center gap-2 ${i === 1 ? "border-primary text-white bg-primary/10" : "border-white/10"}`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ background: size.color }} />
                        <span>{size.label}</span>
                        <span className="text-slate-500 text-sm">· {formatPrice(pizza.prix[size.key]!)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Generic prices */}
              {(["37.5cl", "75cl", "unite"] as const).filter((k) => pizza.prix[k] !== undefined).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Tarif</h3>
                  <div className="flex flex-wrap gap-3">
                    {(["37.5cl", "75cl", "unite"] as const).filter((k) => pizza.prix[k] !== undefined).map((k) => {
                      const labels: Record<string, string> = { "37.5cl": "37,5 cl", "75cl": "75 cl", unite: "À l'unité" };
                      return (
                        <div key={k} className="px-5 py-3 rounded-xl bg-[#231a19] border border-white/10 text-slate-300 flex items-center gap-2">
                          <span>{labels[k]}</span>
                          <span className="text-primary font-bold">{formatPrice(pizza.prix[k]!)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/carte"
                  className="flex-1 flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-red-600 text-white text-base font-bold rounded-full transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                >
                  <span>Voir toute la carte</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/carte#${catSlug}`}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-slate-400 hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              </div>

              {/* Info badges */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ingrédients 100% frais</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                    <span>Cuisson au feu de bois 400°C</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pâte fermentée 72h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar pizzas */}
          {similar.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Vous aimerez aussi</h2>
                <Link href="/carte" className="text-primary hover:text-white text-sm font-bold flex items-center gap-1 transition-colors group">
                  Voir tout le menu
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similar.map((p) => (
                  <Link key={p.id} href={`/carte/${p.id}`} className="block group">
                    <div className="transition-transform duration-200 group-hover:-translate-y-1">
                      <PizzaCard pizza={p} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
