# Ajouter un article de blog

Ce guide explique comment ajouter un nouvel article au blog du Four de Claudia.

## Méthode 1 : Script automatique (recommandé)

Le moyen le plus simple est d'utiliser le script interactif :

```bash
node scripts/new-article.js
```

Le script vous demandera :
- **Titre** : Le titre complet de l'article
- **Catégorie** : Technique, Tradition, Ingrédients, ou Histoire
- **Extrait** : Résumé court (2-3 phrases) affiché dans la liste
- **URL de l'image** : Image de couverture (laisser vide pour un placeholder Unsplash)
- **Temps de lecture** : En minutes (défaut: 5)

## Méthode 2 : Créer manuellement un fichier .mdx

Créez un fichier dans `content/blog/votre-slug.mdx` avec frontmatter YAML :

```markdown
---
slug: votre-slug-kebab-case
titre: "Le titre complet de votre article"
date: 2024-03-02
categorie: Technique
extrait: "Un court résumé..."
image: https://images.unsplash.com/photo-xxxxx?w=1200
tempsLecture: 5
---

## Votre contenu en Markdown

Écrivez votre article ici...
```

## Workflow complet

1. **Créer** : `node scripts/new-article.js`
2. **Écrire** : Ouvrir le `.mdx` et remplacer le placeholder
3. **Tester** : `npm run dev` → `localhost:3000/blog`
4. **Builder** : `npm run build` (vérifier 0 erreurs)
5. **Commiter** : `git add content/blog/votre-slug.mdx && git commit`

Voir le fichier complet pour plus de détails sur la syntaxe Markdown supportée.
