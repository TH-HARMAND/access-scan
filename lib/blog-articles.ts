export interface FAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  datePublished: string;
  dateModified: string;
  summary: string;
  faqs: FAQ[];
}

export const articles: Article[] = [
  {
    slug: 'accessibilite-web-obligatoire-pme-2025',
    title: "Accessibilité web obligatoire pour les PME en 2025 : ce que dit la loi",
    seoTitle: "Accessibilité web obligatoire pour les PME en 2025 : ce que dit la loi",
    metaDescription: "Depuis le 28 juin 2025, les PME de plus de 10 salariés doivent rendre leur site web accessible (RGAA). Obligations, sanctions, étapes.",
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    summary: "Tout ce que les PME françaises doivent savoir sur l'obligation d'accessibilité web depuis le 28 juin 2025 : seuils, sanctions, démarche à suivre.",
    faqs: [
      { question: "Ma PME est-elle concernée par l'obligation d'accessibilité web ?", answer: "Oui, si votre entreprise compte plus de 10 salariés ou réalise un chiffre d'affaires supérieur à 2 millions d'euros. Cette obligation s'applique depuis le 28 juin 2025." },
      { question: "Quel est le montant des sanctions ?", answer: "Les sanctions peuvent atteindre 50 000 € par service numérique non accessible, avec une pénalité de 25 000 € pour l'absence de déclaration d'accessibilité." },
      { question: "Faut-il atteindre 100 % de conformité RGAA ?", answer: "Non. Aucun taux minimal n'est légalement exigé. L'obligation porte sur la réalisation d'un audit, la publication des résultats et la mise en place d'un plan d'action." },
      { question: "Mon site existait avant juin 2025, suis-je concerné ?", answer: "Les sites existants bénéficient d'un délai jusqu'au 28 juin 2030. Mais l'obligation de réaliser un audit et publier une déclaration s'applique dès maintenant." },
      { question: "Puis-je réaliser l'audit moi-même ?", answer: "Oui. Des outils automatisés comme AccessScan permettent un premier diagnostic. Pour un audit complet et une déclaration officielle, un expert reste recommandé." },
    ],
  },
  {
    slug: 'comment-faire-audit-accessibilite-rgaa',
    title: "Comment réaliser un audit d'accessibilité RGAA pour votre site web",
    seoTitle: "Comment faire un audit d'accessibilité RGAA : guide pratique pour les PME",
    metaDescription: "Guide étape par étape pour réaliser un audit d'accessibilité RGAA. Méthodologie, outils, critères testés et pièges à éviter.",
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    summary: "Guide complet en 5 étapes pour réaliser un audit d'accessibilité RGAA : périmètre, outils, méthodologie des 106 critères et livrables.",
    faqs: [
      { question: "Combien de pages auditer pour un audit RGAA ?", answer: "Le RGAA impose un échantillon représentatif : 10 à 15 pages pour un site vitrine, 15 à 20 pour un e-commerce. L'échantillon doit inclure l'accueil, le contact, les mentions légales." },
      { question: "Un scan automatisé suffit-il ?", answer: "Non. Les outils automatisés détectent environ 30 % des problèmes. Un audit complet nécessite une analyse humaine. Mais le scan est un excellent point de départ." },
      { question: "Combien de temps prend un audit RGAA ?", answer: "Un audit complet prend 3 à 5 jours de travail pour un site de complexité moyenne." },
      { question: "Quelle différence entre RGAA et WCAG ?", answer: "Le RGAA est le référentiel français basé sur les WCAG. Être conforme au RGAA revient à respecter le niveau AA des WCAG." },
      { question: "Faut-il refaire l'audit régulièrement ?", answer: "Oui, à chaque modification significative et au minimum tous les 3 ans." },
    ],
  },
  {
    slug: 'rgaa-wcag-differences-guide-pratique',
    title: "RGAA vs WCAG : quelles différences et lequel appliquer en France ?",
    seoTitle: "RGAA vs WCAG : quelles différences ? Guide pratique pour les entreprises françaises",
    metaDescription: "RGAA ou WCAG : quel référentiel appliquer en France ? Comparaison détaillée et guide pratique pour choisir le bon cadre.",
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    summary: "Comparaison détaillée entre le RGAA français et les WCAG internationales : points communs, différences et quel référentiel appliquer.",
    faqs: [
      { question: "Le RGAA est-il obligatoire pour les PME en France ?", answer: "Oui, depuis le 28 juin 2025 pour les entreprises de plus de 10 salariés ou 2 M€ de CA." },
      { question: "Les WCAG sont-elles obligatoires en France ?", answer: "Pas directement. La loi française fait référence au RGAA. Mais le RGAA étant basé sur les WCAG 2.1 AA, respecter le RGAA revient à respecter les WCAG." },
      { question: "Un overlay d'accessibilité permet-il d'être conforme ?", answer: "Non. Les overlays ne modifient pas le code source. Un audit RGAA évalue le code, pas une surcouche." },
      { question: "Le RGAA couvre-t-il les WCAG 2.2 ?", answer: "Non. Le RGAA 4.1 est basé sur les WCAG 2.1. Une mise à jour est attendue." },
      { question: "Si je suis conforme WCAG 2.1 AA, suis-je conforme RGAA ?", answer: "Techniquement oui. Mais les obligations administratives françaises (déclaration, schéma pluriannuel) restent spécifiques." },
    ],
  },
  {
    slug: 'erreurs-accessibilite-web-courantes-pme',
    title: "Les erreurs d'accessibilité web les plus courantes sur les sites de PME",
    seoTitle: "Les 10 erreurs d'accessibilité web les plus courantes sur les sites de PME",
    metaDescription: "Images sans alt, contrastes faibles, formulaires mal codés : les erreurs RGAA les plus fréquentes et comment les corriger.",
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    summary: "Les 10 erreurs d'accessibilité RGAA les plus fréquentes sur les sites de PME, avec les correctifs concrets pour chacune.",
    faqs: [
      { question: "Quelles erreurs sont les plus faciles à corriger ?", answer: "Images sans alt, langue non déclarée, titres de pages non pertinents et labels de formulaires manquants. Corrections en quelques minutes." },
      { question: "Un outil automatique détecte-t-il toutes les erreurs ?", answer: "Non, environ 30 %. Les problèmes nécessitant un jugement humain ne sont détectables que par audit manuel." },
      { question: "Combien de temps pour corriger les erreurs courantes ?", answer: "Quelques heures à 2-3 jours de travail développeur selon la taille du site." },
      { question: "Mon site WordPress a-t-il les mêmes erreurs ?", answer: "Oui. Ces erreurs se retrouvent sur tous les types de sites." },
      { question: "Comment tester la navigation clavier ?", answer: "Débranchez votre souris et naviguez avec Tab, Shift+Tab, Entrée et Échap. Chaque élément interactif doit être atteignable." },
    ],
  },
  {
    slug: 'cout-audit-accessibilite-web-alternatives',
    title: "Combien coûte un audit d'accessibilité web en 2025 ?",
    seoTitle: "Combien coûte un audit d'accessibilité web en 2025 ? Tarifs et alternatives",
    metaDescription: "Le coût d'un audit RGAA varie de 1 200 à 10 000 € HT. Tarifs, facteurs de prix et alternatives pour PME à budget limité.",
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    summary: "Analyse des tarifs d'audit RGAA en 2025 et approche progressive pour optimiser le budget d'une PME.",
    faqs: [
      { question: "Combien coûte un audit RGAA en 2025 ?", answer: "Un audit complet : 2 000 à 6 000 € HT. Un audit flash : 800 € HT. Avec accompagnement : jusqu'à 10 000 € HT." },
      { question: "L'audit suffit-il pour être en conformité ?", answer: "Non. Il faut ensuite corriger les non-conformités : 3 000 à 10 000 € HT supplémentaires." },
      { question: "Existe-t-il des alternatives gratuites ?", answer: "Les outils automatisés comme AccessScan permettent un pré-diagnostic gratuit. Ara (DINUM) est gratuit mais destiné aux experts." },
      { question: "Un overlay peut-il remplacer un audit ?", answer: "Non. Les overlays ne permettent pas d'atteindre la conformité RGAA." },
      { question: "Existe-t-il des aides financières ?", answer: "Les OPCO peuvent financer des formations. Des aides régionales et crédits d'impôt innovation existent aussi." },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map(a => a.slug);
}
