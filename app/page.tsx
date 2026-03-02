import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Pizza au feu de bois — Tradition italienne",
};

export default function HomePage() {
  const articles = getAllArticles();
  
  return (
    <>
      <Hero />
      <About />
      <BestSellers />
      <Testimonials />
      <BlogPreview articles={articles} />
    </>
  );
}
