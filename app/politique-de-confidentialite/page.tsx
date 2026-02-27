import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de gestion des données personnelles — Le Four de Claudia.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest font-semibold text-orange-brule mb-3">RGPD & Données personnelles</p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-charbon dark:text-creme mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Politique de confidentialité
        </h1>
        <p className="text-charbon/55 dark:text-creme/55 text-sm">
          Dernière mise à jour : 1er janvier 2024
        </p>
      </div>

      <div className="space-y-10 text-charbon/80 dark:text-creme/75 leading-relaxed">

        <Section title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données personnelles collectées sur le site <strong>lefourdeClaudia.fr</strong> est :
          </p>
          <ul>
            <li><strong>Société :</strong> Le Four de Claudia SARL</li>
            <li><strong>Adresse :</strong> 12 Rue des Oliviers, 75000 Paris, France</li>
            <li><strong>Email :</strong> privacy@lefourdeClaudia.fr</li>
          </ul>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons les données suivantes :</p>
          <Subsection title="a) Données de navigation">
            <p>
              Lors de votre visite sur notre site, nous collectons automatiquement certaines informations techniques :
              adresse IP (anonymisée), type de navigateur, pages visitées, durée de visite. Ces données sont collectées
              à des fins statistiques anonymes via des outils d&apos;analyse respectueux de la vie privée.
            </p>
          </Subsection>
          <Subsection title="b) Cookies">
            <p>Notre site utilise des cookies techniques nécessaires à son bon fonctionnement :</p>
            <ul>
              <li><strong>Cookies de préférence :</strong> mémorisation du thème (clair/sombre) — durée : 1 an</li>
              <li><strong>Cookies de session :</strong> maintien de la navigation — durée : session</li>
            </ul>
            <p>
              Nous n&apos;utilisons pas de cookies publicitaires ni de cookies de traçage tiers. Vous pouvez configurer
              votre navigateur pour refuser les cookies, ce qui peut affecter certaines fonctionnalités du site.
            </p>
          </Subsection>
        </Section>

        <Section title="3. Finalités du traitement">
          <p>Les données collectées sont utilisées pour :</p>
          <ul>
            <li>Assurer le bon fonctionnement technique du site</li>
            <li>Mémoriser vos préférences d&apos;affichage (thème clair/sombre)</li>
            <li>Produire des statistiques anonymes de fréquentation</li>
            <li>Améliorer l&apos;expérience utilisateur du site</li>
          </ul>
        </Section>

        <Section title="4. Base légale du traitement">
          <p>
            Les traitements de données que nous effectuons sont fondés sur notre <strong>intérêt légitime</strong> à
            améliorer notre site et l&apos;expérience de nos visiteurs, ainsi que sur votre <strong>consentement</strong>
            pour les cookies non essentiels (si applicables à l&apos;avenir).
          </p>
        </Section>

        <Section title="5. Durée de conservation">
          <ul>
            <li><strong>Données de navigation :</strong> 13 mois maximum</li>
            <li><strong>Cookies de préférence :</strong> 12 mois</li>
            <li><strong>Données de contact (si formulaire) :</strong> 3 ans à compter du dernier contact</li>
          </ul>
        </Section>

        <Section title="6. Partage des données">
          <p>
            Nous ne vendons, ne louons et ne partageons pas vos données personnelles avec des tiers à des fins
            commerciales. Vos données peuvent être transmises à nos prestataires techniques (hébergeur Vercel) dans
            le strict cadre de l&apos;exécution de leurs services, avec lesquels nous avons conclu des accords de
            traitement conformes au RGPD.
          </p>
        </Section>

        <Section title="7. Vos droits">
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la
            loi Informatique et Libertés, vous disposez des droits suivants :
          </p>
          <ul>
            <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la limitation :</strong> restreindre le traitement</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement basé sur l&apos;intérêt légitime</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:privacy@lefourdeClaudia.fr">privacy@lefourdeClaudia.fr</a>. Nous nous engageons à
            répondre dans un délai d&apos;un mois. En cas de réponse insatisfaisante, vous pouvez introduire une
            réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
          </p>
        </Section>

        <Section title="8. Sécurité des données">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
            contre tout accès non autorisé, perte, destruction ou divulgation accidentelle. Notre site est servi
            exclusivement via HTTPS (protocole TLS).
          </p>
        </Section>

        <Section title="9. Modifications de cette politique">
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification
            substantielle sera signalée sur cette page avec la date de mise à jour. Nous vous encourageons à consulter
            régulièrement cette page.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Pour toute question relative à cette politique ou à vos données personnelles :
          </p>
          <ul>
            <li><strong>Email :</strong> <a href="mailto:privacy@lefourdeClaudia.fr">privacy@lefourdeClaudia.fr</a></li>
            <li><strong>Courrier :</strong> Le Four de Claudia SARL — DPO, 12 Rue des Oliviers, 75000 Paris</li>
          </ul>
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

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pl-4 border-l-2 border-or/30">
      <h3 className="font-semibold text-charbon dark:text-creme text-sm mb-2">{title}</h3>
      <div className="space-y-2 [&_ul]:list-none [&_ul]:space-y-1.5 [&_li]:flex [&_li]:gap-2 [&_li]:before:content-['—'] [&_li]:before:text-orange-brule [&_li]:before:shrink-0 [&_a]:text-orange-brule [&_a]:hover:underline">
        {children}
      </div>
    </div>
  );
}
