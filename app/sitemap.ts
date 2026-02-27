import { MetadataRoute } from "next";
import { articles } from "@/data/blog";
import { pizzas } from "@/data/pizzas";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = articles.map((a) => ({
    url: `https://lefourdeClaudia.fr/blog/${a.slug}`,
    lastModified: new Date(a.date),
  }));

  const pizzaUrls = pizzas.map((p) => ({
    url: `https://lefourdeClaudia.fr/carte/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://lefourdeClaudia.fr", lastModified: new Date() },
    { url: "https://lefourdeClaudia.fr/carte", lastModified: new Date() },
    { url: "https://lefourdeClaudia.fr/blog", lastModified: new Date() },
    { url: "https://lefourdeClaudia.fr/mentions-legales", lastModified: new Date() },
    { url: "https://lefourdeClaudia.fr/politique-de-confidentialite", lastModified: new Date() },
    ...blogUrls,
    ...pizzaUrls,
  ];
}
