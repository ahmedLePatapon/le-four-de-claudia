#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Script pour créer un nouvel article de blog
 * Usage: node scripts/new-article.js
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
  console.log("\n🍕 Créer un nouvel article de blog\n");

  const titre = await question("Titre de l'article : ");
  if (!titre.trim()) {
    console.error("❌ Le titre est requis.");
    rl.close();
    process.exit(1);
  }

  const categorie = await question("Catégorie (Technique/Tradition/Ingrédients/Histoire) : ");
  const extrait = await question("Extrait (résumé court) : ");
  const imageUrl = await question("URL de l'image (ou Enter pour placeholder Unsplash) : ");
  const tempsLectureInput = await question("Temps de lecture en minutes (défaut: 5) : ");

  const slug = slugify(titre);
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const tempsLecture = parseInt(tempsLectureInput) || 5;
  const image = imageUrl.trim() || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200";

  const frontmatter = `---
slug: ${slug}
titre: "${titre}"
date: ${date}
categorie: ${categorie || "Technique"}
extrait: "${extrait || "Description à compléter..."}"
image: ${image}
tempsLecture: ${tempsLecture}
---`;

  const placeholderContent = `
## Introduction

Écrivez votre introduction ici...

## Section principale

Le corps de votre article avec des **gras** et de l'*italique*.

### Sous-section

Vous pouvez utiliser :

- Des listes à puces
- Plusieurs niveaux de titres
- Des [liens](https://example.com)
- Des images : ![alt text](https://images.unsplash.com/photo-example)

> Et des citations pour mettre en valeur des idées importantes.
> — Claudia

## Conclusion

Concluez votre article...
`;

  const mdxContent = `${frontmatter}\n${placeholderContent}\n`;
  const fileDir = path.join(process.cwd(), "content/blog");
  const filePath = path.join(fileDir, `${slug}.mdx`);

  // Créer le dossier si nécessaire
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }

  // Vérifier si le fichier existe déjà
  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Le fichier ${slug}.mdx existe déjà.`);
    rl.close();
    process.exit(1);
  }

  fs.writeFileSync(filePath, mdxContent, "utf-8");

  console.log(`\n✅ Article créé : content/blog/${slug}.mdx`);
  console.log(`\n📝 Prochaines étapes :`);
  console.log(`   1. Ouvrir le fichier et écrire votre contenu`);
  console.log(`   2. Tester localement : npm run dev`);
  console.log(`   3. Builder : npm run build`);
  console.log(`   4. Commiter : git add content/blog/${slug}.mdx && git commit -m "Ajouter article: ${titre}"\n`);

  rl.close();
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  rl.close();
  process.exit(1);
});
