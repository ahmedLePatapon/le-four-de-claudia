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
if (!fs.existsSync(blogFilePath)) {
  if (process.argv.includes('--dry-run')) {
    console.log('[dry-run] data/blog.ts not found; nothing to do');
    process.exit(0);
  } else {
    throw new Error(`Missing ${blogFilePath}`);
  }
}
const blogFileContent = fs.readFileSync(blogFilePath, "utf-8");

// Parse TypeScript and extract the exported 'articles' initializer
const sourceFile = ts.createSourceFile("blog.ts", blogFileContent, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);

function findArticlesNode(node) {
  // export const articles = [...]  or export const a = 1, articles = [...]
  if (ts.isVariableStatement(node) && node.modifiers && node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
    const decl = node.declarationList.declarations.find(d => d.name && d.name.escapedText === 'articles');
    if (decl && decl.initializer) return decl.initializer;
  }
  // const articles = [...]
  if (ts.isVariableDeclaration(node) && node.name && node.name.escapedText === 'articles' && node.initializer) {
    return node.initializer;
  }
  // export default articles; OR export default [ ... ]
  if (ts.isExportAssignment(node) && node.expression) {
    if (ts.isIdentifier(node.expression) && node.expression.escapedText === 'articles') {
      const statements = sourceFile.statements;
      for (const stmt of statements) {
        if (ts.isVariableStatement(stmt)) {
          const decl = stmt.declarationList.declarations.find(d => d.name && d.name.escapedText === 'articles');
          if (decl && decl.initializer) return decl.initializer;
        }
      }
    }
    if (ts.isArrayLiteralExpression(node.expression)) {
      return node.expression;
    }
  }
  // export { articles }
  if (ts.isExportDeclaration(node) && node.exportClause && node.exportClause.elements) {
    for (const el of node.exportClause.elements) {
      if (el.name && el.name.escapedText === 'articles') {
        // find declaration named articles
        const statements = sourceFile.statements;
        for (const stmt of statements) {
          if (ts.isVariableStatement(stmt)) {
            const decl = stmt.declarationList.declarations.find(d => d.name && d.name.escapedText === 'articles');
            if (decl && decl.initializer) return decl.initializer;
          }
        }
      }
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
        } else if (ts.isShorthandPropertyAssignment(prop)) {
          // shorthand property: { foo } - cannot reliably resolve here
          throw new Error(`Shorthand property assignment found for '${prop.name.getText(sourceFile)}' — please expand to a full assignment for migration`);
        } else if (ts.isSpreadAssignment(prop)) {
          // allow simple object spread merge when expression is an object literal
          if (ts.isObjectLiteralExpression(prop.expression)) {
            const spreadObj = nodeToValue(prop.expression) || {};
            // avoid prototype pollution
            Object.keys(spreadObj).forEach((k) => {
              if (k === '__proto__' || k === 'constructor') return;
              obj[k] = spreadObj[k];
            });
          } else {
            throw new Error('Unsupported spread assignment in article object; cannot safely migrate');
          }
        } else {
          throw new Error(`Unsupported property kind ${prop.kind} in articles object; cannot safely migrate`);
        }
      });
      return obj;
    }
    case ts.SyntaxKind.CallExpression:
    case ts.SyntaxKind.NewExpression: {
      // handle Date('...') and new Date('...') -> ISO string
      const expr = node;
      const callee = expr.expression;
      if (ts.isIdentifier(callee) && String(callee.escapedText) === 'Date') {
        const arg = expr.arguments && expr.arguments[0];
        if (arg && (ts.isStringLiteral(arg) || ts.isNumericLiteral(arg) || arg.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral)) {
          const val = nodeToValue(arg);
          const d = new Date(val);
          if (!isNaN(d.getTime())) return d.toISOString();
        }
        throw new Error('Unsupported Date() usage in migration; provide a string or numeric literal argument');
      }
      throw new Error(`Unsupported call/new expression in AST: ${node.getText ? node.getText(sourceFile) : node.kind}`);
    }
    default:
      // fallback: be strict and fail rather than returning raw source
      throw new Error(`Unsupported node kind ${node.kind} — cannot safely migrate`);
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

    function safeYAMLVal(v) {
      if (v === undefined || v === null) return 'null';
      try {
        return JSON.stringify(String(v));
      } catch {
        return JSON.stringify(String(v));
      }
    }

    const frontmatter = `---\nslug: ${safeYAMLVal(article.slug)}\ntitre: ${safeYAMLVal(article.titre)}\ndate: ${safeYAMLVal(article.date)}\ncategorie: ${safeYAMLVal(article.categorie)}\nextrait: ${safeYAMLVal(article.extrait)}\nimage: ${safeYAMLVal(article.image)}\ntempsLecture: ${safeYAMLVal(article.tempsLecture)}\n---`;

    let safeSlug = String(article.slug || 'untitled').replace(/[^a-zA-Z0-9-_]/g, '-');
    // ensure slug is usable
    if (!safeSlug || safeSlug.replace(/-+/g, '').length === 0) safeSlug = 'untitled';
    const mdxContent = `${frontmatter}\n\n${markdown}\n`;

    const resolvedOutput = path.resolve(outputDir);
    let targetPath = path.join(outputDir, `${safeSlug}.mdx`);
    let resolvedTarget = path.resolve(targetPath);
    let relative = path.relative(resolvedOutput, resolvedTarget);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      throw new Error(`Unsafe slug produced path outside output dir: ${targetPath}`);
    }

    // attempt atomic write, trying sequential suffixes up to 1000
    if (process.argv.includes('--dry-run')) {
      const wouldPath = path.join(outputDir, `${safeSlug}.mdx`);
      console.log(`[dry-run] would write ${wouldPath}`);
      targetPath = wouldPath;
    } else {
      let written = false;
      const maxIndex = 1000;
      for (let i = 0; i <= maxIndex && !written; i++) {
        const candidate = i === 0 ? path.join(outputDir, `${safeSlug}.mdx`) : path.join(outputDir, `${safeSlug}-${i}.mdx`);
        const resolvedCandidate = path.resolve(candidate);
        const rel = path.relative(resolvedOutput, resolvedCandidate);
        if (rel.startsWith('..') || path.isAbsolute(rel)) {
          throw new Error(`Unsafe slug produced path outside output dir during write: ${candidate}`);
        }
        try {
          const fd = fs.openSync(candidate, 'wx');
          try {
            fs.writeFileSync(fd, mdxContent, 'utf-8');
          } finally {
            fs.closeSync(fd);
          }
          targetPath = candidate;
          written = true;
          break;
        } catch (err) {
          if (err && err.code === 'EEXIST') {
            continue; // try next suffix
          }
          throw err;
        }
      }
      if (!written) throw new Error('Failed to write file after multiple attempts');
    }

    const reportedFile = path.relative(process.cwd(), targetPath).replace(/\\/g, '/');
    console.log(`✅ ${path.basename(targetPath)}`);
    report.push({ slug: safeSlug, status: '✅ Succès', file: reportedFile });
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

if (process.argv.includes('--dry-run')) {
  console.log(`[dry-run] would write ${reportPath}`);
} else {
  fs.writeFileSync(reportPath, reportMd, "utf-8");
}

console.log(`\n✨ Migration terminée : ${successCount}/${articles.length} articles`);
console.log(`📄 Rapport : migration-report.md`);
