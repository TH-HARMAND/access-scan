import Link from "next/link";

export default function CGV() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-2xl font-bold inline-block mb-8">
        <span className="text-blue-600">Access</span>Scan
      </Link>

      <h1 className="text-3xl font-bold mb-2">Conditions Générales de Vente</h1>
      <p className="text-gray-400 text-sm mb-8">Dernière mise à jour : février 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 1 — Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les ventes de crédits de rapports PDF d&apos;audit d&apos;accessibilité web réalisées sur le site AccessScan entre l&apos;éditeur (ci-après &quot;le Prestataire&quot;) et tout utilisateur effectuant un achat (ci-après &quot;le Client&quot;).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 2 — Services proposés</h2>
          <p>AccessScan propose :</p>
          <p className="ml-4">
            — Un service gratuit d&apos;analyse d&apos;accessibilité web fournissant un score et une liste de corrections à apporter.<br />
            — Un service payant de génération de rapports PDF détaillés, accessible par l&apos;achat de crédits.
          </p>
          <p>Chaque crédit permet le téléchargement d&apos;un rapport PDF pour un scan effectué.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 3 — Tarifs</h2>
          <p>Les tarifs en vigueur sont :</p>
          <p className="ml-4">
            — 1 crédit : 4,90 € TTC<br />
            — 10 crédits : 19,00 € TTC<br />
            — 30 crédits : 39,00 € TTC
          </p>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises (TTC). Le Prestataire se réserve le droit de modifier ses tarifs à tout moment. Les tarifs applicables sont ceux en vigueur au moment de la validation de la commande par le Client.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 4 — Commande et paiement</h2>
          <p>
            L&apos;achat de crédits nécessite la création d&apos;un compte utilisateur. Le paiement est effectué en ligne par carte bancaire via la plateforme sécurisée Stripe. La commande est considérée comme validée après confirmation du paiement par Stripe.
          </p>
          <p>
            Les crédits sont ajoutés immédiatement au compte du Client après confirmation du paiement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 5 — Durée de validité des crédits</h2>
          <p>
            Les crédits achetés n&apos;ont pas de date d&apos;expiration. Ils restent disponibles sur le compte du Client tant que celui-ci est actif.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 6 — Droit de rétractation</h2>
          <p>
            Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d&apos;un contenu numérique non fourni sur un support matériel dont l&apos;exécution a commencé avec l&apos;accord du consommateur.
          </p>
          <p>
            En achetant des crédits et en les utilisant pour générer un rapport PDF, le Client reconnaît que l&apos;exécution du service commence immédiatement et renonce expressément à son droit de rétractation pour les crédits utilisés.
          </p>
          <p>
            Pour les crédits non utilisés, le Client peut demander un remboursement dans un délai de 14 jours suivant l&apos;achat en contactant : <a href="mailto:contact@accessibilite-pme.fr" className="text-blue-600 hover:underline">contact@accessibilite-pme.fr</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 7 — Nature du service</h2>
          <p>
            AccessScan est un outil d&apos;aide à la démarche d&apos;accessibilité. Les rapports générés ne constituent en aucun cas un audit WCAG ou RGAA complet, une certification de conformité, ou un avis juridique. Le Prestataire ne garantit pas l&apos;exhaustivité ni l&apos;exactitude absolue des résultats fournis.
          </p>
          <p>
            La responsabilité du Prestataire est limitée au montant des sommes effectivement versées par le Client.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 8 — Données personnelles</h2>
          <p>
            Le traitement des données personnelles est décrit dans notre <Link href="/confidentialite" className="text-blue-600 hover:underline">Politique de confidentialité</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 9 — Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, le Client peut recourir à une procédure de médiation conventionnelle ou à tout autre mode alternatif de règlement des différends. À défaut, les tribunaux français compétents seront saisis.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Article 10 — Contact</h2>
          <p>
            Pour toute question relative à ces CGV : <a href="mailto:contact@accessibilite-pme.fr" className="text-blue-600 hover:underline">contact@accessibilite-pme.fr</a>
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
