Si vous vous intéressez à l'accessibilité web PME, vous avez rencontré deux acronymes : RGAA et WCAG. Le premier est français, le second international. Cet article clarifie les différences et vous dit lequel appliquer pour votre audit accessibilité RGAA.

## WCAG : la norme internationale

Les WCAG (Web Content Accessibility Guidelines) sont publiées par le W3C (World Wide Web Consortium), l'organisme qui définit les standards du web. La version en vigueur est la 2.1 (2018), la 2.2 a été finalisée en 2023.

Les WCAG s'organisent autour de quatre principes fondamentaux, résumés par l'acronyme POUR :

- **Perceptible** : l'information doit être présentée de manière perceptible (alternatives textuelles, sous-titres, contrastes).
- **Utilisable** : l'interface doit être utilisable (navigation clavier, temps suffisant, pas de contenu provoquant des crises).
- **Compréhensible** : le contenu doit être compréhensible (langue déclarée, navigation cohérente, aide à la saisie).
- **Robuste** : le contenu doit être robuste (compatible avec les technologies d'assistance actuelles et futures).

Trois niveaux de conformité : A (minimum), AA (recommandé), AAA (optimal).

Le niveau AA est celui que la plupart des législations exigent : contraste minimum 4.5:1, alternatives textuelles, navigation clavier, sous-titres vidéo. C'est le niveau ciblé par le RGAA.

### Les versions des WCAG

| Version | Date | Critères AA | Nouveautés principales |
|---|---|---|---|
| WCAG 2.0 | 2008 | 38 | Base de référence historique |
| WCAG 2.1 | 2018 | 50 | Mobile, basse vision, cognitif |
| WCAG 2.2 | 2023 | 55 | Focus visible, aide à l'authentification |
| WCAG 3.0 | En cours | - | Refonte complète (silver) |

Les WCAG 2.1 ont ajouté 12 critères par rapport aux 2.0, principalement pour l'accessibilité mobile (orientation, espacement du texte, cible tactile) et cognitive (contenu en mouvement, timeouts).

## RGAA : le cadre français

Le RGAA (Référentiel Général d'Amélioration de l'Accessibilité), publié par la DINUM (Direction interministérielle du numérique), version 4.1, est une **traduction opérationnelle** des WCAG adaptée au contexte français. Il transforme les critères WCAG 2.1 AA en 106 critères testables, regroupés en 13 thématiques.

Là où les WCAG disent "les images informatives doivent avoir une alternative textuelle", le RGAA détaille exactement comment tester ce critère, avec des tests techniques précis et des conditions de conformité explicites.

### Les 13 thématiques du RGAA

1. Images (9 critères)
2. Cadres (2 critères)
3. Couleurs (3 critères)
4. Multimédia (13 critères)
5. Tableaux (8 critères)
6. Liens (2 critères)
7. Scripts (5 critères)
8. Éléments obligatoires (10 critères)
9. Structuration de l'information (4 critères)
10. Présentation de l'information (14 critères)
11. Formulaires (13 critères)
12. Navigation (11 critères)
13. Consultation (12 critères)

Pour le détail de la méthodologie d'audit, consultez [notre guide audit RGAA](/blog/comment-faire-audit-accessibilite-rgaa).

## Les différences concrètes

**Portée juridique.** Le RGAA a force de loi en France. Les WCAG n'ont pas de valeur juridique directe en droit français. En cas de contrôle, c'est la conformité au RGAA qui est évaluée, pas celle aux WCAG.

**Granularité.** WCAG 2.1 AA = 50 critères de succès. RGAA 4.1 = 106 critères opérationnels plus précis. Par exemple, là où les WCAG ont un seul critère sur les alternatives textuelles des images (1.1.1), le RGAA décline ce critère en 9 sous-critères couvrant les images informatives, décoratives, de lien, CAPTCHA, texte, etc.

**Méthodologie d'audit.** Le RGAA prescrit une méthodologie précise (échantillon de pages, grille d'évaluation, calcul du taux de conformité). Les WCAG ne définissent pas de méthodologie d'audit — elles définissent les critères, pas la façon de les évaluer.

**Livrables administratifs.** Le cadre français impose : déclaration d'accessibilité, schéma pluriannuel sur 3 ans, plan d'action annuel. Ces obligations n'existent pas dans les WCAG. Pour le détail des obligations légales, consultez [notre article sur la loi 2025](/blog/accessibilite-web-obligatoire-pme-2025).

**Version de base.** Le RGAA 4.1 est basé sur les WCAG 2.1. Les WCAG 2.2 ne sont pas encore intégrées. Cela signifie que les 5 nouveaux critères des WCAG 2.2 ne font pas partie du RGAA actuel.

