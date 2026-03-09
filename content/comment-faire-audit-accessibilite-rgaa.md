Vous savez que votre site doit être conforme au RGAA. La question : par où commencer ? Un audit accessibilité RGAA peut sembler intimidant avec 106 critères. En réalité, la démarche d'accessibilité web PME est structurée et progressive.

Si vous n'êtes pas certain que votre entreprise soit concernée, consultez [notre article sur la loi accessibilité 2025](/blog/accessibilite-web-obligatoire-pme-2025).

## Qu'est-ce qu'un audit RGAA ?

Un audit RGAA évalue la conformité d'un site aux 106 critères du Référentiel Général d'Amélioration de l'Accessibilité, regroupés en 13 thématiques : images, cadres, couleurs, multimédia, tableaux, liens, scripts, éléments obligatoires, structuration, présentation, formulaires, navigation et consultation.

L'audit porte sur un échantillon de 10 à 15 pages. Pour chaque page, chaque critère reçoit un verdict : conforme, non conforme, ou non applicable. Le résultat est un taux de conformité global.

Point essentiel : les outils automatisés ne détectent qu'environ **30 %** des problèmes. Un audit complet nécessite une analyse humaine. Pour bien comprendre la différence entre le RGAA et les WCAG sur lesquels il se base, consultez [notre guide RGAA vs WCAG](/blog/rgaa-wcag-differences-guide-pratique).

## Les 13 thématiques du RGAA en détail

Pour réaliser un audit efficace, il est important de comprendre les thématiques évaluées :

1. **Images** (critères 1.1 à 1.9) : alternatives textuelles, images décoratives, CAPTCHA, images texte.
2. **Cadres** (critères 2.1 à 2.2) : titres des iframes et cadres.
3. **Couleurs** (critères 3.1 à 3.3) : information transmise par la couleur, contrastes texte et non-texte.
4. **Multimédia** (critères 4.1 à 4.13) : sous-titres, audiodescription, transcription.
5. **Tableaux** (critères 5.1 à 5.8) : en-têtes, résumés, tableaux de données vs mise en page.
6. **Liens** (critères 6.1 à 6.2) : intitulés explicites, liens identiques menant au même endroit.
7. **Scripts** (critères 7.1 à 7.5) : compatibilité lecteur d'écran, contrôle clavier.
8. **Éléments obligatoires** (critères 8.1 à 8.10) : doctype, langue, titre, balises.
9. **Structuration** (critères 9.1 à 9.4) : hiérarchie titres, listes, citations, landmarks ARIA.
10. **Présentation** (critères 10.1 à 10.14) : CSS, zoom, lisibilité, orientation.
11. **Formulaires** (critères 11.1 à 11.13) : labels, aide à la saisie, messages d'erreur.
12. **Navigation** (critères 12.1 à 12.11) : menus, plan du site, lien d'accès rapide.
13. **Consultation** (critères 13.1 à 13.12) : rafraîchissement, ouverture nouvelle fenêtre, documents téléchargeables.

## Étape 1 — Définir le périmètre

L'échantillon doit inclure : la page d'accueil, la page de contact, les mentions légales, le plan du site, au moins une page de chaque type de contenu, et les pages les plus visitées.

Pour un site vitrine : 10 à 12 pages. Pour un e-commerce : 15 à 20 pages.

### Comment constituer un bon échantillon

L'échantillon doit être représentatif de la diversité de votre site. Voici les pages à inclure systématiquement :

- **Page d'accueil** : c'est la porte d'entrée du site.
- **Page de contact** : contient généralement un formulaire.
- **Mentions légales** : obligation légale et page de référence.
- **Page de résultats de recherche** : si votre site dispose d'un moteur de recherche interne.
- **Pages à formulaires complexes** : inscription, commande, devis.
- **Pages de contenu type** : une fiche produit, un article de blog, une page catégorie.
- **Pages les plus visitées** : identifiez-les via Google Analytics.

Pour un site e-commerce, ajoutez : une fiche produit, une page catégorie, le panier, le tunnel de commande, et la page de confirmation.

## Étape 2 — Le pré-diagnostic automatisé

