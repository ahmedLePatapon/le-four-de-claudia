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
  Suppléments: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
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
  const availableSizes = SIZES.filter((s) => pizza.prix[s.key] !== undefined);

  // Similar pizzas (same category, excluding current)
  const similar = pizzas
    .filter((p) => p.categorie === pizza.categorie && p.id !== pizza.id)
    .slice(0, 3);

  // Category anchor for back link
  const catSlug = pizza.categorie.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[340px] flex items-end overflow-hidden">
        <Image
          src={image}
          alt={pizza.nom}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-creme/50 text-sm mb-4">
            <a href="/" className="hover:text-creme transition-colors">Accueil</a>
            <span>/</span>
            <a href="/carte" className="hover:text-creme transition-colors">La Carte</a>
            <span>/</span>
            <span className="text-creme font-medium">{pizza.nom}</span>
          </nav>
          <div className="flex items-end gap-4 flex-wrap">
            <div>
              {pizza.categorie === "Nouveauté" && (
                <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-orange-brule">
                  NOUVEAU ✨
                </span>
              )}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {pizza.nom}
              </h1>
              <p className="text-creme/60 text-sm mt-1">{pizza.categorie}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">

          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Ingredients badges */}
            <div>
              <h2
                className="text-xl font-bold text-charbon dark:text-creme mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Composition
              </h2>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-or/10 text-orange-brule border border-or/20 dark:bg-or/15"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Enriched description */}
            <div>
              <h2
                className="text-xl font-bold text-charbon dark:text-creme mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Le mot de Claudia
              </h2>
              <p className="text-charbon/70 dark:text-creme/65 leading-relaxed text-base">
                {enrichedDesc}
              </p>
            </div>

            {/* Our commitments */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🌾", title: "Farine Tipo 00", desc: "Fermentée 48h" },
                { icon: "🔥", title: "Four à bois 400°C", desc: "Cuisson en 90 sec" },
                { icon: "🫒", title: "Produits frais", desc: "Marché 2×/semaine" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-creme-dark dark:bg-charbon/40 border border-charbon/8 dark:border-creme/8"
                >
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <span className="font-semibold text-charbon dark:text-creme text-sm">{item.title}</span>
                  <span className="text-xs text-charbon/50 dark:text-creme/50 mt-0.5">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pricing card */}
          <div className="mt-10 lg:mt-0">
            <div className="sticky top-28 rounded-2xl border border-charbon/10 dark:border-creme/10 bg-white dark:bg-charbon/50 shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-charbon/8 dark:border-creme/8"
                style={{ background: "linear-gradient(135deg, #323E40, #1a2224)" }}>
                <h3
                  className="text-lg font-bold text-creme"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pizza.nom}
                </h3>
                <p className="text-creme/50 text-xs mt-1">{pizza.categorie}</p>
              </div>

              {/* Sizes */}
              {availableSizes.length > 0 && (
                <div className="p-4 space-y-3">
                  {availableSizes.map((size) => (
                    <div
                      key={size.key}
                      className="flex items-center justify-between p-3 rounded-xl bg-charbon/4 dark:bg-creme/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: size.color }} />
                        <div>
                          <p className="font-semibold text-charbon dark:text-creme text-sm">{size.label}</p>
                          <p className="text-[11px] text-charbon/45 dark:text-creme/45">{size.dim} · {size.desc}</p>
                        </div>
                      </div>
                      <span
                        className="font-bold text-base tabular-nums ml-3"
                        style={{ color: size.color }}
                      >
                        {formatPrice(pizza.prix[size.key]!)}
                      </span>
                    </div>
                  ))}

                  {/* Generic prices (boissons, formules…) */}
                  {(["37.5cl", "75cl", "unite"] as const)
                    .filter((k) => pizza.prix[k] !== undefined)
                    .map((k) => {
                      const labels: Record<string, string> = { "37.5cl": "37,5 cl", "75cl": "75 cl", unite: "À l'unité" };
                      return (
                        <div key={k} className="flex items-center justify-between p-3 rounded-xl bg-charbon/4 dark:bg-creme/5">
                          <span className="font-medium text-charbon dark:text-creme text-sm">{labels[k]}</span>
                          <span className="font-bold text-base text-orange-brule tabular-nums">{formatPrice(pizza.prix[k]!)}</span>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Back link */}
              <div className="px-4 pb-4">
                <Link
                  href={`/carte#${catSlug}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-charbon/60 dark:text-creme/60 hover:text-rouge-tomate hover:bg-rouge-tomate/8 border border-charbon/10 dark:border-creme/10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Retour à la carte
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Similar pizzas ── */}
        {similar.length > 0 && (
          <section className="mt-16 pt-12 border-t border-charbon/10 dark:border-creme/10">
            <h2
              className="text-2xl font-bold text-charbon dark:text-creme mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dans la même catégorie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <Link key={p.id} href={`/carte/${p.id}`} className="block group">
                  <div className="transition-transform duration-200 group-hover:-translate-y-1">
                    <PizzaCard pizza={p} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
