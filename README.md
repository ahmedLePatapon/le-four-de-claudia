# 🔥 Le Four de Claudia

Site web de la pizzeria **Le Four de Claudia** — artisanale, tradition italienne depuis 1998.

[Live Preview](#) · [La Carte](/carte) · [Blog](/blog)

---

## ✨ Fonctionnalités

- **Page d'accueil** : Hero cinématographique avec parallax, section À propos, meilleures pizzas, témoignages, aperçu blog
- **La Carte** : 50 pizzas en 10 catégories, filtre sticky animé, transitions AnimatePresence
- **Blog** : 6 articles en **MDX** (Markdown + React), pages dynamiques SSG, articles similaires
- **Dark theme** : Design permanent dark avec tokens CSS custom
- **SEO** : metadata, OpenGraph, sitemap.xml, robots.txt
- **Animations** : Framer Motion (scroll reveal, hover, stagger, parallax)
- **Responsive** : Mobile-first, breakpoints sm/md/lg

---

## 🛠 Stack technique

| Outil | Version |
|-------|---------|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 (CSS-based config) |
| Framer Motion | 12 |
| **next-mdx-remote** | **5.x** (Blog MDX) |
| gray-matter | 4.x (Frontmatter parsing) |
| remark-gfm + rehype-* | (Markdown plugins) |
| clsx + tailwind-merge | dernière version |

---

## 🚀 Installation

```bash
# Cloner le projet
git clone <repo-url>
cd le-four-de-claudia

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev

# Build de production
npm run build
npm run start
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure des dossiers

```
le-four-de-claudia/
├── app/
│   ├── layout.tsx          # Layout global (fonts, Navbar, Footer)
│   ├── globals.css         # Tailwind v4 + @theme + dark tokens
│   ├── page.tsx            # Page d'accueil
│   ├── carte/
│   │   ├── page.tsx        # Page carte (client, filtres)
│   │   └── [id]/page.tsx   # Détail pizza (SSG)
│   ├── blog/
│   │   ├── page.tsx        # Liste des articles (MDX)
│   │   └── [slug]/
│   │       └── page.tsx    # Article MDX avec <MDXRemote />
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navbar sticky
│   │   └── Footer.tsx      # Footer 3 colonnes
│   ├── home/
│   │   ├── Hero.tsx        # Hero section plein écran
│   │   ├── About.tsx       # Section histoire
│   │   ├── BestSellers.tsx # Meilleures pizzas
│   │   ├── Testimonials.tsx
│   │   └── BlogPreview.tsx
│   ├── carte/
│   │   ├── PizzaCard.tsx   # Carte pizza réutilisable
│   │   └── CategoryFilter.tsx
│   └── blog/
│       ├── ArticleCard.tsx
│       ├── BlogGrid.tsx     # Masonry + filtres
│       └── RelatedArticles.tsx
├── content/
│   └── blog/                # ⭐ Articles en .mdx
│       ├── secrets-pate-parfaite.mdx
│       ├── cuisson-feu-de-bois.mdx
│       └── ... (6 articles)
├── data/
│   └── pizzas.ts           # 50 pizzas typées + catégories
├── lib/
│   ├── mdx.ts              # ⭐ getAllArticles(), getArticleBySlug()
│   └── utils.ts            # cn(), formatPrice()
├── scripts/
│   ├── new-article.js      # ⭐ CLI scaffold nouvel article
│   └── migrate-blog.js     # Script de migration (one-time)
└── docs/
    └── AJOUTER-UN-ARTICLE.md
```

---

## 🎨 Palette de couleurs

| Variable CSS | Couleur | Usage |
|---|---|---|
| `--color-charbon` | `#323E40` | Fond sombre, textes principaux |
| `--color-or` | `#F2B138` | Accents or, titres sur fond sombre |
| `--color-orange-brule` | `#D96704` | CTA secondaires, liens |
| `--color-rouge-tomate` | `#D92B04` | Boutons primaires, badges actifs |
| `--color-rouge-profond` | `#8C0303` | Titres de section |
| `--color-creme` | `#FDF6EC` | Fond principal, textes sur fond sombre |
| `--color-creme-dark` | `#F5E6CC` | Variation créme légèrement plus foncée |

Utilisation dans Tailwind : `bg-charbon`, `text-or`, `border-rouge-tomate`, etc.

---

## 🍕 Ajouter une pizza

Dans `data/pizzas.ts`, ajouter un objet au tableau `pizzas` :

```ts
{
  id: "ma-nouvelle-pizza",          // kebab-case unique
  nom: "Ma Nouvelle Pizza",
  description: "Description courte et appétissante de la pizza.",
  categorie: "Charcuterie",         // doit être dans CATEGORIES
  prix: {
    bambina: 14,                    // optionnel
    junior: 16,                     // optionnel
    senior: 18.50,                  // optionnel
  },
},
```

Pour l'ajouter aux best sellers, ajouter son `id` au tableau `BEST_SELLERS`.

---

## 📝 Ajouter un article de blog

**Méthode recommandée** : utiliser le script interactif

```bash
node scripts/new-article.js
```

Le script crée automatiquement un fichier `.mdx` avec frontmatter YAML dans `content/blog/`.

**Méthode manuelle** : créer un fichier `content/blog/mon-slug.mdx` :

```markdown
---
slug: mon-article
titre: "Mon nouvel article"
date: 2024-04-10
categorie: Technique
extrait: "Résumé de l'article..."
image: https://images.unsplash.com/photo-XXXX?w=1200
tempsLecture: 4
---

## Mon contenu en Markdown

Écrivez votre article ici avec **Markdown**...
```

📖 **Documentation complète** : [docs/AJOUTER-UN-ARTICLE.md](./docs/AJOUTER-UN-ARTICLE.md)

---

## 🔄 Migration Blog → MDX

Le blog a été migré de `data/blog.ts` (HTML brut) vers **next-mdx-remote** :

- ✅ **6/6 articles** convertis en `.mdx` (Markdown + frontmatter YAML)
- ✅ Routes `/blog` et `/blog/{slug}` **inchangées**
- ✅ Plus de `dangerouslySetInnerHTML` (sécurisé)
- ✅ Fichiers git-friendly et versionnables
- ✅ Support Markdown + composants React (MDX)

**Rapport de migration** : [migration-report.md](./migration-report.md)  
**Script de migration** : [scripts/migrate-blog.js](./scripts/migrate-blog.js)

---

## 🖼 Remplacer les images

Les images proviennent d'Unsplash. Pour utiliser vos propres images :

1. Déposer les images dans `/public/images/`
2. Remplacer les URLs dans `data/pizzas.ts` (champ `categoryImages`)
3. Remplacer les URLs dans `data/blog.ts` (champ `image`)
4. Remplacer l'URL du Hero dans `components/home/Hero.tsx`

Penser à mettre à jour `next.config.ts` si vous utilisez un CDN différent d'Unsplash.

---

## 📞 Informations pizzeria

Pour modifier les coordonnées, éditer `components/layout/Footer.tsx` :
- Adresse : 12 Rue des Oliviers, 75000 Paris
- Téléphone : 01 23 45 67 89
- Horaires : Lun–Sam 11h30–14h30 / 18h30–22h30

---

*Fait avec ❤️ et beaucoup de farine Tipo 00.*
