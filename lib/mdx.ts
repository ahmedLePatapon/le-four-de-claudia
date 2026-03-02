import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

const contentDir = path.join(process.cwd(), "content/blog");

export interface ArticleFrontmatter {
  slug: string;
  titre: string;
  date: string; // YYYY-MM-DD
  categorie: string;
  extrait: string;
  image: string;
  tempsLecture: number;
}

export interface Article extends ArticleFrontmatter {
  contenu?: string; // Pour compatibilité backward
}

export interface ArticleWithContent extends Article {
  content: React.ReactElement;
}

/**
 * Récupère tous les articles depuis content/blog/*.mdx
 * Trié par date décroissante
 */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);

    return {
      slug: data.slug || filename.replace(/\.mdx$/, ""),
      titre: data.titre || "",
      date: data.date || "",
      categorie: data.categorie || "",
      extrait: data.extrait || "",
      image: data.image || "",
      tempsLecture: data.tempsLecture || 5,
    } as Article;
  });

  // Tri par date décroissante
  return articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Récupère un article par son slug et compile le MDX
 */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithContent | null> {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(source);

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      parseFrontmatter: false, // Déjà fait par gray-matter
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight,
        ],
      },
    },
  });

  return {
    slug: data.slug || slug,
    titre: data.titre || "",
    date: data.date || "",
    categorie: data.categorie || "",
    extrait: data.extrait || "",
    image: data.image || "",
    tempsLecture: data.tempsLecture || 5,
    content,
  };
}
