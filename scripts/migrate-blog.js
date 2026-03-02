#!/usr/bin/env node

/**
 * Script de migration : data/blog.ts → content/blog/*.mdx
 * 
 * Convertit les articles existants du format TypeScript (HTML) 
 * vers des fichiers MDX avec frontmatter YAML.
 */

const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");

// Configuration Turndown
const turndown = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

// Amélioration de la conversion : préserver les citations
turndown.addRule("blockquote", {
  filter: "blockquote",
  replacement: function (content) {
    return content.trim().split("\n").map(line => `> ${line}`).join("\n") + "\n\n";
  },
});

// Lire et parser le fichier data/blog.ts
const blogFilePath = path.join(process.cwd(), "data/blog.ts");
const blogFileContent = fs.readFileSync(blogFilePath, "utf-8");

// Extraire le tableau articles avec une regex simple
// Trouve le export const articles: Article[] = [ ... ];
const articlesMatch = blogFileContent.match(/export const articles[^=]*= (\[[\s\S]*\]);/);
if (!articlesMatch) {
  throw new Error("Impossible de trouver le tableau articles dans data/blog.ts");
}

// Parser le JSON-like (eval n'est pas safe, mais c'est un script de migration one-time)
// Alternative : utiliser un parser TypeScript, mais trop complexe pour ce cas
const articlesStr = articlesMatch[1];
const articles = eval(articlesStr);

const outputDir = path.join(process.cwd(), "content/blog");
const reportPath = path.join(process.cwd(), "migration-report.md");

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const report = [];
let successCount = 0;

console.log("🚀 Démarrage migration data/blog.ts → content/blog/*.mdx\n");

articles.forEach((article) => {
  try {
    // Convertir HTML → Markdown
    const markdown = turndown.turndown(article.contenu.trim());

    // Construire le frontmatter YAML
    const frontmatter = `---
slug: ${article.slug}
titre: "${article.titre}"
date: ${article.date}
categorie: ${article.categorie}
extrait: "${article.extrait.replace(/"/g, '\\"')}"
image: ${article.image}
tempsLecture: ${article.tempsLecture}
---`;

    // Combiner frontmatter + contenu
    const mdxContent = `${frontmatter}\n\n${markdown}\n`;

    // Écrire le fichier .mdx
    const filePath = path.join(outputDir, `${article.slug}.mdx`);
    fs.writeFileSync(filePath, mdxContent, "utf-8");

    console.log(`✅ ${article.slug}.mdx`);
    report.push({
      slug: article.slug,
      status: "✅ Succès",
      file: `content/blog/${article.slug}.mdx`,
    });
    successCount++;
  } catch (error) {
    console.error(`❌ Erreur pour ${article.slug}:`, error.message);
    report.push({
      slug: article.slug,
      status: "❌ Échec",
      error: error.message,
    });
  }
});

// Générer le rapport de migration
let reportMd = `# Rapport de migration Blog → MDX\n\n`;
reportMd += `**Date** : ${new Date().toISOString()}\n`;
reportMd += `**Articles migrés** : ${successCount}/${articles.length}\n\n`;
reportMd += `## Détails\n\n`;
reportMd += `| Slug | Statut | Fichier |\n`;
reportMd += `|------|--------|----------|\n`;

report.forEach((r) => {
  reportMd += `| ${r.slug} | ${r.status} | ${r.file || r.error || "—"} |\n`;
});

fs.writeFileSync(reportPath, reportMd, "utf-8");

console.log(`\n✨ Migration terminée : ${successCount}/${articles.length} articles`);
console.log(`📄 Rapport : migration-report.md`);