**Tests techniques.** Le RGAA fournit pour chaque critère une liste de tests techniques précis avec des conditions de conformité. Par exemple, pour vérifier qu'une image a une alternative textuelle, le RGAA liste les tests : vérifier la présence de l'attribut alt, vérifier sa pertinence, vérifier qu'une image décorative a un alt vide. Les WCAG fournissent des "techniques suffisantes" mais avec plus de flexibilité.

### Tableau comparatif

| Aspect | WCAG 2.1 | RGAA 4.1 |
|---|---|---|
| Éditeur | W3C (international) | DINUM (France) |
| Valeur juridique en France | Indirecte | Directe |
| Nombre de critères (AA) | 50 | 106 |
| Méthodologie d'audit | Non prescrite | Prescrite |
| Livrables imposés | Non | Oui (déclaration, schéma, plan) |
| Langue | Anglais | Français |
| Mise à jour | WCAG 2.2 (2023) | RGAA 4.1 (basé sur WCAG 2.1) |

## Quel référentiel appliquer ?

**PME en France uniquement** : appliquez le RGAA. C'est le référentiel qui fait foi devant les autorités de contrôle. Être conforme au RGAA vous met automatiquement en conformité technique avec les WCAG 2.1 AA.

**Présence internationale** : visez WCAG 2.1 AA + obligations administratives françaises. Si vous avez des clients dans l'Union européenne, les WCAG sont reconnues par la directive européenne (EN 301 549).

**Prestataire web** : maîtrisez le RGAA pour les clients français, les WCAG pour les clients internationaux. En pratique, les principes sont identiques — seule la granularité des tests et les livrables diffèrent.

**Éditeur de logiciel / SaaS** : si votre produit est utilisé en France, le RGAA s'applique. Si vous visez l'international, partez des WCAG et ajoutez les obligations administratives françaises.

## Les idées reçues

**"Les overlays rendent conforme."** Faux. Les overlays ajoutent une surcouche JavaScript qui ne modifie pas le code source. Un audit RGAA évalue le code source, pas la surcouche. Les overlays ne sont reconnus par aucune autorité comme moyen de conformité.

**"Les WCAG sont plus strictes."** Faux. Le RGAA est une déclinaison des WCAG AA. Même niveau d'exigence technique. Les WCAG AAA sont plus strictes, mais ce niveau n'est exigé par aucune législation.

**"Si je suis conforme WCAG 2.2, je suis conforme RGAA."** Techniquement oui pour les critères techniques (le RGAA 4.1 est basé sur les WCAG 2.1, et les WCAG 2.2 sont rétrocompatibles). Mais les obligations administratives restent spécifiques au cadre français : déclaration d'accessibilité, schéma pluriannuel, plan d'action.

**"L'accessibilité ne concerne que les aveugles."** Faux. L'accessibilité bénéficie aux personnes en situation de handicap moteur (navigation clavier), cognitif (langage clair, navigation cohérente), visuel (contrastes, zoom), auditif (sous-titres), et situationnel (bras cassé, environnement bruyant, écran en plein soleil).

**"Mon site est responsive, donc il est accessible."** Faux. Le responsive design est une condition nécessaire mais insuffisante. Un site responsive peut avoir des contrastes insuffisants, des formulaires sans labels, des images sans alt, et une navigation clavier impossible.

## L'évolution attendue

Le RGAA évolue avec les WCAG. La prochaine mise à jour majeure intégrera les WCAG 2.2, ajoutant 5 critères supplémentaires :

- **2.4.11 Focus non masqué (minimum)** : le focus ne doit pas être entièrement masqué par d'autres contenus.
- **2.4.12 Focus non masqué (amélioré)** : le focus doit être entièrement visible.
- **2.4.13 Apparence du focus** : taille et contraste minimaux de l'indicateur de focus.
- **2.5.7 Mouvements de glissement** : les actions nécessitant un glissement doivent avoir une alternative.
- **2.5.8 Taille de la cible (minimum)** : les cibles tactiles doivent faire au minimum 24×24 pixels.

Ces évolutions renforcent l'accessibilité mobile et la visibilité du focus clavier.

## La démarche recommandée

Commencez par un pré-diagnostic automatisé pour identifier les erreurs les plus évidentes. Corrigez-les — elles sont détaillées dans [notre article sur les erreurs courantes](/blog/erreurs-accessibilite-web-courantes-pme). Puis faites réaliser un audit accessibilité RGAA complet par un professionnel. Pour les tarifs, consultez [notre article sur les coûts d'audit](/blog/cout-audit-accessibilite-web-alternatives).

Testez votre site gratuitement avec [AccessScan](/) pour un premier diagnostic instantané.

## Ce qu'il faut retenir

Le RGAA est la déclinaison française des WCAG, avec 106 critères opérationnels et des obligations administratives spécifiques (déclaration, schéma pluriannuel, plan d'action). Pour une PME en France, c'est le RGAA qui fait référence. Être conforme au RGAA garantit la conformité technique aux WCAG 2.1 AA.
