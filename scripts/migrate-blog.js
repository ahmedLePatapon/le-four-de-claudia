#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Script de migration : data/blog.ts → content/blog/*.mdx
 *
 * Convertit les articles existants du format TypeScript (HTML)
 * vers des fichiers MDX avec frontmatter YAML.
 *
 * This version parses the TypeScript AST instead of using eval().
 */

const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");
const ts = require("typescript");

// Configuration Turndown
const turndown = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

// Preserve blockquotes
turndown.addRule("blockquote", {
  filter: "blockquote",
  replacement: function (content) {
    return content
      .trim()
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n") + "\n\n";
  },
});

// Lire et parser le fichier data/blog.ts
const blogFilePath = path.join(process.cwd(), "data/blog.ts");
const blogFileContent = fs.readFileSync(blogFilePath, "utf-8");

// Parse TypeScript and extract the exported 'articles' initializer
const sourceFile = ts.createSourceFile("blog.ts", blogFileContent, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);

function findArticlesNode(node) {
  if (ts.isVariableStatement(node) && node.modifiers && node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
    const decl = node.declarationList.declarations[0];
    if (decl && decl.name && decl.name.escapedText === 'articles' && decl.initializer) {
      return decl.initializer;
    }
  }
  let found = null;
  ts.forEachChild(node, (child) => {
    if (!found) found = findArticlesNode(child);
  });
  return found;
}

const articlesNode = findArticlesNode(sourceFile);
if (!articlesNode) {
  throw new Error("Impossible de trouver le tableau articles dans data/blog.ts");
}

function nodeToValue(node) {
  if (!node) return undefined;
  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      return node.text;
    case ts.SyntaxKind.NumericLiteral:
      return Number(node.text);
    case ts.SyntaxKind.TrueKeyword:
      return true;
    case ts.SyntaxKind.FalseKeyword:
      return false;
    case ts.SyntaxKind.ArrayLiteralExpression:
      return node.elements.map(nodeToValue);
    case ts.SyntaxKind.ObjectLiteralExpression: {
      const obj = {};
      node.properties.forEach((prop) => {
        if (ts.isPropertyAssignment(prop)) {
          const key = prop.name.getText(sourceFile).replace(/['\"]/g, '');
          obj[key] = nodeToValue(prop.initializer);
        }
      });
      return obj;
    }
    default:
      // fallback to text for unknown nodes
      return node.getText ? node.getText(sourceFile) : undefined;
  }
}

const articles = nodeToValue(articlesNode);

if (!Array.isArray(articles)) {
  throw new Error('Parsed `articles` is not an array — aborting migration');
}

const outputDir = path.join(process.cwd(), "content/blog");
const reportPath = path.join(process.cwd(), "migration-report.md");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const report = [];
let successCount = 0;

console.log("🚀 Démarrage migration data/blog.ts → content/blog/*.mdx\n");

articles.forEach((article) => {
  try {
    const contenu = (article.contenu || "").toString().trim();
    const markdown = turndown.turndown(contenu);

    const frontmatter = `---\nslug: ${article.slug}\ntitre: "${String(article.titre || '')}"\ndate: ${article.date}\ncategorie: ${article.categorie}\nextrait: "${String((article.extrait || '').replace(/"/g, '\\"'))}"\nimage: ${article.image}\ntempsLecture: ${article.tempsLecture}\n---`;

    const safeSlug = String(article.slug || 'untitled').replace(/[^a-zA-Z0-9-_]/g, '-');
    const mdxContent = `${frontmatter}\n\n${markdown}\n`;
    const filePath = path.join(outputDir, `${safeSlug}.mdx`);
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(outputDir))) {
      throw new Error(`Unsafe slug produced path outside output dir: ${filePath}`);
    }
    fs.writeFileSync(filePath, mdxContent, "utf-8");

    console.log(`✅ ${safeSlug}.mdx`);
    report.push({ slug: safeSlug, status: '✅ Succès', file: `content/blog/${safeSlug}.mdx` });
    successCount++;
  } catch (error) {
    console.error(`❌ Erreur pour ${article && article.slug ? article.slug : 'unknown'}:`, error && error.message ? error.message : String(error));
    report.push({ slug: article && article.slug ? article.slug : 'unknown', status: '❌ Échec', error: error && error.message ? error.message : String(error) });
  }
});

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
