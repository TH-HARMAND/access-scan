import Link from "next/link";

export default function Confidentialite() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-2xl font-bold inline-block mb-8">
        <span className="text-blue-600">Access</span>Scan
      </Link>

      <h1 className="text-3xl font-bold mb-2">Politique de confidentialité</h1>
      <p className="text-gray-400 text-sm mb-8">Dernière mise à jour : février 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles collectées sur AccessScan est :<br />
            Entreprise individuelle — SIRET : 100 200 930 000 12<br />
            Email : <a href="mailto:contact@accessibilite-pme.fr" className="text-blue-600 hover:underline">contact@accessibilite-pme.fr</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <p className="ml-4">
            <span className="font-semibold">Lors de la création de compte :</span> adresse email, mot de passe (hashé, jamais stocké en clair).<br /><br />
            <span className="font-semibold">Lors de l&apos;utilisation du service :</span> URLs des sites analysés, résultats des scans (score, problèmes détectés), date et heure des scans.<br /><br />
            <span className="font-semibold">Lors d&apos;un achat :</span> les informations de paiement sont traitées directement par Stripe. Nous ne stockons jamais vos numéros de carte bancaire. Nous conservons uniquement l&apos;identifiant de transaction Stripe, le montant et le nombre de crédits achetés.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <p className="ml-4">
            — Fournir le service d&apos;analyse d&apos;accessibilité web<br />
            — Gérer votre compte utilisateur et vos crédits<br />
            — Conserver l&apos;historique de vos scans<br />
            — Traiter vos paiements<br />
            — Vous contacter en cas de problème avec votre compte
          </p>
          <p>Nous n&apos;utilisons pas vos données à des fins publicitaires et ne les vendons jamais à des tiers.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Base légale du traitement</h2>
          <p className="ml-4">
            — <span className="font-semibold">Exécution du contrat</span> (article 6.1.b du RGPD) : le traitement est nécessaire pour fournir le service que vous avez demandé.<br />
            — <span className="font-semibold">Obligation légale</span> (article 6.1.c du RGPD) : conservation des données de facturation conformément au droit français.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Sous-traitants et transferts de données</h2>
          <p>Nous faisons appel aux sous-traitants suivants :</p>
          <p className="ml-4">
            <span className="font-semibold">Supabase Inc.</span> — Hébergement de la base de données et authentification. Données hébergées sur AWS eu-west-3 (Paris, France). Supabase est conforme au RGPD.<br /><br />
            <span className="font-semibold">Vercel Inc.</span> — Hébergement du site web. Vercel traite les requêtes HTTP et peut temporairement traiter des données aux États-Unis. Vercel est conforme au EU-US Data Privacy Framework.<br /><br />
            <span className="font-semibold">Stripe Inc.</span> — Traitement des paiements. Stripe est certifié PCI DSS Level 1 et conforme au RGPD.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Durée de conservation</h2>
          <p className="ml-4">
            — <span className="font-semibold">Données de compte</span> : conservées tant que le compte est actif. Supprimées dans les 30 jours suivant une demande de suppression.<br />
            — <span className="font-semibold">Historique des scans</span> : conservé tant que le compte est actif.<br />
            — <span className="font-semibold">Données de facturation</span> : conservées 10 ans conformément aux obligations comptables françaises.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <p className="ml-4">
            — <span className="font-semibold">Droit d&apos;accès</span> : obtenir une copie de vos données personnelles.<br />
            — <span className="font-semibold">Droit de rectification</span> : corriger des données inexactes.<br />
            — <span className="font-semibold">Droit à l&apos;effacement</span> : demander la suppression de vos données.<br />
            — <span className="font-semibold">Droit à la portabilité</span> : recevoir vos données dans un format structuré.<br />
            — <span className="font-semibold">Droit d&apos;opposition</span> : vous opposer au traitement de vos données.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@accessibilite-pme.fr" className="text-blue-600 hover:underline">contact@accessibilite-pme.fr</a>. Nous répondrons dans un délai de 30 jours.
          </p>
          <p>
            Vous pouvez également adresser une réclamation à la CNIL : <a href="https://www.cnil.fr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">8. Cookies</h2>
          <p>
            AccessScan utilise uniquement des cookies strictement nécessaires au fonctionnement du service (authentification de session). Nous n&apos;utilisons aucun cookie publicitaire, aucun cookie de tracking, et aucun outil d&apos;analyse tiers (pas de Google Analytics).
          </p>
          <p>
            Ces cookies étant strictement nécessaires, ils ne requièrent pas votre consentement conformément à la directive ePrivacy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">9. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement des communications (HTTPS/TLS), hashage des mots de passe, contrôle d&apos;accès par Row Level Security au niveau de la base de données, clés API sécurisées côté serveur.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">10. Contact</h2>
          <p>
            Pour toute question relative à cette politique : <a href="mailto:contact@accessibilite-pme.fr" className="text-blue-600 hover:underline">contact@accessibilite-pme.fr</a>
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 flex gap-6 text-xs text-gray-400">
        <Link href="/mentions-legales" className="hover:text-gray-600">Mentions légales</Link>
        <Link href="/cgv" className="hover:text-gray-600">CGV</Link>
        <Link href="/confidentialite" className="hover:text-gray-600">Politique de confidentialité</Link>
      </div>
    </main>
  );
}
