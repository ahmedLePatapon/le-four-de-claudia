export interface Pizza {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  prix: {
    bambina?: number;
    junior?: number;
    senior?: number;
    "37.5cl"?: number;
    "75cl"?: number;
    unite?: number;
  };
}

export const pizzas: Pizza[] = [
  // Traditionnelles
  {
    id: "margharita",
    nom: "Margharita",
    description: "La classique italienne — sauce tomate fraîche, mozzarella fior di latte, basilic frais, huile d'olive.",
    categorie: "Traditionnelles",
    prix: { bambina: 11, junior: 13, senior: 15.50 },
  },
  {
    id: "chef",
    nom: "Chef",
    description: "La signature de Claudia — sauce tomate, mozzarella, jambon, champignons, olives noires, poivrons grillés.",
    categorie: "Traditionnelles",
    prix: { bambina: 13, junior: 15, senior: 17.50 },
  },
  {
    id: "regina",
    nom: "Régina",
    description: "Grande classique — sauce tomate, mozzarella, jambon de Paris, champignons de Paris sautés à l'ail.",
    categorie: "Traditionnelles",
    prix: { bambina: 13, junior: 15, senior: 17.50 },
  },

  // Fromages
  {
    id: "formaggio",
    nom: "Formaggio",
    description: "Pour les amoureux du fromage — mozzarella, emmental, gorgonzola, parmesan, ricotta fraîche.",
    categorie: "Fromages",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "chevre-ou-roquefort",
    nom: "Chèvre ou Roquefort",
    description: "Crème fraîche, mozzarella, chèvre (ou roquefort), noix caramélisées, miel de lavande, roquette.",
    categorie: "Fromages",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "argenteuillaise",
    nom: "Argenteuillaise",
    description: "Crème fraîche, mozzarella, asperges vertes, parmesan copeaux, citron confit, herbes fraîches.",
    categorie: "Fromages",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "melanzana",
    nom: "Melanzana",
    description: "Sauce tomate, mozzarella di bufala, aubergines grillées à l'huile d'olive, ricotta salée, basilic.",
    categorie: "Fromages",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },

  // Légumes
  {
    id: "caponatta",
    nom: "Caponatta",
    description: "Sauce tomate, mozzarella, aubergines, courgettes, poivrons, oignons caramélisés, câpres, raisins secs.",
    categorie: "Légumes",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "primavera",
    nom: "Primavera",
    description: "Crème fraîche, mozzarella, artichauts marinés, tomates cerise, épinards frais, pesto maison.",
    categorie: "Légumes",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "castellana",
    nom: "Castellana",
    description: "Sauce tomate, mozzarella, champignons des bois, oignons, poivrons rouges, olives vertes, origan.",
    categorie: "Légumes",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },

  // Poissons
  {
    id: "frutti-di-mare",
    nom: "Frutti Di Mare",
    description: "Sauce tomate, mozzarella, fruits de mer (crevettes, moules, calamars), ail, persil, citron.",
    categorie: "Poissons",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "al-tonno",
    nom: "Al Tonno",
    description: "Sauce tomate, mozzarella, thon albacore, oignons rouges, câpres, olives noires, origan.",
    categorie: "Poissons",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "napolitana",
    nom: "Napolitana",
    description: "Sauce tomate, mozzarella, anchois marinés à l'huile d'olive, câpres, olives, origan frais.",
    categorie: "Poissons",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "super_claudia",
    nom: "Super Claudia",
    description: "Notre fierté — crème fraîche, mozzarella, saumon fumé Atlantique, câpres, oignons rouges, aneth.",
    categorie: "Poissons",
    prix: { bambina: 15.50, junior: 17.50, senior: 20 },
  },

  // Charcuterie
  {
    id: "victoria",
    nom: "Victoria",
    description: "Sauce tomate, mozzarella, jambon cru de montagne, tomates cerises, roquette, parmesan copeaux.",
    categorie: "Charcuterie",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "andalousia",
    nom: "Andalousia",
    description: "Sauce tomate, mozzarella, chorizo ibérique, poivrons rouges confits, piment doux, coriandre fraîche.",
    categorie: "Charcuterie",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "campione",
    nom: "Campione",
    description: "Sauce tomate, mozzarella, salami Milano, champignons, poivrons tricolores, piment vert.",
    categorie: "Charcuterie",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "alsacienne",
    nom: "Alsacienne",
    description: "Crème fraîche, mozzarella, lardons fumés, oignons caramélisés, caraway, gruyère gratinée.",
    categorie: "Charcuterie",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "savoyarde",
    nom: "Savoyarde",
    description: "Crème fraîche, mozzarella, jambon fumé des Alpes, reblochon, lardons, pommes de terre fondantes.",
    categorie: "Charcuterie",
    prix: { bambina: 14, junior: 16, senior: 18.50 },
  },
  {
    id: "paesanna",
    nom: "Paesanna",
    description: "Sauce tomate, mozzarella, jambon blanc, lardons de poitrine, œuf au plat, herbes de Provence.",
    categorie: "Charcuterie",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "parma",
    nom: "Parma",
    description: "Sauce tomate, mozzarella di bufala, jambon de Parme 24 mois, roquette sauvage, tomates cerise, copeaux de parmesan.",
    categorie: "Charcuterie",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "antipasto",
    nom: "Antipasto",
    description: "Crème fraîche, mozzarella, bresaola, mortadelle, salami, coppa, artichauts, olives, tomates séchées.",
    categorie: "Charcuterie",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },

  // Nouveauté
  {
    id: "la-buffalina-piquante",
    nom: "La Buffalina Piquante",
    description: "NOUVEAUTÉ — sauce tomate épicée, mozzarella di bufala, nduja calabraise, piment de cayenne, basilic, huile pimentée.",
    categorie: "Nouveauté",
    prix: { junior: 17.50, senior: 20 },
  },

  // Spécialités - Viande Hachée
  {
    id: "boursin",
    nom: "Boursin",
    description: "Sauce tomate, mozzarella, bœuf haché assaisonné, fromage Boursin ail & fines herbes, oignons sautés.",
    categorie: "Spécialités - Viande Hachée",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "texane",
    nom: "Texane",
    description: "Sauce tomate épicée, mozzarella, bœuf haché, jalapeños, cheddar fondu, oignons rouges, sauce BBQ maison.",
    categorie: "Spécialités - Viande Hachée",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "bologna",
    nom: "Bologna",
    description: "Sauce bolognaise maison (bœuf & porc), mozzarella, parmesan, basilic frais, huile d'olive première pression.",
    categorie: "Spécialités - Viande Hachée",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "burger",
    nom: "Burger",
    description: "Sauce spéciale burger, mozzarella, bœuf haché, cornichons, oignons frits, cheddar, tomates, salade.",
    categorie: "Spécialités - Viande Hachée",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },

  // Spécialités - Poulet
  {
    id: "aglio",
    nom: "Aglio",
    description: "Crème fraîche aillée, mozzarella, blanc de poulet rôti, champignons, ail confit, persil plat, parmesan.",
    categorie: "Spécialités - Poulet",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "new-delhi",
    nom: "New Delhi",
    description: "Sauce curry tika masala, mozzarella, poulet tikka, poivrons, oignons, coriandre fraîche, yaourt épicé.",
    categorie: "Spécialités - Poulet",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "forestiere",
    nom: "Forestière",
    description: "Crème fraîche, mozzarella, poulet fumé, champignons des bois (cèpes, chanterelles), thym, romarin.",
    categorie: "Spécialités - Poulet",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },

  // Spécialités - Régionales
  {
    id: "new-yorkaise",
    nom: "New Yorkaise",
    description: "Sauce tomate maison généreuse, mozzarella triple, pepperoni, saucisse italienne, poivrons — la pizza XL.",
    categorie: "Spécialités - Régionales",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "tartiflette",
    nom: "Tartiflette",
    description: "Crème fraîche, mozzarella, pommes de terre grenaille, lardons fumés, reblochon de Savoie AOP, oignons.",
    categorie: "Spécialités - Régionales",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },
  {
    id: "corse",
    nom: "Corse",
    description: "Sauce tomate, mozzarella, figatellu grillé, fromage brocciu, figues fraîches, miel corse, noisettes.",
    categorie: "Spécialités - Régionales",
    prix: { bambina: 14.50, junior: 16.50, senior: 19 },
  },

  // Pizzas Desserts
  {
    id: "normande",
    nom: "Normande",
    description: "Crème fraîche, mozzarella, pommes caramélisées, calvados, cannelle, sucre roux, crème chantilly.",
    categorie: "Pizzas Desserts",
    prix: { junior: 13, senior: 15 },
  },
  {
    id: "exotique",
    nom: "Exotique",
    description: "Crème de coco, mozzarella, ananas frais, mangue, banane caramélisée, noix de coco râpée, coulis fruit de la passion.",
    categorie: "Pizzas Desserts",
    prix: { junior: 13, senior: 15 },
  },
  {
    id: "belle-helene",
    nom: "Belle Hélène",
    description: "Crème fraîche vanillée, mozzarella, poires Williams pochées, chocolat noir fondu, amandes effilées grillées.",
    categorie: "Pizzas Desserts",
    prix: { junior: 13, senior: 15 },
  },
  {
    id: "amanda",
    nom: "Amanda",
    description: "Crème d'amande, mozzarella, fraises fraîches, framboises, coulis framboise, sucre glace, menthe fraîche.",
    categorie: "Pizzas Desserts",
    prix: { junior: 13, senior: 15 },
  },
  {
    id: "nutella",
    nom: "Nutella",
    description: "Généreuse couche de Nutella, mozzarella, sucre glace, fruits rouges de saison, noisettes concassées.",
    categorie: "Pizzas Desserts",
    prix: { junior: 8 },
  },
];

