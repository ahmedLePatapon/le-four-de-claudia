import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Le Four de Claudia — pizzeria artisanale à Paris.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest font-semibold text-orange-brule mb-3">Informations légales</p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-charbon dark:text-creme mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Mentions légales
        </h1>
        <p className="text-charbon/55 dark:text-creme/55 text-sm">
          Dernière mise à jour : 1er janvier 2024
        </p>
      </div>

      <div className="prose-content space-y-10 text-charbon/80 dark:text-creme/75 leading-relaxed">

        <Section title="1. Éditeur du site">
          <p>Le site <strong>lefourdeClaudia.fr</strong> est édité par :</p>
          <ul>
            <li><strong>Raison sociale :</strong> Le Four de Claudia SARL</li>
            <li><strong>Capital social :</strong> 10 000 €</li>
            <li><strong>Siège social :</strong> 12 Rue des Oliviers, 75000 Paris, France</li>
            <li><strong>SIRET :</strong> 123 456 789 00012</li>
            <li><strong>N° TVA intracommunautaire :</strong> FR 12 123456789</li>
            <li><strong>Téléphone :</strong> 01 23 45 67 89</li>
            <li><strong>Email :</strong> contact@lefourdeClaudia.fr</li>
          </ul>
        </Section>

        <Section title="2. Directrice de la publication">
          <p>
            La directrice de la publication est <strong>Claudia Rossi</strong>, gérante de la société Le Four de Claudia SARL.
          </p>
        </Section>

        <Section title="3. Hébergement">
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Société :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
          </ul>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p>
            L&apos;ensemble du contenu de ce site (textes, photographies, illustrations, logos, vidéos) est la propriété
            exclusive de la société Le Four de Claudia SARL ou de ses partenaires, et est protégé par les lois françaises
            et internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle,
            du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite
            sans l&apos;autorisation préalable et écrite de la société Le Four de Claudia SARL.
          </p>
        </Section>

        <Section title="5. Liens hypertextes">
          <p>
            Le Four de Claudia SARL ne peut être tenu responsable du contenu des sites tiers vers lesquels ce site pointe
            via des liens hypertextes. La création de liens vers ce site est soumise à l&apos;autorisation préalable de la
            directrice de la publication.
          </p>
        </Section>

        <Section title="6. Limitation de responsabilité">
          <p>
            Le Four de Claudia SARL s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées
            sur ce site. Toutefois, elle ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations
            mises à disposition sur ce site.
          </p>
          <p>
            En conséquence, Le Four de Claudia SARL décline toute responsabilité pour tout dommage résultant notamment
            d&apos;une imprécision ou inexactitude des informations disponibles sur ce site, ou de toute interruption ou
            indisponibilité du service.
          </p>
        </Section>

        <Section title="7. Droit applicable et juridiction">
          <p>
            Le présent site et les présentes mentions légales sont soumis au droit français. Tout litige relatif à leur
            interprétation ou à leur exécution est de la compétence exclusive des tribunaux français.
          </p>
        </Section>

        <Section title="8. Crédits photos">
          <p>
            Les photographies utilisées sur ce site proviennent de la banque d&apos;images{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> et sont utilisées conformément
            à leur licence gratuite.
          </p>
        </Section>

      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-xl font-bold text-charbon dark:text-creme mb-4 pb-2 border-b border-charbon/10 dark:border-creme/10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h2>
      <div className="space-y-3 [&_ul]:list-none [&_ul]:space-y-1.5 [&_li]:flex [&_li]:gap-2 [&_li]:before:content-['—'] [&_li]:before:text-orange-brule [&_li]:before:shrink-0 [&_a]:text-orange-brule [&_a]:hover:underline">
        {children}
      </div>
    </section>
  );
}