Un scan automatisé identifie les erreurs évidentes : images sans alt, contrastes insuffisants, structure HTML défaillante, liens sans texte, formulaires sans labels, langue non déclarée.

Le pré-diagnostic donne une photo instantanée. Il permet de corriger les erreurs évidentes avant de mobiliser un expert, ce qui réduit le coût de l'audit professionnel.

### Les outils de pré-diagnostic

| Outil | Type | Prix | Couverture |
|---|---|---|---|
| AccessScan | Scan automatisé | Gratuit | 6 critères critiques avec localisation |
| WAVE | Extension navigateur | Gratuit | Erreurs visuelles, structure |
| axe DevTools | Extension navigateur | Gratuit | Critères WCAG automatisables |
| Lighthouse | Intégré Chrome | Gratuit | Score accessibilité global |
| Ara (DINUM) | Grille d'audit | Gratuit | 106 critères (saisie manuelle) |

L'idéal est de combiner plusieurs outils. AccessScan pour un premier diagnostic rapide avec localisation des erreurs, puis WAVE et axe DevTools pour approfondir.

## Étape 3 — L'analyse manuelle des 13 thématiques

**Images.** Chaque image informative doit avoir un alt pertinent. Les images décoratives doivent avoir un alt vide. C'est une des [erreurs les plus fréquentes](/blog/erreurs-accessibilite-web-courantes-pme).

**Couleurs.** Contrastes minimum de 4.5:1 pour le texte normal, 3:1 pour les textes de grande taille. Vérifiez que l'information n'est jamais transmise uniquement par la couleur (ex : champ en erreur coloré en rouge sans message texte).

**Liens.** Chaque lien doit avoir un intitulé explicite. "Cliquez ici" et "En savoir plus" sont des non-conformités si le contexte ne permet pas de comprendre la destination.

**Scripts.** Les composants interactifs doivent être utilisables au clavier et compatibles avec les lecteurs d'écran. C'est la thématique la plus complexe. Testez les menus déroulants, les modales, les carrousels et les onglets.

**Formulaires.** Chaque champ doit être associé à un label visible et programmatiquement lié. Les messages d'erreur doivent être explicites et rattachés au champ concerné.

**Navigation.** Au moins deux systèmes de navigation (menu + plan du site, ou menu + moteur de recherche). Un lien d'accès rapide au contenu (skip link) doit être présent.

**Structuration.** La hiérarchie des titres doit être logique (h1 > h2 > h3, sans sauter de niveau). Les listes doivent utiliser les balises appropriées (ul, ol, dl). Les zones de la page doivent être identifiées par des landmarks ARIA ou des balises sémantiques (header, nav, main, footer).

## Étape 4 — Les outils

**Analyse automatique** : AccessScan, WAVE, axe DevTools, Lighthouse.

**Vérification manuelle** : Colour Contrast Analyser, lecteur d'écran NVDA (gratuit), clavier seul, outils développeur (F12).

**Outil officiel** : Ara (DINUM) pour formaliser l'audit et générer la déclaration d'accessibilité.

### La méthode du test clavier

Le test clavier est l'un des plus révélateurs. Voici le protocole :

1. Débranchez votre souris (ou ne la touchez pas).
2. Utilisez Tab pour avancer, Shift+Tab pour reculer.
3. Utilisez Entrée pour activer un lien ou un bouton.
4. Utilisez Échap pour fermer une modale ou un menu.
5. Vérifiez que chaque élément interactif est atteignable.
6. Vérifiez que l'indicateur de focus est visible à tout moment.
7. Vérifiez que l'ordre de tabulation est logique.

Si vous êtes bloqué à un endroit, c'est une non-conformité critique.

## Différence entre test automatique et test manuel

Les outils automatisés couvrent environ 30 % des 106 critères du RGAA. Ils sont efficaces sur les thématiques où la vérification est binaire : présence d'un attribut alt sur les images, déclaration de la langue de la page, existence d'un titre de page, ratio de contraste calculable, présence de labels sur les champs de formulaire. Les thématiques Images, Couleurs, Éléments obligatoires et une partie de Présentation se prêtent bien à l'automatisation.