export const CATEGORIES: string[] = [
  "Traditionnelles",
  "Fromages",
  "Légumes",
  "Poissons",
  "Charcuterie",
  "Nouveauté",
  "Spécialités - Viande Hachée",
  "Spécialités - Poulet",
  "Spécialités - Régionales",
  "Pizzas Desserts",
  "Boissons",
  "Desserts",
  "Formules Midi",
  "Suppléments",
];

// ── Boissons, Desserts, Formules, Suppléments ──────────────────────────────
pizzas.push(
  // Vins italiens
  { id: "vins_italiens_bardolino_rose", nom: "Bardolino rosé", description: "Vin italien en bouteille", categorie: "Boissons", prix: { "37.5cl": 6, "75cl": 10 } },
  { id: "vins_italiens_bardolino_rouge", nom: "Bardolino rouge", description: "Vin italien en bouteille", categorie: "Boissons", prix: { "37.5cl": 6, "75cl": 10 } },
  { id: "vins_italiens_chianti_rouge", nom: "Chianti rouge", description: "Vin italien en bouteille", categorie: "Boissons", prix: { "75cl": 10 } },
  { id: "vins_italiens_lambrusco_rose", nom: "Lambrusco rosé", description: "Vin pétillant italien en bouteille", categorie: "Boissons", prix: { "37.5cl": 6, "75cl": 10 } },
  { id: "vins_italiens_lambrusco_rouge", nom: "Lambrusco rouge", description: "Vin pétillant italien en bouteille", categorie: "Boissons", prix: { "37.5cl": 6, "75cl": 10 } },
  { id: "vins_italiens_montepulciano_rouge", nom: "Montepulciano rouge", description: "Vin italien en bouteille", categorie: "Boissons", prix: { "75cl": 10 } },
  // Soft & bière
  { id: "soda_33cl", nom: "Sodas", description: "San Pellegrino, Coca Cola, Coca Zéro, Ice Tea, Schweppes Agrumes, Orangina, Oasis — canette 33 cl", categorie: "Boissons", prix: { unite: 2 } },
  { id: "biere_heineken", nom: "Bière Heineken", description: "Bouteille de 25 cl", categorie: "Boissons", prix: { unite: 2.5 } },
  // Desserts
  { id: "glace_haagen_dazs", nom: "Glace Häagen-Dazs", description: "Parfums au choix", categorie: "Desserts", prix: { unite: 3.5 } },
  // Formules Midi
  { id: "formule_midi_1", nom: "Pizza + Boisson", description: "Toutes les pizzas en taille « assiette » — pour une personne", categorie: "Formules Midi", prix: { unite: 15 } },
  { id: "formule_midi_2", nom: "Pizza + Boisson + Glace", description: "Toutes les pizzas en taille « assiette » — pour une personne", categorie: "Formules Midi", prix: { unite: 17 } },
  // Suppléments
  { id: "supplement_ingredient", nom: "Ingrédient supplémentaire", description: "Hors œuf et olives", categorie: "Suppléments", prix: { unite: 1.5 } },
);

export const BEST_SELLERS: string[] = [
  "margharita",
  "chef",
  "super_claudia",
  "formaggio",
  "antipasto",
  "texane",
];
