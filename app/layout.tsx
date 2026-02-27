import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="grain-overlay">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