Les 70 % restants nécessitent une analyse humaine. La pertinence d'une alternative textuelle ne peut pas être évaluée par un algorithme : un alt "image" sur une photo de produit est techniquement présent mais non conforme. De même, la logique de la hiérarchie des titres, la cohérence de la navigation, l'utilisabilité au clavier des composants interactifs et la compatibilité avec les lecteurs d'écran exigent un jugement humain.

En pratique, l'approche optimale combine les deux : le test automatique pour détecter et corriger rapidement les erreurs évidentes, puis l'audit accessibilité RGAA manuel pour évaluer les critères complexes liés aux thématiques Scripts, Navigation, Formulaires et Multimédia.

## Structure type d'un rapport d'audit

Un rapport d'audit RGAA complet doit contenir les éléments suivants :

- **Contexte et périmètre** : description du site audité, liste des pages de l'échantillon, date de l'audit, version du RGAA utilisée.
- **Méthodologie** : outils utilisés, technologies d'assistance testées (NVDA, VoiceOver), navigateurs et environnements de test.
- **Taux de conformité global** : ratio critères conformes / critères applicables, exprimé en pourcentage.
- **Résultats par thématique** : taux de conformité pour chacune des 13 thématiques du RGAA, permettant d'identifier les axes prioritaires.
- **Détail des non-conformités** : pour chaque critère non conforme, la page concernée, la localisation de l'erreur, la description du problème et la recommandation de correction.
- **Dérogations** : contenus exemptés (contenus tiers, archives, contenus en charge disproportionnée) avec justification.
- **Déclaration d'accessibilité** : document prêt à publier, conforme au modèle de la DINUM.
- **Plan d'action priorisé** : liste des corrections classées par impact et complexité, avec estimation de charge.

## Étape 5 — Les livrables

**La grille d'audit** : chaque critère évalué avec description, localisation et recommandation.

**Le taux de conformité** : ratio critères conformes / critères applicables. Formule : (nombre de critères conformes / nombre de critères applicables) × 100.

**La déclaration d'accessibilité** : document public obligatoire qui doit mentionner le taux de conformité, la date de l'audit, les dérogations, et un moyen de contact.

**Le schéma pluriannuel et plan d'action annuel** : documents stratégiques sur trois ans décrivant les engagements et les actions programmées.

## Audit interne ou prestataire ?

L'**approche hybride** est la plus pertinente pour les RGAA PME : pré-diagnostic automatisé, correction des évidences, puis audit accessibilité RGAA professionnel sur le site amélioré. Pour les tarifs, consultez [notre comparatif des coûts](/blog/cout-audit-accessibilite-web-alternatives).

### Quand choisir un prestataire externe

- Votre équipe n'a pas de compétence accessibilité en interne.
- Vous avez besoin d'une déclaration d'accessibilité formelle.
- Votre site est complexe (e-commerce, application web).
- Vous souhaitez un regard indépendant et objectif.

### Quand internaliser

- Vous disposez d'un développeur sensibilisé à l'accessibilité.
- Votre site est simple (site vitrine, blog).
- Vous souhaitez intégrer l'accessibilité dans vos processus quotidiens.

## Les pièges à éviter

Ne pas confondre scan automatisé et audit complet. Ne pas auditer un site en cours de refonte. Ne pas oublier les contenus tiers (YouTube, widgets de chat, Google Maps). Ne pas viser la perfection immédiate — 35 % au premier audit est un point de départ normal.

**Autres pièges courants :**
- Auditer une version de développement plutôt que la version en production.
- Oublier les pages derrière authentification (espace client, tableau de bord).
- Ne pas documenter les dérogations (contenus tiers, exemptions techniques).
- Faire l'audit une fois et ne jamais le renouveler.

Testez votre site gratuitement avec [AccessScan](/) pour un premier diagnostic instantané.

## Ce qu'il faut retenir

Un audit RGAA suit cinq étapes : périmètre, scan automatisé, analyse manuelle, documentation, livrables. L'approche progressive est la plus efficace pour une PME. Commencez par un pré-diagnostic gratuit, corrigez les évidences, puis investissez dans un audit professionnel sur un site déjà amélioré.
