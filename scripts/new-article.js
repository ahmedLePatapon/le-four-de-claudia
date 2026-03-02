#!/usr/bin/env node

/**
 * Script optimisé pour le blog de la Pizzeria "Le Four de Claudia"
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function main() {
  console.log("\n🍕 CRÉATEUR D'ARTICLES - LE FOUR DE CLAUDIA\n");

  const titre = await question("Titre de l'article (ex: Le secret de notre cuisson au feu de bois) : ");
  if (!titre.trim()) {
    console.error("❌ Le titre est requis.");
    rl.close();
    process.exit(1);
  }

  // Catégories personnalisées pour ta pizzeria
  console.log("\nCatégories suggérées : Tradition, Secrets de Chef, Ingrédients, Coulisses");
  const categorie = await question("Catégorie : ");

  const extrait = await question("Extrait (résumé pour la carte de l'article) : ");
  const imageUrl = await question("URL de l'image (Entrée pour l'image de pizza par défaut) : ");

  const slug = slugify(titre);
  const date = new Date().toISOString().split("T")[0];
  const image = imageUrl.trim() || "https://images.unsplash.com/photo-1573152165306-056699048de1?w=1200"; // Image de four à bois

  const frontmatter = `---
slug: ${slug}
titre: "${titre}"
date: ${date}
categorie: ${categorie || "Tradition"}
extrait: "${extrait || "Découvrez les secrets de notre savoir-faire artisanal au feu de bois."}"
image: ${image}
tempsLecture: 4
---`;

  const placeholderContent = `
## L'authenticité du Feu de Bois

Pourquoi la cuisson au bois change-t-elle tout ? C'est une question de température et de parfum. 
Chez **Le Four de Claudia**, nous utilisons exclusivement du bois de qualité pour atteindre les **400°C** nécessaires à une saisie parfaite.

### Le secret de la pâte

Une pizza au feu de bois ne serait rien sans une pâte qui a pris le temps de reposer.
- Farine sélectionnée
- Maturation longue
- Étalage à la main

> "Le feu de bois, c'est l'âme de la pizza italienne. On ne cherche pas seulement à cuire, on cherche à sublimer le produit."
> — L'équipe du Four de Claudia

## Nos Ingrédients

Nous sélectionnons nos produits avec soin pour qu'ils révèlent tous leurs arômes sous la flamme :
1. Mozzarella fior di latte
2. Tomates San Marzano
3. Huile d'olive extra vierge

Venez goûter la différence !
`;

  const mdxContent = `${frontmatter}\n${placeholderContent}\n`;

  // S'assurer que le dossier existe
  const dirPath = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.error(`\n❌ L'article "${slug}.mdx" existe déjà.`);
    rl.close();
    process.exit(1);
  }

  fs.writeFileSync(filePath, mdxContent, "utf-8");

  console.log(`\n✅ Article créé avec succès : content/blog/${slug}.mdx`);
  console.log(`\n🔥 Il ne vous reste plus qu'à ajuster le texte pour parler de vos fours !`);

  rl.close();
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  rl.close();
  process.exit(1);
});