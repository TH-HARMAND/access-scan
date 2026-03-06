Quand on audite des sites de PME pour la première fois, les mêmes problèmes reviennent systématiquement. La bonne nouvelle : la majorité sont simples à corriger.

Si vous découvrez le sujet, consultez d'abord [notre article sur les obligations 2025](/blog/accessibilite-web-obligatoire-pme-2025).

## Erreur 1 — Images sans alternative textuelle

Critères RGAA 1.1 à 1.3. Quand une image n'a pas d'attribut `alt`, un lecteur d'écran lit le nom du fichier. L'utilisateur ne sait pas ce que représente l'image.

**Correction** : image informative → `alt` décrivant le contenu. Image décorative → `alt=""`. Image-lien → `alt` décrivant la destination.

## Erreur 2 — Contrastes insuffisants

Critères RGAA 3.2 et 3.3. Ratio minimum : 4.5:1 pour le texte normal, 3:1 pour les grands textes. Le problème classique : texte gris clair sur fond blanc.

**Correction** : utilisez le Colour Contrast Analyser et ajustez les couleurs.

## Erreur 3 — Structure de titres incohérente

Critère RGAA 9.1. Pages avec plusieurs h1, des h3 après des h1 sans h2, ou des textes en gras codés comme paragraphes. Pour un lecteur d'écran, les titres sont le principal moyen de navigation.

**Correction** : un seul h1, des h2 pour les sections, des h3 pour les sous-sections, sans sauter de niveau.

## Erreur 4 — Formulaires sans labels

Critères RGAA 11.1 et 11.2. Les placeholders seuls ne suffisent pas : ils disparaissent à la saisie et ne sont pas toujours restitués par les lecteurs d'écran.

**Correction** : ajoutez un `<label>` visible pour chaque champ, avec `for` pointant vers l'`id` du champ.

## Erreur 5 — Navigation impossible au clavier

Critère RGAA 12.13. Menus qui ne s'ouvrent qu'au survol, boutons en `<div>`, carrousels non contrôlables, absence d'indicateur de focus.

**Correction** : testez avec Tab/Shift+Tab/Entrée/Échap. Chaque élément interactif doit être atteignable.

## Erreur 6 — Langue non déclarée

Critère RGAA 8.3. Sans `lang="fr"` sur `<html>`, les lecteurs d'écran ne savent pas quelle voix utiliser.

**Correction** : vérifiez que `<html lang="fr">` est présent.

## Erreur 7 — Liens non explicites

Critère RGAA 6.1. "Cliquez ici" et "En savoir plus" sans contexte sont des non-conformités.

**Correction** : remplacez par des intitulés descriptifs ("Lire notre guide sur l'audit RGAA").

## Erreur 8 — Titres de page non pertinents

Critère RGAA 8.5. Beaucoup de sites ont le même `<title>` sur toutes les pages.

**Correction** : chaque page doit avoir un titre unique et descriptif.

## Erreur 9 — Contenus en mouvement non contrôlables

Critère RGAA 13.8. Carrousels automatiques et vidéos en autoplay.

**Correction** : ajoutez un bouton pause visible. Désactivez l'autoplay ou coupez le son par défaut.

## Erreur 10 — Absence de lien d'accès rapide

Critère RGAA 12.7. Sans skip link, un utilisateur clavier doit parcourir tout le menu à chaque page.

**Correction** : ajoutez un lien en haut de page pointant vers le contenu principal.

## Comment prioriser

Commencez par les corrections sans code complexe : langue, titres de pages, alt des images. Puis contrastes et labels. Terminez par la navigation clavier.

Un pré-diagnostic automatisé localise ces erreurs immédiatement. Pour la méthodologie complète, consultez [notre guide audit RGAA](/blog/comment-faire-audit-accessibilite-rgaa). Pour le budget, consultez [notre article sur les coûts](/blog/cout-audit-accessibilite-web-alternatives).
