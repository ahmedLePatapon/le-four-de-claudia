import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Le Four de Claudia — Pizza au feu de bois",
    template: "%s | Le Four de Claudia",
  },
  description:
    "Pizzeria artisanale à Paris. Pizzas au feu de bois, ingrédients frais, tradition italienne depuis 1998.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Le Four de Claudia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${playfair.variable} ${beVietnamPro.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
