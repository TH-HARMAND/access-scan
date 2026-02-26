import Link from "next/link";

export default function MentionsLegales() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-2xl font-bold inline-block mb-8">
        <span className="text-blue-600">Access</span>Scan
      </Link>

      <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Éditeur du site</h2>
          <p>
            Le site AccessScan est édité par :<br />
            Entreprise individuelle<br />
            SIRET : 100 200 930 000 12<br />
            Email : <a href="mailto:access.scan64@gmail.com" className="text-blue-600 hover:underline">access.scan64@gmail.com</a>
          </p>
          <p>Directeur de la publication : le représentant légal de l&apos;entreprise.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Site web : <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Base de données</h2>
          <p>
            Les données utilisateurs sont stockées par :<br />
            Supabase Inc.<br />
            970 Toa Payoh North #07-04, Singapore 318992<br />
            Hébergement des données : AWS eu-west-3 (Paris, France)<br />
            Site web : <a href="https://supabase.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur le site AccessScan (textes, graphismes, logiciels, images, rapports générés) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.
          </p>
          <p>
            Les rapports PDF générés par AccessScan sont la propriété de l&apos;utilisateur qui les a commandés. AccessScan ne revendique aucun droit sur ces rapports.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Limitation de responsabilité</h2>
          <p>
            AccessScan est un outil d&apos;aide à la démarche d&apos;accessibilité web. Les résultats fournis sont indicatifs et ne constituent en aucun cas un audit WCAG ou RGAA complet, ni une certification de conformité.
          </p>
          <p>
            L&apos;éditeur ne saurait être tenu responsable des décisions prises sur la base des résultats fournis par l&apos;outil, ni des éventuelles erreurs ou omissions dans l&apos;analyse.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
          <p>
            Pour toute question relative au site, vous pouvez nous contacter à l&apos;adresse : <a href="mailto:access.scan64@gmail.com" className="text-blue-600 hover:underline">access.scan64@gmail.com</a>
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
